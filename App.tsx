import React, { useState, useEffect } from 'react';
import { Compass } from './components/Compass';
import { ManualLocation } from './components/ManualLocation';
import { calculateQiblaData } from './utils/geo';
import { useCompass } from './hooks/useCompass';
import { Coordinates, QiblaData } from './types';
import { MapPin, RotateCcw, Locate } from 'lucide-react';

const App: React.FC = () => {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [qiblaData, setQiblaData] = useState<QiblaData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  
  const { heading, status, requestCompassPermission } = useCompass();

  const handleGeolocationSuccess = (pos: GeolocationPosition) => {
    const userCoords = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };
    setCoords(userCoords);
    setQiblaData(calculateQiblaData(userCoords));
    setLoading(false);
    setError(null);
  };

  const handleGeolocationError = (err: GeolocationPositionError) => {
    setLoading(false);
    // 1 = Permission Denied
    if (err.code === 1) {
      setError("Location permission denied. Please enter manually.");
      setShowManualInput(true);
    } else {
      setError("Unable to retrieve location. Please try manual entry.");
    }
  };

  const requestLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError,
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLoading(false);
      setError("Geolocation is not supported by your browser.");
      setShowManualInput(true);
    }
  };

  useEffect(() => {
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManualLocation = (newCoords: Coordinates) => {
    setCoords(newCoords);
    setQiblaData(calculateQiblaData(newCoords));
    setShowManualInput(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="p-6 flex justify-between items-center z-10 backdrop-blur-sm bg-slate-900/50 sticky top-0">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center transform rotate-45 shadow-lg shadow-amber-500/20">
              <div className="w-4 h-4 bg-slate-900 transform -rotate-45"></div>
           </div>
           <h1 className="text-xl font-bold tracking-tight">Qibla<span className="text-amber-500">Pro</span></h1>
        </div>
        
        <button 
          onClick={() => setShowManualInput(true)}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          title="Change Location"
        >
          <MapPin className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 z-10 max-w-lg mx-auto w-full">
        {loading && (
          <div className="flex flex-col items-center animate-pulse gap-4">
             <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-slate-400">Detecting location...</p>
          </div>
        )}

        {!loading && !qiblaData && !error && (
             <div className="text-center">
                <button 
                  onClick={requestLocation}
                  className="bg-amber-500 text-slate-900 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-amber-400 transition-colors flex items-center gap-2 mx-auto"
                >
                  <Locate className="w-5 h-5" />
                  Find Qibla Direction
                </button>
             </div>
        )}

        {!loading && qiblaData && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-white mb-2">
                {Math.round(qiblaData.bearing)}°
              </h2>
              <p className="text-amber-500 font-medium tracking-wide uppercase text-sm">
                Qibla Direction
              </p>
              {coords && (
                <p className="text-slate-500 text-xs mt-2 font-mono">
                  Loc: {coords.latitude.toFixed(2)}, {coords.longitude.toFixed(2)}
                </p>
              )}
            </div>

            <Compass 
              heading={heading} 
              qiblaBearing={qiblaData.bearing} 
              status={status}
              onRequestPermission={requestCompassPermission}
            />

            <div className="grid grid-cols-2 gap-4 w-full mt-8">
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm text-center">
                 <p className="text-slate-400 text-xs uppercase font-semibold mb-1">Distance</p>
                 <p className="text-xl font-bold text-white">{Math.round(qiblaData.distance).toLocaleString()} <span className="text-sm font-normal text-slate-500">km</span></p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm text-center">
                 <p className="text-slate-400 text-xs uppercase font-semibold mb-1">Accuracy</p>
                 <p className="text-xl font-bold text-green-400">High</p>
              </div>
            </div>
            
            <p className="mt-8 text-center text-slate-500 text-sm max-w-xs mx-auto">
               Align the arrow with the red marker at the top of the compass.
            </p>
          </>
        )}

        {error && !loading && !qiblaData && (
          <div className="text-center p-6 bg-red-500/10 rounded-2xl border border-red-500/20 max-w-sm">
             <p className="text-red-400 mb-4">{error}</p>
             <button 
                onClick={requestLocation}
                className="text-white text-sm underline flex items-center justify-center gap-2 mx-auto hover:text-amber-500"
             >
               <RotateCcw className="w-4 h-4" /> Try Again
             </button>
          </div>
        )}
      </main>

      {showManualInput && (
        <ManualLocation 
          onLocationSet={handleManualLocation} 
          onCancel={() => setShowManualInput(false)} 
        />
      )}
    </div>
  );
};

export default App;