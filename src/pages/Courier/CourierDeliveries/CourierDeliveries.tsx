import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import DropdownSelect from '../../../components/Dropdown/DropdownSelect';
import DeliveryBatch from '../../../components/Courier/DeliveryBatch/DeliveryBatch';

const CourierDeliveries: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Deliveries');
  const history = useHistory();

  const deliveries = [
    {
      date: 'Today',
      batches: [
        {
          batchNumber: '32134',
          pickUp: { type: 'Pick Up' as const, location: 'Warehouse Center', time: '11:00' },
          delivery: { type: 'Delivery' as const, location: 'University of Queensland', time: '12:00' },
        },
        {
          batchNumber: '32135',
          pickUp: { type: 'Pick Up' as const, location: 'Warehouse Center', time: '13:00' },
          delivery: { type: 'Delivery' as const, location: 'Griffith University', time: '14:00' },
        },
      ],
    },
    {
      date: 'Tomorrow',
      batches: [
        {
          batchNumber: '32136',
          pickUp: { type: 'Pick Up' as const, location: 'Warehouse Center', time: '11:00' },
          delivery: { type: 'Delivery' as const, location: 'QUT', time: '12:00' },
        },
      ],
    },
  ];

  const handleBatchClick = (batchNumber: string) => {
    history.push(`/courier/delivery-batch/${batchNumber}`);
  };

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar className='font-sans'>
          <IonTitle>Deliveries</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='font-sans'>
        <div className="p-4 pb-20">
          <DropdownSelect
            options={['All Deliveries', 'Today', 'Tomorrow', 'This Week']}
            defaultValue="All Deliveries"
            onChange={setSelectedFilter}
          />
          {deliveries.map((dateGroup, index) => (
            <div key={index} className="mt-6">
              <h2 className="text-xl font-bold mb-4">{dateGroup.date}</h2>
              {dateGroup.batches.map((batch, batchIndex) => (
                <div key={batchIndex} onClick={() => handleBatchClick(batch.batchNumber)}>
                  <DeliveryBatch
                    batchNumber={batch.batchNumber}
                    pickUp={batch.pickUp}
                    delivery={batch.delivery}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CourierDeliveries;