import Cart from "../Cart";
import Checkout from "../Checkout";
import { IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from "react";
import styles from './mobilecart.module.css';
import { useCreateOrder } from "../../../api/deliveryApi";
import DeliveryLocationPicker from "../Checkout/LocationPicker";

export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const MyCartMobile: React.FC = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [isDeliveryDetailsSet, setIsDeliveryDetailsSet] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState(-1);
  const [deliveryTime, setDeliveryTime] = useState(-1);
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const [isPickerShown, setIsPickerShown] = useState(false);
  const {mutate: createOrder} = useCreateOrder();
  
  const handleSetLocation = () => {
    setIsPickerShown(!isPickerShown);
  }

  const handleOrderCreation = () => {
    if (deliveryDate && !Array.isArray(deliveryDate)) {
      createOrder({
        delivery_location: deliveryLocation,
        delivery_time: deliveryTime,
        delivery_date: formatDate(deliveryDate), 
      })
    }
  }

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

        {isDeliveryDetailsSet ? 
          <Checkout subTotal={subTotal} total={total} setTotal={setTotal} location={deliveryLocation} date={deliveryDate} time={deliveryTime}/>
          : null
        }
        {isPickerShown ?
        <DeliveryLocationPicker
          deliveryLocation={deliveryLocation}
          setDeliveryLocation={setDeliveryLocation}
          deliveryTime={deliveryTime}
          setDeliveryTime={setDeliveryTime}
          deliveryDate={deliveryDate}
          setDeliveryDate={setDeliveryDate}
          isDeliveryDetailsSet={isDeliveryDetailsSet}
          setIsDeliveryDetailsSet={setIsDeliveryDetailsSet}
          isPickerShown={isPickerShown}
          setIsPickerShown={setIsPickerShown}
        />
        : null}

        <div className={styles.bottom_button}>
          {isDeliveryDetailsSet ? 
          <IonButton expand="block" className={styles.checkout_button} onClick={handleOrderCreation}>
          Checkout
          </IonButton>
          :
          <IonButton expand="block" className={styles.checkout_button} onClick={handleSetLocation}>
          Proceed
          </IonButton>}
        </div>
      </IonContent>
    </IonPage>
  )
};


export default MyCartMobile;