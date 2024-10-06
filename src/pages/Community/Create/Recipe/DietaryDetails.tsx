import { Dispatch, SetStateAction, useEffect, useState, useCallback } from "react";
import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonChip, IonContent, IonHeader, IonLabel, IonPage, IonRange, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { RecipeAction } from './index';
import { useDietaryDetails } from '../../../../api/productApi';
import { ProductData, useProductList } from "../../../../api/productApi";
import { useParams } from "react-router-dom";
import {CreateRecipePayload, useCreateRecipe} from "../../../../api/recipeApi"

interface DietaryDetailsFormProps {
  state: CreateRecipePayload;
  dispatch: Dispatch<RecipeAction>;
}

const DietaryDetailsForm: React.FC<DietaryDetailsFormProps> = ({ state, dispatch }) => {
  const router = useIonRouter();
  const [dietary, setDietary] = useState<number[]>([]);
  const {data: dietaryDetails } = useDietaryDetails();
  const [searchValue, setSearchValue] = useState("");
  const { category } = useParams<{ category: string }>();
  const { data: product = [], isFetching: isProductFetching } = useProductList({
    search: category,
  });
  const { mutate: handleRecipeCreation } = useCreateRecipe();

  const handleDietaryToggle = (id: number) => {
    setDietary((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApplyFilter = async () => {
    // Dispatch the selected dietary details to the global state
    dispatch({ type: 'SET_FIELD', field: 'dietary_details', value: dietary });
    console.log(state);
  };

  const handleCreateRecipe = () => {
    const payload = state;
    handleRecipeCreation(payload);
  }

  const handleClearFilter = () => {
    setDietary([]);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col space-y-4 justify-between items-center mb-4">
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructions">
            Dietary Details
          </label>
          <div className="flex items-center justify-center flex-wrap gap-1.5 w-full">
              {dietaryDetails && dietaryDetails.map((item) => (
                <IonChip 
                  key={item.id} 
                  onClick={() => handleDietaryToggle(item.id)}
                  color={dietary.includes(item.id) ? 'primary' : 'medium'}
                >
                  <IonLabel>{item.name}</IonLabel>
                </IonChip>
              ))}
          </div>
          <div className="flex flex-row gap-2.5 mb-1.25">
            <IonButton expand="block" fill="clear" onClick={handleClearFilter}>Clear</IonButton>
            <div>
              <IonButton expand="block" onClick={handleApplyFilter}>Apply</IonButton>
            </div>
          </div>
        </div>
      </div>
      <IonButton expand="block" onClick={handleCreateRecipe}>CreateRecipe</IonButton>
    </div>

  );
}

export default DietaryDetailsForm;
