import { Ingredient, Recipe, FridgeScene } from "./types";

export const PRELOADED_RECIPES: Recipe[] = [
  {
    id: "rec_1",
    name: "High Protein Chicken Bowl",
    calories: 520,
    protein: 42,
    carbs: 38,
    fat: 18,
    fiber: 7,
    cookingTime: 25,
    difficulty: "Medium",
    ingredientsUsed: ["Chicken Breast", "Spinach", "Tomatoes", "Avocado"],
    ingredientsDetail: [
      { name: "Grilled chicken breast", qty: "320g" },
      { name: "Jasmine rice", qty: "1.5 cups" },
      { name: "Fresh spinach", qty: "1 cup" },
      { name: "Cherry tomatoes", qty: "80g" },
      { name: "Avocado slices", qty: "0.5 pcs" },
      { name: "Extra virgin olive oil", qty: "1 tbsp" }
    ],
    description: "A balanced high-protein meal designed for muscle recovery and sustained energy.",
    steps: [
      "Dice the chicken breast into bite-sized cubes and season with salt, black pepper, and garlic powder.",
      "Heat a cast-iron skillet over medium heat, add 1 tbsp of olive oil, and sear chicken for 6-8 minutes until golden and thoroughly cooked.",
      "Prepare jasmine rice as the grain base and spoon into a warm serving bowl.",
      "Thoroughly clean the baby spinach leaves and cherry tomatoes, slice the tomatoes in halves, and Fan-slice the avocado.",
      "Assemble by placing spinach, cherry tomatoes, seared chicken cubes, and half an avocado over the bed of rice.",
      "Drizzle with clean vinaigrette or visual highlights and serve warm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    servingSize: "1 Serving",
    wellnessTip: "Rich in clean monounsaturated fats from avocado, supporting cardiovascular wellness and joint recovery."
  },
  {
    id: "rec_2",
    name: "Spinach Omelette Wrap",
    calories: 410,
    protein: 28,
    carbs: 24,
    fat: 20,
    fiber: 5,
    cookingTime: 12,
    difficulty: "Easy",
    ingredientsUsed: ["Eggs", "Spinach", "Cheese"],
    ingredientsDetail: [
      { name: "Fresh eggs", qty: "3 pcs" },
      { name: "Baby spinach", qty: "2 cups" },
      { name: "Cheddar/parmesan cheese", qty: "50g" },
      { name: "Whole wheat tortilla", qty: "1 pc" },
      { name: "Red onion", qty: "1/4 diced" }
    ],
    description: "A quick protein-focused breakfast wrap with healthy fats and micronutrients.",
    steps: [
      "Whisk three large farm-fresh eggs in a small bowl with a pinch of sea salt and pepper.",
      "In a non-stick pan, sauté diced red onion and baby spinach until the spinach is lightly wilted (about 2 minutes).",
      "Pour the whisked egg mixture evenly over the spinach, cooking on low-medium heat until the eggs begin to set.",
      "Sprinkle shredded cheddar cheese evenly over the setting omelette, allowing it to begin melting.",
      "Warm the whole wheat tortilla in a separate pan, slide the finished omelette flat onto the center, wrap it tightly, and serve sliced in half."
    ],
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop",
    servingSize: "1 Wrap",
    wellnessTip: "Excellent source of choline from whole eggs for optimal brain health and neurotransmitter function."
  },
  {
    id: "rec_3",
    name: "Creamy Garlic Chicken Pasta",
    calories: 670,
    protein: 46,
    carbs: 58,
    fat: 27,
    fiber: 6,
    cookingTime: 35,
    difficulty: "Hard",
    ingredientsUsed: ["Chicken Breast", "Cheese", "Milk"],
    ingredientsDetail: [
      { name: "Premium chicken breast", qty: "280g" },
      { name: "Durum wheat pasta", qty: "120g" },
      { name: "Parmesan cheese", qty: "40g" },
      { name: "Fresh garlic cloves", qty: "4 minced" },
      { name: "Low-fat milk/cream", qty: "150ml" },
      { name: "Italian mixed herbs", qty: "1 tsp" }
    ],
    description: "A comfort-focused high-protein pasta meal optimized for active lifestyles.",
    steps: [
      "Bring a large pot of salted water to a boil, cook the pasta until perfectly al dente, drain, and set aside while retaining 1/4 cup of starchy water.",
      "Rub chicken breast with Italian herbs and pan-sear in a splash of olive oil until fully cooked (interior temp reaches 165°F), then slice thinly on a slant.",
      "In the same pan, drop minced garlic and sauté on low heat for 1 minute until fragrant.",
      "Pour in the milk and bring to a lazy simmer. Slowly whisk in the grated parmesan cheese until the sauce becomes unified and velvety.",
      "Toss the hot pasta and chicken slices directly into the sauce, tossing over low heat for 1-2 minutes until beautifully coated. Splash in starchy water to adjust consistency if needed."
    ],
    imageUrl: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=800&auto=format&fit=crop",
    servingSize: "1 Plate",
    wellnessTip: "High-glycemic carbs paired with high-quality lean protein, optimal for fueling intense workouts or restoring glycogen reserves post-exercise."
  },
  {
    id: "rec_4",
    name: "Greek Yogurt Berry Bowl",
    calories: 320,
    protein: 24,
    carbs: 29,
    fat: 10,
    fiber: 6,
    cookingTime: 5,
    difficulty: "Easy",
    ingredientsUsed: ["Greek Yogurt", "Berries"],
    ingredientsDetail: [
      { name: "Plain non-fat Greek yogurt", qty: "250g" },
      { name: "Fresh organic blueberries", qty: "1/2 cup" },
      { name: "Fresh organic strawberries", qty: "1/2 cup" },
      { name: "Crunchy honey granola", qty: "30g" },
      { name: "Organic forest honey", qty: "1 tsp" }
    ],
    description: "A light nutrient-dense breakfast with protein and antioxidants.",
    steps: [
      "Spoon cool, thick Greek yogurt into the bottom of a wide ceramic wellness bowl.",
      "Rinse and dry the fresh blueberries and slice the sweet strawberries into wedges.",
      "Layer the fresh berries on one side of the bowl, then cascade crunchy oats granola down the alternate side for clean texture contrasts.",
      "Drizzle raw organic honey elegantly across the surface of the fruit and yogurt just before enjoying."
    ],
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop",
    servingSize: "1 Bowl",
    wellnessTip: "Packed with active live probiotic cultures to nourish the gut microbiome, alongside vitamin-C rich berries to combat physiological oxidative stress."
  }
];

export const FRIDGE_SCENES: FridgeScene[] = [
  {
    id: "wellness_fridge",
    name: "The Wellness Fridge",
    label: "Fresh, Green & Balanced",
    description: "Clean wellness shelf filled with farm fresh eggs, spinach, fresh berries, local cheeses, and milk.",
    url: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    preloadedIngredients: [
      { id: "ing_e1", name: "Eggs", category: "Protein", estimatedQty: 4, unit: "pcs", confidence: 99, checked: true, x: 18, y: 15, w: 22, h: 20 },
      { id: "ing_s1", name: "Spinach", category: "Vegetable", estimatedQty: 2, unit: "cups", confidence: 94, checked: true, x: 50, y: 40, w: 32, h: 25 },
      { id: "ing_c1", name: "Chicken Breast", category: "Protein", estimatedQty: 320, unit: "g", confidence: 97, checked: true, x: 15, y: 55, w: 25, h: 22 },
      { id: "ing_t1", name: "Tomatoes", category: "Vegetable", estimatedQty: 120, unit: "g", confidence: 96, checked: true, x: 65, y: 15, w: 18, h: 18 },
      { id: "ing_ch1", name: "Cheese", category: "Dairy", estimatedQty: 180, unit: "g", confidence: 92, checked: true, x: 52, y: 12, w: 12, h: 14 },
      { id: "ing_m1", name: "Milk", category: "Dairy", estimatedQty: 450, unit: "ml", confidence: 95, checked: true, x: 38, y: 12, w: 10, h: 32 }
    ]
  },
  {
    id: "athletes_pantry",
    name: "The Athlete Prep Core",
    label: "High Protein focus",
    description: "Focused muscle-building tray containing double portion chicken breasts, eggs, Greek yogurt, and pasta base.",
    url: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1200&auto=format&fit=crop",
    preloadedIngredients: [
      { id: "ing_e2", name: "Eggs", category: "Protein", estimatedQty: 8, unit: "pcs", confidence: 99, checked: true, x: 30, y: 20, w: 25, h: 18 },
      { id: "ing_c2", name: "Chicken Breast", category: "Protein", estimatedQty: 640, unit: "g", confidence: 98, checked: true, x: 10, y: 50, w: 35, h: 30 },
      { id: "ing_y2", name: "Greek Yogurt", category: "Dairy", estimatedQty: 500, unit: "g", confidence: 93, checked: true, x: 65, y: 50, w: 25, h: 25 },
      { id: "ing_b2", name: "Berries", category: "Fruit", estimatedQty: 150, unit: "g", confidence: 91, checked: true, x: 55, y: 18, w: 20, h: 20 },
      { id: "ing_s2", name: "Spinach", category: "Vegetable", estimatedQty: 1, unit: "cup", confidence: 89, checked: true, x: 12, y: 15, w: 15, h: 15 }
    ]
  },
  {
    id: "fresh_market",
    name: "Weekend Garden Basket",
    label: "Local Organic Yields",
    description: "Colorful counter basket containing fresh tomatoes, baby spinach, forest honey, and artisanal dairy milk.",
    url: "https://images.unsplash.com/photo-1626887006124-318e862447aa?q=80&w=1200&auto=format&fit=crop",
    preloadedIngredients: [
      { id: "ing_t3", name: "Tomatoes", category: "Vegetable", estimatedQty: 250, unit: "g", confidence: 98, checked: true, x: 25, y: 25, w: 25, h: 30 },
      { id: "ing_s3", name: "Spinach", category: "Vegetable", estimatedQty: 4, unit: "cups", confidence: 96, checked: true, x: 5, y: 15, w: 30, h: 35 },
      { id: "ing_m3", name: "Milk", category: "Dairy", estimatedQty: 1000, unit: "ml", confidence: 97, checked: true, x: 75, y: 10, w: 15, h: 60 },
      { id: "ing_ch3", name: "Cheese", category: "Dairy", estimatedQty: 100, unit: "g", confidence: 91, checked: true, x: 45, y: 60, w: 25, h: 25 },
      { id: "ing_b3", name: "Berries", category: "Fruit", estimatedQty: 200, unit: "g", confidence: 94, checked: true, x: 45, y: 20, w: 22, h: 22 }
    ]
  }
];
