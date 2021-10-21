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

	const filterSelects = document.querySelectorAll('select.filter__select')
	const filtersPriceInputs = document.querySelectorAll(
		'input.filter__price-input'
	)
	const filterClear = document.querySelector('.filter__clear')

	if (filterSelects) {
		function clearFilterFunc() {
			/* select */
			filterSelects.forEach(select => {
				const selectItems = Array.from(select.children)

				selectItems.forEach(item => {
					item.selected = false
					item.removeAttribute('selected')

					if (item.value === 'default') {
						item.selected = true
						item.setAttribute('selected', true)
					}

					$('.filter__select').niceSelect('update')
				})
			})

			/* input price */
			filtersPriceInputs.forEach(input => {
				if (input.id === 'price-from') {
					input.value = input.min
				}

				if (input.id === 'price-to') {
					input.value = input.max
				}
			})
		}

		filterClear.addEventListener('click', () => {
			// ajax_clear_filters()
			clearFilterFunc()
		})
	}

	/* filter labels */
	const filterHead = document.querySelector('.filter__head')

	if (filterHead) {
		function checkFilterItems() {
			const filterItems = filterHead.querySelectorAll('.filter__active-item')

			if (!filterItems.length) {
				changesClasses(filterHead, 'add', 'hidden-block')
			} else {
				changesClasses(filterHead, 'remove', 'hidden-block')
			}
		}

		checkFilterItems()
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

	const userMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)

	if (userMobile) {
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
