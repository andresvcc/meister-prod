import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ElementsForm from 'elementsClient/Payement/checkout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentStatus = ({ status }) => {
  switch (status) {
    case 'initial':
      return <p>Initial...</p>;

    case 'processing':
    case 'requires_payment_method':
    case 'requires_confirmation':
      return <p>Processing...</p>;

    case 'requires_action':
      return <p>Authenticating...</p>;

    case 'succeeded':
      return <p>Payment Succeeded</p>;

    case 'error':
      return (
        <>
          <p className="error-message" />
        </>
      );

    default:
      return null;
  }
};

const DonatePage = ({
  billing = {
    Useremail: 'andresvcc88@hotmail.com',
    Totalamount: '104.65',
    currency: 'chf',
    idBilling: '1654354358',
  }
}) => {
  const [status, setStatus] = useState('initial');

  const payment = (data) => {
    setStatus(data.status);
  };

  return (
    (
      <div className="page-container">
        <Elements stripe={stripePromise}>
          <ElementsForm
            Useremail={billing.Useremail}
            Totalamount={billing.Totalamount}
            currency={billing?.currency}
            idBilling={billing.idBilling}
            payement={payment}
          />
        </Elements>
        <PaymentStatus status={status} />
      </div>
    )
  );
};

export default DonatePage;
