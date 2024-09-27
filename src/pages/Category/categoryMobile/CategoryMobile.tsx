// CategoryMobile.tsx
import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { CategoryData, useCategoriesList } from "../../../api/categoryApi";
import LocationIcon from "../../../../public/icon/location-icon";

const CategoryMobile: React.FC = () => {
  const history = useHistory();
  const { data: categories = [], isFetching: isCategoriesFetching } =
    useCategoriesList();

  const handleCategoryClick = (categoryName: string) => {
    history.push(`/order/${categoryName}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p style={{ fontSize: "16px", fontWeight: "600" }}>
            Please select category
          </p>
        </div>

        {isCategoriesFetching ? (
          <p>Loading categories...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: "10px",
              width: "100%",
            }}
          >
            {categories.map((category: CategoryData) => (
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
                    padding: "5px",
                    height: "80px",
                    borderRadius: "15px",
                  }}
                >
                  <img
                    alt={`${category.name} category`}
                    src={category.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <IonCardHeader style={{padding: "5px"}}>
                  <div>
                    <p style={{ margin: "0px", textAlign: "center", fontWeight: "600", color: "#000000" }}>
                      {category.name}
                    </p>
                  </div>
                </IonCardHeader>
              </IonCard>
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CategoryMobile;
