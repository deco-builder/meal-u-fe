import Increment from "../../../../public/icon/increment";
import Decrement from "../../../../public/icon/decrement";
import styles from './cart.module.css';
import { useState } from "react";

interface IngredientRowCardProps {
  title: string;
  price: number;
  quantity: number;
}

const IngredientRowCard: React.FC<IngredientRowCardProps> = ({title, price, quantity}) => {
  const [isDetailAvailable, setIsDetailAvailable] = useState(false);
  const [newQuantity, setNewQuantity] = useState((quantity ? quantity : 0));
  
  const handleIncrement = () => {
    setNewQuantity((qty) => qty + 1);
  }

  const handleDecrement = () => {
    setNewQuantity((qty) => qty - 1);
  }

  return (
    <div className={styles.card}>
      <div className={styles.row_card_content}>
        <div className={styles.column}>
          <div className={styles.card_image_default}></div>
        </div>
        <div className={styles.column_middle}>
          <div className={styles.card_title}>{title}</div>
          {isDetailAvailable ? (
            <div className={styles.dietary_details}>
              <div className={styles.node}>Gluten Free</div>
              <div className={styles.node}>Halal</div>
              <div className={styles.node}>Vegan</div>
            </div>
          ) : null}
          <div className={styles.price}>${price}</div>
        </div>
        <div className={styles.column}>
          <div className={styles.quantity}>
            <Decrement onClick={handleDecrement}/>
            {newQuantity}
            <Increment onClick={handleIncrement}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientRowCard;