import { useState } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import FilterIcon from "../../../../public/icon/filter";
import FilterOverlay from "../../../components/FilterOverlay";
import { useMealkitList, MealkitData } from "../../../api/mealkitApi";
import { RecipeData, useCommunityRecipesList } from "../../../api/recipeApi";
import { useLocationList } from "../../../api/locationApi";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CommunityItemCard from "../../../components/HomeItemCard";
import CommunityCard from "../../../components/CommunityCard";

function CommunityMobile() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const { data: trendingRecipes = [], isFetching: isRecipesFetching } =
    useCommunityRecipesList();

  const handleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const [selectedFilter, setSelectedFilter] = useState("All");
  const buttons = ["All", "Recipe", "Mealkits", "Creators"];

  const handleButtonClick = (button: any) => {
    setSelectedFilter(button);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-hide-sm-up">
          <IonTitle>Community</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding font-sans">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row space-x-2">
            {buttons.map((button) => (
              <button
                key={button}
                onClick={() => handleButtonClick(button)}
                className={`px-4 py-2 rounded-full text-xs transition-colors ${
                  selectedFilter === button
                    ? "bg-[#7862FC] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {button}
              </button>
            ))}
          </div>

          <IonButton size="small" onClick={handleFilter}>
            <FilterIcon />
          </IonButton>
        </div>

        {isRecipesFetching ? (
          <p>Loading recipes...</p>
        ) : (
          trendingRecipes.map((recipe) => (
            <CommunityCard key={recipe.id} recipe={recipe} />
          ))
        )}
        <div className="mb-20"></div>

        {isFilterVisible && (
          <div className="filter">
            <FilterOverlay />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default CommunityMobile;
