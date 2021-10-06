import Ingredient from "./Ingredient";
import RecipeTiming from "./RecipeTiming";

export enum Difficulty {
	"easy" = 1,
	"medium" = 2,
	"hard" = 3,
}

interface Recipe {
	name: string;
	category: string;
	imgUri: string;
	difficulty: Difficulty;
	timing: RecipeTiming;
	serving: number;
	tags?: string[];
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
