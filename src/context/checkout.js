import { createContext, useContext, useState, useEffect } from 'react';
import { shopifyClient } from '@shopify';
import { getCheckoutQuery } from '@shopify/queries';
import { checkoutCreateMutation } from '@shopify/mutations';

const CheckoutContext = createContext();
const useCheckout = () => useContext(CheckoutContext);

async function createCheckout() {
  const { data } = await shopifyClient.mutate({
    mutation: checkoutCreateMutation,
  });
  const { checkout } = data.checkoutCreate;
  return { checkout };
}

async function getCheckout({ checkoutId }) {
  const { data } = await shopifyClient.query({
    query: getCheckoutQuery,
    variables: {
      checkoutId,
    },
  });
  const { node: checkout } = data;
  return checkout;
}

async function getInitialCheckoutId() {
  const storedCheckoutId = window.localStorage.getItem('checkoutId');
  if (!storedCheckoutId) {
    const { checkout } = await createCheckout();

    window.localStorage.setItem('checkoutId', checkout.id);
    return checkout.id;
  }
  return storedCheckoutId;
}

const CheckoutProvider = ({ children }) => {
  const [checkoutId, setCheckoutId] = useState(null);
  const [checkout, setCheckout] = useState(null);

  // get locally stored checkout id
  useEffect(async () => {
    if (typeof window !== 'undefined' && !checkoutId) {
      const id = await getInitialCheckoutId();
      setCheckoutId(id);
    }
  }, [checkoutId, setCheckoutId]);

  // set checkout init
  useEffect(async () => {
    if (typeof window !== 'undefined' && checkoutId && !checkout) {
      const retrievedCheckout = await getCheckout({ checkoutId });
      setCheckout(retrievedCheckout);
    }
  }, [checkoutId, checkout, setCheckout]);

  const value = { checkoutId, checkout };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export { CheckoutProvider, useCheckout };
