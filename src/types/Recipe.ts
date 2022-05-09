import Ingredient from "./Ingredient";
import { Difficulty } from "./RecipeDifficulty";
import RecipeTiming from "./RecipeTiming";

export type RecipeDetails = {
	icon?: JSX.Element;
	iconName?: string;
	label: string;
	content: string | JSX.Element;
};

interface Recipe {
	name: string;
	category: string;
	imgUri: string;
	difficulty: Difficulty;
	timing: RecipeTiming;
	servings: number;
	tags?: string[];
	// recipeInfo: RecipeInfo;
	ingredients: {
		title: string;
		ingredients: Ingredient[];
		showTitle: boolean;
	}[];
	steps: {
		step: string;
		imgUri?: string;
	}[];
}

export default Recipe;
