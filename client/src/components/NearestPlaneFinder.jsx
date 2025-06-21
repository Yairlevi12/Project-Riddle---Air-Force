import { useState } from 'react';
import axios from 'axios';

export default function NearestPlaneFinder() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [radius, setRadius] = useState('');
  const [plane, setPlane] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPlane(null);
    try {
      const { data } = await axios.get('/api/planes/nearest', {
        params: { lat, lon, radius },
      });
      if (data.error || data.message) {
        setError(data.error || data.message);
      } else {
        setPlane(data);
      }
    } catch {
      setError('שגיאה בשרת או לא ניתן למצוא מטוס בטווח');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <input
            type="number"
            step="any"
            value={lat}
            onChange={e => setLat(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="31.99"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Longitude</label>
          <input
            type="number"
            step="any"
            value={lon}
            onChange={e => setLon(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="34.88"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Radius (m)</label>
          <input
            type="number"
            step="1"
            value={radius}
            onChange={e => setRadius(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="20000"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl"
        >
          חשב
        </button>
      </form>

      {error && <div className="mt-6 text-red-500 text-center">{error}</div>}

      {plane && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <p><strong>ICAO:</strong> {plane.icao}</p>
          <p><strong>Callsign:</strong> {plane.callsign}</p>
          <p><strong>Distance:</strong> {plane.distance.toLocaleString()} מ׳</p>
          <p><strong>Speed:</strong> {plane.velocity.toLocaleString()} מ׳/ש״ש</p>
        </div>
      )}
    </div>
);
}
