import { Subject } from "rxjs"

class Services {
	/**
	 * The navbar subject for firing subscribers event when the navbar changes
	 * So that other elements in the navbar can correspond accordingly
	 * Takes two next values
	 *
	 */
	public navbar = new Subject<"brand" | "transparent">();

}

export default new Services();