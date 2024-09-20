import React from 'react';
import { IonCard, IonCardContent, IonImg, IonText, IonIcon } from '@ionic/react';
import { chevronForward } from 'ionicons/icons';
import styles from './LongIngredientCard.module.css';

interface LongIngredientCardProps {
    name: string;
    image: string;
    quantity: string;
    price: string;
}

const LongIngredientCard: React.FC<LongIngredientCardProps> = ({ name, image, quantity, price }) => {
    return (
        <IonCard className={styles.card}>
            <IonCardContent className={styles.content}>
                <div className={styles.imageContainer}>
                    <IonImg src={image} alt={name} className={styles.image} />
                </div>
                <div className={styles.details}>
                    <IonText className={styles.name}>{name}</IonText>
                    <IonText className={styles.quantity}>{quantity}</IonText>
                    <IonText className={styles.price}>{price}</IonText>
                </div>
                <div className={styles.arrowContainer}>
                    <IonIcon icon={chevronForward} className={styles.arrowIcon} />
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default LongIngredientCard;