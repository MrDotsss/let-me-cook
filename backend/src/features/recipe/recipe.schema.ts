import z from "zod";

const recipeIngredientSchema = z.object({
  name: z.string().describe("Name of the ingredient."),
  quantity: z
    .string()
    .describe("Quantity of the ingredient, including the unit."),
});

type RecipeIngredient = z.infer<typeof recipeIngredientSchema>;

const recipeDataSchema = z.object({
  recipe_name: z.string().describe("The name of the recipe."),
  recipe_description: z
    .string()
    .describe("A short description about the recipe."),
  tastes: z.array(z.string()).describe("List of taste of the dish."),
  cook_time_minutes: z
    .int()
    .describe("Estimated time in minutes of the recipe to serve."),
  servingSize: z.int().describe("Expected serving size of the recipe."),
  ingredients: z.array(recipeIngredientSchema).describe("List of ingredients."),
  instructions: z
    .array(z.string())
    .describe("List of instructions for the recipe."),
});

type RecipeData = z.infer<typeof recipeDataSchema>;
type Recipe = {
  chef: string;
  data: RecipeData;
  image: RecipeImage | null | undefined;
};

const recipeDataJsonSchema = z.toJSONSchema(recipeDataSchema);

const recipeRequestSchema = z.object({
  ingredients: z
    .array(recipeIngredientSchema)
    .describe("List of available ingredients for the recipe."),
  tastes: z.array(z.string()).describe("List of taste for the desired recipe."),
  servingSize: z.int().describe("Expected serving size of the recipe."),
  addMoreIngredient: z.boolean(),
  specialRequest: z
    .string()
    .describe(`User's additional request for the recipe they want.`),
});

type RecipeRequest = z.infer<typeof recipeRequestSchema>;

// image
const unsplashImageSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  width: z.number(),
  height: z.number(),
  description: z.string().nullable(),
  urls: z.object({
    raw: z.string(),
    full: z.string(),
    regular: z.string(),
    small: z.string(),
    thumb: z.string(),
    small_s3: z.string(),
  }),
  slug: z.string(),
  alt_description: z.string(),
  links: z.object({
    html: z.string(),
  }),
  user: z.object({
    id: z.string(),
    name: z.string(),
    portfolio_url: z.string(),
    links: z.object({
      html: z.string(),
    }),
  }),
});

type RecipeImage = z.infer<typeof unsplashImageSchema>;

const unsplashResultSchema = z.object({
  total: z.number(),
  total_pages: z.number(),
  results: z.array(unsplashImageSchema),
});

type UnsplashResult = z.infer<typeof unsplashResultSchema>;

export {
  recipeIngredientSchema,
  recipeDataSchema,
  recipeRequestSchema,
  recipeDataJsonSchema,
  unsplashResultSchema,
  unsplashImageSchema,
};

export type {
  RecipeIngredient,
  Recipe,
  RecipeData,
  RecipeRequest,
  RecipeImage,
  UnsplashResult,
};
