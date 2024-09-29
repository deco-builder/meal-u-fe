import ArrowDownIcon from "../../../../public/icon/arrow-down";
import ArrowUpIcon from "../../../../public/icon/arrow-up";
import Increment from "../../../../public/icon/increment";
import Decrement from "../../../../public/icon/decrement";
import styles from './cart.module.css';
import { useEffect, useState } from "react";
import { RecipeIngredient, useDeleteCartItem, useUpdateCartItem } from '../../../api/cartApi';

interface CollapsibleRecipeCardProps {
    // data: CartRecipe | Recipe[];
    id: number;
    title: string;
    dietaryDetails: string[];
    price: number;
    quantity: number;
    child: RecipeIngredient[];
}

const CollapsibleRecipeCard: React.FC<CollapsibleRecipeCardProps> = ({id, title, dietaryDetails, price, quantity, child}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChildExist, setIsChildExist] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [calculatedPrice, setCalculatedPrice] = useState(price);
  const updateCartItem = useUpdateCartItem();
  const deleteCartItem = useDeleteCartItem();

	const toggleExpand = () => {
		setIsExpanded((prevState) => !prevState);
	}

  useEffect(() => {
    const newPrice = price * quantity;
    setCalculatedPrice(newPrice);
  }, [price, newQuantity]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setNewQuantity(newQuantity);
    updateCartItem.mutate({ item_type: 'recipe', item_id: id, quantity: newQuantity });
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setNewQuantity(newQuantity);
      updateCartItem.mutate({ item_type: 'recipe', item_id: id, quantity: newQuantity})
    } else {
      deleteCartItem.mutate({ 
        item_type: 'recipe', 
        item_id: id 
      });
    }
  }

  useEffect(() => {
    const calculatePrice = () => {
      const newPrice = price * newQuantity;
      setCalculatedPrice(newPrice);
    };
    calculatePrice();
  }, [newQuantity, price])

  return (
    <div className={styles.card}>
      <div className={styles.row_card_content}>
        <div className={styles.column}>
            <div className={styles.card_image_default}></div>
        </div>
        <div className={styles.column_middle}>
          <div className={styles.card_title}>{title}</div>
          <div className={styles.dietary_details}>
            {Object.values(dietaryDetails).map((detail, index) => (
              <div key={index} className={styles.node}>{detail}</div>
            ))}
          </div>
          <div className={styles.price}>${calculatedPrice}</div>
        </div>
        <div className={styles.column} onClick={toggleExpand}>
          {isChildExist ?  (isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon /> ) : null}
        </div>
        <div className={styles.column}>
          <div className={styles.quantity}>
            <Decrement onClick={handleDecrement}/>
            {newQuantity}
            <Increment onClick={handleIncrement}/>
          </div>
        </div>
      </div>
			{isExpanded ? (
				<div className="expanded_content">

        </div>
      ) : null
			}
    </div>
  );
};

export default CollapsibleRecipeCard;