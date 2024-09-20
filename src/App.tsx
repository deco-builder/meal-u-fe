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
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab-1/Tab1";
import Tab2 from "./pages/Tab-2/Tab2";
import Tab3 from "./pages/Tab-3/Tab3";
import Tab4 from "./pages/Tab-4/Tab4";
import Tab5 from "./pages/Tab-5/Tab5";
import RepeatIcon from "../public/icon/repeat-icon";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import { useState } from "react";
import SubPage from "./pages/Tab-1/Sub-Page-1/sub-page-1";
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Navbar from "./components/NavigationBar/Navbar";
import PaymentOptions from "./pages/PaymentOptions/PaymentOptions";
import Order from "./pages/Tab-1/Order";
import Login from "./pages/Login/login";

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
              <Route path="/tab5">
                <Tab5 />
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
              <IonTabButton tab="tab5" href="/tab5">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Tab 5</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
