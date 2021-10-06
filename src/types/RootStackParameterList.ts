import Recipe from "./Recipe";

export type RootStackParameterList = {
	Home: undefined;
	RecipeDetails: {
		recipe: Recipe;
	};
};
