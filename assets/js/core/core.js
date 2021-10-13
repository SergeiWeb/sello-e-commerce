export const changesClasses = (el, method, className) => {
	if (Array.isArray(className)) {
		return el.classList[method](...className)
	} else {
		return el.classList[method](className)
	}
}
