import React, { useState } from 'react';
import { Coordinates } from '../types';
import { MapPin } from 'lucide-react';

interface ManualLocationProps {
  onLocationSet: (coords: Coordinates) => void;
  onCancel: () => void;
}

export const ManualLocation: React.FC<ManualLocationProps> = ({ onLocationSet, onCancel }) => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      if (latitude < -90 || latitude > 90) {
        alert("Latitude must be between -90 and 90");
        return;
      }
      if (longitude < -180 || longitude > 180) {
        alert("Longitude must be between -180 and 180");
        return;
      }
      onLocationSet({ latitude, longitude });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-500/10 rounded-full">
            <MapPin className="w-6 h-6 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Manual Location</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="e.g. 51.5074"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              placeholder="e.g. -0.1278"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-4 rounded-lg text-slate-300 font-medium hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-lg bg-amber-500 text-slate-900 font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            >
              Set Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};