class Slider {
	constructor(items) {
		this.items = items;
	}

	getSlideDirection(from, to) {
		const indexOfFrom = this.items.findIndex(element => element === from);
		const indexOfTo = this.items.findIndex(element => element === to);

		return indexOfFrom < indexOfTo ? "slide-fade-right" : "slide-fade-left";
	}
}

const MAIN_SLIDER_ORDER = [
	"profile",
	"investment",
	"dividends",
	"partner",
	"enprofile",
	"eninvestment",
	"endividends",
	"enpartner"
];
const AUTH_SLIDER_ORDER = ["signup", "", "ensignup", "en"];

const removeSlash = string => string.replace(/\//g, "");

const sliderController = items => (to, from) => {
	const toPath = removeSlash(to.path);
	const fromPath = from ? removeSlash(from.path) : null;

	const slider = new Slider(items);

	return slider.getSlideDirection(fromPath, toPath);
};

export const mainSliderController = sliderController(MAIN_SLIDER_ORDER);

export const authSliderController = sliderController(AUTH_SLIDER_ORDER);
