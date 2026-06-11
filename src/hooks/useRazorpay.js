/**
 * useRazorpay — Custom React hook for Razorpay checkout integration.
 *
 * - Dynamically loads the Razorpay checkout script (once, lazily).
 * - Calls the backend to create a secure order.
 * - Opens the Razorpay modal.
 * - Verifies the payment server-side after checkout completes.
 * - On success, scrolls to the #contact section and shows a confirmation.
 * - Handles failure and modal dismissal gracefully.
 */

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

/**
 * Injects the Razorpay SDK script into the document (idempotent).
 * Returns a Promise<boolean> — true if the script loaded successfully.
 */
function loadRazorpayScript() {
  return new Promise((resolve) => {
    // Already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    // Script tag already injected but not yet ready
    if (document.getElementById('razorpay-checkout-script')) {
      const existing = document.getElementById('razorpay-checkout-script');
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-checkout-script';
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function useRazorpay() {
  /**
   * Opens the Razorpay checkout modal for the given plan.
   *
   * @param {{ name: string, amount: number }} plan
   * @param {number} quantity
   * @param {number} totalPaise  Pre-calculated total including GST & convenience (in paise).
   *                             If not provided, falls back to plan.amount * quantity.
   */
  const openCheckout = async (plan, quantity = 1, totalPaise) => {
    // 1. Load the Razorpay checkout script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert(
        'Razorpay checkout could not be loaded. ' +
        'Please check your internet connection and try again.'
      );
      return;
    }

    // Use pre-calculated total (incl. GST + convenience) if provided
    const totalAmount = totalPaise !== undefined ? totalPaise : plan.amount * quantity;

    // 2. Create a Razorpay order via the backend (keeps secret key server-side)
    let orderData;
    try {
      const response = await fetch(`${BACKEND_URL}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,   // in paise (incl. GST + convenience)
          currency: 'INR',
          planName: `${plan.name} (Qty: ${quantity})`,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || `Server error ${response.status}`);
      }

      orderData = await response.json();
    } catch (err) {
      console.error('[useRazorpay] Order creation failed:', err);
      alert(
        'Could not initiate payment. ' +
        'Please ensure the payment server is running and try again.\n\n' +
        `Details: ${err.message}`
      );
      return;
    }

    // 3. Configure and open the Razorpay modal
    const options = {
      key: KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'TimesAspire',
      description: `${plan.name} - ${quantity} Ticket(s)`,
      order_id: orderData.orderId,

      // 4. Payment success handler — verify signature server-side
      handler: async (response) => {
        try {
          const verifyResponse = await fetch(`${BACKEND_URL}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            // ✅ Payment verified — scroll to the registration/contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            alert(
              `🎉 Payment Successful!\n\n` +
              `Your registration for ${quantity}x ${plan.name} is confirmed.\n` +
              `Payment ID: ${response.razorpay_payment_id}\n\n` +
              `Our team will reach out to you shortly.`
            );
          } else {
            alert(
              'Payment could not be verified. ' +
              'Please contact our support team with your payment details.\n\n' +
              `Payment ID: ${response.razorpay_payment_id}`
            );
          }
        } catch (err) {
          console.error('[useRazorpay] Payment verification failed:', err);
          alert(
            'Your payment was processed but verification encountered an error.\n' +
            'Please contact support with your Payment ID:\n\n' +
            `${response.razorpay_payment_id}`
          );
        }
      },

      prefill: {
        name: '',
        email: '',
        contact: '',
      },

      // Use the existing brand gold color for the Razorpay modal header
      theme: {
        color: '#B8860B',
      },

      modal: {
        // User closed the modal without paying — no action needed
        ondismiss: () => {
          console.log('[useRazorpay] Checkout dismissed by user.');
        },
        escape: true,
        backdropclose: false,
      },
    };

    const rzp = new window.Razorpay(options);

    // 5. Handle payment failure (e.g. card declined, bank error)
    rzp.on('payment.failed', (response) => {
      console.error('[useRazorpay] Payment failed:', response.error);
      alert(
        `Payment Failed\n\n` +
        `Reason: ${response.error.description}\n` +
        `Please try again or use a different payment method.`
      );
    });

    rzp.open();
  };

  return { openCheckout };
}
