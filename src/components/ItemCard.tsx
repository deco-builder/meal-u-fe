import React from 'react';
import { IonCard, IonCardHeader } from '@ionic/react';

interface Creator {
  name: string;
  profile_picture: string;
}

interface ItemData {
  id: number;
  name: string;
  image: string;
  creator: Creator;
  dietary_details: string[];
  price?: number;
  total_price?: number;
  cooking_time?: number;
  meal_type?: string;
  serving_size?: number;
}

interface ItemCardProps {
  item: ItemData;
  onClick?: (id: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(item.id);
    }
  };

  return (
    <IonCard
      key={item.id}
      style={{
        width: "30vw",
        flex: "0 0 auto",
        margin: "10px",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          padding: "5px",
        }}
      >
        <img
          alt={item.name}
          src={item.image}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            maxWidth: "130px",
            maxHeight: "90px",
            borderRadius: "15px",
          }}
        />
      </div>
      <IonCardHeader style={{ padding: "5px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: "0px",
                fontWeight: "700",
                color: "#000000",
                fontSize: "10px",
              }}
            >
              {item.name.length > 25 ? `${item.name.slice(0, 25)}...` : item.name}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt={item.creator.name}
              src={item.creator.profile_picture}
              style={{
                width: "5px",
                height: "5px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
            <p style={{ margin: "0px", fontSize: "6px" }}>
            {item.creator.name.length > 15 ? `${item.creator.name.slice(0, 15)}...` : item.creator.name} -
            </p>
            <p style={{ margin: "0px", fontSize: "6px" }}>
              ${(item.price || item.total_price || 0).toFixed(2)}
            </p>
          </div>
          {item.cooking_time && (
            <p style={{ margin: "0px", fontSize: "6px", textAlign: "center" }}>
              {item.cooking_time} min | {item.meal_type} | {item.serving_size} serving
            </p>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center"
            }}
          >
            {item.dietary_details
              .slice(0, 2)
              .map((detail, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#F0F0F0",
                    borderRadius: "10px",
                    padding: "2px 6px",
                    fontSize: "8px",
                  }}
                >
                  {detail}
                </div>
              ))}
            {item.dietary_details.length > 2 && (
              <div
                style={{
                  backgroundColor: "#F0F0F0",
                  borderRadius: "10px",
                  padding: "2px 6px",
                  fontSize: "8px",
                }}
              >
                +{item.dietary_details.length - 2}
              </div>
            )}
          </div>
        </div>
      </IonCardHeader>
    </IonCard>
  );
};

export default ItemCard;