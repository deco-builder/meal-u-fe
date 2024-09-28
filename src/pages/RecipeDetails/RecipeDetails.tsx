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
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonSkeletonText,
} from '@ionic/react';
import { heart, share, bookmark, time, restaurant, flame, fastFood, pencil } from 'ionicons/icons';
import LongIngredientCard from '../../components/LongIngredientCard/LongIngredientCard';
import styles from './RecipeDetails.module.css';
import { fetchRecipeDetails, RecipeData } from '../../api/recipeApi';
import { useAuth } from '../../contexts/authContext';

const RecipeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<RecipeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { getToken } = useAuth();
    const token = getToken();

    useEffect(() => {
        const loadRecipe = async () => {
            if (!token) {
                setError('No authentication token available');
                setLoading(false);
                return;
            }

            try {
                const data = await fetchRecipeDetails(parseInt(id), token);
                setRecipe(data);
            } catch (err) {
                setError('Failed to load recipe details');
            } finally {
                setLoading(false);
            }
        };

        loadRecipe();
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

    if (error || !recipe) {
        return (
            <IonPage>
                <IonContent>
                    <IonText color="danger">{error || 'Recipe not found'}</IonText>
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/recipes" />
                    </IonButtons>
                    <IonTitle>{recipe.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={styles.contentContainer}>
                    <div className={styles.authorContainer}>
                        <div className={styles.avatarContainer}>
                            <IonAvatar>
                                <img src={recipe.creator.profile_picture || '/default-avatar.png'} alt={recipe.creator.name} />
                            </IonAvatar>
                            <div>
                                <IonText className={styles.authorName}>{recipe.creator.name}</IonText>
                                <IonText className={styles.followers}>Followers: N/A</IonText>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imageContainer}>
                        <IonImg src={recipe.image || '/food-placeholder.png'} alt={recipe.name} />
                    </div>
                    <div className={styles.statsContainer}>
                        <div className={styles.likeChatShare}>
                            <div className={styles.stat}>
                                <IonIcon icon={heart} className={styles.statIcon}/>
                                <IonText className={styles.statText}>N/A</IonText>
                            </div>
                            <div className={styles.stat}>
                                <IonIcon icon={share} className={styles.statIcon}/>
                                <IonText>N/A</IonText>
                            </div>
                        </div>
                        <div className={styles.stat}>
                            <IonIcon icon={bookmark} className={styles.statIcon}/>
                        </div>
                    </div>
                    <div className={styles.titleContainer}>
                        <h1>{recipe.name}</h1>
                        <div className={styles.timeContainer}>
                            <IonIcon icon={time}/>
                            <div className={styles.timeText}>
                                <IonText>{recipe.cooking_time} mins</IonText>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tags}>
                        {recipe.dietary_details.map((detail, index) => (
                            <IonChip key={index} className={styles.customChip} color="success">{detail}</IonChip>
                        ))}
                    </div>
                    <div className={styles.nutritionInfo}>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={fastFood} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>{recipe.nutrition_details.carbohydrate_per_serving}g carbs</IonText>
                        </div>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={restaurant} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>{recipe.nutrition_details.protein_per_serving}g proteins</IonText>
                        </div>
                    </div>
                    <div className={styles.nutritionInfo}>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={flame} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>{recipe.nutrition_details.energy_per_serving} Kcal</IonText>
                        </div>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={fastFood} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>{recipe.nutrition_details.fat_total_per_serving}g fats</IonText>
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.description}>
                            <IonText>{recipe.description}</IonText>
                        </div>
                    </div>
                    <div className={styles.sectionTitle}>
                        <h2>Steps</h2>
                    </div>
                    <IonList>
                        {recipe.instructions.map((step, index) => (
                            <IonItem key={index}>
                                <IonLabel className={styles.step}>{index + 1}. {step}</IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                    <div className={styles.sectionTitle}>
                        <h2>Ingredients</h2>
                    </div>
                    {recipe.ingredients.map((ingredient, index) => (
                        <LongIngredientCard
                            key={index}
                            id={ingredient.ingredient.id}
                            name={ingredient.ingredient.name}
                            image={ingredient.ingredient.image || '/food-placeholder.png'}
                            quantity={`${ingredient.ingredient.unit_size} ${ingredient.ingredient.unit_id === 2 ? 'g' : 'ml'}`}
                            price={`$${ingredient.price.toFixed(2)}`}
                        />
                    ))}
                    <div className={styles.sectionTitle}>
                        <h2>Comments</h2>
                    </div>
                    <IonText>No comments yet. Be the first to comment!</IonText>
                </div>

                <div className={styles.fixedButtonContainer}>
                    <IonButton expand="block" className={styles.addRecipeButton}>
                        Add ingredients to cart (${recipe.total_price.toFixed(2)})
                    </IonButton>
                    <IonButton className={styles.editButton}>
                        <IonIcon icon={pencil} />
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default RecipeDetails;