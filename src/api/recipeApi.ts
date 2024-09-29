import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useAuth } from '../contexts/authContext';

interface Creator {
  name: string;
  profile_picture: string;
}

interface Ingredient {
  ingredient: {
    id: number;
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

interface NutritionDetails {
  energy_per_serving: string;
  protein_per_serving: string;
  fat_total_per_serving: string;
  carbohydrate_per_serving: string;
}

export interface RecipeData {
  id: number;
  creator: Creator;
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
  nutrition_details: NutritionDetails;
}

interface RecipeListParams {
  search: string;
}

export const useRecipesList = (params: RecipeListParams): UseQueryResult<RecipeData[], Error> => {
  const { getToken } = useAuth();
  const token = getToken() || '';

  const fetchRecipe = async (): Promise<RecipeData[]> => {
    const url = params.search && params.search !== "Show All"
      ? `http://meal-u-api.nafisazizi.com:8001/api/v1/community/recipes/?search=${encodeURIComponent(params.search)}`
      : 'http://meal-u-api.nafisazizi.com:8001/api/v1/community/recipes/';

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch mealkits');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch recipes');
    }

    return data.data;
  };

  return useQuery<RecipeData[], Error, RecipeData[], [string, RecipeListParams]>({
    queryKey: ['recipe.list', params],
    queryFn: fetchRecipe,
    initialData: [],
    enabled: !!token,
  });
};

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