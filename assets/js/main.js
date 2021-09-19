const navMenu = document.getElementById('nav-menu')
const navLogo = document.getElementById('nav-logo')
const navToggle = document.getElementById('nav-toggle')
const toggleIcon = navToggle.querySelector('.nav__toggle-icon')

const navLink = document.querySelectorAll('.nav__link')
const sections = document.querySelectorAll('section[id]')

const scrollUpLink = document.getElementById('scroll-up')

const trandingList = document.getElementById('tranding-list')
const trandingToggle = document.getElementById('tranding-toggle')

const productsLikeBtn = document.querySelectorAll('.products__btn-like')
const productsBuyBtn = document.querySelectorAll('.products__btn-buy')

/* secondary functions */
const changesClasses = (el, method, className) => {
	if (Array.isArray(className)) {
		return el.classList[method](...className)
	} else {
		return el.classList[method](className)
	}
}

const getId = link => link.getAttribute('href').replace('#', '')

/* additional functions */
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

/* navbar */
if (navMenu && navToggle && navLogo) {
	if (
		navMenu.classList.contains('show-menu') ||
		navLogo.classList.contains('show-logo')
	) {
		changesClasses(navMenu, 'remove', 'show-menu')
		changesClasses(navLogo, 'remove', 'show-logo')
		changesClasses(toggleIcon, 'remove', 'bx-x')

		changesClasses(document.body, 'remove', 'no-scroll')
	}

	navToggle.addEventListener('click', () => {
		if (!navMenu.classList.contains('show-menu')) {
			changesClasses(navMenu, 'add', 'show-menu')
			changesClasses(navLogo, 'add', 'show-logo')
			changesClasses(toggleIcon, 'add', 'bx-x')

			changesClasses(document.body, 'add', 'no-scroll')
		} else {
			changesClasses(navMenu, 'remove', 'show-menu')
			setTimeout(() => changesClasses(navLogo, 'remove', 'show-logo'), 300)
			changesClasses(toggleIcon, 'remove', 'bx-x')

			changesClasses(document.body, 'remove', 'no-scroll')
		}
	})
}

/* navlink */
if (navLink) {
	navLink.forEach(link =>
		link.addEventListener('click', event => {
			event.preventDefault()
			changesClasses(navMenu, 'remove', 'show-menu')
			changesClasses(navLogo, 'remove', 'show-logo')
			changesClasses(toggleIcon, 'remove', 'bx-x')

			changesClasses(document.body, 'remove', 'no-scroll')

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

/* tranding list */
if (trandingList && trandingToggle) {
	const trandingIcon = trandingToggle.querySelector('.tranding__toggle-icon')

	if (trandingList.classList.contains('show-list')) {
		changesClasses(trandingList, 'remove', 'show-list')
		changesClasses(trandingIcon, 'remove', 'bx-x')
	}

	trandingToggle.addEventListener('click', event => {
		event.preventDefault()

		if (!trandingList.classList.contains('show-list')) {
			changesClasses(trandingList, 'add', 'show-list')
			changesClasses(trandingIcon, 'add', 'bx-x')

			console.log(event.target)

		} else {
			changesClasses(trandingList, 'remove', 'show-list')
			changesClasses(trandingIcon, 'remove', 'bx-x')
		}
	})
}

/* products button */
if (productsLikeBtn && productsBuyBtn) {
	const productsBtnChange = (btns, iconClass, activeClass, iconClassChange) => {
		btns.forEach(btn => {
			const icon = btn.querySelector(iconClass)

			btn.addEventListener('click', event => {
				event.preventDefault()

				if (!btn.classList.contains(activeClass)) {
					changesClasses(btn, 'add', activeClass)
					changesClasses(icon, 'remove', `bx-${iconClassChange}`)
					changesClasses(icon, 'add', `bxs-${iconClassChange}`)
				} else {
					changesClasses(btn, 'remove', activeClass)
					changesClasses(icon, 'add', `bx-${iconClassChange}`)
					changesClasses(icon, 'remove', `bxs-${iconClassChange}`)
				}
			})
		})
	}

	productsBtnChange(
		productsLikeBtn,
		'.products-liked',
		'in-liked', //! if there is this class, then the product should be added to Favorites
		'heart'
	)

	productsBtnChange(
		productsBuyBtn,
		'.products-shop-bag',
		'in-shop-bag', //! if there is this class, then the product should be added to the Shopping cart
		'shopping-bag'
	)
}

/* scroll up */
scrollUpLink.addEventListener('click', event => {
	event.preventDefault()

	window.scrollTo({ top: 0, behavior: 'smooth' })
})

/* slider */
// new Swiper('.swiper', {
// 	direction: 'vertical',
// 	slidesPerView: 1,
// 	loop: true,
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},
// })

/* scroll */
window.addEventListener('scroll', () => {
	scrollActive()
	scrollHeader()
	scrollUp()
})
