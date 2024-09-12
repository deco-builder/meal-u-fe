import React from "react";
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
import "./order.css";
import { searchOutline } from "ionicons/icons";

function OrderMobile() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-hide-sm-up">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1"></IonBackButton>
          </IonButtons>
          <IonTitle>Order</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
          <p>Delivery Location</p>
        </div>
        <div className="header-location">
          <LocationIcon />
          <p>University of Queensland</p>
        </div>
        <div>
          <IonInput
            className="custom-input"
            fill="outline"
            placeholder="Search"
            {...({ className: "custom-input" } as any)}
          >
            <IonIcon
              slot="start"
              icon={searchOutline}
              aria-hidden="true"
            ></IonIcon>
          </IonInput>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default OrderMobile;
