import { useState } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButton,
} from "@ionic/react";
import FilterIcon from "../../../../public/icon/filter";
import FilterOverlay from "../../../components/FilterOverlay";
import { useCommunityRecipesList } from "../../../api/recipeApi";
import CommunityCard from "../../../components/CommunityCard/CommunityCard";
import SkeletonCommunityCard from "../../../components/CommunityCard/SkeletonCommunityCard";
import HomeImageCard from "../../../components/HomeImageCard";

function CommunityMobile() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const { data: trendingRecipes = [], isFetching: isRecipesFetching } =
    useCommunityRecipesList();

  const handleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const [selectedFilter, setSelectedFilter] = useState("All");
  const buttons = ["All", "Recipe", "Mealkits", "Creators"];

  const handleButtonClick = (button: string) => {
    setSelectedFilter(button);
  };

  const renderContent = () => {
    if (isRecipesFetching) {
      return (
        <>
          <SkeletonCommunityCard />
          <SkeletonCommunityCard />
          <SkeletonCommunityCard />
        </>
      );
    }

    if (selectedFilter === "Creators") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            gap: "5px",
          }}
        >
          <h3 style={{ fontSize: "14px", fontWeight: "500" }}>
            This week's spotlight
          </h3>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                minWidth: "min-content",
                gap: 10,
              }}
            >
              <HomeImageCard />
              <HomeImageCard />
              <HomeImageCard />
            </div>
            <h3 style={{ fontSize: "14px", fontWeight: "500", marginTop: "20px" }}>
            Popular Gluten Free Creators
          </h3>
          </div>
        </div>
      );
    }

    return trendingRecipes.map((recipe) => (
      <CommunityCard key={recipe.id} recipe={recipe} />
    ));
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

        {renderContent()}

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
