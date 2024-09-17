import Cart from "./Cart";
import Checkout from "./Checkout";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from "react";
import './MyCart.module.css';

const MyCart: React.FC = () => {
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
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
          <Checkout subTotal={subTotal} total={total} setTotal={setTotal}/>
        </IonContent>
    </IonPage>
    )
};


export default MyCart;