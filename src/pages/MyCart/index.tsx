import React, { useState, useEffect } from "react";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './MyCart.css';
import Cart from "./cart";

const MyCart = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 576);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

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
          <Cart />
          <div className="checkout">
            <div className="section">
              <div className="title">Delivery to</div>
              <div className="row-card">
                <div className="row">
                  <div className="col">
                    <p>University of Queensland</p>
                    <p>Saint Lucia Campus</p>
                  </div>
                  <div className="col">
                    <p>Change Address</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
    </IonPage>
    )
};


export default MyCart;