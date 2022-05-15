import { createContext, useContext, useState, useEffect } from 'react';
import { shopifyClient } from '@shopify';
import { getCartQuery, getCheckoutUrlQuery } from '@shopify/queries';
import {
  cartCreateMutation,
  cartLinesAddMutation,
  cartLinesRemoveMutation,
  cartLinesUpdateMutation,
} from '@shopify/mutations';

const CartContext = createContext();
const useCart = () => useContext(CartContext);

async function createCart() {
  const { data } = await shopifyClient.mutate({
    mutation: cartCreateMutation,
    variables: {
      input: {},
    },
  });
  const {
    cartCreate: { cart, userErrors },
  } = data;

  if (userErrors.length) {
    throw new Error('There was a problem creating cart');
  }

  return cart;
}

async function getCart({ cartId }) {
  const { data } = await shopifyClient.query({
    query: getCartQuery,
    variables: {
      id: cartId,
    },
  });
  const { cart } = data;
  return cart;
}

async function getInitialCartId() {
  const storedCartId = window.localStorage.getItem('cartId');
  if (!storedCartId) {
    const { id } = await createCart();
    window.localStorage.setItem('cartId', id);
    return id;
  }
  return storedCartId;
}

async function getCheckoutUrl({ cartId }) {
  const { data } = await shopifyClient.query({
    query: getCheckoutUrlQuery,
    variables: {
      id: cartId,
    },
  });
  const {
    cart: { checkoutUrl },
  } = data;
  return checkoutUrl;
}

async function addLineItems({ cartId, lines = [] }) {
  const { data } = await shopifyClient.mutate({
    mutation: cartLinesAddMutation,
    variables: {
      cartId,
      lines,
    },
  });
  const { cart } = data;
  return cart;
}

async function removeLineItems({ cartId, lineIds = [] }) {
  const { data } = await shopifyClient.mutate({
    mutation: cartLinesRemoveMutation,
    variables: {
      cartId,
      lineIds,
    },
  });
  const { cart } = data;
  return cart;
}

async function updateLineItems({ cartId, lines = [] }) {
  const { data } = await shopifyClient.mutate({
    mutation: cartLinesUpdateMutation,
    variables: {
      cartId,
      lines,
    },
  });
  const {
    cartLinesUpdate: { cart },
  } = data;
  return cart;
}

const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [cart, setCart] = useState(null);

  // get locally stored cart id
  useEffect(() => {
    (async function () {
      if (typeof window !== 'undefined' && !cartId) {
        const id = await getInitialCartId();
        return setCartId(id);
      }
      return false;
    })();
  }, [cartId, setCartId]);

  // set cart init
  useEffect(() => {
    (async function () {
      if (cartId && !cart) {
        const cartRes = await getCart({ cartId });
        setCart(cartRes);
      }
    })();
  }, [cartId, cart, setCart]);

  async function addToCart({ id, quantity = 1, attributes, sellingPlanId }) {
    const lineItem = {
      merchandiseId: id,
      quantity,
      attributes,
      sellingPlanId,
    };
    const nextCart = await addLineItems({ cartId, lines: [lineItem] });
    setCart(nextCart);
  }

  async function removeFromCart({ id }) {
    const lineIds = [id];
    const nextCart = await removeLineItems({ cartId, lineIds });
    setCart(nextCart);
  }

  async function updateCartItem({ id, quantity, attributes, sellingPlanId }) {
    const lineItem = [id, quantity, attributes, sellingPlanId];
    const nextCart = await updateLineItems({ cartId, lines: [lineItem] });
    setCart(nextCart);
  }

  async function updateCartItems({ lines = [] }) {
    const nextCart = await updateLineItems({ cartId, lines });
    setCart(nextCart);
  }

  const value = {
    cartId,
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    updateCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider, useCart };
