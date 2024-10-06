import { Dispatch, SetStateAction, useEffect } from "react";
import { useIonRouter } from "@ionic/react";
import {  RecipeAction } from './index';
import { CreateRecipePayload } from "../../../../api/recipeApi";

interface InstructionsFormProps {
  state: CreateRecipePayload;
  dispatch: Dispatch<RecipeAction>;
}

const InstructionsForm: React.FC<InstructionsFormProps> = ({ state, dispatch }) => {
  const router = useIonRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Dispatch the change to the shared state
    dispatch({ type: 'SET_FIELD', field: 'instructions', value: [...state.recipe.instructions, e.target.value] });
  };

  // Check if instructions are complete
  const isFormComplete = state.recipe.instructions.length > 0; // You may want to define what 'complete' means based on your criteria.

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col space-y-4 justify-between items-center mb-4">
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructions">
            Cooking Instructions
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="instructions"
            type="text"
            placeholder="Add Instructions"
            onChange={handleChange} // Handle input change
          />
        </div>
      </div>
    </div>
  );
}

export default InstructionsForm;
