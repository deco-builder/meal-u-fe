import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const router = useIonRouter();

  const navigateToSubPage = () => {
    router.push('/tab1/subpage');
  };

  const navigateToOrderPage = () => {
    router.push('/tab1/order');
  };

  const navigateToLoginPage = () => {
    router.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Page One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Home Page</h1>
        <IonButton onClick={navigateToSubPage}>
          Go to SubPage
        </IonButton>
        <IonButton onClick={navigateToOrderPage}>
          Go to Order
        </IonButton>
        <IonButton onClick={navigateToLoginPage}>
          Go to Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;