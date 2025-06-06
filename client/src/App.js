import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';

function App() {
  const [friendlyLat, setFriendlyLat] = useState('');
  const [friendlyLng, setFriendlyLng] = useState('');
  const [threatLat, setThreatLat] = useState('');
  const [threatLng, setThreatLng] = useState('');
  const [speed, setSpeed] = useState('');
  const [radius, setRadius] = useState('');
  const [result, setResult] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [operations, setOperations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCalculate = async () => {
    const res = await axios.post('http://localhost:4000/api/calculate', {
      friendlyLat: parseFloat(friendlyLat),
      friendlyLng: parseFloat(friendlyLng),
      threatLat: parseFloat(threatLat),
      threatLng: parseFloat(threatLng),
      speed: parseFloat(speed),
      radius: parseFloat(radius)
    });
    setResult(res.data);
    setShowMap(true);
  };

  const handleSave = async () => {
    await axios.post('http://localhost:4000/api/save', {
      friendlyLat: parseFloat(friendlyLat),
      friendlyLng: parseFloat(friendlyLng),
      threatLat: parseFloat(threatLat),
      threatLng: parseFloat(threatLng),
      speed: parseFloat(speed),
      radius: parseFloat(radius)
    });
    alert('Operation saved');
  };

  const openModal = async () => {
    const res = await axios.get('http://localhost:4000/api/operations');
    setOperations(res.data);
    setShowModal(true);
  };

  const importOperation = (op) => {
    setFriendlyLat(op.friendlyLat);
    setFriendlyLng(op.friendlyLng);
    setThreatLat(op.threatLat);
    setThreatLng(op.threatLng);
    setSpeed(op.speed);
    setRadius(op.radius);
    setShowModal(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Golden Route Threat Monitor</h1>
      <div>
        <input placeholder="Friendly Lat" value={friendlyLat} onChange={(e) => setFriendlyLat(e.target.value)} />
        <input placeholder="Friendly Lng" value={friendlyLng} onChange={(e) => setFriendlyLng(e.target.value)} />
        <input placeholder="Threat Lat" value={threatLat} onChange={(e) => setThreatLat(e.target.value)} />
        <input placeholder="Threat Lng" value={threatLng} onChange={(e) => setThreatLng(e.target.value)} />
        <input placeholder="Speed (m/s)" value={speed} onChange={(e) => setSpeed(e.target.value)} />
        <input placeholder="Radius (m)" value={radius} onChange={(e) => setRadius(e.target.value)} />
        <button onClick={handleCalculate}>Calculate</button>
        <button onClick={handleSave}>Save Operation</button>
        <button onClick={openModal}>Import Operation</button>
      </div>

      {result && (
        <div style={{ marginTop: 20 }}>
          <p>Distance: {Math.round(result.distance)} meters</p>
          <p>Within Threat Zone: {result.withinThreat ? 'Yes' : 'No'}</p>
          <p>Closure Time: {result.closureTime ? Math.round(result.closureTime) + ' seconds' : 'N/A'}</p>
        </div>
      )}

      {showMap && (
        <div style={{ height: '400px', marginTop: 20 }}>
          <MapContainer center={[parseFloat(friendlyLat), parseFloat(friendlyLng)]} zoom={12} style={{ height: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[parseFloat(friendlyLat), parseFloat(friendlyLng)]} />
            <Marker position={[parseFloat(threatLat), parseFloat(threatLng)]} />
            <Circle center={[parseFloat(threatLat), parseFloat(threatLng)]} radius={parseFloat(radius)} />
          </MapContainer>
        </div>
      )}

      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ background: 'white', padding: 20, maxHeight: '80%', overflowY: 'scroll' }}>
            <h2>Saved Operations</h2>
            <ul>
              {operations.map(op => (
                <li key={op.id} style={{ marginBottom: 10 }}>
                  Friendly: ({op.friendlyLat}, {op.friendlyLng}), Threat: ({op.threatLat}, {op.threatLng}), Speed: {op.speed}, Radius: {op.radius}
                  <button onClick={() => importOperation(op)} style={{ marginLeft: 10 }}>Import</button>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;