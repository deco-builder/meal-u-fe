import React from "react";
import { CreateRecipePayload } from "../../../../api/recipeApi";
import ImageInput from "../../../../components/image-input";
import { RecipeAction } from './index';

interface GeneralFormProps {
  state: CreateRecipePayload;
  dispatch: React.Dispatch<RecipeAction>;
}

const GeneralForm: React.FC<GeneralFormProps> = ({ state, dispatch }) => {
  const handleChange = (field: keyof CreateRecipePayload['recipe']) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
  
    // Check if the field is supposed to be a number
    if (['cooking_time', 'serving_size', 'meal_type'].includes(field)) {
      value = parseInt(value, 10); // Convert the value to an integer
    }
  
    dispatch({ type: 'SET_FIELD', field, value });
  };
  

  // const handleImageChange = (file: File | null) => {
  //   dispatch({ type: 'SET_FIELD', field: 'image', value: file });
  // };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col space-y-4 justify-between items-center mb-4">
        <div className="flex flex-col space-y-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipe_photo">
            Recipe Photo
          </label>
          <ImageInput />
        </div>
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Recipe Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={state.recipe.name}
            onChange={handleChange('name')}
            placeholder="Name"
          />
        </div>
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            value={state.recipe.description} // Bind input to state
            onChange={handleChange('description')} // Use the handleChange function
            placeholder="Description"
          />
        </div>
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cooking_time">
            Cooking Time
          </label>
          <div>
            <div className="flex space-x-2">
              <input
                className="border border-gray-300 rounded-lg p-2 w-full"
                id="cooking_time"
                type="number"
                value={state.recipe.cooking_time} // Bind input to state
                onChange={handleChange('cooking_time')} // Use the handleChange function
                placeholder="Cooking Time"
              />
              <select className="border border-gray-300 rounded-lg p-2">
                <option>Minutes</option>
                <option>Hours</option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serving_size">
            Number of Servings
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="serving_size"
            type="number"
            value={state.recipe.serving_size} // Bind input to state
            onChange={handleChange('serving_size')} // Use the handleChange function
            placeholder="Number of Servings"
          />
        </div>
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meal_type">
            Meal Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="meal_type"
            type="number"
            value={state.recipe.meal_type} // Bind input to state
            onChange={handleChange('meal_type')} // Use the handleChange function
            placeholder="Example: 1"
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralForm;