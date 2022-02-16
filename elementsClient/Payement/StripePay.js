import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ElementsForm from 'elementsClient/Payement/checkout';
import { Div } from 'component';
import actionsSet from '@/components/MaterialTable/actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentStatus = ({ status }) => {
  switch (status) {
    case 'initial':
      return <p>{' '}</p>;

    case 'processing':
    case 'requires_payment_method':
    case 'requires_confirmation':
      return <p style={{ fontFamily: 'GeorgiaLight', fontSize: '16px' }}>Processing payment...</p>;

    case 'requires_action':
      return <p style={{ fontFamily: 'GeorgiaLight', fontSize: '16px' }}>Authenticating...</p>;

    case 'succeeded':
      return <p style={{ fontFamily: 'GeorgiaLight', fontSize: '16px' }}>Payment is being processed...</p>;

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

const StripePay = ({
  billing = {
    Useremail: 'andresvcc88@hotmail.com',
    Totalamount: '104.65',
    currency: 'chf',
    idBilling: '1654354358',
  },
  action,
  ok = false
}) => {
  const [status, setStatus] = useState('initial');

  const payment = (data) => {
    setStatus(data.status);
    action(data);
  };

  return (
    <div className="page-container" style={{ width: '100%', height: '280px' }}>
      <Elements stripe={stripePromise}>
        <ElementsForm
          Useremail={billing.Useremail}
          Totalamount={billing.Totalamount}
          currency={billing?.currency}
          idBilling={billing.idBilling}
          payement={payment}
          amountButton={billing.amountButton}
          ok={ok}
        />
      </Elements>
      <Div>
        <PaymentStatus status={status} />
      </Div>
    </div>
  );
};

export default StripePay;
