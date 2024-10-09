import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { cameraOutline, cloudUploadOutline, imageOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useHistory, useParams } from 'react-router-dom';

interface RouteParams {
  id: string;
}

const ConfirmDelivery: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      
      setPhoto(image.dataUrl || null);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const uploadPhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });
      
      setPhoto(image.dataUrl || null);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const confirmDelivery = () => {
    if (photo) {
      console.log('Delivery confirmed with photo');
      // Navigate back to ConfirmPickup page with the confirmed order ID
      history.push(`/courier/confirm-pickup/delivery/1?confirmed=${id}`);
    } else {
      alert('Please upload or take a photo before confirming delivery');
    }
  };

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar className='font-sans'>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/courier/confirm-pickup/delivery/1" />
          </IonButtons>
          <IonTitle>Confirm Delivery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="font-sans">
        <div className="flex flex-col w-full h-full p-4 pt-8">
          <div className="flex-grow flex flex-col items-center">
            {photo ? (
              <div className="w-full max-w-md rounded-lg mb-4 border-4 border-dashed border-[#7862FC] p-2">
                <img src={photo} alt="Delivery proof" className="w-full rounded-lg shadow-lg" />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 w-full rounded-lg px-8 py-16 text-center mb-4">
                <IonIcon icon={cloudUploadOutline} className="text-6xl text-gray-400 mb-4" />
                <p className="text-gray-500">Upload your proof of delivery</p>
              </div>
            )}
            
            <div className="w-full space-y-4 mt-4">
              <IonButton expand="block" onClick={uploadPhoto} color="primary" className="font-semibold">
                <IonIcon icon={imageOutline} slot="start" />
                Upload Photo
              </IonButton>
              <IonButton expand="block" onClick={takePhoto} color="dark" className="font-semibold">
                <IonIcon icon={cameraOutline} slot="start" />
                Take a Photo
              </IonButton>
            </div>
          </div>
          
          <div className="mt-auto pb-4">
            <IonButton 
              expand="block" 
              onClick={confirmDelivery} 
              color="medium" 
              className="font-semibold"
              disabled={!photo}
            >
              Confirm Delivery
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ConfirmDelivery;