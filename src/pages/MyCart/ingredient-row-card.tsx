import { IonCol } from "@ionic/react";
import Increment from "../../../public/icon/increment";
import Decrement from "../../../public/icon/decrement";
import { useState } from "react";

// Card for 

const IngredientRowCard = ({title, price, quantity} : {title: string, price: string, quantity: number}) => {
    const [isDetailAvailable, setIsDetailAvailable] = useState(false);
    const [newQuantity, setNewQuantity] = useState((quantity ? quantity : 0));
    
    const handleIncrement = () => {
        setNewQuantity((qty) => qty + 1);
    }

    const handleDecrement = () => {
        setNewQuantity((qty) => qty - 1);
    }
    return (
        <div className="row-card">
            <div className="row">
                <IonCol size="3" className="card-image-default"></IonCol>
                <IonCol size="7"className="ing-card-content">
                    <div className="card-title">{title}</div>
                    {isDetailAvailable ? (
                        <div className="dietary-details">
                            <div className="node">Gluten Free</div>
                            <div className="node">Halal</div>
                            <div className="node">Vegan</div>
                        </div>
                    ) : null}
                    <div className="price">{price}</div>
                </IonCol>
                <div className="col">
                    <div className="ing-row">
                        <Decrement onClick={handleDecrement}/>
                        {newQuantity}
                        <Increment onClick={handleIncrement}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IngredientRowCard;