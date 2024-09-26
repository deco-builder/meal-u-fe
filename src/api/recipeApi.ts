interface Ingredient {
  ingredient: {
    name: string;
    image: string | null;
    unit_id: number;
    unit_size: string;
    price_per_unit: string;
  };
  preparation_type: {
    id: number;
    name: string;
    additional_price: string;
  } | null;
  price: number;
}

export interface RecipeData {
  id: number;
  creator: {
    name: string;
    profile_picture: string;
  };
  name: string;
  description: string;
  serving_size: number;
  meal_type: string;
  cooking_time: number;
  instructions: string[];
  created_at: string;
  updated_at: string;
  is_customized: boolean;
  image: string;
  dietary_details: string[];
  ingredients: Ingredient[];
  total_price: number;
}

export const fetchRecipeDetails = async (recipeId: number, token: string): Promise<RecipeData> => {
    if (!token) {
        throw new Error('No authentication token provided');
    }

    const response = await fetch(`http://meal-u-api.nafisazizi.com:8001/api/v1/community/recipe/${recipeId}/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'Failed to fetch recipe details');
    }

    return data.data;
};