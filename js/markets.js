document.addEventListener('DOMContentLoaded', function () {
	const buttonTopGainers = document.getElementById('button_top_gainers')
	const buttonTopLosers = document.getElementById('button_top_losers')
	const buttonTopSpan = document.getElementById('button_top_span')
	const contentTabTwo = document.getElementById(
		'markets-main__coins-content-two'
	)
	const contentTabOne = document.getElementById(
		'markets-main__coins-content-one'
	)

	buttonTopGainers.addEventListener('click', () => {
		buttonTopGainers.classList.add('active')
		buttonTopLosers.classList.remove('active')
		buttonTopSpan.classList.add('active')
		contentTabTwo.classList.remove('db-block')
		contentTabOne.classList.add('db-block')
	})
	buttonTopLosers.addEventListener('click', () => {
		buttonTopGainers.classList.remove('active')
		buttonTopLosers.classList.add('active')
		buttonTopSpan.classList.remove('active')
		contentTabTwo.classList.add('db-block')
		contentTabOne.classList.remove('db-block')
	})
})
document.addEventListener('DOMContentLoaded', function () {
	const tabs = document.getElementById('tabs')

	tabs.addEventListener('click', function (event) {
		const targetTab = event.target.closest('.markets-coins__tab')

		if (targetTab) {
			// Зніміть клас 'active' з усіх табів
			tabs.querySelectorAll('.markets-coins__tab').forEach(tab => {
				tab.classList.remove('active')
			})

			// Додайте клас 'active' до обраного табу
			targetTab.classList.add('active')

			// Збережіть вибір табу в local storage
			const tag = targetTab.getAttribute('data-tag')
			localStorage.setItem('activeTab', tag)

			// Змініть URL без перезавантаження сторінки
			const url = new URL(window.location.href)
			url.searchParams.set('tag', tag)
			window.history.pushState({}, '', url)
		}
	})

	// При завантаженні сторінки перевірте, чи є параметр 'tag' у URL
	const url = new URL(window.location.href)
	const tag = url.searchParams.get('tag')

	if (!tag) {
		// Якщо немає параметра 'tag', виберіть перший таб
		const firstTab = tabs.querySelector('.markets-coins__tab')
		firstTab.classList.add('active')
		localStorage.setItem('activeTab', firstTab.getAttribute('data-tag'))
	} else {
		// Якщо є параметр 'tag', встановіть активний таб відповідно
		const activeTab = tabs.querySelector(`[data-tag="${tag}"]`)
		if (activeTab) {
			activeTab.classList.add('active')
		}
	}
})
// document.addEventListener('DOMContentLoaded', function () {
// 	const buttonTitle = document.querySelector(
// 		'.markets-coins__top-tabs-mob-title'
// 	)
// 	const bodyContent = document.querySelector(
// 		'.markets-coins__top-tabs-mob-body'
// 	)
// 	buttonTitle.addEventListener('click', () => {
// 		bodyContent.classList.toggle('d-block')
// 	})
// })
document.addEventListener('DOMContentLoaded', function () {
	const buttonTitle = document.querySelector(
		'.markets-coins__top-tabs-mob-title'
	)
	const bodyContent = document.querySelector(
		'.markets-coins__top-tabs-mob-body'
	)
	const tabs = document.querySelectorAll('.markets-coins__tab-mob')
	const buttonTitleSpan = document.querySelector(
		'.markets-coins__top-tabs-mob-title-span'
	)

	buttonTitle.addEventListener('click', () => {
		bodyContent.classList.toggle('d-block')
	})

	tabs.forEach(tab => {
		tab.addEventListener('change', () => {
			const selectedCheckbox = tab.querySelector('input:checked')

			tabs.forEach(otherTab => {
				if (otherTab !== tab) {
					otherTab.querySelector('input').checked = false
				}
			})

			if (selectedCheckbox) {
				const selectedLabel = tab.querySelector('label')
				const selectedTagLabel = selectedLabel.textContent.trim()
				buttonTitleSpan.textContent = selectedTagLabel

				// Update the URL without page reload
				const selectedTagName = selectedCheckbox.dataset.tag
				updateUrlParameter('tag', selectedTagName)

				// Close the list
				bodyContent.classList.remove('d-block')
			}
		})
	})

	// Get value from the address bar when the page loads
	const initialHash = window.location.hash.slice(1)
	const initialTab = document.querySelector(
		`.markets-coins__tab-mob[data-tag="${initialHash}"] input`
	)

	if (initialTab) {
		initialTab.checked = true
		initialTab.dispatchEvent(new Event('change'))
	} else {
		// If there's no initialTab (no hash or hash doesn't match any tab), set the default title
		buttonTitleSpan.textContent = 'All'
	}

	function updateUrlParameter(key, value) {
		const baseUrl = location.origin + location.pathname
		const urlParams = new URLSearchParams(window.location.search)

		if (value) {
			urlParams.set(key, value)
		} else {
			urlParams.delete(key)
		}

		const newUrl =
			baseUrl + (urlParams.toString() ? '?' + urlParams.toString() : '')
		history.replaceState(null, '', newUrl)
	}
})
