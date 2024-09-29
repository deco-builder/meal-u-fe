import Cart from "../Cart";
import Checkout from "../Checkout";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from "react";

const MyCartMobile: React.FC = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

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