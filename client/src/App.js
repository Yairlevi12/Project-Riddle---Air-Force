import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';

function App() {
  // state for inputs
  const [friendlyLat, setFriendlyLat] = useState('');
  const [friendlyLng, setFriendlyLng] = useState('');
  const [threatLat, setThreatLat] = useState('');
  const [threatLng, setThreatLng] = useState('');
  const [speed, setSpeed] = useState('');
  const [radius, setRadius] = useState('');
  // state for results & operations
  const [result, setResult] = useState(null);
  const [operations, setOperations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // real-time calculation whenever יש את כל הערכים
  useEffect(() => {
    if (
      friendlyLat && friendlyLng &&
      threatLat && threatLng &&
      speed && radius
    ) {
      axios.post('http://localhost:4000/api/calculate', {
        friendlyLat: parseFloat(friendlyLat),
        friendlyLng: parseFloat(friendlyLng),
        threatLat: parseFloat(threatLat),
        threatLng: parseFloat(threatLng),
        speed: parseFloat(speed),
        radius: parseFloat(radius),
      })
      .then(res => setResult(res.data))
      .catch(console.error);
    }
  }, [friendlyLat, friendlyLng, threatLat, threatLng, speed, radius]);

  // שמירת תוצאת החישוב למסד
  const handleSave = () => {
    if (!result) return;
    axios.post('http://localhost:4000/api/operations', {
      ...result,
      friendlyLat: parseFloat(friendlyLat),
      friendlyLng: parseFloat(friendlyLng),
      threatLat: parseFloat(threatLat),
      threatLng: parseFloat(threatLng),
      speed: parseFloat(speed),
      radius: parseFloat(radius),
    })
    .then(res => setOperations(prev => [...prev, res.data]))
    .catch(console.error);
  };

  // ייבוא נתונים קיימים מהמסד
  const openModal = () => {
    axios.get('http://localhost:4000/api/operations')
      .then(res => {
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
          placeholder="נקודות ידידותי Lat"
          value={friendlyLat}
          onChange={e => setFriendlyLat(e.target.value)}
        />
        <input
          type="number"
          placeholder="נקודות ידידותי Lng"
          value={friendlyLng}
          onChange={e => setFriendlyLng(e.target.value)}
        />
        <input
          type="number"
          placeholder="נקודות איום Lat"
          value={threatLat}
          onChange={e => setThreatLat(e.target.value)}
        />
        <input
          type="number"
          placeholder="נקודות איום Lng"
          value={threatLng}
          onChange={e => setThreatLng(e.target.value)}
        />
        <input
          type="number"
          placeholder="מהירות (km/h)"
          value={speed}
          onChange={e => setSpeed(e.target.value)}
        />
        <input
          type="number"
          placeholder="רדיוס (km)"
          value={radius}
          onChange={e => setRadius(e.target.value)}
        />
      </div>
      {/* כפתורי שמירה וייבוא */}
      <div style={{ marginTop: 10 }}>
        <button onClick={handleSave}>שמור</button>
        <button onClick={openModal}>ייבוא נתונים</button>
      </div>

      {/* תצוגת מפה ותוצאות */}
      {result && (
        <div style={{ marginTop: 20 }}>
          <p>מרחק: {result.distance.toFixed(2)} km</p>
          <p>
            {result.inRange
              ? `בסכנה! זמן הסגירה: ${result.closingTime.toFixed(2)} שעות`
              : 'אין איום בטווח'}
          </p>
          <MapContainer
            center={[friendlyLat, friendlyLng]}
            zoom={6}
            style={{ height: 300, width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[friendlyLat, friendlyLng]} />
            <Marker position={[threatLat, threatLng]} />
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
          <h2>פעולות שמורות</h2>
          <ul>
            {operations.map(op => (
              <li key={op.id}>
                {`[${new Date(op.createdAt).toLocaleString()}] Distance: ${op.distance.toFixed(2)} km`}
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
