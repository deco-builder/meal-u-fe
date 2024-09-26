import React, { useState, useEffect } from 'react';
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
    IonRouterOutlet
} from '@ionic/react';
import { heart, share, bookmark, fastFood, flame, restaurant, pencil } from 'ionicons/icons';
import styles from './ProductDetails.module.css';
import { fetchProductDetails } from '../../api/productApi';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { getToken } = useAuth();
    const token = getToken() || "";

    const featuredRecipes = [
        { imageSrc: '/food.png', title: 'Egg & Avocado Toast' },
        { imageSrc: '/food.png', title: 'Bowl of Rice' },
        { imageSrc: '/food.png', title: 'Chicken Salad' },
    ];

    const peopleAlsoPurchase = [
        { imageSrc: '/food.png', title: 'Egg & Spinach Wrap' },
        { imageSrc: '/food.png', title: 'Green Salad' },
        { imageSrc: '/food.png', title: 'Pasta Dish' },
    ];

    useEffect(() => {
        const loadProductDetails = async () => {
            try {
                const data = await fetchProductDetails(parseInt(id), token);
                setProduct(data);
            } catch (err) {
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        loadProductDetails();
    }, []);

    if (loading) {
        return (
            <IonPage>
                <IonContent>
                    <IonText>Loading...</IonText>
                </IonContent>
            </IonPage>
        );
    }

    if (error || !product) {
        return (
            <IonPage>
                <IonContent>
                    <IonText color="danger">{error || 'Product not found'}</IonText>
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/products" />
                    </IonButtons>
                    <IonTitle>Product Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={styles.contentContainer}>
                    <div className={styles.imageContainer}>
                        <IonImg src={product.image || '/default-product-image.png'} alt={product.name} />
                    </div>
                    <div className={styles.titleContainer}>
                        <h1>{product.name}</h1>
                        <div className={styles.timeContainer}>
                            <IonText>{product.price_per_unit}/unit</IonText>
                        </div>
                    </div>
                    <div className={styles.tags}>
                        {product.dietary_details.map((detail: string, index: number) => (
                            <IonChip key={index} className={styles.customChip} color="success">{detail}</IonChip>
                        ))}
                    </div>
                    <div className={styles.nutritionInfo}>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={fastFood} className={styles.nutritionIcon} />
                            <IonText className={styles.nutritionText}>{product.product_nutrition.carbohydrate_per_100g}g carbs</IonText>
                        </div>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={restaurant} className={styles.nutritionIcon} />
                            <IonText className={styles.nutritionText}>{product.product_nutrition.protein_per_100g}g proteins</IonText>
                        </div>
                    </div>
                    <div className={styles.nutritionInfo}>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={flame} className={styles.nutritionIcon} />
                            <IonText className={styles.nutritionText}>{product.product_nutrition.energy_per_100g} Kcal</IonText>
                        </div>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={flame} className={styles.nutritionIcon} />
                            <IonText className={styles.nutritionText}>{product.product_nutrition.fat_total_per_100g} fats</IonText>
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <IonText>{product.description}</IonText>
                    </div>

                    {/* Recipes featuring this product */}
                    <div className={styles.sectionTitle}>
                        <h2>Recipes featuring this product</h2>
                    </div>
                    <div className={styles.recipeCardContainer}>
                        {featuredRecipes.map((recipe, index) => (
                            <RecipeCard
                                key={index}
                                imageSrc={recipe.imageSrc}
                                title={recipe.title}
                                onClick={() => console.log(`Clicked on ${recipe.title}`)}
                            />
                        ))}
                    </div>

                    {/* People also purchase */}
                    <div className={styles.sectionTitle}>
                        <h2>People also Purchase</h2>
                    </div>
                    <div className={styles.recipeCardContainer}>
                        {peopleAlsoPurchase.map((item, index) => (
                            <RecipeCard
                                key={index}
                                imageSrc={item.imageSrc}
                                title={item.title}
                                onClick={() => console.log(`Clicked on ${item.title}`)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.fixedButtonContainer}>
                    <IonButton expand="block" className={styles.addRecipeButton}>
                        Add ingredients to cart
                    </IonButton>
                    <IonButton className={styles.editButton}>
                        <IonIcon icon={pencil} />
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default ProductDetails;
