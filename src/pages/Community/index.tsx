import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './Tab2.css';
import { useIonRouter } from '@ionic/react';

const Tab2: React.FC = () => {
  const router = useIonRouter();
  const navigateToCreateRecipe = () => {
    router.push('/community/create/recipe');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
        <IonButton onClick={navigateToCreateRecipe}>
          Create Recipe
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
