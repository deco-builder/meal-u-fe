import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useAuth } from '../contexts/authContext';

// Interfaces for the API response structure

interface Creator {
  name: string;
  profile_picture: string;
}

interface Ingredient {
  id: number;
  name: string;
  image: string | null;
  unit_id: number;
  unit_size: string;
  price_per_unit: string;
}

interface PreparationType {
  id: number;
  name: string;
  additional_price: string;
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  preparation_type: PreparationType | null;
  price: number;
}

interface CartIngredient {
  id: number;
  recipe_ingredient: RecipeIngredient;
  quantity: number;
}

export interface Product {
  id: number;
  category_id: string;
  unit_id: string;
  dietary_details: string[];
  name: string;
  unit_size: string;
  price_per_unit: string;
  measurement_size: string;
  price_per_measurement: string;
  description: string;
  stock: number;
  image: string | null;
}

export interface CartProduct {
  id: number;
  product: Product;
  quantity: number;
}

interface NutritionDetails {
  energy_per_serving: string;
  protein_per_serving: string;
  fat_total_per_serving: string;
  carbohydrate_per_serving: string;
}

export interface Recipe {
  id: number;
  creator: Creator;
  name: string;
  serving_size: number;
  meal_type: string;
  cooking_time: number;
  created_at: string;
  image: string;
  dietary_details: string[];
  total_price: number;
  description?: string;
  instructions?: string[];
  ingredients?: RecipeIngredient[];
  nutrition_details?: NutritionDetails;
}

export interface CartRecipe {
  id: number;
  recipe: Recipe;
  quantity: number;
}

interface Mealkit {
  name: string;
  creator: Creator;
  image: string;
  created_at: string;
  description: string;
  dietary_details: string[];
  total_price: number;
  recipes: Recipe[];
}

interface CartMealkit {
  id: number;
  mealkit: Mealkit;
  quantity: number;
  recipes: Recipe[];
}

export interface CartData {
  user: number;
  updated_at: string;
  cart_ingredients: CartIngredient[];
  cart_products: CartProduct[];
  cart_recipes: CartRecipe[];
  cart_mealkits: CartMealkit[];
}

interface CartResponse {
  success: boolean;
  message: string;
  data: CartData;
}

export const useCart = (): UseQueryResult<CartData, Error> => {
  const { getToken } = useAuth();
  const token = getToken() || '';

  const fetchCart = async (): Promise<CartData> => {
    const response = await fetch('http://meal-u-api.nafisazizi.com:8001/api/v1/cart/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }

    const data: CartResponse = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch cart');
    }

    return data.data;
  };

  return useQuery<CartData, Error>({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled: !!token,
  });
};

// Update cart
interface UpdateCartItemPayload {
  item_type: 'recipe' | 'product' | 'mealkit';
  item_id: number;
  quantity: number;
}

interface DeleteCartItemPayload {
  item_type: 'recipe' | 'product' | 'mealkit';
  item_id: number;
}

export const useUpdateCartItem = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<CartData, Error, UpdateCartItemPayload>({
    mutationFn: async (payload) => {
      const token = getToken() || '';
      const response = await fetch('http://meal-u-api.nafisazizi.com:8001/api/v1/cart/', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }

      const data: CartResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to update cart item');
      }

      return data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
};

export const useDeleteCartItem = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<CartData, Error, DeleteCartItemPayload>({
    mutationFn: async (payload) => {
      const token = getToken() || '';
      const response = await fetch('http://meal-u-api.nafisazizi.com:8001/api/v1/cart/', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }

      const data: CartResponse = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to delete cart item');
      }

      return data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
};