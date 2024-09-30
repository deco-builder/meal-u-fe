import { useDeliveryLocations, useDeliveryTimeSlots } from "../../../api/deliveryApi";
import { IonButton } from "@ionic/react";
import styles from './checkout.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

interface DeliveryLocationPickerProps {
  deliveryLocation: number;
  setDeliveryLocation: Dispatch<SetStateAction<number>>;
  deliveryTime: number;
  setDeliveryTime: Dispatch<SetStateAction<number>>;
  deliveryDate: Date;
  setDeliveryDate: Dispatch<SetStateAction<Date>>;
	setIsDeliveryDetailsSet: Dispatch<SetStateAction<boolean>>;
	setIsPickerShown: Dispatch<SetStateAction<boolean>>;
}

const DeliveryLocationPicker: React.FC<DeliveryLocationPickerProps> = 
({
  deliveryLocation,
  setDeliveryLocation,
  deliveryTime,
  setDeliveryTime,
  deliveryDate,
  setDeliveryDate,
	setIsDeliveryDetailsSet,
	setIsPickerShown,
}) => {
	const {data: deliveryTimeSlot} = useDeliveryTimeSlots();
	const { data: deliveryData }= useDeliveryLocations();
  const [isFieldFilled, setIsFieldFilled] = useState(false);

  useEffect(() => {
      if (deliveryLocation !== -1 && deliveryTime !== -1) {
          setIsFieldFilled(true);
      } else {
          setIsFieldFilled(false);
      }
  }, [deliveryLocation, deliveryTime]);

  const handleSetDeliveryDetails = () => {
		setIsDeliveryDetailsSet(true);
		setIsPickerShown(false);
  }
		
  return (
      <div className={styles.page}>
          <div className={styles.container}>
              Pick your delivery location
              <div className={styles.subcontainer}>
                  {deliveryData?.map((data, index) => (
                      <div key={index} className={styles.card_2_contents}>
                          <div className={styles.column}>
                              <div className={styles.card_title}>
                                  {data.branch}
                              </div>
                              <div>
                                  {data.name}
                              </div>
                          </div>
                          <div className={styles.column}>
                            <p className={styles.clickable_word}>
                              <IonButton onClick={() => setDeliveryLocation(data.id)} size="small" >Set</IonButton>
                            </p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          <div className={styles.container}>
              Pick your delivery time
              <div className={styles.subcontainer}>
                  {deliveryTimeSlot?.map((data, index) => (
                      <div key={index} className={styles.card_2_contents}>
                          <div className={styles.column}>
                              <div className={styles.card_title}>
                                  {data.name}
                              </div>
                              <div>
                                  {data.start_time} - {data.end_time}
                              </div>
                          </div>
                          <div className={styles.column}>
                            <p className={styles.clickable_word}>
                              <IonButton onClick={() => setDeliveryTime(data.id)} size="small" >Set</IonButton>
                            </p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          <div className={styles.container}>
              Pick your delivery Date
              <DatePicker
							  selected={deliveryDate}
								onChange={(date) => {
									if (date) {
										setDeliveryDate(date);
									}}}/>
          </div>
          <div className={styles.button}>
              <IonButton disabled={!isFieldFilled} onClick={handleSetDeliveryDetails}>Continue</IonButton>
          </div>
      </div>
  );
};

export default DeliveryLocationPicker;