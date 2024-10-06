import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';
import Order from '../../../components/Courier/Order/Order';
import { useHistory, useParams, useLocation } from 'react-router-dom';

interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  isChecked: boolean;
}

interface RouteParams {
  type: string;
}

const ConfirmPickup: React.FC = () => {
  const { type } = useParams<RouteParams>();
  const isPickup = type === 'pickup';
  const [orders, setOrders] = useState<OrderData[]>([
    { id: '1', orderNumber: '21345', customerName: 'Matthew H', isChecked: false },
    { id: '2', orderNumber: '21346', customerName: 'Sarah L', isChecked: false },
    { id: '3', orderNumber: '21347', customerName: 'John D', isChecked: false },
  ]);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const confirmedOrderId = searchParams.get('confirmed');
    if (confirmedOrderId) {
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === confirmedOrderId ? { ...order, isChecked: true } : order
        )
      );
    }
  }, [location]);

  const toggleOrder = (id: string) => {
    if (isPickup) {
      setOrders(orders.map(order => 
        order.id === id ? { ...order, isChecked: !order.isChecked } : order
      ));
    } else {
      // For delivery, navigate to ConfirmDelivery
      history.push(`/courier/confirm-delivery/${id}`);
    }
  };

  const allOrdersChecked = orders.every(order => order.isChecked);

  const confirmAll = () => {
    if (allOrdersChecked) {
      if (isPickup) {
        console.log('All orders picked up');
        history.push('/courier/delivery/1');
      } else {
        console.log('All deliveries confirmed');
        history.push('/courier/home');
      }
    }
  };

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar className='font-sans'>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/courier/home" />
          </IonButtons>
          <IonTitle>{isPickup ? 'Confirm Pick up' : 'Confirm Delivery'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={false} className="font-sans">
        <div className="h-full w-full relative flex flex-col">
          <div className="flex-grow overflow-auto">
            {orders.map(order => (
              <Order
                orderNumber={order.orderNumber}
                customerName={order.customerName}
                isChecked={order.isChecked}
                onToggle={() => toggleOrder(order.id)}
                showCheckbox={true}
                />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
            <button
              className={`w-full py-3 rounded-2xl font-semibold ${
                allOrdersChecked ? 'bg-[#7862FC] text-white' : 'bg-gray-300 text-gray-500'
              }`}
              onClick={confirmAll}
              disabled={!allOrdersChecked}
            >
              {isPickup ? 'Confirm Pick up' : 'Finish Delivery'}
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ConfirmPickup;