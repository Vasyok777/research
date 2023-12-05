document.addEventListener('DOMContentLoaded', function () {
	const toggleButtons = document.querySelectorAll('.coin-faq__box-ask')

	toggleButtons.forEach((button, index) => {
		button.addEventListener('click', function () {
			const box = this.closest('.coin-faq__box-item')
			const body = box.querySelector('.coin-faq__box-body')
			const title = box.querySelector('.coin-faq__box-img')

			toggleButtons.forEach((otherButton, otherIndex) => {
				if (otherIndex !== index) {
					const otherBox = otherButton.closest('.coin-faq__box-item')
					const otherBody = otherBox.querySelector('.coin-faq__box-body')
					const otherTitle = otherBox.querySelector('.coin-faq__box-img')

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
document.addEventListener('DOMContentLoaded', function () {
	const buttonMovers = document.getElementById('button_top_movers_coin')
	const buttonRecently = document.getElementById('button_top_recently_coin')
	const buttonMarket = document.getElementById('button_top_market_coin')
	const buttonSpan = document.getElementById('button_top_span_coin')
	const contentOne = document.getElementById('tab_content_movers_coin')
	const contentTwo = document.getElementById('tab_content_recently_coin')
	const contentThree = document.getElementById('tab_content_market_coin')

	buttonRecently.addEventListener('click', () => {
		buttonRecently.classList.add('active')
		buttonMovers.classList.remove('active')
		buttonMarket.classList.remove('active')
		buttonSpan.classList.remove('tab-three')
		buttonSpan.classList.add('active')
		buttonSpan.classList.add('active')
		contentOne.classList.remove('d-block')
		contentTwo.classList.add('d-block')
		contentThree.classList.remove('d-block')
	})
	buttonMovers.addEventListener('click', () => {
		buttonRecently.classList.remove('active')
		buttonMovers.classList.add('active')
		buttonMarket.classList.remove('active')
		buttonSpan.classList.remove('tab-three')
		buttonSpan.classList.remove('active')
		contentOne.classList.add('d-block')
		contentTwo.classList.remove('d-block')
		contentThree.classList.remove('d-block')
	})
	buttonMarket.addEventListener('click', () => {
		buttonRecently.classList.remove('active')
		buttonMovers.classList.remove('active')
		buttonMarket.classList.add('active')
		buttonSpan.classList.remove('active')
		buttonSpan.classList.add('tab-three')
		contentOne.classList.remove('d-block')
		contentTwo.classList.remove('d-block')
		contentThree.classList.add('d-block')
	})
})
