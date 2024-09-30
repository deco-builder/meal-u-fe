import CollapsibleMealkitCard from "./collapsible-mealkit-card";
import CollapsibleRecipeCard from "./collapsible-recipe-card";
import IngredientRowCard from "./ingredient-row-card";
import React, { Dispatch, SetStateAction, useEffect }from "react";
import styles from './cart.module.css';
import { useCart } from '../../../api/cartApi';

interface CartProps {
  subTotal: number;
  setSubTotal: Dispatch<SetStateAction<number>>;
}

export const cartContents = () => {
  const { data: cartData } = useCart();

  if (cartData?.cart_mealkits.length || cartData?.cart_recipes.length || cartData?.cart_products.length) {
    return ({
      cartNotEmpty: true,
      cartMealkits: cartData.cart_mealkits,
      cartRecipes: cartData.cart_recipes,
      cartProducts: cartData.cart_products,
    })
  } 

  return {
    cartNotEmpty: false,
    cartMealkits: [],
    cartRecipes: [],
    cartProducts: [],
  };
}

const Cart: React.FC<CartProps> = ({subTotal, setSubTotal}) => {
  const { data: cartData } = useCart();

  useEffect(() => {
    if (cartData) {
      // Calculate the subtotal based on the prices of meal kits, recipes, and ingredients
      const calculateSubTotal = () => {
        const mealkitTotal = cartData.cart_mealkits.reduce((acc, item) => acc + item.mealkit.total_price * item.quantity, 0);
        const recipeTotal = cartData.cart_recipes.reduce((acc, item) => acc + item.recipe.total_price * item.quantity, 0);
        const productTotal = cartData.cart_products.reduce((acc, item) => acc + parseFloat(item.product.price_per_unit) * item.quantity, 0);
        
        const newSubTotal = mealkitTotal + recipeTotal + productTotal;
        setSubTotal(newSubTotal);
      };
      calculateSubTotal();
    } else {
    }
  }, [cartData, setSubTotal]);

  if (!cartData) {
    return <div className={styles.empty_cart}>You have no items in your cart right now.</div>;
  }

  return (
    <>
    	<div className={styles.subsection}>
			<div className={styles.title}>Meal Kits</div>
    	  <div className={styles.cards}>
          {cartData.cart_mealkits.length ? (
    	    cartData.cart_mealkits.map((data, index) => (
    	        <CollapsibleMealkitCard key={index} image={data.mealkit.image} title={data.mealkit.name} dietaryDetails={data.mealkit.dietary_details} price={data.mealkit.total_price} child={data.recipes} />
    	    ))
          ) : <div className={styles.empty}>You have no mealkits in your cart.</div>
        }
    	  </div>
    	</div>
    	<div className={styles.subsection}>
			<div className={styles.title}>Recipe</div>
    	  <div className={styles.cards}>
          {cartData.cart_recipes.length ? (
            cartData.cart_recipes.map((data, index) => (
    	        <CollapsibleRecipeCard key={index} id={data.id} image={data.recipe.image} title={data.recipe.name} dietaryDetails={data.recipe.dietary_details} price={data.recipe.total_price} quantity={data.quantity} child={data.recipe.ingredients || []}/>
    	    ))
          ) : <div className={styles.empty}>You have no recipes in your cart.</div>
              }
    	  </div>
    	</div>
    	<div className={styles.subsection}>
			<div className={styles.title}>Products</div>
    	  <div className={styles.cards}>
          {cartData.cart_products.length ? (
            cartData.cart_products.map((data, index) => (
    	        <IngredientRowCard key={index} data={data}/>
              // <IngredientRowCard key={index} data={data} title={data.product.name} dietaryDetails={data.product.dietary_details} price={data.product.price_per_unit} quantity={data.quantity}/>
    	    ))
          ) : <div className={styles.empty}>You have no products in your cart.</div>
          }
    	  </div>
    	</div>
    </>
  )
}

export default Cart;