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
import LongIngredientCard from '../../components/LongIngredientCard/LongIngredientCard';
import styles from './ProductDetails.module.css';

const ProductDetails: React.FC = () => {
    const ingredients = [
        { name: 'Parmigiano Reggiano', image: '/food.png', quantity: '100g', price: '$1.40 per 250g' },
        { name: 'Eggs', image: '/food.png', quantity: '2 pieces', price: '$4.00 per pack' },
        { name: 'GF Fettuccine', image: '/food.png', quantity: '400g', price: '$5.00 per pack' },
        { name: 'Butter', image: '/food.png', quantity: '35g', price: '$3.00 per 500g' },
        { name: 'Black Pepper', image: '/food.png', quantity: '1/4 tsp', price: '$3.00 per 100g' },
        { name: 'Kosher Salt', image: '/food.png', quantity: '1 tbsp', price: '$1.00 per 500g' },
        { name: 'Garlic', image: '/food.png', quantity: '1 clove', price: '$2.00 per 250g' },
        { name: 'Parsley', image: '/food.png', quantity: '1 tbsp (chopped)', price: '$1.50 per 10g' },
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/recipes" />
                    </IonButtons>
                    <IonTitle>Recipe</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={styles.contentContainer}>
                    <div className={styles.authorContainer}>
                        <div className={styles.avatarContainer}>
                            <IonAvatar>
                                <img src="/food.png" alt="Jane Doe"/>
                            </IonAvatar>
                            <div>
                                <IonText className={styles.authorName}>Jane Doe</IonText>
                                <IonText className={styles.followers}>18K Followers</IonText>
                            </div>
                        </div>
                        <IonButton fill="outline" className={styles.followButton}>Follow</IonButton>
                    </div>
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
                            <IonIcon icon={time}/>
                            <div className={styles.timeText}>
                                <IonText>15 mins</IonText>
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
                        <h2>Steps</h2>
                    </div>
                    <IonList>
                        <IonItem>
                            <IonLabel className={styles.step}>
                                1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget
                                ultricies aliquam, nunc nunc ultricies nisi.
                            </IonLabel>
                        </IonItem>
                        {/* Add more steps here */}
                    </IonList>
                    <div className={styles.sectionTitle}>
                        <h2>Ingredients</h2>
                    </div>
                    {ingredients.map((ingredient, index) => (
                        <LongIngredientCard
                            key={index}
                            name={ingredient.name}
                            image={ingredient.image}
                            quantity={ingredient.quantity}
                            price={ingredient.price}
                        />
                    ))}
                    <div className={styles.sectionTitle}>
                        <h2>Comments</h2>
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