import React from 'react';
import { IonCard, IonCardContent, IonImg, IonText, IonIcon, IonChip } from '@ionic/react';
import { chevronForward } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import styles from './LongRecipeCard.module.css';

interface LongRecipeCardProps {
    id: number;
    name: string;
    image: string;
    dietaryDetails: string[];
    price: number;
}

const LongRecipeCard: React.FC<LongRecipeCardProps> = ({ id, name, image, dietaryDetails, price }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/recipe-details/${id}`);
    };

    return (
        <IonCard className={styles.card}>
            <IonCardContent className={styles.content}>
                <div className={styles.imageContainer}>
                    <IonImg src={image} alt={name} className={styles.image} />
                </div>
                <div className={styles.details}>
                    <IonText className={styles.name}>{name}</IonText>
                    <div className={styles.tags}>
                        {dietaryDetails.map((detail, index) => (
                            <IonChip key={index} className={styles.customChip}>{detail}</IonChip>
                        ))}
                    </div>
                    <IonText className={styles.price}>${price.toFixed(2)}</IonText>
                </div>
                <div className={styles.arrowContainer} onClick={handleClick}>
                    <IonIcon icon={chevronForward} className={styles.arrowIcon} />
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default LongRecipeCard;