import React from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonTitle,
    IonCard,
    IonCardContent,
    IonText,
    IonButton,
    IonIcon,
    IonImg,
} from '@ionic/react';
import { addOutline, chevronForward } from 'ionicons/icons';
import styles from './PaymentOptions.module.css';

const PaymentOptions: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Payment Options</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Your Card</h2>
                    <IonCard className={styles.creditCard}>
                        <IonCardContent>
                            <div className={styles.cardContent}>
                                <IonText className={styles.cardName}>Oscar Isaac</IonText>
                                <img src="/path-to-mastercard-logo.png" alt="Mastercard" className={styles.cardLogo} />
                            </div>
                            <IonText className={styles.cardNumber}>4241 9214 7219 3456</IonText>
                            <IonText className={styles.cardExpiry}>12/24</IonText>
                        </IonCardContent>
                    </IonCard>

                    <IonButton expand="block" fill="outline" className={styles.addCardButton}>
                        <IonIcon icon={addOutline} slot="start" />
                        Add New Card
                    </IonButton>

                    <h2 className={styles.sectionTitle}>Other Payment Method</h2>
                    <PaymentMethodCard
                        icon="/path-to-visa-mastercard-logo.png"
                        name="Mastercard/VISA"
                        details="1240 5231 **** ****"
                    />
                    <PaymentMethodCard
                        icon="/path-to-paypal-logo.png"
                        name="PayPal"
                        details="Add PayPal"
                    />
                    <PaymentMethodCard
                        icon="/path-to-cash-icon.png"
                        name="Cash on Delivery"
                        details="Pay in Cash"
                    />
                </div>
            </IonContent>
        </IonPage>
    );
};

interface PaymentMethodCardProps {
    icon: string;
    name: string;
    details: string;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ icon, name, details }) => {
    return (
        <IonCard className={styles.paymentMethodCard}>
            <IonCardContent className={styles.paymentMethodContent}>
                <div className={styles.paymentMethodIcon}>
                    <IonImg src={icon} alt={name} />
                </div>
                <div className={styles.paymentMethodDetails}>
                    <IonText className={styles.paymentMethodName}>{name}</IonText>
                    <IonText className={styles.paymentMethodInfo}>{details}</IonText>
                </div>
                <div className={styles.paymentMethodArrow}>
                    <IonIcon icon={chevronForward} />
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default PaymentOptions;