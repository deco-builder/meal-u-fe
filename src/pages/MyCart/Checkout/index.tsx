import CheckoutDetailsCard from './checkout-details-card';
import { deliveryDetails } from '../dummyData';
import { Dispatch, useState, SetStateAction, useEffect } from 'react';
import styles from './checkout.module.css';

interface CheckoutProps {
    subTotal: number;
    total: number;
    setTotal: Dispatch<SetStateAction<number>>;
    location: number;
    date: Date;
    time: number;
}

const Checkout: React.FC<CheckoutProps> = ({subTotal, total, setTotal, location, date, time}) => {
    const [deliveryData, setDeliveryData] = useState(deliveryDetails);

    // TODO: delete when calculateTotal() doesn't use dummy data
    useEffect(() => {
      // TODO: change with API calls
      const fetchData = async () => {
        setDeliveryData(deliveryDetails);
      };
      fetchData();
    }, []);


    // TODO: change with delivery fee from BE when ready
    useEffect(() => {
        const calculateTotal = () => {
            const newTotal = subTotal + deliveryData.fee;
            setTotal(newTotal);
        };
        calculateTotal();
    }, [subTotal, deliveryData, total]);

    return (
        <>
          <div className={styles.subsection}>
            <div className={styles.title}>Delivery to</div>
            <CheckoutDetailsCard data1={deliveryData.university_name} data2={deliveryData.university_branch} button="Change Address" />
          </div>

          <div className={styles.subsection}>
            <div className={styles.title}>Set Time</div>
            <CheckoutDetailsCard data1={deliveryData.delivery_date} data2={deliveryData.delivery_time} button="Change Time" />
          </div>
          
          {/* <div className={styles.subsection}>
            <div className={styles.title}>Payment Summary</div>
            <PaymentDetailsCard subTotal={subTotal} fee={deliveryData.fee} total={total} />
          </div> */}
        </>
    )
}

export default Checkout;