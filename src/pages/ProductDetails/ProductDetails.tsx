import React from 'react';
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
import {heart, share, bookmark, time, restaurant, flame, fastFood, pencil} from 'ionicons/icons';
import styles from './ProductDetails.module.css';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

const RecipeDetails: React.FC = () => {
    const featuredRecipes = [
        { imageSrc: '/food.png', title: 'Egg & Avo...' },
        { imageSrc: '/food.png', title: 'Bowl of r...' },
        { imageSrc: '/food.png', title: 'Chicken S...' },
    ];

    const peopleAlsoPurchase = [
        { imageSrc: '/food.png', title: 'Egg & Spi...' },
        { imageSrc: '/food.png', title: 'Green Sal...' },
        { imageSrc: '/food.png', title: 'Pasta Dis...' },
    ];


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/recipes" />
                    </IonButtons>
                    <IonTitle>Product Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={styles.contentContainer}>
                    <div className={styles.imageContainer}>
                        <IonImg src="/food.png" alt="Easy Fettuccine Carbonara"/>
                    </div>
                    <div className={styles.statsContainer}>
                        <div className={styles.likeChatShare}>
                            <div className={styles.stat}>
                                <IonIcon icon={heart} className={styles.statIcon}/>
                                <IonText className={styles.statText}>121</IonText>
                            </div>
                            <div className={styles.stat}>
                                <IonIcon icon={share} className={styles.statIcon}/>
                                <IonText>35</IonText>
                            </div>
                            <div className={styles.stat}>
                                <IonIcon icon={share} className={styles.statIcon}/>
                                <IonText>35</IonText>
                            </div>
                        </div>
                        <div className={styles.stat}>
                            <IonIcon icon={bookmark} className={styles.statIcon}/>
                        </div>
                    </div>
                    <div className={styles.titleContainer}>
                        <h1>Easy Fettuccine Carbonara</h1>
                        <div className={styles.timeContainer}>
                            <div className={styles.timeText}>
                                <IonText>$1.00/each</IonText>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tags}>
                        <IonChip className={styles.customChip} color="success">Gluten-Free</IonChip>
                    </div>
                    <div className={styles.nutritionInfo}>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={fastFood} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>65g carbs</IonText>
                        </div>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={restaurant} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>27g proteins</IonText>
                        </div>
                    </div>
                    <div className={styles.nutritionInfo}>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={flame} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>120 Kcal</IonText>
                        </div>
                        <div className={styles.nutritionItem}>
                            <IonIcon icon={fastFood} className={styles.nutritionIcon}/>
                            <IonText className={styles.nutritionText}>9g fats</IonText>
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.description}>
                            <IonText>
                                Need a quick gluten-free dinner? You're in the right place! This fettuccine carbonara
                                just
                                takes
                                15 minutes to make and it's so delish!
                            </IonText>
                        </div>
                    </div>
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

export default RecipeDetails;