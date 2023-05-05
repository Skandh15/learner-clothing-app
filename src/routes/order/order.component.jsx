import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import OrderItem from '../../components/order-item/order-item.component';

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './order.styles';

const Order = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <OrderItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Order;
