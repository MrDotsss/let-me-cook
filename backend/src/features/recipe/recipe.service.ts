import { GoogleGenAI } from "@google/genai";
import { env } from "../../config/env.config.js";
import {
  recipeDataJsonSchema,
  recipeDataSchema,
  unsplashResultSchema,
  type Recipe,
  type RecipeImage,
  type RecipeIngredient,
  type RecipeRequest,
} from "./recipe.schema.js";

export class RecipeService {
  private gemini = new GoogleGenAI({ apiKey: env.AI_KEYS.gemini });
  private gemini_models: string[] = [
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
  ];

  private formatIngredientsToString = (
    ingredients: RecipeIngredient[],
  ): string => {
    return ingredients
      .map(({ name, quantity }) => `${quantity} ${name}`)
      .join(", ");
  };

  private getRecipePrompt = (recipeRequest: RecipeRequest): string => {
    const ingredients = this.formatIngredientsToString(
      recipeRequest.ingredients,
    );

    const tastes = recipeRequest.tastes.join(", ");

    return `
    Find a real recipe from the following request:
    ${
      ingredients && ingredients.length > 0
        ? `
    Ingredients: ${ingredients}
    ${recipeRequest.addMoreIngredient ? "You can add more ingredient only if needed." : null}
    `
        : null
    }.
    ${tastes && tastes.length > 0 ? `Tastes: ${tastes}` : null}.
    Serving size: ${recipeRequest.servingSize}

    ${recipeRequest.specialRequest.trim().length > 0 ? recipeRequest.specialRequest : null}
    `;
  };

  public generateRecipe = async (
    recipeRequest: RecipeRequest,
  ): Promise<Recipe | null> => {
    for (const model of this.gemini_models) {
      try {
        const response = await this.gemini.models.generateContent({
          model: model,
          contents: this.getRecipePrompt(recipeRequest),
          config: {
            responseMimeType: "application/json",
            responseSchema: recipeDataJsonSchema,
          },
        });

        if (response.text?.trim()) {
          try {
            const data = recipeDataSchema.parse(JSON.parse(response.text));
            const image = await this.getRecipeImage(data.recipe_name);
            return { chef: "Gemini", data, image };
          } catch (error) {
            console.error(`${model} returns wrong schema.`, error);
          }
        }
      } catch (error) {
        console.warn(`Model ${model} failed\n${error}`);
      }
    }

    throw new Error("All fallback gemini models failed.");
  };

  public getRecipeImage = async (
    recipe_name: string,
  ): Promise<RecipeImage | null | undefined> => {
    const url = `https://api.unsplash.com/search/photos/?query="${recipe_name}"&per_page=1&client_id=${env.UNSPLASH_KEY}`;

    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        console.error(`Failed image for for recipe: ${recipe_name}`);
        return null;
      }

      const json = await response.json();

      const result = unsplashResultSchema.parse(json);
      return result.results[0];
    } catch (error) {
      console.error(`Error finding recipe image of ${recipe_name}`, error);
    }

    return null;
  };
}
