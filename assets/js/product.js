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

	const cardCounters = document.querySelectorAll('.card-counters')

	const subscribeEmailInput = document.getElementById('subscribe-email-input')

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

	/* card counter */
	if (cardCounters) {
		counterFunc(
			cardCounters,
			'.card__counter-plus',
			'.card__counter-minus',
			'.card-input'
		)
	}

	/* slider */
	const sliderSlides = document.querySelectorAll('.slider__slide')
	const looping = sliderSlides.length > 1
	const slidePerView = sliderSlides.length < 4 ? sliderSlides.length : 4

	console.log(slidePerView)

	const cardThumbs = new Swiper('.card-header__thumbs', {
		loop: looping,
		spaceBetween: 10,
		slidesPerView: slidePerView,
		direction: 'vertical',
		freeMode: true,
		watchSlidesProgress: true,
		allowTouchMove: false,
	})

	const cardSlider = new Swiper('.card-header__slider', {
		loop: looping,
		spaceBetween: 10,
		navigation: {
			nextEl: '.slider__btn-next',
			prevEl: '.slider__btn-prev',
		},
		thumbs: {
			swiper: cardThumbs,
		},
		effect: 'creative',
		creativeEffect: {
			prev: {
				translate: [0, 0, -400],
				opacity: '0',
			},
			next: {
				translate: ['100%', 0, 0],
				opacity: '1',
			},
		},

		on: {
			init(swiper) {
				console.log(swiper)
			},
		},
	})

	/* zoom img */
	const sliderImg = document.querySelectorAll('.slider__slide img')

	sliderImg.forEach(img => {
		img.addEventListener('mousemove', event => {
			let width = img.offsetWidth
			let height = img.offsetHeight
			let mouseX = event.offsetX
			let mouseY = event.offsetY

			let bgPosX = (mouseX / width) * 100
			let bgPosY = (mouseY / height) * 100

			img.style.transform = `translate(-${bgPosX}%, -${bgPosY}%) scale(2)`
		})

		img.addEventListener('mouseleave', () => {
			img.style.transform = 'translate(-50%, -50%) scale(1)'
		})
	})

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
