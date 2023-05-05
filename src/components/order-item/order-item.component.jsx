import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
// import Button from '../button/button.component';
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
  Button,
  OuterContainer,
} from './order-item.styles';

const OrderItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart, addItemToCart, removeItemToCart, clearCart } =
    useContext(CartContext);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemToCart(cartItem);
  const cartItemQuantity =  cartItem.quantity;

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Value>{cartItemQuantity}</Value>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
    </CheckoutItemContainer>
    
  );
};

export default OrderItem;
