import Increment from "../../../../public/icon/increment";
import Decrement from "../../../../public/icon/decrement";
import styles from './cart.module.css';
import { useEffect, useState } from "react";

interface IngredientRowCardProps {
  title: string;
  dietaryDetails: string[] | null;
  price: string;
  quantity: number | null;
}

const IngredientRowCard: React.FC<IngredientRowCardProps> = ({title, dietaryDetails, price, quantity}) => {
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
            <div className={styles.dietary_details}>
              {dietaryDetails?.map((data, index) => (
                <div key={index} className={styles.node}>{data}</div>
              ))}
            </div>
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