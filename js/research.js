function toggleResearch() {
	// Отримуємо всі елементи з атрибутом data-tag
	const tagElements = document.querySelectorAll('.box-item[data-tag]')
	let mobElement = document.querySelector('.mob-filter__tag-inner-text')

	// Функція для визначення активного табу на основі URL
	function setActiveTab() {
		// Отримуємо поточний URL
		const currentUrl = window.location.href

		// Розділяємо URL на частини до `?` і після `?`
		const [baseUrl, queryParams] = currentUrl.split('?')

		// Отримуємо масив параметрів і розділяємо їх
		const paramsArray = queryParams ? queryParams.split('&') : []

		// Шукаємо параметр `tag` в масиві
		let tagParamIndex = -1
		for (let i = 0; i < paramsArray.length; i++) {
			if (paramsArray[i].startsWith('tag=')) {
				tagParamIndex = i
				break
			}
		}

		// Якщо знайдено параметр `tag`, отримуємо значення тегу
		let activeTag = 'All Tags' // За замовчуванням активний таб
		if (tagParamIndex !== -1) {
			activeTag = paramsArray[tagParamIndex].split('=')[1]
		}

		// Знаходимо та додаємо клас "active" до активного табу
		tagElements.forEach(tagElement => {
			const tag = tagElement.getAttribute('data-tag')
			if (tag === activeTag) {
				tagElement.classList.add('active')
			} else {
				tagElement.classList.remove('active')
			}
		})
	}

	// Визиваємо функцію для встановлення активного табу при завантаженні сторінки
	setActiveTab()

	// Додаємо обробник подій для кожного тегу
	tagElements.forEach(tagElement => {
		tagElement.addEventListener('click', () => {
			// Знімаємо клас "active" з усіх елементів
			tagElements.forEach(element => {
				element.classList.remove('active')
			})

			// Додаємо клас "active" до поточного табу
			tagElement.classList.add('active')
			console.log(tagElement.textContent)

			// Отримуємо значення тегу з атрибуту "data-tag"
			const tag = tagElement.getAttribute('data-tag')

			// Отримуємо поточний URLя
			const currentUrl = window.location.href

			// Розділяємо URL на частини до `?` і після `?`
			const [baseUrl, queryParams] = currentUrl.split('?')

			// Отримуємо масив параметрів і розділяємо їх
			const paramsArray = queryParams ? queryParams.split('&') : []

			// Шукаємо параметр `tag` в масиві
			let tagParamIndex = -1
			for (let i = 0; i < paramsArray.length; i++) {
				if (paramsArray[i].startsWith('tag=')) {
					tagParamIndex = i
					break
				}
			}

			// Якщо знайдено параметр `tag`, замінюємо його на новий
			if (tagParamIndex !== -1) {
				paramsArray[tagParamIndex] = `tag=${tag}`
			} else {
				// Якщо параметр `tag` не знайдено, додаємо його до масиву
				paramsArray.push(`tag=${tag}`)
			}

			// Збираємо оновлений URL з частини перед `?` і оновленого масиву параметрів
			const newUrl = baseUrl + '?' + paramsArray.join('&')

			// Перенаправляємо сторінку за оновленим URL
			window.location.href = newUrl
		})
	})
}
toggleResearch()

document.addEventListener('DOMContentLoaded', function () {
	// Отримайте посилання на елементи
	let selectAllCheckbox = document.getElementById('select-all-checkbox')
	let selectAllText = document.getElementById('select-all-text')
	let assetCheckboxes = document.querySelectorAll(
		".assets-filter__list input[type='checkbox']"
	)
	let textElement = document.querySelector('.text')
	let filterInput = document.getElementById('search_filter_assets')
	let assetItems = document.querySelectorAll('.assets-filter__item')
	let resultNotFoundText = document.querySelector('.result__filter-text')
	let noAssetsFoundText = 'No assets found matching your filter'
	let buttonOpenAssets = document.getElementById('filter-top__button-assets')
	let assetsContentBox = document.querySelector('.assets-filter__content')
	let arrowAssets = document.querySelector('.arrow-assets')
	let anotherAssetsContentBox = document.querySelector(
		'.author-filter__content'
	)
	let anotherArrowAssets = document.querySelector('.arrow-author')

	buttonOpenAssets.addEventListener('click', e => {
		e.stopPropagation()
		anotherAssetsContentBox.classList.remove('d-block')
		anotherArrowAssets.classList.remove('rotate')
		assetsContentBox.classList.toggle('d-block')
		arrowAssets.classList.toggle('rotate')
		document.body.classList.toggle('lock')
	})
	document.addEventListener('click', function (e) {
		// Перевірте, чи клік був здійснений поза `assetsContentBox`
		if (assetsContentBox && !assetsContentBox.contains(e.target)) {
			// Видаліть клас 'd-block' з `assetsContentBox`
			assetsContentBox.classList.remove('d-block')
			arrowAssets.classList.remove('rotate')
			document.body.classList.remove('lock')
		}
	})
	// Збережіть початковий стан елементів
	let initialAssetStates = Array.from(assetItems).map(function (item) {
		return item.style.display
	})

	// Додайте обробник кліків до selectAllCheckbox
	selectAllCheckbox.addEventListener('click', function () {
		// Перевірте стан чекбокса
		if (selectAllCheckbox.checked) {
			// Якщо вибрано, змініть текст на "DESELECT"
			selectAllText.textContent = 'DESELECT'
		} else {
			// Інакше змініть текст на "Select All"
			selectAllText.textContent = 'Select All'
		}

		// Встановіть стан всіх інших чекбоксів на відповідний до стану selectAllCheckbox
		assetCheckboxes.forEach(function (checkbox) {
			checkbox.checked = selectAllCheckbox.checked
		})

		// Оновіть текст в залежності від вибору
		updateText()
	})

	// Додайте обробник кліків до інших чекбоксів для відстеження їх стану
	assetCheckboxes.forEach(function (checkbox) {
		checkbox.addEventListener('click', function () {
			// Перевірте, чи всі інші чекбокси вибрані
			let allSelected = Array.from(assetCheckboxes).every(function (cb) {
				return cb.checked
			})

			// Встановіть стан selectAllCheckbox відповідно
			selectAllCheckbox.checked = allSelected

			// Оновіть текст в залежності від вибору
			updateText()
		})
	})

	// Додайте обробник введення для поля пошуку
	filterInput.addEventListener('input', function () {
		let filterText = filterInput.value.toLowerCase()

		// Перевірте, чи поле пошуку порожнє
		if (filterText === '') {
			resultNotFoundText.style.display = 'none'
			// Відобразити всі елементи, якщо поле пошуку порожнє
			assetItems.forEach(function (item, index) {
				item.style.display = initialAssetStates[index]
			})

			// Оновіть текст в залежності від вибору після фільтрації
			updateText()
		} else {
			// Переберіть всі елементи і приховайте ті, які не відповідають фільтру
			assetItems.forEach(function (item, index) {
				let itemTextP = item
					.querySelector('.assets-filter__center p')
					.textContent.toLowerCase()
				let itemTextSpan = item
					.querySelector('.assets-filter__center span')
					.textContent.toLowerCase()
				if (
					itemTextP.includes(filterText) ||
					itemTextSpan.includes(filterText)
				) {
					item.style.display = 'block'
				} else {
					item.style.display = 'none'
				}
			})

			// Оновіть текст в залежності від вибору після фільтрації
			updateText()
		}
	})

	// Функція для оновлення тексту
	function updateText() {
		let selectedCount = Array.from(assetCheckboxes).filter(function (cb) {
			return cb.checked
		}).length

		if (selectedCount === 0) {
			textElement.textContent = 'Any'
		} else if (selectedCount === 1) {
			// Знайдіть вибраний пункт і встановіть текст на його назву
			let selectedAssets = Array.from(assetItems).find(function (item) {
				return item.style.display !== 'none'
			})

			if (selectedAssets) {
				textElement.textContent = selectedAssets.querySelector(
					'.assets-filter__center p'
				).textContent
			} else {
				textElement.textContent = 'Any'
			}
		} else {
			textElement.textContent = selectedCount + ' Assets'
		}

		// Перевірте, чи жоден елемент не відображається
		let noItemsDisplayed = Array.from(assetItems).every(function (item) {
			return item.style.display === 'none'
		})

		// Виведіть повідомлення "No assets found matching your filter", якщо не знайдено жодного елемента
		if (noItemsDisplayed) {
			resultNotFoundText.textContent = 'No assets found matching your filter'
			updateText()
		}
	}
})

// ФІЛЬТР З АВТОРАМИ

document.addEventListener('DOMContentLoaded', function () {
	let selectAllCheckbox = document.getElementById('select-all-checkbox-author')
	let selectAllText = document.getElementById('select-all-text-author')
	var assetCheckboxes = document.querySelectorAll(
		".author-filter__content-list input[type='checkbox']"
	)
	let buttonOpenAssets = document.getElementById('filter-top__button-author')
	let assetsContentBox = document.getElementById('author-filter__content')
	let anotherAssetsContentBox = document.querySelector(
		'.assets-filter__content'
	)
	let anohterArrowAssets = document.querySelector('.arrow-assets')
	let arrowAssets = document.querySelector('.arrow-author')
	let bodySite = document.body

	buttonOpenAssets.addEventListener('click', e => {
		e.stopPropagation()
		anotherAssetsContentBox.classList.remove('d-block')
		assetsContentBox.classList.toggle('d-block')
		arrowAssets.classList.toggle('rotate')
		anohterArrowAssets.classList.remove('rotate')
		bodySite.classList.toggle('lock')
	})
	document.addEventListener('click', function (e) {
		if (assetsContentBox && !assetsContentBox.contains(e.target)) {
			assetsContentBox.classList.remove('d-block')
			arrowAssets.classList.remove('rotate')
			document.body.classList.remove('lock')
		} else if (!bodySite.classList.contains('lock')) {
			bodySite.classList.add('lock')
		}
	})
	selectAllCheckbox.addEventListener('click', () => {
		if (selectAllCheckbox.checked) {
			selectAllText.textContent = 'DESELECT ALL'
		} else {
			selectAllText.textContent = 'SELECT ALL'
		}
		assetCheckboxes.forEach(function (checkbox) {
			checkbox.checked = selectAllCheckbox.checked
		})
	})
	assetCheckboxes.forEach(function (checkbox) {
		checkbox.addEventListener('click', function () {
			let allSelected = Array.from(assetCheckboxes).every(function (cb) {
				return cb.checked
			})
			selectAllCheckbox.checked = allSelected
			selectAllText.textContent = allSelected ? 'DESELECT' : 'Select All'
		})
	})
})

document.addEventListener('DOMContentLoaded', function () {
	// Отримайте посилання на елементи
	let selectAllCheckbox = document.getElementById('select-all-checkbox-author')
	let selectAllText = document.getElementById('select-all-text-author')
	let assetCheckboxes = document.querySelectorAll(
		".author-filter__content-list input[type='checkbox']"
	)
	let textElement = document.querySelector('.author__text')
	let filterInput = document.getElementById('search_filter_author')
	let assetItems = document.querySelectorAll('.author-filter__item')
	let resultNotFoundText = document.querySelector('.result__filter-text')
	let buttonOpenAssets = document.getElementById('select-all-checkbox-author')
	let assetsContentBox = document.querySelector('.author-filter__content-list')
	let arrowAssets = document.querySelector('.arrow-author')

	buttonOpenAssets.addEventListener('click', e => {
		e.stopPropagation()
		assetsContentBox.classList.toggle('d-block')
		arrowAssets.classList.toggle('rotate')
		document.body.classList.toggle('lock')
	})

	document.addEventListener('click', function (e) {
		// Перевірте, чи клік був здійснений поза `assetsContentBox`
		if (assetsContentBox && !assetsContentBox.contains(e.target)) {
			// Видаліть клас 'd-block' з `assetsContentBox`
			assetsContentBox.classList.remove('d-block')
			arrowAssets.classList.remove('rotate')
			document.body.classList.remove('lock')
		}
	})

	// Збережіть початковий стан елементів
	let initialAssetStates = Array.from(assetItems).map(function (item) {
		return item.style.display
	})

	// Додайте обробник кліків до selectAllCheckbox
	selectAllCheckbox.addEventListener('click', function () {
		// Перевірте стан чекбокса
		if (selectAllCheckbox.checked) {
			// Якщо вибрано, змініть текст на "DESELECT"
			selectAllText.textContent = 'DESELECT'
		} else {
			// Інакше змініть текст на "Select All"
			selectAllText.textContent = 'Select All'
		}

		// Встановіть стан всіх інших чекбоксів на відповідний до стану selectAllCheckbox
		assetCheckboxes.forEach(function (checkbox) {
			checkbox.checked = selectAllCheckbox.checked
		})

		// Оновіть текст в залежності від вибору
		updateText()
	})

	// Додайте обробник кліків до інших чекбоксів для відстеження їх стану
	assetCheckboxes.forEach(function (checkbox) {
		checkbox.addEventListener('click', function () {
			// Перевірте, чи всі інші чекбокси вибрані
			let allSelected = Array.from(assetCheckboxes).every(function (cb) {
				return cb.checked
			})

			// Встановіть стан selectAllCheckbox відповідно
			selectAllCheckbox.checked = allSelected

			// Оновіть текст в залежності від вибору
			updateText()
		})
	})

	// Додайте обробник введення для поля пошуку
	filterInput.addEventListener('input', function () {
		let filterText = filterInput.value.toLowerCase()

		// Перевірте, чи поле пошуку порожнє
		if (filterText === '') {
			resultNotFoundText.style.display = 'none'
			// Відобразити всі елементи, якщо поле пошуку порожнє
			assetItems.forEach(function (item, index) {
				item.style.display = initialAssetStates[index]
			})

			// Оновіть текст в залежності від вибору після фільтрації
			updateText()
		} else {
			// Переберіть всі елементи і приховайте ті, які не відповідають фільтру
			assetItems.forEach(function (item, index) {
				let itemText = item
					.querySelector('.author-filter__center')
					.textContent.toLowerCase()
				if (itemText.includes(filterText)) {
					item.style.display = 'block'
				} else {
					item.style.display = 'none'
				}
			})

			// Оновіть текст в залежності від вибору після фільтрації
			updateText()
		}
	})

	// Функція для оновлення тексту
	function updateText() {
		let selectedCount = Array.from(assetCheckboxes).filter(function (cb) {
			return cb.checked
		}).length

		if (selectedCount === 0) {
			textElement.textContent = 'Any'
		} else if (selectedCount === 1) {
			// Знайдіть вибраний пункт і встановіть текст на його назву
			let selectedAssets = Array.from(assetItems).find(function (item) {
				return item.style.display !== 'none'
			})

			if (selectedAssets) {
				textElement.textContent = selectedAssets.querySelector(
					'.author-filter__center'
				).textContent
			} else {
				textElement.textContent = 'Any'
			}
		} else {
			textElement.textContent = selectedCount + ' Authors'
		}

		// Перевірте, чи жоден елемент не відображається
		let noItemsDisplayed = Array.from(assetItems).every(function (item) {
			return item.style.display === 'none'
		})

		// Виведіть повідомлення "No authors found matching your filter", якщо не знайдено жодного елемента
		if (noItemsDisplayed) {
			resultNotFoundText.textContent = 'No authors found matching your filter'
			updateText()
		}
	}
})

document.addEventListener('DOMContentLoaded', () => {
	let buttonColumns = document.querySelector('.filter-top__box-one')
	let contentBox = document.querySelector('.research-main__column')
	let contentColumn = document.querySelector('.research-main__rows')
	let buttonRow = document.querySelector('.filter-top__box-two')

	buttonColumns.addEventListener('click', () => {
		buttonColumns.classList.add('active')
		buttonRow.classList.remove('active')
		contentBox.style.display = 'block'
		contentColumn.style.display = 'none'
	})
	buttonRow.addEventListener('click', () => {
		buttonRow.classList.add('active')
		buttonColumns.classList.remove('active')
		contentBox.style.display = 'none'
		contentColumn.style.display = 'block'
	})
})

document.addEventListener('DOMContentLoaded', function () {
	let mobSearchButton = document.querySelector('.mob-filter__search-img')
	let mobSearchContent = document.querySelector('.mob-filter__search')
	let mobCloseSearchButton = document.querySelector(
		'.mob-filter__search-button'
	)
	let tagContent = document.querySelector('.mob-filter__tag')
	let tagContentOpen = document.querySelector('.mob-filter__list-tag')
	let tagContentOverlay = document.querySelector('.mob-filter__list-tag-inner')
	let tagContentClose = document.querySelector('.top-list__tag-button')
	let filterContent = document.querySelector('.mob-filter__filter')

	mobSearchButton.addEventListener('click', () => {
		mobSearchContent.classList.add('d-block')
		tagContent.classList.add('hidden')
		filterContent.style.display = 'none'
	})

	mobCloseSearchButton.addEventListener('click', () => {
		mobSearchContent.classList.remove('d-block')
		tagContent.classList.remove('hidden')
		filterContent.style.display = 'block'
	})

	tagContent.addEventListener('click', () => {
		tagContentOpen.classList.add('d-block')
	})
	tagContentOverlay.addEventListener('click', () => {
		tagContentOpen.classList.remove('d-block')
	})
	tagContentClose.addEventListener('click', () => {
		tagContentOpen.classList.remove('d-block')
	})
})
