import React from 'react';
import { IonButton, IonButtons, IonIcon, IonLabel, IonSearchbar, IonToolbar } from '@ionic/react';
import { ellipse, square } from 'ionicons/icons';
import RepeatIcon from '../../../public/icon/repeat-icon';

interface NavbarProps {
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isSelected, setIsSelected }) => {
  return (
    <IonToolbar className="custom-navbar">
      <IonButtons className="ion-justify-content-between ion-align-items-center">
        <IonButton routerLink="/tab1" onClick={() => setIsSelected(!isSelected)}>
          <RepeatIcon selected={isSelected} />
        </IonButton>
        <IonButton routerLink="/tab2">
          <IonIcon icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonButton>
        <IonButton routerLink="/tab3">
          <IonIcon icon={square} />
          <IonLabel>Tab 3</IonLabel>
        </IonButton>
        <IonButton routerLink="/tab4">
          <IonIcon icon={square} />
          <IonLabel>Tab 4</IonLabel>
        </IonButton>
        <IonButton routerLink="/tab5">
          <IonIcon icon={square} />
          <IonLabel>Tab 5</IonLabel>
        </IonButton>
      </IonButtons>
      <IonSearchbar></IonSearchbar>
    </IonToolbar>
  );
};

export default Navbar;