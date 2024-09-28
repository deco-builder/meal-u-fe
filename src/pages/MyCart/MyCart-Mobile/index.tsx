import Cart from "../Cart";
import Checkout from "../Checkout";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from "react";
import { useCart } from "../../../api/cartApi";

const MyCartMobile: React.FC = () => {
  // const { data: cartData } = useCart();
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  // useEffect(() => {
  //   if (cartData) {
  //     // Calculate the subtotal based on the prices of meal kits, recipes, and ingredients
  //     const calculateSubTotal = () => {
  //       const mealkitTotal = cartData.cart_mealkits.reduce((acc, item) => acc + item.mealkit.total_price * item.quantity, 0);
  //       const recipeTotal = cartData.cart_recipes.reduce((acc, item) => acc + item.recipe.total_price * item.quantity, 0);
  //       const productTotal = cartData.cart_products.reduce((acc, item) => acc + parseFloat(item.product.price_per_unit) * item.quantity, 0);
  //       const ingredientTotal = cartData.cart_ingredients.reduce((acc, item) => acc + item.recipe_ingredient.price * item.quantity, 0);
        
  //       const newSubTotal = mealkitTotal + recipeTotal + productTotal + ingredientTotal;
  //       setSubTotal(newSubTotal);
  //     };
  //     calculateSubTotal();
  //   }
  // }, [cartData, setSubTotal]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tab1"></IonBackButton>
        </IonButtons>
          <IonTitle>My Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Cart subTotal={subTotal} setSubTotal={setSubTotal}/>
        <Checkout subTotal={subTotal} total={total} setTotal={setTotal}/>
      </IonContent>
    </IonPage>
  )
};


export default MyCartMobile;