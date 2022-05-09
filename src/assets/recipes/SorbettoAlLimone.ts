import Recipe from "../../types/Recipe";
import { Difficulty } from "../../types/RecipeDifficulty";

export default {
	name: "Sorbetto al limone",
	category: "DESSERT",
	difficulty: Difficulty.easy,
	servings: 4,
	imgUri:
		"https://www.giallozafferano.it/images/ricette/182/18291/foto_hd/hd650x433_wm.jpg",
	timing: {
		preparation: {
			time: 20,
			uom: "m",
		},
		waiting: {
			time: 5.3,
			uom: "h",
		},
		total: {
			time: 6,
			uom: "h",
		},
	},
	ingredients: [
		{
			title: "main",
			showTitle: false,
			ingredients: [
				{
					name: "Acqua",
					quantity: 300,
					uom: "ml",
				},
				{
					name: "Pasta di mandorle in panetto",
					quantity: 200,
					uom: "g",
				},
			],
		},
	],
	steps: [
		{
			step: "Sciogliere il panetto nell'acqua.",
		},
		{
			step: "Versare il liquido ottenuto in una ciotola e riporre in freezer.",
			imgUri:
				"https://wips.plug.it/cips/buonissimo.org/cms/2012/07/ricetta-base-sorbetto.jpg?w=541&a=c&h=309",
		},
		{
			step: "Mescolare ogni 2 ore.",
			imgUri:
				"https://wips.plug.it/cips/buonissimo.org/cms/2012/07/ricetta-base-sorbetto.jpg?w=541&a=c&h=309",
		},
	],
} as Recipe;
