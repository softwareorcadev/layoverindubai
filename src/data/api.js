/**
 * THE BOOKING BACKEND.
 *
 * The page itself is static files on the web host, so it cannot take a payment
 * or send an email on its own. Both happen in a small program (a Cloudflare
 * Worker) that lives at the address below, and the form talks to it from the
 * visitor's browser.
 *
 * Nothing secret may appear in this file — everything here is downloaded by
 * every visitor. The Stripe key, the email key and the price calculation all
 * live on the Worker side for that reason.
 *
 * If the Worker is ever redeployed to a different Cloudflare account, this
 * address changes and this is the only line to edit.
 */
export const API_BASE = 'https://layoverindubai-api.layoverindubai.workers.dev'

/**
 * Hand a booking to the backend and get back the Stripe payment page to send
 * the visitor to.
 *
 * Note what is NOT sent: the price. The browser only says which tour and how
 * many people, and the Worker works out the amount from its own price list.
 * A visitor editing this page therefore cannot change what they are charged.
 *
 * @throws {Error} with a message written to be shown to the visitor as-is.
 */
export async function createCheckout(booking) {
  let response

  try {
    response = await fetch(`${API_BASE}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    })
  } catch {
    /* Offline, blocked by an extension, or the Worker is unreachable. */
    throw new Error(
      'We could not reach our booking system. Please check your connection and try again.',
    )
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok || !data.url) {
    throw new Error(
      data.error || 'Something went wrong starting the payment. Please try again.',
    )
  }

  return data.url
}
