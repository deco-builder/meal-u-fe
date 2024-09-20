import CollapsibleRowCard from "./collapsible-row-card";
import IngredientRowCard from "./ingredient-row-card";
import { mealKits, recipes, products } from '../dummyData';
import React, { Dispatch, SetStateAction, useState, useEffect }from "react";
import styles from './cart.module.css'

interface CartProps {
  subTotal: number;
  setSubTotal: Dispatch<SetStateAction<number>>;
}

const Cart: React.FC<CartProps> = ({subTotal, setSubTotal}) => {
  const [mealKitData, setMealKitData] = useState(mealKits);
  const [recipeData, setRecipeData] = useState(recipes);
  const [productData, setProductData] = useState(products);

  useEffect(() => {
      // TODO: change with API calls
      const fetchData = async () => {
          setMealKitData(mealKits);
          setRecipeData(recipes);
          setProductData(products);
      };
      fetchData();
  }, []);

  useEffect(() => {
      // Calculate the subtotal based on the prices of meal kits, recipes, and ingredients
      const calculateSubTotal = () => {
          let mealKitTotal = mealKitData.reduce((acc, item) => acc + item.price, 0);
          let recipeTotal = recipeData.reduce((acc, item) => acc + item.price, 0);
          let productTotal = productData.reduce((acc, item) => acc + item.price * item.quantity, 0);
          const newSubTotal = mealKitTotal + recipeTotal + productTotal;
          setSubTotal(newSubTotal);
      };
      calculateSubTotal();
  }, [mealKitData, recipeData, productData, setSubTotal]);

  return (
    <>
    	<div className={styles.subsection}>
			<div className={styles.title}>Meal Kits</div>
    	  <div className={styles.cards}>
    	    {mealKitData.map((mealkit, index) => (
    	        <CollapsibleRowCard key={index} title={mealkit.title} dietaryDetails={mealkit.dietaryDetails} price={mealkit.price} />
    	    ))}
    	  </div>
    	</div>
    	<div className={styles.subsection}>
			<div className={styles.title}>Recipe</div>
    	  <div className={styles.cards}>
    	    {recipeData.map((recipe, index) => (
    	        <CollapsibleRowCard key={index} title={recipe.title} dietaryDetails={recipe.dietaryDetails} price={recipe.price}/>
    	    ))}
    	  </div>
    	</div>
    	<div className={styles.subsection}>
			<div className={styles.title}>Products</div>
    	  <div className={styles.cards}>
    	    {productData.map((product, index) => (
    	        <IngredientRowCard key={index} title={product.title} price={product.price} quantity={product.quantity}/>
    	    ))}
    	  </div>
    	</div>
    </>
  )
}

export default Cart;