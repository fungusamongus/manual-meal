'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MealResult } from "@/app/meals/actions";

interface MealsSearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearch: () => void;
    setSearchResults: (results: MealResult[]) => void;
}

export default function MealsSearch({ searchQuery, setSearchQuery, onSearch }: MealsSearchProps) {
    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <Input 
                className="w-full" 
                type="text" 
                placeholder="Input a dish name" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
                onClick={onSearch} 
                disabled={!searchQuery.trim()}
                className="cursor-pointer"
            >
                Search
            </Button>
        </div>
    );
}
