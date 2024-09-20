import { Redirect, Route } from "react-router-dom";
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
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab-1/Tab1";
import Tab2 from "./pages/Tab-2/Tab2";
import Tab3 from "./pages/Tab-3/Tab3";
import Tab4 from "./pages/Tab-4/Tab4";
import Tab5 from "./pages/Tab-5/Tab5";
import RepeatIcon from "../public/icon/repeat-icon";
import MyCart from './pages/MyCart';
import { useState } from "react";
import SubPage from "./pages/Tab-1/Sub-Page-1/sub-page-1";
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Navbar from "./components/NavigationBar/Navbar";
import PaymentOptions from "./pages/PaymentOptions/PaymentOptions";
import Order from "./pages/Tab-1/Order";
import Login from "./pages/Login/login";

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
  const [isSelected, setIsSelected] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <IonHeader className="ion-hide-sm-down">
          <Navbar isSelected={isSelected} setIsSelected={setIsSelected} />
        </IonHeader>
        <IonContent>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1">
                <Tab1 />
              </Route>
              <Route exact path="/tab1/subpage">
                <SubPage />
              </Route>
              <Route exact path="/tab1/order">
                <Order />
              </Route>
              <Route exact path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>
              <Route path="/tab4">
                <Tab4 />
              </Route>
              <Route path="/mycart">
                <MyCart />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
              <Route path="/recipe-details/:id" component={RecipeDetails} />
              <Route path="/product-details/:id" component={ProductDetails} />
              <Route path="/payment-options" component={PaymentOptions} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" className="ion-hide-sm-up">
              <IonTabButton tab="tab1" href="/tab1" onClick={() => setIsSelected(!isSelected)}>
                <RepeatIcon selected={isSelected} />
                <IonLabel>Tab 1</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon aria-hidden="true" icon={ellipse} />
                <IonLabel>Tab 2</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Tab 3</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab4" href="/tab4">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Tab 4</IonLabel>
              </IonTabButton>
              <IonTabButton tab="mycart" href="/mycart?">
              <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>My Cart</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
