import ArrowDownIcon from "../../../../public/icon/arrow-down";
import ArrowUpIcon from "../../../../public/icon/arrow-up";
import styles from './cart.module.css';
import { useState } from "react";
import { Recipe } from '../../../api/cartApi';
import CollapsibleRecipeCard from "./collapsible-recipe-card";

interface CollapsibleMealkitCardProps {
    title: string;
    dietaryDetails: string[];
    price: number;
    child: Recipe[];
}

const CollapsibleMealkitCard: React.FC<CollapsibleMealkitCardProps> = ({title, price, dietaryDetails, child}) => {
  const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded((prevState) => !prevState);
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
            {Object.values(dietaryDetails).map((detail, index) => (
              <div key={index} className={styles.node}>{detail}</div>
            ))}
          </div>
          <div className={styles.price}>${price}</div>
        </div>
        <div className={styles.column} onClick={toggleExpand}>
        {isExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </div>
      </div>
	    {isExpanded ? (
				<div className="expanded_content">
          {child.map((data, index) => (
            <CollapsibleRecipeCard key={index} id={data.id} title={data.name} dietaryDetails={data.dietary_details} price={data.total_price} quantity={1} child={data.ingredients || []} />
          ))}
        </div>
			) : null
			}
    </div>
  );
};

export default CollapsibleMealkitCard;