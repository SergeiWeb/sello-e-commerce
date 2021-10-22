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

	const sliderWrapper = document.getElementById('slider-wrapper')

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

	if (sliderSlides) {
		const looping = sliderSlides.length > 1
		const slidePerView = sliderSlides.length < 4 ? sliderSlides.length : 4

		const cardThumbs = new Swiper('.card-header__thumbs', {
			loop: looping,
			spaceBetween: 10,
			slidesPerView: slidePerView,
			slidesPerGroup: 1,
			direction: 'vertical',
			// freeMode: true,
			watchSlidesProgress: true,
			// allowTouchMove: false,
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
		})
	}

	if (sliderWrapper) {
		lightGallery(sliderWrapper, {
			selector:
				'.slider__slide:not(.swiper-slide-duplicate) .slider__slide-link',
			plugins: [lgZoom, lgThumbnail],
			download: false,
			mode: 'lg-slide',
			getCaptionFromTitleOrAlt: false,
		})
	}

	// const slider = document.querySelector('.card-reviews__slider')

	const reviewsSlider = new Swiper('.card-reviews__slider', {
		loop: true,
		spaceBetween: 15,
		slidesPerView: 3,
		slidesPerGroup: 1,
		centerMode: true,
		navigation: {
			nextEl: '.card-reviews__btn-next',
			prevEl: '.card-reviews__btn-prev',
		},
	})

	const userMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)

	if (!userMobile) {
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
	}

	/* format footer phone */
	if (footerPhoneNumber) {
		footerPhoneNumber.textContent = formatPhoneNumber(
			footerPhoneNumber.textContent
		)
	}

	if (userMobile) {
		/* footer accordion */
		if (footerItems) {
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

	/* description */
	function cardProductOpenBlock(block, elClass, linkClass, spanClass) {
		const content = block.querySelector(elClass)
		const link = block.querySelector(linkClass)
		const linkSpan = link.querySelector(spanClass)

		linkSpan.textContent = linkSpan.dataset.defaultText

		link.addEventListener('click', event => {
			event.preventDefault()

			if (!block.classList.contains('open-block')) {
				linkSpan.textContent = linkSpan.dataset.changeText
				changesClasses(block, 'add', 'open-block')
				changesClasses(content, 'add', 'open-el')
			} else {
				linkSpan.textContent = linkSpan.dataset.defaultText
				changesClasses(block, 'remove', 'open-block')
				changesClasses(content, 'remove', 'open-el')
			}
		})
	}

	const cardDescription = document.getElementById('card-description')

	if (cardDescription) {
		cardProductOpenBlock(
			cardDescription,
			'.card-description__text',
			'.card-description__link',
			'.card-description__link-text'
		)
	}

	const cardDetails = document.getElementById('card-details')

	if (cardDetails) {
		cardProductOpenBlock(
			cardDetails,
			'.card-details__list',
			'.card-details__link',
			'.card-details__link-text'
		)
	}

	/* scroll */
	window.addEventListener('scroll', () => {
		scrollHeader()
		scrollUp(scrollUpLink)
	})
})