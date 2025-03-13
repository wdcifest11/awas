"use client";

import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import {useState, useEffect} from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const orphanagesByCity = {
  Jakarta: [
    {
      id: 1,
      name: "Panti Asuhan Vincentius Putra",
      address: "Jl. Kramat Raya 134, Jakarta Pusat 10430",
      phone: "(021) 3909719",
      lat: -6.1862,
      lng: 106.8416,
    },
    {
      id: 2,
      name: "Panti Asuhan Muhammadiyah Tanah Abang",
      address: "Jl. K.H. Mas Mansyur No. 32, Tanah Abang, Jakarta Pusat",
      phone: "(021) 3918751",
      lat: -6.1944,
      lng: 106.8142,
    },
    {
      id: 3,
      name: "Panti Asuhan Kasih Sayang",
      address: "Jl. Raya Bogor KM 26, Jakarta Timur",
      phone: "(021) 8400252",
      lat: -6.3231,
      lng: 106.865,
    },
    {
      id: 4,
      name: "Panti Asuhan Bina Remaja",
      address: "Jl. Kramat IV No.8, Jakarta Pusat",
      phone: "(021) 3925555",
      lat: -6.1882,
      lng: 106.8411,
    },
    {
      id: 5,
      name: "Panti Asuhan Rumah Harapan",
      address: "Jl. Tebet Barat Dalam IV No. 3, Jakarta Selatan",
      phone: "(021) 83702939",
      lat: -6.2342,
      lng: 106.8461,
    },
  ],
  Semarang: [
    {
      id: 1,
      name: "Panti Asuhan Al Jannah",
      address: "Jl. Kauman Barat No. 15, Semarang",
      phone: "(024) 3554929",
      lat: -6.9904,
      lng: 110.4229,
    },
    {
      id: 2,
      name: "Panti Asuhan Kyai Ageng Majapahit",
      address: "Jl. Kyai Ageng Majapahit No. 1, Semarang",
      phone: "(024) 3512345",
      lat: -7.0015,
      lng: 110.4371,
    },
    {
      id: 3,
      name: "Panti Asuhan Tarbiyatul Yatama",
      address: "Jl. Tarbiyatul Yatama No. 10, Semarang",
      phone: "(024) 3546789",
      lat: -7.0156,
      lng: 110.4498,
    },
    {
      id: 4,
      name: "Panti Asuhan Nurul Istiqomah",
      address: "Jl. Suburan 75, Kebon Agung, Semarang Timur, Semarang 50123",
      phone: "(024) 3522426",
      lat: -6.99,
      lng: 110.445,
    },
    {
      id: 5,
      name: "Panti Asuhan Arrohman",
      address: "Jl. Kramat Raya 1 RT 003/02, Kudu, Genuk, Semarang 50116",
      phone: "(024) 6511411",
      lat: -6.975,
      lng: 110.465,
    },
  ],
  Surabaya: [
    {
      id: 1,
      name: "Panti Asuhan Bhakti Luhur",
      address: "Jl. Ahmad Yani No. 17, Madiun, Jawa Timur",
      phone: "(0351) 452562",
      lat: -7.6298,
      lng: 111.5239,
    },
    {
      id: 2,
      name: "Panti Asuhan Cahaya Abadi",
      address: "Jl. Raya Kendangsari No. 3, Surabaya",
      phone: "(031) 8281525",
      lat: -7.3356,
      lng: 112.7344,
    },
    {
      id: 3,
      name: "Panti Asuhan Nurul Iman",
      address: "Jl. Kedung Tarukan No. 50, Surabaya",
      phone: "(031) 5051204",
      lat: -7.2732,
      lng: 112.737,
    },
    {
      id: 4,
      name: "Panti Asuhan Al-Fitrah",
      address: "Jl. Kedinding Lor No. 99, Surabaya",
      phone: "(031) 3812356",
      lat: -7.2431,
      lng: 112.7854,
    },
    {
      id: 5,
      name: "Panti Asuhan Baitul Aitam",
      address: "Jl. Raya Gubeng No. 45, Surabaya",
      phone: "(031) 5021105",
      lat: -7.275,
      lng: 112.7462,
    },
  ],
  Bandung: [
    {
      id: 1,
      name: "Panti Asuhan Bayi Sehat Muhammadiyah",
      address: "Jl. Purnawarman No. 25, Bandung",
      phone: "(022) 439882",
      lat: -6.9034,
      lng: 107.6107,
    },
    {
      id: 2,
      name: "Panti Asuhan Tambatan Hati",
      address: "Jl. Galunggung No. 23, Lingkar Selatan, Bandung",
      phone: "(022) 7302008",
      lat: -6.9503,
      lng: 107.6261,
    },
    {
      id: 3,
      name: "Panti Sosial Asuhan Anak Fajar Harapan",
      address: "Jl. Surapati No. 107, Sukaluyu, Cibeunying Kaler, Bandung",
      phone: "(022) 2503078",
      lat: -6.8941,
      lng: 107.6297,
    },
    {
      id: 4,
      name: "Panti Asuhan Khoerunnisa",
      address:
        "Jl. Pasir Turi No. 28 RT 4 RW 5, Kel. Sukaluyu, Kec. Cibeunying Kaler, Bandung",
      phone: "0822-6252-9435",
      lat: -6.8923,
      lng: 107.6312,
    },
    {
      id: 5,
      name: "Panti Asuhan Al-Ikhlas",
      address: "Jl. Karapitan No. 123, Bandung",
      phone: "(022) 4267481",
      lat: -6.921,
      lng: 107.6215,
    },
  ],
};

interface MapProps {
  onSelectOrphanage: (name: string) => void;
}

const MapUpdater = ({center}: {center: [number, number]}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13, {animate: true});
  }, [center, map]);
  return null;
};

const MapComponent = ({onSelectOrphanage}: MapProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] =
    useState<keyof typeof orphanagesByCity>("Jakarta");

  const orphanages = orphanagesByCity[selectedCity];
  const defaultCenter: [number, number] = [
    orphanages[0].lat,
    orphanages[0].lng,
  ];

  useEffect(() => {
    return () => {
      const mapContainer = document.getElementById("map") as any;
      if (mapContainer && mapContainer._leaflet_id) {
        mapContainer.innerHTML = ""; // Bersihkan peta sebelum unmount
      }
    };
  }, []);

  return (
    <div className='w-full relative'>
      {/* Dropdown Pilih Kota dengan posisi absolute */}
      <div className='absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/70 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg flex items-center space-x-2'>
        <label className='text-lg font-medium text-gray-700'>Kota:</label>
        <select
          className='bg-transparent text-gray-900 font-medium border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#43C6AC] cursor-pointer'
          value={selectedCity}
          onChange={(e) =>
            setSelectedCity(e.target.value as keyof typeof orphanagesByCity)
          }
        >
          {Object.keys(orphanagesByCity).map((city) => (
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
        className='h-[500px] w-full rounded-lg z-0'
        key={selectedCity} // Agar map reset saat kota berubah
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            position={[orphanage.lat, orphanage.lng]}
            eventHandlers={{
              click: () => {
                setSelected(orphanage.name);
                onSelectOrphanage(orphanage.name);
              },
            }}
            icon={L.icon({
              iconUrl: "/images/map-marker.svg",
              iconSize: [30, 45],
              iconAnchor: [15, 45],
            })}
          >
            <Popup>
              <h3 className='font-bold text-[#43C6AC] text-lg flex items-center justify-center'>
                🏠 {orphanage.name}
              </h3>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
