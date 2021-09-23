window.addEventListener('load', () => {
	const header = document.getElementById('header')

	const navMenu = document.getElementById('nav-menu')
	const navLogo = document.getElementById('nav-logo')
	const navToggle = document.getElementById('nav-toggle')
	const toggleIcon = navToggle.querySelector('.nav__toggle-icon')

	const modalItems = header.querySelectorAll('.modal__window')
	const buttonNavItems = header.querySelectorAll('.nav__btn')

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

	const counterAction = document.querySelectorAll('.counter-action')

	/* preloader */
	if (preloader) {
		setTimeout(() => {
			changesClasses(document.body, 'remove', 'no-scroll')
			changesClasses(preloader, 'add', 'hide')
			load = false
		}, 1000)
		setTimeout(() => preloader.remove(), 1200)
	}

	/* secondary functions */
	// changes classes
	const changesClasses = (el, method, className) => {
		if (Array.isArray(className)) {
			return el.classList[method](...className)
		} else {
			return el.classList[method](className)
		}
	}

	// get id
	const getId = link => link.getAttribute('href').replace('#', '')

	/* additional functions */
	// scroll active
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

	// scroll header
	function scrollHeader() {
		if (this.scrollY >= 100) {
			changesClasses(header, 'add', 'scroll-header')
		} else {
			changesClasses(header, 'remove', 'scroll-header')
		}
	}

	// scroll to section
	const scrollToSection = target => {
		const topOffset = 0
		const elementPosition = target.getBoundingClientRect().top
		const offsetPosition = elementPosition - topOffset

		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth',
		})
	}

	// accordion
	const toggleAccordionItem = (item, listClass, activeClass) => {
		const list = item.querySelector(listClass)

		if (item.classList.contains(activeClass)) {
			list.removeAttribute('style')
			changesClasses(item, 'remove', activeClass)
		} else {
			list.style.height = `${list.scrollHeight}px`
			changesClasses(item, 'add', activeClass)
		}
	}

	const accordionItems = (items, headerClass, activeClass, listClass) => {
		items.forEach(item => {
			const catalogHeader = item.querySelector(headerClass)

			catalogHeader.addEventListener('click', () => {
				const openItem = document.querySelector(activeClass)

				toggleAccordionItem(item, listClass, activeClass.replace('.', ''))

				if (openItem && openItem !== item) {
					toggleAccordionItem(openItem, listClass, activeClass.replace('.', ''))
				}
			})
		})
	}

	// modal
	const closeModal = () => {
		modalItems.forEach(modal => changesClasses(modal, 'remove', 'open-modal'))
		buttonNavItems.forEach(button =>
			changesClasses(button, 'remove', 'active-nav-btn')
		)
	}

	// format phone number
	function formatPhoneNumber(phoneNumberString = '') {
		const phoneTest = new RegExp(
			/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/
		)

		phoneNumberString = phoneNumberString.trim()
		const results = phoneTest.exec(phoneNumberString)
		if (results !== null && results.length > 8) {
			const intlCode = results[1] ? '+1 ' : ''
			return `${intlCode} (${results[3]}) ${results[4]}-${results[5]}${
				typeof results[8] !== 'undefined' ? ' x' + results[8] : ''
			}`
		} else {
			return phoneNumberString
		}
	}

	// scroll up
	function scrollUp() {
		if (this.scrollY >= 200) {
			changesClasses(scrollUpLink, 'add', 'show-scroll-link')
		} else {
			changesClasses(scrollUpLink, 'remove', 'show-scroll-link')
		}
	}

	// validate email
	const validateEmail = email => {
		const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		return regular.test(String(email).toLowerCase())
	}

	/* navbar */
	if (navMenu && navToggle && navLogo) {
		navToggle.addEventListener('click', () => {
			if (!navMenu.classList.contains('show-menu')) {
				changesClasses(navMenu, 'add', 'show-menu')
				changesClasses(navLogo, 'add', 'show-logo')
				changesClasses(toggleIcon, 'add', 'bx-x')

				closeModal()
				changesClasses(document.body, 'add', 'no-scroll')
			} else {
				changesClasses(navMenu, 'remove', 'show-menu')
				setTimeout(() => changesClasses(navLogo, 'remove', 'show-logo'), 300)
				changesClasses(toggleIcon, 'remove', 'bx-x')

				changesClasses(document.body, 'remove', 'no-scroll')
			}
		})
	}

	/* nav links */
	if (navLinks) {
		navLinks.forEach(link =>
			link.addEventListener('click', event => {
				event.preventDefault()
				changesClasses(navMenu, 'remove', 'show-menu')
				changesClasses(navLogo, 'remove', 'show-logo')
				changesClasses(toggleIcon, 'remove', 'bx-x')

				changesClasses(document.body, 'remove', 'no-scroll')
				closeModal()

				const scrollTarget = document.getElementById(getId(link))

				if (scrollTarget) {
					scrollToSection(scrollTarget)
				}
			})
		)
	}

	if (header) {
		/* modal cart && modal favorites */
		if (modalItems) {
			const actionModal = () => {
				buttonNavItems.forEach(btn => {
					modalItems.forEach(modal => {
						btn.addEventListener('click', event => {
							const openBtn = document.querySelector('.active-nav-btn')
							const openModal = document.querySelector('.open-modal')

							if (
								btn.classList.contains('favorites-toggle') &&
								modal.classList.contains('modal-favorites')
							) {
								if (openBtn && openModal) {
									changesClasses(openModal, 'remove', 'open-modal')
									changesClasses(openBtn, 'remove', 'active-nav-btn')
									changesClasses(document.body, 'remove', 'no-scroll')
								}

								if (openBtn !== btn) {
									if (!modal.classList.contains('open-modal')) {
										changesClasses(modal, 'add', 'open-modal')
										changesClasses(btn, 'add', 'active-nav-btn')
										changesClasses(document.body, 'add', 'no-scroll')
									} else {
										changesClasses(modal, 'remove', 'open-modal')
										changesClasses(btn, 'remove', 'active-nav-btn')
										changesClasses(document.body, 'remove', 'no-scroll')
									}
								}
							} else if (
								btn.classList.contains('cart-toggle') &&
								modal.classList.contains('modal-cart')
							) {
								if (openBtn && openModal) {
									changesClasses(openModal, 'remove', 'open-modal')
									changesClasses(openBtn, 'remove', 'active-nav-btn')
									changesClasses(document.body, 'remove', 'no-scroll')
								}

								if (openBtn !== btn) {
									if (!modal.classList.contains('open-modal')) {
										changesClasses(modal, 'add', 'open-modal')
										changesClasses(btn, 'add', 'active-nav-btn')
										changesClasses(document.body, 'add', 'no-scroll')
									} else {
										changesClasses(modal, 'remove', 'open-modal')
										changesClasses(btn, 'remove', 'active-nav-btn')
										changesClasses(document.body, 'remove', 'no-scroll')
									}
								}
							}
						})
					})
				})
			}

			actionModal()
		}
	}

	if (counterAction) {
		counterAction.forEach(item => {
			const itemPlus = item.querySelector('.counter-plus')
			const itemMinus = item.querySelector('.counter-minus')
			const itemInput = item.querySelector('.counter-input')

			itemMinus.addEventListener('click', () => {
				itemInput.stepDown()

				if (itemInput.value <= 20) {
					itemPlus.removeAttribute('disabled')
				}

				if (itemInput.value <= 1) {
					itemMinus.setAttribute('disabled', true)
				}
			})

			itemPlus.addEventListener('click', () => {
				itemInput.stepUp()

				if (itemInput.value >= 1) {
					itemMinus.removeAttribute('disabled')
				}

				if (itemInput.value >= 20) {
					itemPlus.setAttribute('disabled', true)
				}
			})
		})
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
		const productsBtnChange = (
			btns,
			iconClass,
			activeClass,
			iconClassChange
		) => {
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
		subscribeEmailInput.addEventListener('input', () => {
			const emailValue = subscribeEmailInput.value

			if (emailValue.length <= 0) {
				changesClasses(subscribeEmailInput, 'remove', ['success', 'invalid'])
			} else {
				if (validateEmail(emailValue)) {
					changesClasses(subscribeEmailInput, 'remove', 'invalid')
					changesClasses(subscribeEmailInput, 'add', 'success')

					setTimeout(
						() => changesClasses(subscribeEmailInput, 'remove', 'success'),
						1500
					)
				} else if (!validateEmail(emailValue)) {
					changesClasses(subscribeEmailInput, 'remove', 'success')
					changesClasses(subscribeEmailInput, 'add', 'invalid')
				}
			}
		})
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
		footerNavLinks.forEach(link => {
			link.addEventListener('click', event => {
				event.preventDefault()

				const scrollTarget = document.getElementById(getId(link))

				if (scrollTarget) {
					scrollToSection(scrollTarget)
				}
			})
		})
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
})
