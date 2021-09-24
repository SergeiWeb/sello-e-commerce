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
	btns.forEach(button =>
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

// validate email
const validateEmail = email => {
	const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	return regular.test(String(email).toLowerCase())
}
