
const navMenu = document.getElementById('nav-menu')
const navLogo = document.getElementById('nav-logo')
const navToggle = document.getElementById('nav-toggle')
const toggleIcon = navToggle.querySelector('.nav__toggle-icon')

const navLink = document.querySelectorAll('.nav__link')
const sections = document.querySelectorAll('section[id]')

const scrollUpLink = document.getElementById('scroll-up')

// secondary functions
const changesClasses = (el, method, className) => {
	if (Array.isArray(className)) {
		return el.classList[method](...className)
	} else {
		return el.classList[method](className)
	}
}

const getId = link => link.getAttribute('href').replace('#', '')

// additional functions
function scrollActive() {
	const scrollY = window.pageYOffset

	sections.forEach(current => {
		const sectionHeight = current.offsetHeight
		const sectionTop = current.offsetTop - 50
		let sectionId = current.getAttribute('id')

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			changesClasses(
				document.querySelector(`.nav__menu a[href*=${sectionId}]`),
				'add',
				'active-link'
			)
		} else {
			changesClasses(
				document.querySelector(`.nav__menu a[href*=${sectionId}]`),
				'remove',
				'active-link'
			)
		}
	})
}

function scrollHeader() {
	const header = document.getElementById('header')

	if (this.scrollY >= 100) {
		changesClasses(header, 'add', 'scroll-header')
	} else {
		changesClasses(header, 'remove', 'scroll-header')
	}
}

function scrollUp() {
	if (this.scrollY >= 200) {
		changesClasses(scrollUpLink, 'add', 'show-scroll-link')
	} else {
		changesClasses(scrollUpLink, 'remove', 'show-scroll-link')
	}
}

// navbar
if (navMenu && navToggle && navLogo) {
	if (
		navMenu.classList.contains('show-menu') ||
		navLogo.classList.contains('show-logo')
	) {
		changesClasses(navMenu, 'remove', 'show-menu')
		changesClasses(navLogo, 'remove', 'show-logo')
		changesClasses(toggleIcon, 'remove', 'bx-x')
	}

	navToggle.addEventListener('click', () => {
		if (!navMenu.classList.contains('show-menu')) {
			changesClasses(navMenu, 'add', 'show-menu')
			changesClasses(navLogo, 'add', 'show-logo')
			changesClasses(toggleIcon, 'add', 'bx-x')
		} else {
			changesClasses(navMenu, 'remove', 'show-menu')
			setTimeout(() => changesClasses(navLogo, 'remove', 'show-logo'), 300)
			changesClasses(toggleIcon, 'remove', 'bx-x')
		}
	})
}

if (navLink) {
	navLink.forEach(link =>
		link.addEventListener('click', event => {
			event.preventDefault()
			changesClasses(navMenu, 'remove', 'show-menu')
			changesClasses(navLogo, 'remove', 'show-logo')
			changesClasses(toggleIcon, 'remove', 'bx-x')

			const scrollTarget = document.getElementById(getId(link))

			if (scrollTarget) {
				const topOffset = 0
				const elementPosition = scrollTarget.getBoundingClientRect().top
				const offsetPosition = elementPosition - topOffset

				window.scrollBy({
					top: offsetPosition,
					behavior: 'smooth',
				})
			}
		})
	)
}

// if (navLink) {
// 	navLink.forEach(link => {
// 		link.addEventListener('click', event => {
// 			event.preventDefault()

// 			const scrollTarget = document.getElementById(getId(link))

// 			const topOffset = 0
// 			const elementPosition = scrollTarget.getBoundingClientRect().top
// 			const offsetPosition = elementPosition - topOffset

// 			window.scrollBy({
// 				top: offsetPosition,
// 				behavior: 'smooth',
// 			})
// 		})
// 	})
// }

// scroll up
scrollUpLink.addEventListener('click', event => {
	event.preventDefault()

	window.scrollTo({ top: 0, behavior: 'smooth' })
})

// scroll
window.addEventListener('scroll', () => {
	scrollActive()
	scrollHeader()
	scrollUp()
})
