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
import { RecipeData, useRecipesList } from "../../../api/recipeApi";
import { useLocationList } from "../../../api/locationApi";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CommunityItemCard from "../../../components/HomeItemCard";
import HomeItemCard from "../../../components/HomeItemCard";

function HomeMobile() {
  const { category } = useParams<{ category: string }>();
  const router = useIonRouter();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState("");
  const { data: mealkits = [], isFetching: isMealkitsFetching } =
    useMealkitList({
      search: selectedCategory,
    });
  const { data: recipes = [], isFetching: isRecipesFetching } = useRecipesList({
    search: category,
  });

  const { data: location = [], isFetching: isLocationFetching } =
    useLocationList();

  if (!isLocationFetching && location && !currentLocation) {
    const firstLocation = location[0].name;
    setCurrentLocation(firstLocation);
  }

  const handleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleMealkitClick = (mealkitId: number) => {
    router.push(`/mealkit-details/${mealkitId}`);
  };

  // To do di filter based on selected
  const filterItems = (items: any[], searchTerm: string) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleRecipeClick = (recipeId: number) => {
    router.push(`/recipe-details/${recipeId}`);
  };

  const filteredMealkits = filterItems(mealkits, searchValue);
  const filteredRecipes = filterItems(recipes, searchValue);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const buttons = ["All", "Recipe", "Mealkits", "Creators"];

  const handleButtonClick = (button: any) => {
    setSelectedFilter(button);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-hide-sm-up">
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ backgroundColor: "#7862FC", width: "80%", justifyContent: "center", alignSelf: "center", justifySelf: "center" }}>
          <p>1 Update From Your Order</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
            Trending Recipes
          </h3>
          {isRecipesFetching ? (
            <p>Loading recipes...</p>
          ) : filteredRecipes.length > 0 ? (
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  minWidth: "min-content",
                }}
              >
                {filteredRecipes.map((recipe: RecipeData) => (
                  <HomeItemCard
                    key={recipe.id}
                    item={recipe}
                    onClick={handleRecipeClick}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>No recipes found.</p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "15px",
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: "600" }}>
            Trending Mealkits
          </p>
          {isMealkitsFetching ? (
            <p>Loading mealkits...</p>
          ) : filteredMealkits.length > 0 ? (
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  minWidth: "min-content",
                }}
              >
                {filteredMealkits.map((mealkit: MealkitData) => (
                  <HomeItemCard
                    key={mealkit.id}
                    item={mealkit}
                    onClick={handleMealkitClick}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>No mealkits found.</p>
          )}
        </div>

        {isFilterVisible && (
          <div className="filter">
            <FilterOverlay />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default HomeMobile;
