document.addEventListener('DOMContentLoaded', function () {
	const buttonSinglePrice = document.getElementById('toggle-single-price')
	const buttonSingleTranding = document.getElementById(
		'toggle-single-tradingview'
	)
	const buttonTopSpan = document.getElementById('single-left-toggle-span')
	const contentTabTwo = document.getElementById('single-left__block-two')
	const contentTabOne = document.getElementById('single-left__block-one')

	buttonSinglePrice.addEventListener('click', () => {
		buttonSinglePrice.classList.add('active')
		buttonSingleTranding.classList.remove('active')
		buttonTopSpan.classList.add('active')
		contentTabTwo.classList.remove('db-block')
		contentTabOne.classList.add('db-block')
	})
	buttonSingleTranding.addEventListener('click', () => {
		buttonSinglePrice.classList.remove('active')
		buttonSingleTranding.classList.add('active')
		buttonTopSpan.classList.remove('active')
		contentTabTwo.classList.add('db-block')
		contentTabOne.classList.remove('db-block')
	})
})
document.addEventListener('DOMContentLoaded', function () {
	const buttonMovers = document.getElementById(
		'single-block__toggle-button-about'
	)
	const buttonRecently = document.getElementById(
		'single-block__toggle-button-social'
	)
	const buttonMarket = document.getElementById(
		'single-block__toggle-button-markets'
	)

	const contentOne = document.getElementById(
		'single-block__content-button-about'
	)
	const contentTwo = document.getElementById(
		'single-block__content-button-social'
	)
	const contentThree = document.getElementById(
		'single-block__content-button-markets'
	)

	const singleAboutMore = document.querySelector('.single-about__more-button')
	const singleAboutContent = document.querySelector('.single-about__more')

	singleAboutMore.addEventListener('click', () => {
		singleAboutContent.classList.toggle('active')
	})

	buttonRecently.addEventListener('click', () => {
		buttonRecently.classList.add('active')
		buttonMovers.classList.remove('active')
		buttonMarket.classList.remove('active')
		contentOne.classList.remove('d-block')
		contentTwo.classList.add('d-block')
		contentThree.classList.remove('d-block')
	})
	buttonMovers.addEventListener('click', () => {
		buttonRecently.classList.remove('active')
		buttonMovers.classList.add('active')
		buttonMarket.classList.remove('active')
		contentOne.classList.add('d-block')
		contentTwo.classList.remove('d-block')
		contentThree.classList.remove('d-block')
	})
	buttonMarket.addEventListener('click', () => {
		buttonRecently.classList.remove('active')
		buttonMovers.classList.remove('active')
		buttonMarket.classList.add('active')
		contentOne.classList.remove('d-block')
		contentTwo.classList.remove('d-block')
		contentThree.classList.add('d-block')
	})
})
document.addEventListener('DOMContentLoaded', function () {
	const toggleButtons = document.querySelectorAll('.single-questions__box-ask')

	toggleButtons.forEach((button, index) => {
		button.addEventListener('click', function () {
			const box = this.closest('.single-questions__box-item')
			const body = box.querySelector('.single-questions__box-body')
			const title = box.querySelector('.single-questions__box-img')

			toggleButtons.forEach((otherButton, otherIndex) => {
				if (otherIndex !== index) {
					const otherBox = otherButton.closest('.single-questions__box-item')
					const otherBody = otherBox.querySelector(
						'.single-questions__box-body'
					)
					const otherTitle = otherBox.querySelector(
						'.single-questions__box-img'
					)

					otherBody.classList.remove('active')
					otherBody.style.maxHeight = null
					otherTitle.classList.remove('rotate')
				}
			})

			const buttonText = title.textContent

			if (body.style.maxHeight) {
				body.classList.remove('active')
				body.style.maxHeight = null
				title.classList.remove('rotate')
			} else {
				body.style.maxHeight = body.scrollHeight + 'px'
				body.classList.add('active')
				title.classList.add('rotate')
			}
		})
	})
})
