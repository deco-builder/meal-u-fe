import Cart from "../Cart";
import Checkout from "../Checkout";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useState, useEffect } from "react";
import IconButton from "../../../components/icon-button";

const MyCart: React.FC = () => {
  const router = useIonRouter();
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
          <IconButton text="Make payment" textColor="#ffffff" backgroundColor="#7862FC" onClick={() => {router.push("/payment-options")}}/>
        </IonContent>
      </IonPage>
    )
};


export default MyCart;