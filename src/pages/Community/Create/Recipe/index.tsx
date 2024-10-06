import React from 'react'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import ProgressBar from './ProgressBar'

const CreateRecipe: React.FC = () => {
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
          <IonTitle>Create Recipe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="w-full max-w-md mx-auto">
          <ProgressBar />
        </div>
      </IonContent>
    </IonPage>
    )
}

export default CreateRecipe;