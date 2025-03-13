"use client";

import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import {useState, useEffect} from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Data tukang jahit berdasarkan kota
const tailorsByCity = {
  Jakarta: [
    {id: 1, name: "Jahit Express", lat: -6.2108, lng: 106.845},
    {id: 2, name: "Tailor Bintang", lat: -6.215, lng: 106.8475},
    {id: 3, name: "Penjahit Sejati", lat: -6.2222, lng: 106.849},
  ],
  Semarang: [
    {id: 4, name: "Jahit Modern", lat: -6.9675, lng: 110.42},
    {id: 5, name: "Cepat Jahit", lat: -6.972, lng: 110.4255},
  ],
  Surabaya: [
    {id: 6, name: "Elegant Tailor", lat: -7.259, lng: 112.754},
    {id: 7, name: "Jahit Bersama", lat: -7.2635, lng: 112.7505},
  ],
  Bandung: [
    {id: 8, name: "Tailor 88", lat: -6.9185, lng: 107.6105},
    {id: 9, name: "Jahit Hemat", lat: -6.922, lng: 107.612},
  ],
};

// Komponen untuk memperbarui pusat peta saat kota berubah
const MapUpdater = ({center}: {center: [number, number]}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13, {animate: true});
  }, [center, map]);
  return null;
};

const MapComponent = () => {
  const [selectedTailor, setSelectedTailor] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] =
    useState<keyof typeof tailorsByCity>("Jakarta");

  const tailors = tailorsByCity[selectedCity];
  const defaultCenter: [number, number] = [tailors[0].lat, tailors[0].lng];

  return (
    <div className='w-full relative'>
      {/* Dropdown Pilih Kota */}
      <div className='absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-md flex items-center space-x-2 md:space-x-4'>
        <label className='text-sm md:text-lg font-semibold text-gray-700'>
          Pilih Kota:
        </label>
        <select
          className='bg-transparent text-gray-900 font-medium border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1886EA] cursor-pointer text-sm md:text-base'
          value={selectedCity}
          onChange={(e) =>
            setSelectedCity(e.target.value as keyof typeof tailorsByCity)
          }
        >
          {Object.keys(tailorsByCity).map((city) => (
            <option key={city} value={city} className='bg-white text-black'>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Map */}
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className='h-[400px] md:h-[500px] w-full rounded-lg z-0'
      >
        <MapUpdater center={defaultCenter} />

        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {tailors.map((tailor) => (
          <Marker
            key={tailor.id}
            position={[tailor.lat, tailor.lng]}
            eventHandlers={{
              click: () => {
                setSelectedTailor(tailor.name);
              },
            }}
            icon={L.icon({
              iconUrl: "/images/map-marker.svg",
              iconSize: [30, 50], // Ukuran lebih kecil di layar kecil
              iconAnchor: [15, 50],
            })}
          >
            <Popup>
              <h3 className='font-bold text-[#1886EA] text-lg flex items-center justify-center'>
                🧵 {tailor.name}
              </h3>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Pesan saat tukang jahit dipilih */}
      {selectedTailor && (
        <p className='text-center text-sm md:text-lg font-medium text-green-600 mt-4'>
          ✅ Anda memilih: {selectedTailor}
        </p>
      )}
    </div>
  );
};

export default MapComponent;
