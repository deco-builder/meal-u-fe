import React, { useState, useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButton,
  IonInput,
  IonIcon,
} from "@ionic/react";
import LocationIcon from "../../../../public/icon/location-icon";
import { searchOutline } from "ionicons/icons";
import OrderMobile from "./order-mobile/order-mobile";
import OrderWeb from "./order-web/order-web";

function Order() {
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

  if (isMobile) {
    return <OrderMobile />;
  }

  return <OrderWeb />;
}

export default Order;