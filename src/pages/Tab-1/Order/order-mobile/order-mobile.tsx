import React, { useState, useCallback } from "react";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonButton,
} from "@ionic/react";
import LocationIcon from "../../../../../public/icon/location-icon";
import SearchIcon from "../../../../../public/icon/search-icon";
import FilterIcon from "../../../../../public/icon/filter";
import FilterOverlay from "../../../../components/FilterOverlay";
import "./order-mobile.css";
import {
  heart,
  searchOutline,
  addCircleOutline,
  removeCircleOutline,
  remove,
  optionsOutline,
} from "ionicons/icons";
import IconInput from "../../../../components/icon-input";
import { useMealkitList, MealkitData } from "../../../../api/mealkitApi";
import { RecipeData, useRecipesList } from "../../../../api/recipeApi";
import { ProductData, useProductList } from "../../../../api/productApi";

function OrderMobile() {
  const [count, setCount] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isInputFilled, setInputFilled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");
  const { data: mealkits = [], isFetching: isMealkitsFetching } =
    useMealkitList({
      search: searchTrigger,
    });
  const { data: recipes = [], isFetching: isRecipesFetching } = useRecipesList({
    search: searchTrigger,
  });
  const { data: product = [], isFetching: isProductFetching } = useProductList({
    search: searchTrigger,
  });

  const handleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    setInputFilled(true);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchTrigger(searchValue);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSearchValue(categoryName);
    setSearchTrigger(categoryName);
    setInputFilled(true);
  };

  const handleSearchIconClick = useCallback(() => {
    setSearchTrigger(searchValue);
  }, [searchValue]);

  const categories = [
    { id: 1, name: "Chicken", image: "/img/food-image.png" },
    { id: 2, name: "Beef", image: "/img/food-image.png" },
    { id: 3, name: "Fish", image: "/img/food-image.png" },
    { id: 4, name: "Vegetarian", image: "/img/food-image.png" },
  ];
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-hide-sm-up">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1"></IonBackButton>
          </IonButtons>
          <IonTitle>Order</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
          <p style={{ marginBottom: "0px" }}>Delivery Location</p>
        </div>
        <div className="header-location">
          <LocationIcon />
          <p>University of Queensland</p>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <IconInput
            onInputHandleChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            rightIcon={<SearchIcon />}
            onRightIconClick={handleSearchIconClick}
            placeholder="Search"
            width="300px"
            value={searchValue}
          />
          <IonButton size="small" onClick={handleFilter}>
            <FilterIcon />
          </IonButton>
        </div>
        {isFilterVisible ? (
          <div className="filter">
            <FilterOverlay />
          </div>
        ) : (
          <>
            {!isInputFilled ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3>Categories</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(100px, 1fr))",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  {categories.map((category) => (
                    <IonCard
                      key={category.id}
                      style={{
                        width: "100%",
                        margin: "0",
                      }}
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                          paddingTop: "5px",
                          height: "80px",
                        }}
                      >
                        <img
                          alt={`${category.name} category`}
                          src={category.image}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <IonCardHeader>
                        <p style={{ margin: "0px", textAlign: "center" }}>
                          {category.name}
                        </p>
                      </IonCardHeader>
                    </IonCard>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3>Mealkits</h3>
                  {isMealkitsFetching ? (
                    <p>Loading mealkits...</p>
                  ) : mealkits.length > 0 ? (
                    <div style={{ overflowX: "auto", width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          minWidth: "min-content",
                        }}
                      >
                        {mealkits.map((mealkit: MealkitData) => (
                          <IonCard
                            key={mealkit.id}
                            style={{
                              minWidth: "120px",
                              width: "125px",
                              flex: "0 0 auto",
                              margin: "10px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                                paddingTop: "5px",
                              }}
                            >
                              <img
                                alt={mealkit.name}
                                src={mealkit.image}
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  objectFit: "cover",
                                  maxWidth: "120px",
                                  maxHeight: "120px",
                                  borderRadius: "15px",
                                }}
                              />
                            </div>
                            <IonCardHeader>
                              <div>
                                <p style={{ margin: "0px" }}>{mealkit.name}</p>
                                <p style={{ margin: "0px" }}>
                                  ${mealkit.price.toFixed(2)}
                                </p>
                              </div>
                            </IonCardHeader>
                          </IonCard>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p>No mealkits found.</p>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3>Recipes</h3>
                  {isRecipesFetching ? (
                    <p>Loading recipes...</p>
                  ) : recipes.length > 0 ? (
                    <div style={{ overflowX: "auto", width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          minWidth: "min-content",
                        }}
                      >
                        {recipes.map((recipe: RecipeData) => (
                          <IonCard
                            key={recipe.id}
                            style={{
                              minWidth: "120px",
                              width: "125px",
                              flex: "0 0 auto",
                              margin: "10px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                                paddingTop: "5px",
                              }}
                            >
                              <img
                                alt={recipe.name}
                                src={recipe.image}
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  objectFit: "cover",
                                  maxWidth: "120px",
                                  maxHeight: "120px",
                                  borderRadius: "15px",
                                }}
                              />
                            </div>
                            <IonCardHeader>
                              <div>
                                <p style={{ margin: "0px" }}>{recipe.name}</p>
                              </div>
                            </IonCardHeader>
                          </IonCard>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p>No recipes found.</p>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3>Groceries</h3>
                  {isProductFetching ? (
                    <p>Loading groceries...</p>
                  ) : product.length > 0 ? (
                    product.map((product: ProductData) => (
                      <div
                        key={product.id}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#ffffff",
                          borderRadius: 15,
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          padding: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <img
                          alt={product.name}
                          src={product.image || "/img/no-photo.png"}
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            maxWidth: "50px",
                            maxHeight: "50px",
                            borderRadius: "10px"
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            height: "100%",
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              marginBottom: "4px",
                              fontSize: "12px",
                              fontWeight: "normal",
                            }}
                          >
                            {product.name}
                          </p>
                          <h3
                            style={{
                              margin: 0,
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            ${product.price_per_unit}
                          </h3>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <IonIcon
                            icon={removeCircleOutline}
                            onClick={() => decrement()}
                            style={{ fontSize: "24px", cursor: "pointer" }}
                          />
                          <div
                            style={{
                              width: "30px",
                              textAlign: "center",
                              margin: "0 5px",
                            }}
                          >
                            {count}{" "}
                          </div>
                          <IonIcon
                            icon={addCircleOutline}
                            onClick={() => increment()}
                            style={{ fontSize: "24px", cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No Groceries found.</p>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default OrderMobile;
