'use client';

interface MealCardProps {
    name: string;
    url: string;
    image?: string;
    ingredients?: string[];
}

export default function MealCard({ name, url, image, ingredients }: MealCardProps) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start gap-4 h-24">
                <div className="flex-1 flex flex-col justify-between h-full">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {name}
                    </h3>
                    
                    {ingredients && ingredients.length > 0 && (
                        <div className="mb-2">
                            <p className="text-sm text-gray-600 mb-1">Ingredients:</p>
                            <div className="flex flex-wrap gap-1">
                                {ingredients.map((ingredient, idx) => (
                                    <span 
                                        key={idx}
                                        className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                                    >
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-all duration-200 font-semibold text-base"
                    >
                        Go to Recipe →
                    </a>
                </div>
                
                {image && (
                    <div className="flex-shrink-0">
                        <img 
                            src={image} 
                            alt={`${name} recipe`}
                            className="w-24 h-24 object-cover rounded-lg shadow-sm"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
