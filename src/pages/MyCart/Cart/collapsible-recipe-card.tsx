import ArrowDownIcon from "../../../../public/icon/arrow-down";
import ArrowUpIcon from "../../../../public/icon/arrow-up";
import styles from './cart.module.css';
import { Children, useState } from "react";
import IngredientRowCard from "./ingredient-row-card";
import { Recipe, RecipeIngredient } from '../../../api/cartApi';

interface CollapsibleRecipeCardProps {
    title: string;
    dietaryDetails: string[];
    price: number;
    quantity: number;
    child: RecipeIngredient[];
}

const CollapsibleRecipeCard: React.FC<CollapsibleRecipeCardProps> = ({title, price, dietaryDetails, child, quantity}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChildExist, setIsChildExist] = useState(false);

	const toggleExpand = () => {
		setIsExpanded((prevState) => !prevState);
	}
  
  const calculatedPrice = (price*quantity).toString();

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
      </div>
			{isExpanded ? (
				<div className="expanded_content">
          {child.map((data, index) => (
            <IngredientRowCard key={index} title={data.ingredient.name} dietaryDetails={null} price={data.ingredient.price_per_unit} quantity={null} />
          ))}
        </div>
			) : null
			}
    </div>
  );
};

export default CollapsibleRecipeCard;