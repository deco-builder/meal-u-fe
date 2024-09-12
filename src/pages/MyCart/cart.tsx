import React, { useState, useEffect } from "react";
import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './MyCart.css';
import RowCard from "./row-card";
import IngredientRowCard from "./ingredient-row-card";

const Cart = () => {

    return (
        <>
        <div className="main-container">
              <div className="section">
                  <IonRow className='title'>Meal Kits</IonRow>
                  <div className="cards">
                      <RowCard title="7 Days Bulk Meal Kit" price="$53" />
                  </div>
              </div>
          </div>
          <div className="main-container">
              <div className="section">
                  <IonRow className='title'>Recipe</IonRow>
                  <div className="cards">
                    <RowCard title="Fettuccine Carbonara" price="$15" />
                    <RowCard title="Asian Fried Rice" price="$13" />
                    <RowCard title="Beginner Homemade Pasta" price="$11" />
                  </div>
              </div>
          </div>
          <div className="main-container">
              <div className="section">
                  <IonRow className='title'>Ingredients</IonRow>
                  <div className="cards">
                    <IngredientRowCard title="Pasta" price="$5" quantity={1}/>
                    <IngredientRowCard title="Baby Spinach" price="$3" quantity={1}/>
                  </div>
              </div>
          </div>
        </>
    )
}

export default Cart;