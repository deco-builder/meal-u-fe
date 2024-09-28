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
} from '@ionic/react';
import { pencil } from 'ionicons/icons';
import styles from './ProductDetails.module.css';
import { fetchProductDetails, ProductData } from '../../api/productApi';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useParams, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();

    const { getToken } = useAuth();
    const token = getToken() || "";

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
    }, [id, token]);

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

    const handleRecipeClick = (recipeId: number) => {
        history.push(`/recipe-details/${recipeId}`);
    };

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
                            <IonText>${product.price_per_unit}/{product.unit_id}</IonText>
                        </div>
                    </div>
                    <div className={styles.tags}>
                        {product.dietary_details.map((detail: string, index: number) => (
                            <IonChip key={index} className={styles.customChip} color="success">{detail}</IonChip>
                        ))}
                    </div>
                    
                    <div className={styles.descriptionContainer}>
                        <IonText>{product.description}</IonText>
                    </div>

                    {/* Recipes featuring this product */}
                    <div className={styles.sectionTitle}>
                        <h2>Recipes featuring this product</h2>
                    </div>
                    <div className={styles.recipeCardContainer}>
                        {product.recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                id={recipe.id}
                                imageSrc={recipe.image}
                                title={recipe.name}
                                onClick={() => handleRecipeClick(recipe.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.fixedButtonContainer}>
                    <IonButton expand="block" className={styles.addRecipeButton}>
                        Add to cart
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