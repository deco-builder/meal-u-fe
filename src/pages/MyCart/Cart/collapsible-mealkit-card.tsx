import ArrowDownIcon from "../../../../public/icon/arrow-down";
import ArrowUpIcon from "../../../../public/icon/arrow-up";
import styles from "./cart.module.css";
import { useState } from "react";
import { RecipeData } from "../../../api/recipeApi";


import CollapsibleRecipeCard from "./collapsible-recipe-card";

interface CollapsibleMealkitCardProps {
  title: string;
  image: string;
  dietaryDetails: string[];
  price: number;
  child: RecipeData[];
}

const CollapsibleMealkitCard: React.FC<CollapsibleMealkitCardProps> = ({
  title,
  price,
  image,
  dietaryDetails,
  child,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className={styles.card}>
      <div className={styles.row_card_content}>
        <div className={styles.column}>
          {/* <div className={styles.card_image_default}></div> */}
          <img
            src={image || "/img/no-photo.png"}
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              maxWidth: "60px",
              maxHeight: "60px",
            }}
          />
        </div>
        <div className={styles.column_middle}>
          <div className={styles.card_title}>
            <p style={{ fontSize: "11px", fontWeight: "600" }}>
              {title.length > 20 ? `${title.slice(0, 20)}...` : title}
            </p>
          </div>
          <div className={styles.dietary_details}>
            {Object.values(dietaryDetails).map((detail, index) => (
              <div key={index} className={styles.node}>
                {detail}
              </div>
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
            <CollapsibleRecipeCard
              key={index}
              id={data.id}
              image={data.image}
              title={data.name}
              dietaryDetails={data.dietary_details}
              price={data.total_price}
              quantity={1}
              child={data.ingredients || []}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CollapsibleMealkitCard;
