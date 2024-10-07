import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonPage, IonIcon } from '@ionic/react';
import { arrowUp, arrowDown } from 'ionicons/icons';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useHistory } from 'react-router-dom';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

if (!MAPTILER_API_KEY) {
    throw new Error('MapTiler API key is not set. Please set REACT_APP_MAPTILER_API_KEY in your .env file.');
}

const CourierHome: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const geolocateControl = useRef<maptilersdk.GeolocateControl | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const history = useHistory();

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      maptilersdk.config.apiKey = MAPTILER_API_KEY;
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.DATAVIZ.LIGHT,
        zoom: 2,
        center: [0, 0],
        navigationControl: false,
        geolocateControl: false
      });

      geolocateControl.current = new maptilersdk.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showAccuracyCircle: false,
      });

      map.current.addControl(geolocateControl.current);

      map.current.on('load', () => {
        if (geolocateControl.current) {
          geolocateControl.current.trigger();
        }
      });

      if (geolocateControl.current) {
        geolocateControl.current.on('geolocate', (e: any) => {
          const lon = e.coords.longitude;
          const lat = e.coords.latitude;
          setCurrentLocation([lon, lat]);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (map.current && currentLocation) {
      map.current.flyTo({
        center: currentLocation,
        zoom: 18
      });
    }
  }, [currentLocation]);

  const handleStartDelivery = () => {
    history.push('/courier/pickup/1');
  };

  return (
    <IonPage className="overflow-hidden">
      <IonContent fullscreen scrollY={false} className="bg-[#F3F5F7] font-sans">
        <div className="h-full w-full relative">
          <div ref={mapContainer} className="absolute inset-0" style={{ height: 'calc(100% + 35px)' }} />
          <div className="absolute bottom-0 left-0 right-0 pb-[330px] px-4 bg-transparent" style={{ height: '150px' }}>
            <button 
              className="w-full bg-[#7862FC] text-white font-semibold py-3 rounded-2xl mb-4"
              onClick={handleStartDelivery}
            >
              Start Delivery
            </button>
            <div className="bg-white rounded-2xl shadow p-4">
                <h3 className="font-medium text-lg mb-4">Next Delivery</h3>
                <div className="relative">
                    <div className="flex items-start mb-6 relative">
                    <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center z-10 mr-4">
                        <IonIcon icon={arrowUp} className="text-sm" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-xs text-gray-500">Pick Up</p>
                        <p className="font-medium">Warehouse Center</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="font-medium">11:00</p>
                    </div>
                    </div>
                    <div className="flex items-start relative">
                    <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center z-10 mr-4">
                        <IonIcon icon={arrowDown} className="text-sm" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-xs text-gray-500">Delivery</p>
                        <p className="font-medium">University of Queensland</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="font-medium">12:00</p>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CourierHome;