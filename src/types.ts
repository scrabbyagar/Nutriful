export interface Ingredient {
  id: string;
  name: string;
  category: "Protein" | "Vegetable" | "Dairy" | "Carb" | "Fruit" | "Condiment" | "Other";
  estimatedQty: number; // e.g., 250, 3, 1.5, etc.
  unit: string; // e.g., "g", "pcs", "cups", "ml"
  confidence: number; // confidence level 0 to 100
  checked: boolean; // toggle to include/exclude in current session
  
  // Annotation overlays mapping to simulated relative positioning on scan images (0 - 100)
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export interface Recipe {
  id: string;
  name: string;
  calories: number; // kcal
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  fiber: number; // g
  cookingTime: number; // mins
  difficulty: DifficultyLevel;
  ingredientsUsed: string[]; // names list
  ingredientsDetail: { name: string; qty: string }[];
  description: string;
  steps: string[];
  imageUrl: string;
  servingSize: string;
  wellnessTip?: string;
}

export interface FridgeScene {
  id: string;
  name: string;
  label: string;
  description: string;
  url: string;
  preloadedIngredients: Ingredient[];
}
