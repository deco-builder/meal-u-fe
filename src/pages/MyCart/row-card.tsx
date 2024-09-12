import { IonCol, IonRow } from "@ionic/react";
import ArrowDownIcon from "../../../public/icon/arrow-down";

// Card for 

const RowCard = ({title, price} : {title: String, price: String}) => {

    return (
        <div className="row-card">
            <div className="row">
                <IonCol size="3" className="card-image-default"></IonCol>
                <IonCol size="7"className="row-card-content">
                    <div className="card-title">{title}</div>
                    <div className="dietary-details">
                        <div className="node">Gluten Free</div>
                        <div className="node">Halal</div>
                        <div className="node">Vegan</div>
                    </div>
                    <div className="price">{price}</div>
                </IonCol>
                <IonCol size="1" className="arrow">
                    <ArrowDownIcon />
                </IonCol>
            </div>
        </div>
    );
};

export default RowCard;