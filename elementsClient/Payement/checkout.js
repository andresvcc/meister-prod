import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '@/components/CustomButtons/Button';
import { Div } from 'component';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchPostJSON } from './api-helpers';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  hidePostalCode: true,
  style: {
    base: {
      backgroundColor: 'white',
      iconColor: 'grey',
      color: 'black',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: 'black',
      },
      '::placeholder': {
        color: 'grey',
      },
    },
    invalid: {
      iconColor: '#ef2961',
      color: '#ef2961',
    },
  },
};

const ElementsForm = ({
  Totalamount, Useremail, currency, idBilling, payement, amountButton, ok
}) => {
  const [input, setInput] = useState({
    cardholderName: '',
  });

  const router = useRouter();

  const [payment, setPayment] = useState({ status: 'initial' });
  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return;
    setPayment({ status: 'processing' });
    payement({ status: 'processing' });

    // Create a PaymentIntent with the specified amount.
    const response = await fetchPostJSON('/api/payment_intents', {
      amount: Totalamount,
      currency,
      idBilling,
    });

    setPayment(response);

    if (response.statusCode === 500) {
      setPayment({ status: 'error' });
      payement({ response, status: 'error', info: response.message });
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      response.client_secret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: input.cardholderName,
            email: Useremail,
          },
        },
      },
    );

    if (error) {
      setPayment({ status: 'error' });
      payement({ response: error, status: 'error', info: error.message ?? 'An unknown error occured' });
    } else if (paymentIntent) {
      setPayment(paymentIntent);
      payement({ response: { ...paymentIntent, amount: paymentIntent.amount / 100 }, status: paymentIntent.status });
    }
  };

  // Bouton lien pour aller à la page "Terms of Service"
  const LinkTo = (props) => {
    const { link, children } = props;
    const [hover, setHover] = useState(false);
    return (
      <span
        type="link2"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ cursor: 'pointer', fontWeight: hover ? 'bold' : null, color: '#18374C' }}
      >
        <Link href={link} passHref>
          <span>{children}</span>
        </Link>
      </span>
    );
  };

  return (
    <Div width="100%">
      <Backdrop
        open={!['initial', 'succeeded', 'error'].includes(payment.status) || !stripe}
        style={{ position: 'absolute', zIndex: 999999999 }}
      >
        <Div width="calc(100% - 50px)">
          <CircularProgress style={{ color: 'white' }} size={80} />
          <h4 style={{ color: 'white' }}>Processing payment, please wait</h4>
        </Div>
      </Backdrop>
      <form onSubmit={handleSubmit} style={{ width: 'calc(100% - 20px)' }}>
        <Div width="100%">
          <fieldset style={{ border: 'transparent', width: '100%' }}>
            <input
              placeholder="Cardholder name"
              className="elements-style"
              type="Text"
              name="cardholderName"
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                margin: '5px 0',
                borderRadius: 'var(--radius)',
                padding: '14px 12px',
                background: '#fff',
                appearance: 'none',
                fontSize: '16px',
                marginTop: '10px',
                border: 'solid 1px grey',
                fontWeight: '500',
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
              }}
            />
            <div className="FormRow elements-style" style={{ background: 'white', width: '100%', border: 'solid 1px grey' }}>
              <CardElement
                options={CARD_OPTIONS}
                onChange={(e) => {
                  if (e.error) {
                    setPayment({ status: 'error' });
                    payement({ status: 'error', info: e.error.message });
                  }
                }}
              />
            </div>
          </fieldset>
          <Button
            type="submit"
            disabled={
              !['initial', 'succeeded', 'error'].includes(payment.status)
              || !stripe
              || !ok
            }
            color="primary"
            style={{ width: 'calc(100% - 20px)', padding: '11px 12px', fontSize: '50px' }}
          >
            <span style={{ fontFamily: 'GorgiaBold', fontSize: '15px' }}>
              <span>Proceed To Purchase</span>
              &nbsp;&nbsp;&nbsp;
              <span>{`${amountButton}`}</span>
            </span>
          </Button>
          <Div width={[300, 400, 400, 400, 400]} style={{ textAlign: 'center', fontSize: '14px' }}>
            By clicking on the button you agree to our
            <Div style={{ fontSize: '14px', color: '#18374C' }}>
              <LinkTo link="/Information/termsConditions">
                Terms of Service
              </LinkTo>
            </Div>
          </Div>
          <Button
            onClick={() => router.push('/')}
            link
            style={{ width: 'calc(100% - 20px)', padding: '11px 12px', fontSize: '50px' }}
          >
            <span style={{ fontSize: '14px', fontFamily: 'GorgiaBold' }}>
              <span>Continue shopping</span>
            </span>
          </Button>
        </Div>
      </form>
    </Div>
  );
};

export default ElementsForm;
