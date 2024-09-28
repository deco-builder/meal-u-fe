import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonImg,
    IonText,
    IonIcon,
    IonButton,
    IonChip,
    IonAvatar,
    IonSkeletonText,
} from '@ionic/react';
import { heartOutline, chatbubbleOutline, shareOutline, bookmarkOutline, time, pencil } from 'ionicons/icons';
import styles from './MealkitDetails.module.css';
import LongRecipeCard from '../../components/LongRecipeCard/LongRecipeCard';
import { fetchMealkitDetails, MealkitDetailsData } from '../../api/mealkitApi';
import { useAuth } from '../../contexts/authContext';

const MealkitDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [mealkit, setMealkit] = useState<MealkitDetailsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { getToken } = useAuth();
    const token = getToken();

    useEffect(() => {
        const loadMealkit = async () => {
            if (!token) {
                setError('No authentication token available');
                setLoading(false);
                return;
            }

            try {
                const data = await fetchMealkitDetails(parseInt(id), token);
                setMealkit(data);
            } catch (err) {
                setError('Failed to load mealkit details');
            } finally {
                setLoading(false);
            }
        };

        loadMealkit();
    }, [id, token]);

    if (loading) {
        return (
            <IonPage>
                <IonContent>
                    <IonSkeletonText animated style={{ width: '100%', height: '100%' }} />
                </IonContent>
            </IonPage>
        );
    }

    if (error || !mealkit) {
        return (
            <IonPage>
                <IonContent>
                    <IonText color="danger">{error || 'Mealkit not found'}</IonText>
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/mealkits" />
                    </IonButtons>
                    <IonTitle>Mealkit</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={styles.contentContainer}>
                    <div className={styles.authorContainer}>
                        <div className={styles.avatarContainer}>
                            <IonAvatar>
                                <img src={mealkit.creator.profile_picture} alt={mealkit.creator.name} />
                            </IonAvatar>
                            <div>
                                <IonText className={styles.authorName}>{mealkit.creator.name}</IonText>
                                <IonText className={styles.followers}>Followers: N/A</IonText>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imageContainer}>
                        <IonImg src={mealkit.image} alt={mealkit.name} />
                    </div>
                    <div className={styles.statsContainer}>
                        <div className={styles.likeChatShare}>
                            <div className={styles.stat}>
                                <IonIcon icon={heartOutline} className={styles.statIcon}/>
                                <IonText className={styles.statText}>N/A</IonText>
                            </div>
                            <div className={styles.stat}>
                                <IonIcon icon={chatbubbleOutline} className={styles.statIcon}/>
                                <IonText>N/A</IonText>
                            </div>
                            <div className={styles.stat}>
                                <IonIcon icon={shareOutline} className={styles.statIcon}/>
                            </div>
                        </div>
                        <div className={styles.stat}>
                            <IonIcon icon={bookmarkOutline} className={styles.statIcon}/>
                        </div>
                    </div>
                    <div className={styles.titleContainer}>
                        <h1>{mealkit.name}</h1>
                    </div>
                    <div className={styles.tags}>
                        {mealkit.dietary_details.map((detail, index) => (
                            <IonChip key={index} className={styles.customChip}>{detail}</IonChip>
                        ))}
                    </div>
                    <div className={styles.descriptionContainer}>
                        <IonText>{mealkit.description}</IonText>
                    </div>
                    <div className={styles.sectionTitle}>
                        <h2>Recipes</h2>
                    </div>
                    {mealkit.recipes.map((recipe) => (
                        <LongRecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            name={recipe.name}
                            image={recipe.image}
                            dietaryDetails={recipe.dietary_details}
                            price={recipe.total_price}
                        />
                    ))}
                    <div className={styles.sectionTitle}>
                        <h2>Comments</h2>
                    </div>
                    <IonText>No comments available.</IonText>
                </div>
                <div className={styles.fixedButtonContainer}>
                    <IonButton expand="block" className={styles.addMealkitButton}>
                        Add Mealkit to cart (${mealkit.total_price.toFixed(2)})
                    </IonButton>
                    <IonButton className={styles.editButton}>
                        <IonIcon icon={pencil} />
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default MealkitDetails;