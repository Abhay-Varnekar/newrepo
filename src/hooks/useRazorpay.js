/**
 * useRazorpay — Custom React hook for Razorpay checkout integration.
 *
 * - Dynamically loads the Razorpay checkout script (once, lazily).
 * - Calls the backend to create a secure order.
 * - Opens the Razorpay modal.
 * - Verifies the payment server-side after checkout completes.
 * - On success, shows a confirmation message and scrolls to contact.
 * - The receipt PDF is generated in the background and emailed to the customer.
 */

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
const KEY_ID      = import.meta.env.VITE_RAZORPAY_KEY_ID

/**
 * Injects the Razorpay SDK script into the document (idempotent).
 * Returns a Promise<boolean> — true if the script loaded successfully.
 */
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return }
    if (document.getElementById('razorpay-checkout-script')) {
      const existing = document.getElementById('razorpay-checkout-script')
      existing.addEventListener('load',  () => resolve(true))
      existing.addEventListener('error', () => resolve(false))
      return
    }
    const script   = document.createElement('script')
    script.id      = 'razorpay-checkout-script'
    script.src     = RAZORPAY_SCRIPT_URL
    script.async   = true
    script.onload  = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function useRazorpay() {
  /**
   * Opens the Razorpay checkout modal for the given plan.
   *
   * @param {{ name: string, amount: number }} plan
   * @param {number} quantity
   * @param {number} totalPaise   Pre-calculated total in paise (incl. GST & convenience).
   * @param {{
   *   baseAmount: number,
   *   gstOnAmount: number,
   *   convenienceFee: number,
   *   gstOnConvenience: number,
   *   totalAmount: number,
   * }} breakdown  Rupee-denominated fee breakdown — sent to the server for PDF generation.
   */
  const openCheckout = async (plan, quantity = 1, totalPaise, breakdown) => {
    // 1. Load the Razorpay checkout script
    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      alert(
        'Razorpay checkout could not be loaded. ' +
        'Please check your internet connection and try again.'
      )
      return
    }

    const totalAmount = totalPaise !== undefined ? totalPaise : plan.amount * quantity

    // 2. Create a Razorpay order via the backend
    let orderData
    try {
      const response = await fetch(`${BACKEND_URL}/api/create-order`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          amount:   totalAmount,
          currency: 'INR',
          planName: `${plan.name} (Qty: ${quantity})`,
        }),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || `Server error ${response.status}`)
      }
      orderData = await response.json()
    } catch (err) {
      console.error('[useRazorpay] Order creation failed:', err)
      alert(
        'Could not initiate payment. ' +
        'Please ensure the payment server is running and try again.\n\n' +
        `Details: ${err.message}`
      )
      return
    }

    // 3. Configure and open the Razorpay modal
    const options = {
      key:         KEY_ID,
      amount:      orderData.amount,
      currency:    orderData.currency,
      name:        'TimesAspire',
      description: `${plan.name} — ${quantity} Ticket${quantity > 1 ? 's' : ''}`,
      order_id:    orderData.orderId,

      // 4. Payment success — verify server-side, then send receipt email in background
      handler: async (response) => {
        try {
          const verifyResponse = await fetch(`${BACKEND_URL}/api/verify-payment`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              // Fee breakdown for PDF generation
              planName:         plan.name,
              quantity,
              baseAmount:       breakdown?.baseAmount       ?? 0,
              gstOnAmount:      breakdown?.gstOnAmount      ?? 0,
              convenienceFee:   breakdown?.convenienceFee   ?? 0,
              gstOnConvenience: breakdown?.gstOnConvenience ?? 0,
              totalAmount:      breakdown?.totalAmount      ?? 0,
            }),
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            // Scroll to contact section
            const contactSection = document.getElementById('contact')
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' })
            }
            alert(
              `🎉 Payment Successful!\n\n` +
              `Your registration for ${quantity > 1 ? `${quantity}× ` : ''}${plan.name} is confirmed.\n` +
              `Payment ID: ${response.razorpay_payment_id}\n\n` +
              `📧 Your payment receipt will be emailed to your registered email address shortly.\n\n` +
              `Our team will reach out to you soon.`
            )
          } else {
            alert(
              'Payment could not be verified. ' +
              'Please contact our support team with your payment details.\n\n' +
              `Payment ID: ${response.razorpay_payment_id}`
            )
          }
        } catch (err) {
          console.error('[useRazorpay] Payment verification failed:', err)
          alert(
            'Your payment was processed but verification encountered an error.\n' +
            'Please contact support with your Payment ID:\n\n' +
            `${response.razorpay_payment_id}`
          )
        }
      },

      prefill: { name: '', email: '', contact: '' },

      theme: { color: '#B8860B' },

      modal: {
        ondismiss:     () => console.log('[useRazorpay] Checkout dismissed by user.'),
        escape:        true,
        backdropclose: false,
      },
    }

    const rzp = new window.Razorpay(options)

    // 5. Handle payment failure (e.g. card declined, bank error)
    rzp.on('payment.failed', (response) => {
      console.error('[useRazorpay] Payment failed:', response.error)
      alert(
        `Payment Failed\n\n` +
        `Reason: ${response.error.description}\n` +
        `Please try again or use a different payment method.`
      )
    })

    rzp.open()
  }

  return { openCheckout }
}
