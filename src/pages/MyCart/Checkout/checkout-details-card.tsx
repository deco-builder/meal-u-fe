import { IonButton } from '@ionic/react';
import styles from './checkout.module.css';
import { DeliveryLocation, useDeliveryLocations } from '../../../api/deliveryApi';
import { useState } from 'react';

interface CheckoutDetailsCardProps {
    data1: string;
    data2: string;
    button: string;
}

const CheckoutDetailsCard: React.FC<CheckoutDetailsCardProps> = ({data1, data2, button}) => {
  const { data: deliveryData }= useDeliveryLocations();
  const [deliveryLocation, setDeliveryLocation] = useState("Delivery location not set.")
  const [isPickerShown, setIsPickerShown] = useState(false);
  
  const handleSetLocation = () => {
    if (!isPickerShown) {
      setIsPickerShown(true);
    } else {
      setIsPickerShown(false);
    }
  }
    return (
      <>
      <div className={styles.card}>
          <div className={styles.card_2_contents}>
            <div className={styles.column}>
              {/* <div className={styles.card_title}>
                {deliveryLocation}
              </div> */}
              <div>
                {deliveryLocation}
              </div>
            </div>

            <div className={styles.column}>
              <p className={styles.clickable_word}>
                <IonButton onClick={handleSetLocation}>Set</IonButton>
              </p>
            </div>
          </div>
        </div>
      </>
    )
}

export default CheckoutDetailsCard;