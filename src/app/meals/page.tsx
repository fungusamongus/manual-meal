'use client';

import { useEffect, useState } from "react";
import MealsSearch from "@/components/meals/meals-search";
import { MealResult, searchMeals } from "./actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import MealCard from "@/components/meals/meal-card";
import LoadingAnimation from "@/components/meals/loading-animation";

export default function Meals() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<MealResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (searchQuery) {
            setIsLoading(true);
            const results: MealResult[] | null = await searchMeals(searchQuery);

            if (results) {
                setSearchResults(results);
            } else {
                setSearchResults([]);
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="font-serif min-h-screen flex flex-col justify-start pb-8">
            <div className="flex flex-col items-center gap-4 p-8">
                <p className="text-center font-bold">Find some recipe recommendations from my favorite youtube chefs</p>
                
                <MealsSearch 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={handleSearch}
                    setSearchResults={setSearchResults}
                />
                
                {isLoading && (
                    <div className="mt-6 w-full max-w-4xl">
                        <LoadingAnimation />
                    </div>
                )}
                
                {searchResults.length > 0 && !isLoading && (
                    <div className="mt-6 w-full max-w-4xl">
                        <h2 className="text-2xl font-semibold text-center mb-4">
                            Results for "{searchQuery.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}"
                        </h2>
                        
                        <ScrollArea className="h-96 w-full rounded-md border">
                            <div className="py-4 px-8 space-y-3">
                                {searchResults.map((meal, index) => (
                                    <MealCard
                                        key={`meal-${index}`}
                                        name={meal.name}
                                        url={meal.url}
                                        image={meal.image}
                                        ingredients={meal.ingredients}
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                )}
            </div>
        </div>  
    );
}