import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, CircleMarker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [friendlyLat, setFriendlyLat] = useState('');
  const [friendlyLng, setFriendlyLng] = useState('');
  const [threatLat, setThreatLat] = useState('');
  const [threatLng, setThreatLng] = useState('');
  const [speed, setSpeed] = useState('');
  const [radius, setRadius] = useState('');
  const [result, setResult] = useState(null);
  const [operations, setOperations] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      <div style={{ marginTop: 10 }}>
        <button onClick={handleSave}>שמור</button>
        <button onClick={openModal}>ייבוא נתונים</button>
      </div>
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

            {/* סימון ידידותי: עיגול כחול */}
            <CircleMarker
              center={[friendlyLat, friendlyLng]}
              pathOptions={{ color: 'blue' }}
              radius={8}
            />

            {/* סימון איום: עיגול אדום */}
            <CircleMarker
              center={[threatLat, threatLng]}
              pathOptions={{ color: 'red' }}
              radius={8}
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
