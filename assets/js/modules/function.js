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

// scroll active
function scrollActive(sections, link) {
	const scrollY = window.pageYOffset

	sections.forEach(current => {
		const sectionHeight = current.offsetHeight
		const sectionTop = current.offsetTop - 50
		let sectionId = current.getAttribute('id')

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			changesClasses(
				document.querySelector(`${link}[href*=${sectionId}]`),
				'add',
				'active-link'
			)
		} else {
			changesClasses(
				document.querySelector(`${link}[href*=${sectionId}]`),
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

// scroll up
function scrollUp(link) {
	if (this.scrollY >= 200) {
		changesClasses(link, 'add', 'show-scroll-link')
	} else {
		changesClasses(link, 'remove', 'show-scroll-link')
	}
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

// close modal window
const closeModal = (items, btns) => {
	items.forEach(modal => changesClasses(modal, 'remove', 'open-modal'))
	btns.forEach(button => changesClasses(button, 'remove', 'active-nav-btn'))
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

// validate email
const validateEmail = email => {
	const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	return regular.test(String(email).toLowerCase())
}

// close navbar menu
const openCloseNavMenu = (menu, toggle, logo, icon, modals, modalBtn) => {
	toggle.addEventListener('click', () => {
		if (!menu.classList.contains('show-menu')) {
			changesClasses(menu, 'add', 'show-menu')
			changesClasses(logo, 'add', 'show-logo')
			changesClasses(icon, 'add', 'bx-x')

			closeModal(modals, modalBtn)
			changesClasses(document.body, 'add', 'no-scroll')
		} else {
			changesClasses(menu, 'remove', 'show-menu')
			setTimeout(() => changesClasses(logo, 'remove', 'show-logo'), 300)
			changesClasses(icon, 'remove', 'bx-x')

			changesClasses(document.body, 'remove', 'no-scroll')
		}
	})
}

/* actions modal */
const actionsModal = (btns, modals, activeBtn, activeModal) => {
	btns.forEach(btn => {
		modals.forEach(modal => {
			btn.addEventListener('click', () => {
				const openBtn = document.querySelector(activeBtn)
				const openModal = document.querySelector(activeModal)

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

/* counter */
const counterFunc = (counters, plus, minus, input) => {
	counters.forEach(item => {
		const itemPlus = item.querySelector(plus)
		const itemMinus = item.querySelector(minus)
		const itemInput = item.querySelector(input)

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

/* products btn */
const productsBtnChange = (btns, activeClass) => {
	btns.forEach(btn => {
		btn.addEventListener('click', event => {
			event.preventDefault()

			if (!btn.classList.contains(activeClass)) {
				changesClasses(btn, 'add', activeClass)
			} else {
				changesClasses(btn, 'remove', activeClass)
			}
		})
	})
}

/* subscribe email */
const subscribeEmail = emailInputs => {
	emailInputs.addEventListener('input', () => {
		const emailValue = emailInputs.value

		if (emailValue.length <= 0) {
			changesClasses(emailInputs, 'remove', ['success', 'invalid'])
		} else {
			if (validateEmail(emailValue)) {
				changesClasses(emailInputs, 'remove', 'invalid')
				changesClasses(emailInputs, 'add', 'success')

				setTimeout(() => changesClasses(emailInputs, 'remove', 'success'), 1500)
			} else if (!validateEmail(emailValue)) {
				changesClasses(emailInputs, 'remove', 'success')
				changesClasses(emailInputs, 'add', 'invalid')
			}
		}
	})
}

/* footer nav links */
const footerNavLink = links => {
	links.forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault()

			const scrollTarget = document.getElementById(getId(link))

			if (scrollTarget) {
				scrollToSection(scrollTarget)
			}
		})
	})
}

/* scroll up link */
const scrollLink = link => {
	link.addEventListener('click', event => {
		event.preventDefault()

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})
}

/* nav links func */
const navLinksFunc = (links, menu, logo, icon, modals, modalBtn) => {
	links.forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault()
			changesClasses(menu, 'remove', 'show-menu')
			changesClasses(logo, 'remove', 'show-logo')
			changesClasses(icon, 'remove', 'bx-x')

			changesClasses(document.body, 'remove', 'no-scroll')
			closeModal(modals, modalBtn)

			const scrollTarget = document.getElementById(getId(link))

			if (scrollTarget) {
				scrollToSection(scrollTarget)
			}
		})
	})
}
