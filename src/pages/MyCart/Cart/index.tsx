import CollapsibleMealkitCard from "./collapsible-mealkit-card";
import CollapsibleRecipeCard from "./collapsible-recipe-card";
import IngredientRowCard from "./ingredient-row-card";
import { mealKits, recipes, products } from '../dummyData';
import React, { Dispatch, SetStateAction, useState, useEffect }from "react";
import styles from './cart.module.css';
import { useCart, CartData } from '../../../api/cartApi';
import { useAuth } from '../../../contexts/authContext';
import { fingerPrintSharp } from "ionicons/icons";
import { RecipeIngredient } from '../../../api/cartApi';

interface CartProps {
  subTotal: number;
  setSubTotal: Dispatch<SetStateAction<number>>;
}

const Cart: React.FC<CartProps> = ({subTotal, setSubTotal}) => {
  const { data: cartData } = useCart();

  useEffect(() => {
    if (cartData) {
      // Calculate the subtotal based on the prices of meal kits, recipes, and ingredients
      console.log("Calculating subtotal:", cartData); 
      const calculateSubTotal = () => {
        const mealkitTotal = cartData.cart_mealkits.reduce((acc, item) => acc + item.mealkit.total_price * item.quantity, 0);
        console.log("mealkit total:", mealkitTotal)
        const recipeTotal = cartData.cart_recipes.reduce((acc, item) => acc + item.recipe.total_price * item.quantity, 0);
        console.log(recipeTotal);
        const productTotal = cartData.cart_products.reduce((acc, item) => acc + parseFloat(item.product.price_per_unit) * item.quantity, 0);
        console.log(productTotal);
        
        const newSubTotal = mealkitTotal + recipeTotal + productTotal;
        setSubTotal(newSubTotal);
      };
      calculateSubTotal();
      console.log("new subtotal:", subTotal);
    } else {
      console.log("No cartData available");  // Debugging line
    }
  }, [cartData, setSubTotal]);

  if (!cartData) {
    return <div>You have no items in your cart right now.</div>;
  }

  return (
    <>
    	<div className={styles.subsection}>
			<div className={styles.title}>Meal Kits</div>
    	  <div className={styles.cards}>
    	    {cartData.cart_mealkits.map((data, index) => (
    	        <CollapsibleMealkitCard key={index} title={data.mealkit.name} dietaryDetails={data.mealkit.dietary_details} price={data.mealkit.total_price} child={data.recipes} />
    	    ))}
    	  </div>
    	</div>
    	<div className={styles.subsection}>
			<div className={styles.title}>Recipe</div>
    	  <div className={styles.cards}>
    	    {cartData.cart_recipes.map((data, index) => (
    	        <CollapsibleRecipeCard key={index} title={data.recipe.name} dietaryDetails={data.recipe.dietary_details} price={data.recipe.total_price} quantity={data.quantity} child={data.recipe.ingredients || []}/>
    	    ))}
    	  </div>
    	</div>
    	<div className={styles.subsection}>
			<div className={styles.title}>Products</div>
    	  <div className={styles.cards}>
    	    {cartData.cart_products.map((data, index) => (
    	        <IngredientRowCard key={index} title={data.product.name} dietaryDetails={data.product.dietary_details} price={data.product.price_per_unit} quantity={data.quantity}/>
    	    ))}
    	  </div>
    	</div>
    </>
  )
}

export default Cart;