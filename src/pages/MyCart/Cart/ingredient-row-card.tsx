import Increment from "../../../../public/icon/increment";
import Decrement from "../../../../public/icon/decrement";
import styles from './cart.module.css';
import { useEffect, useState } from "react";
import { CartProduct, useDeleteCartItem, useUpdateCartItem } from "../../../api/cartApi";

interface IngredientRowCardProps {
  data: CartProduct;
}

const IngredientRowCard: React.FC<IngredientRowCardProps> = ({data}) => {
  const pricePerUnit = parseFloat(data.product.price_per_unit);
  const [quantity, setQuantity] = useState(data.quantity);
  const [price, setPrice] = useState(pricePerUnit);
  const updateCartItem = useUpdateCartItem();
  const deleteCartItem = useDeleteCartItem();
  
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartItem.mutate({ item_type: 'product', item_id: data.id, quantity: newQuantity });
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartItem.mutate({ item_type: 'product', item_id: data.id, quantity: newQuantity})
    } else {
      deleteCartItem.mutate({ 
        item_type: 'product', 
        item_id: data.id 
      });
    }
  }

  useEffect(() => {
    const calculatePrice = () => {
      const newPrice = pricePerUnit * data.quantity;
      setPrice(newPrice);
    };
    calculatePrice();
  }, [quantity, data])

  return (
    <div className={styles.card}>
      <div className={styles.row_card_content}>
        <div className={styles.column}>
          <div className={styles.card_image_default}></div>
        </div>
        <div className={styles.column_middle}>
          <div className={styles.card_title}>{data.product.name}</div>
            <div className={styles.dietary_details}>
              {data.product.dietary_details?.map((item, index) => (
                <div key={index} className={styles.node}>{item}</div>
              ))}
            </div>
          <div className={styles.price}>${price}</div>
        </div>
        <div className={styles.column}>
          <div className={styles.quantity}>
            <Decrement onClick={handleDecrement}/>
            {quantity}
            <Increment onClick={handleIncrement}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientRowCard;