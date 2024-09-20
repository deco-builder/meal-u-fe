import React from 'react';
import styles from './RecipeCard.module.css';

type RecipeCardProps = {
  imageSrc: string;
  title: string;
  onClick?: () => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ imageSrc, title, onClick }) => {
  return (
    <div className={styles.recipeCard} onClick={onClick}>
      <img
        src={imageSrc}
        alt={title}
        className={styles.recipeImage}
      />
      <h3 className={styles.recipeTitle}>{title}</h3>
    </div>
  );
};

export default RecipeCard;