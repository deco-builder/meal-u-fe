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
import { fetchRecipeDetails } from '../../api/recipeApi';
import { RecipeData } from '../../api/recipeApi';
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
                    <IonTitle>{recipe.name || "Delicious Recipe"}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={styles.contentContainer}>
                    <div className={styles.authorContainer}>
                        <div className={styles.avatarContainer}>
                            <IonAvatar>
                                <img src={recipe.creator?.profile_picture || '/default-avatar.png'} alt={recipe.creator?.name || 'Author'} />
                            </IonAvatar>
                            <div>
                                <IonText className={styles.authorName}>{recipe.creator?.name || "Chef John Doe"}</IonText>
                                <IonText className={styles.followers}>18K Followers</IonText>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imageContainer}>
                        <IonImg src={recipe.image || '/food-placeholder.png'} alt={recipe.name || 'Recipe Image'} />
                    </div>
                    <div className={styles.statsContainer}>
                        <div className={styles.likeChatShare}>
                            <div className={styles.stat}>
                                <IonIcon icon={heart} className={styles.statIcon}/>
                                <IonText className={styles.statText}>100</IonText>
                            </div>
                            <div className={styles.stat}>
                                <IonIcon icon={share} className={styles.statIcon}/>
                                <IonText>25</IonText>
                            </div>
                        </div>
                        <div className={styles.stat}>
                            <IonIcon icon={bookmark} className={styles.statIcon}/>
                        </div>
                    </div>
                    <div className={styles.titleContainer}>
                        <h1>{recipe.name || "Amazing Recipe"}</h1>
                        <div className={styles.timeContainer}>
                            <IonIcon icon={time}/>
                            <div className={styles.timeText}>
                                <IonText>30 mins</IonText>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tags}>
                        {(recipe.dietary_details || ['Vegetarian']).map((detail, index) => (
                            <IonChip key={index} className={styles.customChip} color="success">{detail}</IonChip>
                        ))}
                    </div>
                    <div className={styles.nutritionInfo}>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={fastFood} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>65g carbs</IonText>
                        </div>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={restaurant} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>20g proteins</IonText>
                        </div>
                    </div>
                    <div className={styles.nutritionInfo}>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={flame} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>500 Kcal</IonText>
                        </div>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={fastFood} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>15g fats</IonText>
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.description}>
                            <IonText>{recipe.description || "This recipe is quick, delicious, and perfect for a weeknight dinner!"}</IonText>
                        </div>
                    </div>
                    <div className={styles.sectionTitle}>
                        <h2>Steps</h2>
                    </div>
                    <IonList>
                        {recipe.instructions?.length ? recipe.instructions.map((step, index) => (
                            <IonItem key={index}>
                                <IonLabel className={styles.step}>{index + 1}. {step}</IonLabel>
                            </IonItem>
                        )) : (
                            <IonItem>
                                <IonLabel className={styles.step}>1. Heat the pan with oil, and cook the pasta.</IonLabel>
                            </IonItem>
                        )}
                    </IonList>
                    <div className={styles.sectionTitle}>
                        <h2>Ingredients</h2>
                    </div>
                    {recipe.ingredients?.length ? recipe.ingredients.map((ingredient, index) => (
                        <LongIngredientCard
                            key={index}
                            name={ingredient.ingredient.name || "Ingredient"}
                            image={ingredient.ingredient.image || '/food-placeholder.png'}
                            quantity={`${ingredient.ingredient.unit_size || '100'} ${ingredient.ingredient.unit_id === 2 ? 'g' : 'ml'}`}
                            price={`$${ingredient.price?.toFixed(2) || '0.00'}`}
                        />
                    )) : (
                        <LongIngredientCard
                            name="Sample Ingredient"
                            image="/food-placeholder.png"
                            quantity="100g"
                            price="$1.00"
                        />
                    )}
                    <div className={styles.sectionTitle}>
                        <h2>Comments</h2>
                    </div>
                    {/* Hardcoded comment section */}
                    <IonText>No comments yet. Be the first to comment!</IonText>
                </div>

                <div className={styles.fixedButtonContainer}>
                    <IonButton expand="block" className={styles.addRecipeButton}>
                        Add ingredients to cart (${recipe.total_price?.toFixed(2) || '10.00'})
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
