import Ingredient from "./Ingredient";
import RecipeTiming from "./RecipeTiming";

export enum Difficulty {
	"easy" = 1,
	"medium" = 2,
	"hard" = 3,
}

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
	serving: number;
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
