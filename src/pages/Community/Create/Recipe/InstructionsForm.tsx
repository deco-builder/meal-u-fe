import { Dispatch, useEffect, useState } from "react";
import { RecipeAction } from './index';
import { CreateRecipePayload } from "../../../../api/recipeApi";
import { IonButton, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonText } from "@ionic/react";
import { trash } from 'ionicons/icons';

interface InstructionsFormProps {
  state: CreateRecipePayload;
  dispatch: Dispatch<RecipeAction>;
}

const InstructionsForm: React.FC<InstructionsFormProps> = ({ state, dispatch }) => {
  const [instructions, setInstructions] = useState<string[]>([""]); // Start with one empty instruction

  useEffect(() => {
    // Sync with global state to save changes even when navigating through pages
    setInstructions(state.recipe.instructions.length ? state.recipe.instructions : [""]);
  }, [state.recipe.instructions]);

  // Handle input change for a specific instruction
  // const handleChange = (index: number, value: string) => {
  //   const newInstructions = [...instructions];
  //   newInstructions[index] = value;
  //   setInstructions(newInstructions);
    
  //   // Update the state in the parent component
  //   dispatch({ type: 'SET_FIELD', field: 'instructions', value: newInstructions });
  // };

  // Handle input change for a specific instruction
  const handleChange = (index: number, value: any) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value || ""; // Extract the value from IonInput's event
    setInstructions(newInstructions);
    
    // Update the state in the parent component
    dispatch({ type: 'SET_FIELD', field: 'instructions', value: newInstructions });
  };


  // Add a new input field if all current fields are filled
  const addNewInstruction = () => {
    if (instructions.every(instruction => instruction.trim() !== "")) {
      setInstructions([...instructions, ""]);
    }
  };

  const handleDelete = (id: number) => {
    setInstructions(instructions.filter((array) => array !== instructions[id]));
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col space-y-4 justify-start items-start mb-4">
        <IonLabel className="block text-gray-700 text-sm font-bold mb-2">
          Recipe Instructions
        </IonLabel>
        {instructions.map((instruction, index) => (
          <div key={index} className="w-full">
            <IonItemSliding>
              <IonItem>
                <IonInput
                  id={`instruction-${index}`} 
                  type="text"
                  value={instruction}
                  placeholder="Add instructions for your recipe"
                  onIonInput={(e) => handleChange(index, e.target.value)}
                  label={`${index + 1}`}>
                </IonInput>
              </IonItem>
              <IonItemOptions slot="end">
                <IonItemOption color="danger" expandable={true} onClick={() => handleDelete(index)}>
                  <IonIcon slot="icon-only" icon={trash}></IonIcon>
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </div>
        ))}
        {/* Center the "Add Instruction" button */}
        <div className="w-full flex justify-center">
          <IonText><i>Swipe left on an instruction to delete</i></IonText>
        </div>
        <div className="w-full flex justify-center">
          <button
            className={`mt-4 px-4 py-2 rounded bg-blue-500 text-white ${!instructions.every(instruction => instruction.trim() !== "") ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!instructions.every(instruction => instruction.trim() !== "")}
            onClick={addNewInstruction}
          >
            Add Instruction
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructionsForm;
