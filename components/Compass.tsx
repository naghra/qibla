import React from 'react';
import { CompassStatus } from '../types';
import { Navigation, AlertCircle } from 'lucide-react';

interface CompassProps {
  heading: number;
  qiblaBearing: number;
  status: CompassStatus;
  onRequestPermission: () => void;
}

export const Compass: React.FC<CompassProps> = ({ 
  heading, 
  qiblaBearing, 
  status,
  onRequestPermission 
}) => {
  // Rotate the compass dial so 'North' aligns with real North (based on device heading)
  // If heading is 90 (East), we rotate the dial -90 so N is to the left.
  const dialRotation = -heading;

  // The Qibla pointer is fixed to the dial at the qiblaBearing.
  // When the dial rotates, the pointer rotates with it automatically.
  // We don't need extra rotation logic for the pointer if it's a child of the dial container.
  
  // Calculate if the user is facing Qibla (approx +/- 5 degrees)
  // User faces Qibla when heading approx equals qiblaBearing
  const diff = Math.abs(heading - qiblaBearing);
  const isAligned = diff < 5 || diff > 355;

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto my-8">
      {/* Status / Permission Overlay */}
      {status === CompassStatus.WAITING_FOR_PERMISSION && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-full">
          <button 
            onClick={onRequestPermission}
            className="px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-full shadow-lg hover:bg-amber-400 transition-all animate-pulse"
          >
            Enable Compass
          </button>
        </div>
      )}

      {/* Main Compass Container */}
      <div 
        className="w-full h-full relative rounded-full border-4 border-slate-700 bg-slate-800 shadow-2xl compass-transition"
        style={{ transform: `rotate(${dialRotation}deg)` }}
      >
        {/* Cardinal Directions */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-slate-400 font-bold text-lg">N</div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-600 font-bold text-lg">S</div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-lg">E</div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold text-lg">W</div>

        {/* Degree Ticks (Decorative) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div 
            key={deg}
            className="absolute top-0 left-1/2 w-0.5 h-3 bg-slate-700 origin-bottom"
            style={{ 
              height: '50%', 
              transform: `translateX(-50%) rotate(${deg}deg)`,
              transformOrigin: 'bottom center'
            }}
          >
            <div className="w-full h-4 bg-slate-600 absolute top-0"></div>
          </div>
        ))}

        {/* Qibla Indicator (The Gold Arrow/Icon on the Dial) */}
        <div 
          className="absolute top-0 left-1/2 w-1 h-1/2 origin-bottom transition-all duration-500"
          style={{ transform: `translateX(-50%) rotate(${qiblaBearing}deg)` }}
        >
          {/* The Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
             {/* Kaaba Icon / Target */}
             <div className={`p-2 rounded-xl transition-colors duration-300 ${isAligned ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]' : 'bg-amber-500'}`}>
                <Navigation className={`w-6 h-6 text-slate-900 ${isAligned ? '' : 'fill-slate-900'}`} style={{ transform: 'rotate(0deg)' }} />
             </div>
             {/* Line to center */}
             <div className={`w-0.5 h-24 mt-2 ${isAligned ? 'bg-green-500' : 'bg-amber-500/50'}`}></div>
          </div>
        </div>
      </div>

      {/* Static Center Hub (Does not rotate with dial) - Simulates the phone/user */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full z-10 shadow-lg border-2 border-slate-300"></div>
      
      {/* Fixed Indicator at Top of Device (User's Forward Direction) */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
         <div className="w-1 h-4 bg-red-500 rounded-full mb-1"></div>
         {status === CompassStatus.UNSUPPORTED && (
             <div className="flex items-center gap-1 text-xs text-red-400 whitespace-nowrap">
                 <AlertCircle className="w-3 h-3" />
                 <span>No sensor</span>
             </div>
         )}
      </div>
    </div>
  );
};