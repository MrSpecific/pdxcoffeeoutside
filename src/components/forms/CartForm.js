import { useState, useRef, useEffect, useCallback } from 'react';
import { useCart } from '@context/cart';
import { flattenConnection } from '@shopify/utility';

const formatter = Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });

export default function CartForm() {
  const { cart, removeFromCart, updateCartItems } = useCart();
  const [formState, setFormState] = useState(null);
  let timeout = useRef();

  async function handleLineItemQuantityChange({ event, id }) {
    const { value } = event.target;
    const quantityInt = parseInt(value, 10);
    const nextFormState = JSON.parse(JSON.stringify(formState));
    flattenConnection(nextFormState.lines).forEach((line) => {
      if (line.id === id) {
        line.quantity = quantityInt;
      }
    });
    setFormState(nextFormState);
  }

  const handleFormStateChange = useCallback(async () => {
    const lines = flattenConnection(formState.lines).map((line) => {
      const { attributes, id, quantity } = line;
      return {
        attributes,
        id,
        quantity,
      };
    });
    await updateCartItems({ lines });
  }, [formState, updateCartItems]);

  async function handleRemoveButtonClick({ id }) {
    await removeFromCart({ id });
  }

  // Initialize formState on component load && cartData update
  useEffect(() => {
    setFormState(cart ? JSON.parse(JSON.stringify(cart)) : null);
  }, [cart]);

  // send request to update cart
  useEffect(() => {
    clearTimeout(timeout.current);
    // check if cart and form are different
    if (formState && JSON.stringify(cart) !== JSON.stringify(formState)) {
      // if so, start a req to update cart from formstate
      timeout.current = setTimeout(() => {
        handleFormStateChange();
      }, 500);
    }
  }, [cart, formState, handleFormStateChange]);

  return (
    <>
      {formState && (
        <form>
          <ul>
            {flattenConnection(formState.lines).map((line) => {
              const {
                id,
                merchandise: { id: variantId, title, product },
                quantity,
              } = line;

              const price = formatter.format(line.estimatedCost.totalAmount.amount);

              return (
                <li key={id}>
                  <div>
                    <span>{product.title}</span>
                    {title !== 'Default Title' && <span> - {title}</span>}
                  </div>
                  <div>
                    <label htmlFor={`quantity-${id}`}>Quantity:</label>
                    <input
                      id={`quantity-${id}`}
                      name={`quantity-${id}`}
                      type="number"
                      min="0"
                      value={quantity}
                      onChange={(event) => handleLineItemQuantityChange({ event, id })}
                    />
                  </div>
                  <div>
                    <span>{price}</span>
                  </div>
                  <div>
                    <button onClick={() => handleRemoveButtonClick({ id })}>Remove</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </form>
      )}

      {cart && (
        <div>
          <a href={cart.checkoutUrl}>Visit Checkout</a>
        </div>
      )}
    </>
  );
}
