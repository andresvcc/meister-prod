/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */

import Stripe from 'stripe';

const MIN_AMOUNT = 10.0;
const MAX_AMOUNT = 100000.0;

function formatAmountForStripe(
  amount,
  currency,
) {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, currency, idBilling } = req.body;
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.');
      }
      // Create PaymentIntent from body params.
      const params = {
        amount: formatAmountForStripe(amount, currency),
        currency,
        description: `idBilling: ${idBilling}`
      };

      const payment_intent = await stripe.paymentIntents.create(
        params
      );
      res.status(200).json(payment_intent);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
