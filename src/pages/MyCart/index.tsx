import React, { useState, useEffect } from "react";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './MyCart.css';
import Cart from "./cart";
import Checkout from "./checkout";

const MyCart = () => {
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(subTotal);
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
          <Cart subTotal={subTotal} setSubTotal={setSubTotal}/>
          <Checkout subTotal={subTotal} setSubTotal={setSubTotal} total={total} setTotal={setTotal}/>
        </IonContent>
    </IonPage>
    )
};


export default MyCart;