import Time from "./Time";

interface RecipeTiming {
	preparation: Time;
	waiting?: Time;
	total: Time;
}

export default RecipeTiming;
