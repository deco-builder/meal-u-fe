import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { useParams } from 'react-router-dom';
import Order from '../../../components/Courier/Order/Order';

const DeliveryBatchDetails: React.FC = () => {
  const { batchNumber } = useParams<{ batchNumber: string }>();

  const orders = [
    { orderNumber: '21345', customerName: 'Matthew H' },
    { orderNumber: '21346', customerName: 'Sarah L' },
    { orderNumber: '21347', customerName: 'John D' },
    { orderNumber: '21348', customerName: 'Emily W' },
    { orderNumber: '21349', customerName: 'Michael B' },
  ];

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar className='font-sans'>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/courier/deliveries" />
          </IonButtons>
          <IonTitle>Delivery Batch #{batchNumber}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='font-sans'>
        <div className='pb-20'>
        <div className='px-4 pt-4'>
            <h2 className="text-xl font-bold">List of Orders</h2>
        </div>
        {orders.map((order, index) => (
            <Order
                key={index}
                orderNumber={order.orderNumber}
                customerName={order.customerName}
            />
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DeliveryBatchDetails;