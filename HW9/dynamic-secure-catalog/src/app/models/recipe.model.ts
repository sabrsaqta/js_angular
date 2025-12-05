export interface Recipe {
    id: number;
    title: string;
    image: string;
    summary: string;
    readyInMinutes: number;
    servings: number;
    spoonacularScore: number;
    pricePerServing: number;
    dishTypes: string[];
}