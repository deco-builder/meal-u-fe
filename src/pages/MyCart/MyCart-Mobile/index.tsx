import Cart from "../Cart";
import Checkout from "../Checkout";
import { IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from "react";
import styles from './mobilecart.module.css';
import DeliveryLocationPicker from "../Checkout/LocationPicker";
import PaymentDetailsCard from "../Checkout/payment-details-card";
import { cartContents } from "../Cart";
import { useIonRouter } from "@ionic/react";
import { useOrder } from '../../../contexts/orderContext';
import { useHistory } from "react-router-dom";


export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const MyCartMobile: React.FC = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(-1);
  const [deliveryFee, setDeliveryFee] = useState(-1);
  const [isDeliveryDetailsSet, setIsDeliveryDetailsSet] = useState(false);
  const [isPickerShown, setIsPickerShown] = useState(false);
  const { cartNotEmpty } = cartContents();
  const { handleOrderCreation } = useOrder();
  //const router = useIonRouter();
  //const navigate = useNavigate();
  const history = useHistory();


  const handleSetLocation = () => {
    setIsPickerShown(!isPickerShown);
  };

  const createOrderFromCart = async () => {
    const data = await handleOrderCreation()
    history.replace(`/payment-options/${data?.data.order_id}`)
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
          <Checkout subTotal={subTotal} total={total} setTotal={setTotal} />
          : null
        }
        {isPickerShown ?
        <DeliveryLocationPicker
          setIsDeliveryDetailsSet={setIsDeliveryDetailsSet}
          setIsPickerShown={setIsPickerShown}
          setDeliveryFee={setDeliveryFee}
        />
        : null}

        {cartNotEmpty ? (
          // isDeliveryDetailsSet ? (
          //   <div className={styles.subsection}>
          //     <div className={styles.title}>Payment Summary</div>
          //       <PaymentDetailsCard subTotal={subTotal} fee={deliveryFee} total={total}/>
          //   </div>
          // ) : (
          //   <div className={styles.subsection}>
          //     <div className={styles.title}>Payment Summary</div>
          //       <PaymentDetailsCard subTotal={subTotal} fee={null} total={null}/>
          //       </div>
          // )
            <div className={styles.subsection}>
              <div className={styles.title}>Payment Summary</div>
                <PaymentDetailsCard subTotal={subTotal} fee={deliveryFee} total={total}/>
              </div>
        ) : null
        }

        <div className={styles.bottom_button}>
          {isDeliveryDetailsSet ? 
          <IonButton expand="block" className={styles.checkout_button} onClick={createOrderFromCart}>
          Proceed to Payment
          </IonButton>
          :
          <IonButton expand="block" disabled={!cartNotEmpty} className={styles.checkout_button} onClick={handleSetLocation}>
          Enter Delivery Details
          </IonButton>}
        </div>
      </IonContent>
    </IonPage>
  )
};


export default MyCartMobile;