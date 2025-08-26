'use server';

export type MealResult = {
    name: string;
    url: string;
    image?: string;
    ingredients?: string[];
}

export async function searchMeals(query: string) {
    try {
        const response = await fetch(`http://localhost:8000/meals?meals=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.result as MealResult[];
    } catch (error) {
        console.error('Error fetching meals:', error);
        return null;
    }
}
