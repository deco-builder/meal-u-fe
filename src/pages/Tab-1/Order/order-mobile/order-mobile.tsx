import React, { useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButton,
  IonInput,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import LocationIcon from "../../../../../public/icon/location-icon";
import SearchIcon from "../../../../../public/icon/search-icon";
import "./order-mobile.css";
import {
  heart,
  searchOutline,
  addCircleOutline,
  removeCircleOutline,
  remove,
  optionsOutline,
} from "ionicons/icons";

function OrderMobile() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };
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
          <p>Delivery Location</p>
        </div>
        <div className="header-location">
          <LocationIcon />
          <p>University of Queensland</p>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <input
              type="text"
              placeholder="Search"
              style={{
                width: "100%",
                padding: "10px 10px 10px 40px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none",
                backgroundColor: "#fff",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <SearchIcon />
            </div>
          </div>
          <IonIcon
              icon={optionsOutline}
              onClick={increment}
              style={{ fontSize: "24px", cursor: "pointer", alignSelf: "center" }}
            />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Mealkits</h3>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                minWidth: "min-content",
              }}
            >
              {[1, 2, 3, 4].map((index) => (
                <IonCard
                  key={index}
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
                      alt="Silhouette of mountains"
                      src="/img/food-image.png"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        maxWidth: "120px",
                      }}
                    />
                  </div>
                  <IonCardHeader>
                    <IonCardSubtitle>
                      Healthy Taco Salad with fresh vegetable
                    </IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Recipes</h3>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                minWidth: "min-content",
              }}
            >
              {[1, 2, 3, 4].map((index) => (
                <IonCard
                  key={index}
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
                      alt="Silhouette of mountains"
                      src="/img/food-image.png"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        maxWidth: "120px",
                      }}
                    />
                  </div>
                  <IonCardHeader>
                    <IonCardSubtitle>
                      Healthy Taco Salad with fresh vegetable
                    </IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>Groceries</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 15,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "10px",
            }}
          >
            <img
              alt="Silhouette of mountains"
              src="/img/avocado.png"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                maxWidth: "50px",
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
              <h5
                style={{
                  margin: 0,
                  marginBottom: "4px",
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
              >
                Tortilla Chips
              </h5>
              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                $13
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
                onClick={decrement}
                style={{ fontSize: "24px", cursor: "pointer" }}
              />
              <div
                style={{
                  width: "30px", // Fixed width
                  textAlign: "center", // Center the text
                  margin: "0 5px", // Adjust spacing
                }}
              >
                {count}
              </div>
              <IonIcon
                icon={addCircleOutline}
                onClick={increment}
                style={{ fontSize: "24px", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default OrderMobile;
