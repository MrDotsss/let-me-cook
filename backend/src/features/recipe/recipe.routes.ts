import { Router } from "express";
import { RecipeController } from "./recipe.controller.js";
import { RecipeService } from "./recipe.service.js";

const recipeRoutes: Router = Router();
const service = new RecipeService();
const controller = new RecipeController(service);

recipeRoutes.post("/api/recipe/generate", controller.postGenerateRecipe);

export default recipeRoutes;
