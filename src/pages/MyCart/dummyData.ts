// dummyData.ts
import { format, addDays, setHours, setMinutes, setSeconds } from 'date-fns';

export const mealKits = [
    {
        title: "7 Days Bulk Meal Kit",
        dietaryDetails: {
            "1": "High Protein",
            "2": "Halal",
        },
        price: 53,
        recipes: [
            {
                title: "Chicken Salad",
                dietaryDetails: { "1": "High Protein", "2": "Gluten Free" },
                price: 15,
                ingredients: [
                    {
                        title: "Chicken Breast",
                        price: 8,
                        quantity: 1,
                        unit: "kg",
                        preparation_type: "Grilled"
                    },
                    {
                        title: "Lettuce",
                        price: 3,
                        quantity: 1,
                        unit: "bunch",
                        preparation_type: null
                    },
                ],
                serving_size: 2,
                meal_type: "Lunch",
                cooking_time: 30, // in minutes
                instructions: [
                    "Grill the chicken breast until fully cooked.",
                    "Toss the lettuce and chicken with dressing."
                ],
                is_customized: false
            },
        ]
    },
    { 
        title: "Gluten Free Meal Kit",
        dietaryDetails: {
            "1": "Gluten Free",
            "2": "Vegan",
        },
        price: 65,
        ecipes: [
            {
                title: "Vegan Tacos",
                dietaryDetails: { "1": "Gluten Free", "2": "Vegan" },
                price: 13,
                ingredients: [
                    {
                        title: "Corn Tortillas",
                        price: 5,
                        quantity: 1,
                        unit: "pack",
                        preparation_type: "Warm"
                    },
                    {
                        title: "Black Beans",
                        price: 2,
                        quantity: 1,
                        unit: "can",
                        preparation_type: "Cooked"
                    },
                ],
                serving_size: 4,
                meal_type: "Dinner",
                cooking_time: 20,
                instructions: [
                    "Warm the tortillas on a pan.",
                    "Fill with cooked black beans and garnish with salsa."
                ],
                is_customized: false
            },
        ]
    }
];

export const recipes = [
    {
        title: "Fettuccine Carbonara",
        dietaryDetails: {
            "1": "Gluten Free",
        },
        price: 15,
        ingredients: [
            {
                title: "Gluten-Free Fettuccine",
                price: 6,
                quantity: 1,
                unit: "pack",
                preparation_type: null
            },
            {
                title: "Bacon",
                price: 4,
                quantity: 1,
                unit: "pack",
                preparation_type: "Chopped"
            },
        ],
        serving_size: 3,
        meal_type: "Dinner",
        cooking_time: 25,
        instructions: [
            "Cook the fettuccine as per the package instructions.",
            "Fry the bacon and mix with cream and egg yolks for sauce."
        ],
        is_customized: false
    },
    { 
        title: "Asian Fried Rice",
        dietaryDetails: {
            "1": "High Protein",
        },
        price: 13,
        ingredients: [
            {
                title: "Rice",
                price: 2,
                quantity: 1,
                unit: "kg",
                preparation_type: "Boiled"
            },
            {
                title: "Chicken Breast",
                price: 5,
                quantity: 1,
                unit: "kg",
                preparation_type: "Diced"
            },
        ],
        serving_size: 4,
        meal_type: "Lunch",
        cooking_time: 20,
        instructions: [
            "Boil the rice.",
            "Stir fry the chicken with vegetables, then mix with rice."
        ],
        is_customized: false
    },
    {
        title: "Beginner Homemade Pasta",
        dietaryDetails: {
            "1": "Vegan",
        },
        price: 11,
        ingredients: [
            {
                title: "Flour",
                price: 2,
                quantity: 1,
                unit: "kg",
                preparation_type: null
            },
            {
                title: "Water",
                price: 0,
                quantity: 0.5,
                unit: "liters",
                preparation_type: null
            },
        ],
        serving_size: 2,
        meal_type: "Dinner",
        cooking_time: 40,
        instructions: [
            "Mix flour and water to make pasta dough.",
            "Cut the dough into thin strips and boil."
        ],
        is_customized: false
    },
];

export const products = [
    {
        title: "Pasta",
        price: 5,
        quantity: 1
    },
    {
        title: "Baby Spinach",
        price: 3,
        quantity: 1
    },
];

export const deliveryDetails = {
    university_name: "University of Queensland",
    university_branch: "Saint Lucia Campus",
    delivery_time: format(setSeconds(setMinutes(setHours(addDays(new Date(), 1), 10), 0), 0), 'p'), // 10 AM tomorrow
    delivery_date: format(addDays(new Date(), 1), 'PPPP'), // tomorrow
    fee: 10,
};