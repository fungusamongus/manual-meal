'use client';

export default function LoadingAnimation() {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
            {/* Cooking text with animated dots */}
            <div className="flex items-center space-x-1">
                <span className="text-lg font-semibold text-gray-700">Cooking</span>
                <div className="flex space-x-1">
                    <span className="animate-loading-dot-1 text-lg font-semibold text-gray-700">.</span>
                    <span className="animate-loading-dot-2 text-lg font-semibold text-gray-700">.</span>
                    <span className="animate-loading-dot-3 text-lg font-semibold text-gray-700">.</span>
                </div>
            </div>

            {/* Animated oblong box with sequential white segments */}
            <div className="relative w-64 h-8">
                <div className="absolute inset-0 flex px-4 justify-around items-center bg-red-200 border-2 border-red-600 rounded-full">
                    {/* First segment - appears first */}
                    <div className="animate-loading-segment-1 bg-white border-l-2 border-r-2 border-r-red-600 border-l-red-600 border-b-2 border-t-2 border-b-white border-t-white h-8 w-2"></div>
                    
                    {/* Second segment - appears second */}
                    <div className="animate-loading-segment-2 bg-white border-l-2 border-r-2 border-red-600 border-l-red-600 border-b-2 border-t-2 border-b-white border-t-white h-8 w-2"></div>
                    
                    {/* Third segment - appears third */}
                    <div className="animate-loading-segment-3 bg-white border-l-2 border-r-2 border-red-600 border-l-red-600 border-b-2 border-t-2 border-b-white border-t-white h-8 w-2"></div>
                </div>
            </div>
        </div>
    );
}
