import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import Order from '../../../components/Courier/Order/Order';
import { useHistory } from 'react-router-dom';

interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  isChecked: boolean;
}

const ConfirmPickup: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([
    { id: '1', orderNumber: '21345', customerName: 'Matthew H', isChecked: false },
    { id: '2', orderNumber: '21346', customerName: 'Sarah L', isChecked: false },
    { id: '3', orderNumber: '21347', customerName: 'John D', isChecked: false },
  ]);

  const history = useHistory();

  const toggleOrder = (id: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, isChecked: !order.isChecked } : order
    ));
  };

  const allOrdersChecked = orders.every(order => order.isChecked);

  const confirmAllOrders = () => {
    if (allOrdersChecked) {
      console.log('All orders confirmed');
      history.push('/courier/delivery/1');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/courier/delivery" />
          </IonButtons>
          <IonTitle>Confirm Pick up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false} className="font-sans">
        <div className="h-full w-full relative flex flex-col">
          <div className="flex-grow overflow-auto">
            {orders.map(order => (
              <Order
                key={order.id}
                orderNumber={order.orderNumber}
                customerName={order.customerName}
                isChecked={order.isChecked}
                onToggle={() => toggleOrder(order.id)}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
            <button
              className={`w-full py-3 rounded-2xl font-semibold ${
                allOrdersChecked ? 'bg-[#7862FC] text-white' : 'bg-gray-300 text-gray-500'
              }`}
              onClick={confirmAllOrders}
              disabled={!allOrdersChecked}
            >
              Confirm All Orders
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ConfirmPickup;