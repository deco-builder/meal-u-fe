import { Redirect, Route, useLocation } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonNav,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, } from "ionicons/icons";
import Tab1 from "./pages/Tab-1/Tab1";
import Tab2 from "./pages/Tab-2/Tab2";
import Tab4 from "./pages/Tab-4/Tab4";
import Tab5 from "./pages/Tab-5/Tab5";
import RepeatIcon from "../public/icon/repeat-icon";
import OrderIcon from "../public/icon/order-icon"
import MyCart from "./pages/MyCart";
import { useState } from "react";
import SubPage from "./pages/Tab-1/Sub-Page-1/sub-page-1";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Navbar from "./components/NavigationBar/Navbar";
import PaymentOptions from "./pages/PaymentOptions/PaymentOptions";
import Order from "./pages/Order";
import Login from "./pages/Login/login";
import Category from "./pages/Category";
import { useAuth } from "./contexts/authContext";
import { useTab } from "./contexts/TabContext";
import AppContent from "./AppContent";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

setupIonicReact();
const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AppContent />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
