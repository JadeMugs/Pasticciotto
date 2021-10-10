import Recipe, { Difficulty } from "../types/Recipe";

const recipes: Recipe[] = [
	{
		name: "Sorbetto al limone",
		category: "DESSERT",
		difficulty: Difficulty.easy,
		serving: 4,
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
	},
	{
		name: "Brioches con tuppo",
		category: "DESSERT",
		difficulty: Difficulty.medium,
		serving: 6,
		imgUri:
			"https://www.sicilianicreativiincucina.it/wp-content/uploads/2018/02/briocheatupposiciliane2.jpg",
		timing: {
			preparation: {
				time: 40,
				uom: "m",
			},
			waiting: {
				time: 3.3,
				uom: "h",
			},
			total: {
				time: 4.17,
				uom: "h",
			},
		},
		ingredients: [
			{
				title: "main",
				showTitle: false,
				ingredients: [
					{
						name: "Farina 00 o manitoba",
						quantity: 500,
						uom: "g",
					},
					{
						name: "Zucchero",
						quantity: 100,
						uom: "g",
					},
					{
						name: "Vanillina",
						quantity: 1,
						uom: "bustina",
					},
					{
						name: "Sale",
						quantity: 8,
						uom: "g",
					},
					{
						name: "Lievito di birra",
						quantity: 12,
						uom: "g",
					},
					{
						name: "Uovo",
						quantity: 1,
						uom: "",
					},
					{
						name: "Olio di semi",
						quantity: 70,
						uom: "g",
					},
					{
						name: "Latte (a temperatura ambiente)",
						quantity: 250,
						uom: "ml",
					},
					{
						name: "Scorza di limone",
						quantity: 1,
						uom: "",
					},
				],
			},
		],
		steps: [
			{
				step: "Mescolare gli ingredienti secchi e il lievito spezzettato",
			},
			{
				step: "Versare il composto su un piano di lavoro e formare una fontana.",
			},
			{
				step: "Mescolare gli ingredienti liquidi in una ciotola, poi versarli e mescolarli all'interno della fontana poco alla volta.",
			},
			{
				step: "Impastare fino ad ottenere un panetto morbido.",
			},
			{
				step: "Spostare l'impasto in una ciotola capiente e coprire con coperchio o strofinaccio e mettere a lievitare in forno con la luce accesa per 2 ore. L'impasto diventerà circa il doppio.",
			},
			{
				step: "E' ora di modellare le brioches. Formare una pallina tonda di 90g per la base e una pallina di 30g con l'estremità inferiore allungata per il tuppo.",
			},
			{
				step: "Premere con il dito la parte centrare della pallina più grossa e adagiarvi sopra l'estremità allungata di quella piccola.",
				imgUri:
					"https://4.bp.blogspot.com/-c87k5l2HrFk/WXmxhaPwFnI/AAAAAAAAHiE/ZqqnFlc5RZEKLKDYbP1AJigdA4cGAxl4gCLcBGAs/s1600/brioche%2Bcol%2Btuppo%2Blievitate%25C2%25A9.jpg",
			},
			{
				step: "Lasciare riposare in forno con la luce accesa per circa un'ora.\n\n",
			},
			{
				step: "Una volta lievitare, togliere le brioches dal forno e preriscaldarlo a 180 gradi.",
			},
			{
				step: "Sbattere un uovo (o tuorlo e latte se non si è amanti dell'odore di tuorlo) e spennellare la superfice delle brioches in modo da renderle dorate durante la cottura.",
			},
			{
				step: "Informare le brioches per 10 minuti a 180°, portare poi il forno a 150° e ultimare la cottura per altri 20 minuti o fino a doratura.",
				imgUri:
					"https://www.sicilianicreativiincucina.it/wp-content/uploads/2018/02/briocheatupposiciliane2.jpg",
			},
		],
	},
];

export default recipes;
