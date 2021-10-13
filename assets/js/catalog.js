window.addEventListener('load', () => {
	const header = document.getElementById('header')

	const navMenu = document.getElementById('nav-menu')
	const navLogo = document.getElementById('nav-logo')
	const navToggle = document.getElementById('nav-toggle')
	const toggleIcon = navToggle.querySelector('.nav__toggle-icon')

	const modalItems = header.querySelectorAll('.modal__window')
	const buttonNavItems = header.querySelectorAll('.nav__btn')
	const modalCounter = document.querySelectorAll('.counter-action')
	const scrollUpLink = document.getElementById('scroll-up')

	const productsLikeBtns = document.querySelectorAll('.products__btn-like')
	const productsBuyBtns = document.querySelectorAll('.products__btn-buy')

	const preloader = document.getElementById('preloader')

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

	/* filter select */
	if ($('.filter__select')) {
		$('.filter__select').niceSelect()
	}

	/* products button */
	if (productsLikeBtns && productsBuyBtns) {
		productsBtnChange(
			productsLikeBtns,
			'in-liked' //! if there is this class, then the product should be added to Favorites
		)

		productsBtnChange(
			productsBuyBtns,
			'in-shop-bag' //! if there is this class, then the product should be added to the Shopping cart
		)
	}

	/* format footer phone */
	if (footerPhoneNumber) {
		footerPhoneNumber.textContent = formatPhoneNumber(
			footerPhoneNumber.textContent
		)
	}

	if (window.navigator.userAgentData.mobile) {
		if (footerItems) {
			/* footer accordion */
			accordionItems(
				footerItems,
				'.footer__header',
				'.footer-open',
				'.footer__list'
			)
		}
	}

	/* scroll up */
	if (scrollUpLink) {
		scrollLink(scrollUpLink)
	}

	/* scroll */
	window.addEventListener('scroll', () => {
		scrollHeader()
		scrollUp(scrollUpLink)
	})
})
