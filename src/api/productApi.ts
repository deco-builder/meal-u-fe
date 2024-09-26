import { useAuth } from '../contexts/authContext';

interface ProductNutrition {
  servings_per_package: number;
  serving_size: string;
  energy_per_serving: string;
  protein_per_serving: string;
  fat_total_per_serving: string;
  saturated_fat_per_serving: string;
  carbohydrate_per_serving: string;
  sugars_per_serving: string;
  dietary_fibre_per_serving: string;
  sodium_per_serving: string;
  energy_per_100g: string;
  protein_per_100g: string;
  fat_total_per_100g: string;
  saturated_fat_per_100g: string;
  carbohydrate_per_100g: string;
  sugars_per_100g: string;
  dietary_fibre_per_100g: string;
  sodium_per_100g: string;
}

interface ProductData {
  id: number;
  name: string;
  unit_id: string;
  unit_size: string;
  price_per_unit: string;
  measurement_size: string;
  price_per_measurement: string;
  image: string | null;
  description: string;
  stock: number;
  dietary_details: string[];
  product_nutrition: ProductNutrition;
}

export const fetchProductDetails = async (productId: number, token: string): Promise<ProductData> => {
  if (!token) {
    throw new Error('No authentication token available');
  }

  const response = await fetch(`http://meal-u-api.nafisazizi.com:8001/api/v1/groceries/product/${productId}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch product details');
  }

  return data.data;
};
