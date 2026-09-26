import { recipeRequestSchema, type RecipeRequest } from "./recipe.schema.js";
import type { RecipeService } from "./recipe.service.js";
import type { Request, Response } from "express";

export class RecipeController {
  constructor(private service: RecipeService) {}

  public postGenerateRecipe = async (req: Request, res: Response) => {
    const recipeRequest: RecipeRequest = recipeRequestSchema.parse(req.body);

    const result = await this.service.generateRecipe(recipeRequest);

    if (!result) {
      return res
        .status(500)
        .json({ message: "Generate recipe failed. Server error." });
    }

    return res.status(201).json(result);
  };
}
