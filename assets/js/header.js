window.addEventListener('load', () => {
	const header = document.getElementById('header')

	const navMenu = document.getElementById('nav-menu')
	const navLogo = document.getElementById('nav-logo')
	const navToggle = document.getElementById('nav-toggle')
	const toggleIcon = navToggle.querySelector('.nav__toggle-icon')

	const modalItems = header.querySelectorAll('.modal__window')
	const buttonNavItems = header.querySelectorAll('.nav__btn')
	const modalCounter = document.querySelectorAll('.counter-action')

	const navLinks = document.querySelectorAll('.nav__link')
	const sections = document.querySelectorAll('section[id]')

	const scrollUpLink = document.getElementById('scroll-up')

	const trandingList = document.getElementById('tranding-list')
	const trandingToggle = document.getElementById('tranding-toggle')

	const productsLikeBtns = document.querySelectorAll('.products__btn-like')
	const productsBuyBtns = document.querySelectorAll('.products__btn-buy')

	const subscribeEmailInput = document.getElementById('subscribe-email-input')

	const preloader = document.getElementById('preloader')

	const catalogItems = document.querySelectorAll('.catalog__menu')

	const footerNavLinks = document.querySelectorAll('.footer__nav-link')
	const footerItems = document.querySelectorAll('.footer__data-item')

	const footerPhoneNumber = document.getElementById('footer-phone')

	/* preloader */
	if (preloader) {
		setTimeout(() => {
			changesClasses(document.body, 'remove', 'no-scroll')
			changesClasses(preloader, 'add', 'hide')
			load = false
		}, 1000)
		setTimeout(() => preloader.remove(), 1200)
	}

	/* navbar */
	if (navMenu && navToggle && navLogo) {
		openCloseNavMenu(
			navMenu,
			navToggle,
			navLogo,
			toggleIcon,
			modalItems,
			buttonNavItems
		)
	}

	/* nav links */
	if (navLinks) {
		navLinksFunc(
			navLinks,
			navMenu,
			navLogo,
			toggleIcon,
			modalItems,
			buttonNavItems
		)
	}

	/* modal cart && modal favorites */
	if (modalItems) {
		actionsModal(buttonNavItems, modalItems, '.active-nav-btn', '.open-modal')
	}

	/* modal counter */
	if (modalCounter) {
		counterFunc(
			modalCounter,
			'.counter-plus',
			'.counter-minus',
			'.counter-input'
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
			} else {
				changesClasses(trandingList, 'remove', 'show-list')
				changesClasses(trandingIcon, 'remove', 'bx-x')
			}
		})
	}

	/* products button */
	if (productsLikeBtns && productsBuyBtns) {
		productsBtnChange(
			productsLikeBtns,
			'.products-liked',
			'in-liked', //! if there is this class, then the product should be added to Favorites
			'heart'
		)

		productsBtnChange(
			productsBuyBtns,
			'.products-shop-bag',
			'in-shop-bag', //! if there is this class, then the product should be added to the Shopping cart
			'shopping-bag'
		)
	}

	/* subscribe email */
	if (subscribeEmailInput) {
		subscribeEmail(subscribeEmailInput)
	}

	/* catalog accordion */
	if (catalogItems) {
		accordionItems(
			catalogItems,
			'.catalog__header',
			'.catalog-open',
			'.catalog__list'
		)
	}

	/* format footer phone */
	if (footerPhoneNumber) {
		footerPhoneNumber.textContent = formatPhoneNumber(
			footerPhoneNumber.textContent
		)
	}

	/* footer accordion */
	if (footerItems) {
		accordionItems(
			footerItems,
			'.footer__header',
			'.footer-open',
			'.footer__list'
		)
	}

	/* footer links */
	if (footerNavLinks) {
		footerNavLink(footerNavLinks)
	}

	/* scroll up */
	if (scrollUpLink) {
		scrollLink(scrollUpLink)
	}

	/* scroll */
	window.addEventListener('scroll', () => {
		scrollActive(sections, `.nav__menu a`)
		scrollHeader()
		scrollUp(scrollUpLink)
	})
})
