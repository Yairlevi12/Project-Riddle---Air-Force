import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 1. הגדרת שני אייקונים — כחול לידידותי, אדום לאויב
const blueIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function App() {
  // States
  const [friendlyLat, setFriendlyLat] = useState('');
  const [friendlyLng, setFriendlyLng] = useState('');
  const [threatLat, setThreatLat] = useState('');
  const [threatLng, setThreatLng] = useState('');
  const [speed, setSpeed] = useState('');
  const [radius, setRadius] = useState('');
  const [result, setResult] = useState(null);
  const [operations, setOperations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // חישוב בזמן אמת
  useEffect(() => {
    if (
      friendlyLat &&
      friendlyLng &&
      threatLat &&
      threatLng &&
      speed &&
      radius
    ) {
      axios
        .post('http://localhost:4000/api/calculate', {
          friendlyLat: parseFloat(friendlyLat),
          friendlyLng: parseFloat(friendlyLng),
          threatLat: parseFloat(threatLat),
          threatLng: parseFloat(threatLng),
          speed: parseFloat(speed),
          radius: parseFloat(radius),
        })
        .then((res) => setResult(res.data))
        .catch(console.error);
    }
  }, [friendlyLat, friendlyLng, threatLat, threatLng, speed, radius]);

  // שמירה למסד
  const handleSave = () => {
    if (!result) return;
    axios
      .post('http://localhost:4000/api/operations', {
        friendlyLat: parseFloat(friendlyLat),
        friendlyLng: parseFloat(friendlyLng),
        threatLat: parseFloat(threatLat),
        threatLng: parseFloat(threatLng),
        speed: parseFloat(speed),
        radius: parseFloat(radius),
        distance: result.distance,
        inRange: result.inRange,
        closingTime: result.closingTime,
      })
      .then((res) => setOperations((prev) => [...prev, res.data]))
      .catch(console.error);
  };

  // ייבוא מהמסד
  const openModal = () => {
    axios
      .get('http://localhost:4000/api/operations')
      .then((res) => {
        setOperations(res.data);
        setShowModal(true);
      })
      .catch(console.error);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Golden Route Threat Monitoring</h1>

      {/* קלטים */}
      <div>
        <input
          type="number"
          placeholder="Friendly Lat"
          value={friendlyLat}
          onChange={(e) => setFriendlyLat(e.target.value)}
        />
        <input
          type="number"
          placeholder="Friendly Lng"
          value={friendlyLng}
          onChange={(e) => setFriendlyLng(e.target.value)}
        />
        <input
          type="number"
          placeholder="Threat Lat"
          value={threatLat}
          onChange={(e) => setThreatLat(e.target.value)}
        />
        <input
          type="number"
          placeholder="Threat Lng"
          value={threatLng}
          onChange={(e) => setThreatLng(e.target.value)}
        />
        <input
          type="number"
          placeholder="Speed (km/h)"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <input
          type="number"
          placeholder="Radius (km)"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        />
      </div>

      {/* כפתורים */}
      <div style={{ marginTop: 10 }}>
        <button onClick={handleSave}>שמור</button>
        <button onClick={openModal}>ייבוא נתונים</button>
      </div>

      {/* תצוגת מפה ותוצאות */}
      {result && (
        <div style={{ marginTop: 20 }}>
          <p>Distance: {result.distance.toFixed(2)} km</p>
          <p>
            {result.inRange
              ? `In Range! Closing time: ${result.closingTime.toFixed(2)} h`
              : 'No Threat In Range'}
          </p>

          <MapContainer
            center={[friendlyLat, friendlyLng]}
            zoom={6}
            style={{ height: 300, width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Friendly marker בכחול */}
            <Marker
              position={[friendlyLat, friendlyLng]}
              icon={blueIcon}
            />

            {/* Threat marker באדום */}
            <Marker
              position={[threatLat, threatLng]}
              icon={redIcon}
            />

            {result.inRange && (
              <Circle
                center={[threatLat, threatLng]}
                radius={radius * 1000}
              />
            )}
          </MapContainer>
        </div>
      )}

      {/* מודאל להצגת פעולות */}
      {showModal && (
        <div className="modal">
          <h2>Saved Operations</h2>
          <ul>
            {operations.map((op) => (
              <li key={op.id}>
                [{new Date(op.createdAt).toLocaleString()}] Distance:{' '}
                {op.distance.toFixed(2)} km
              </li>
            ))}
          </ul>
          <button onClick={() => setShowModal(false)}>סגור</button>
        </div>
      )}
    </div>
  );
}

export default App;
