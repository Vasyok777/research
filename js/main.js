<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function () {
	const price = document.getElementById('private-left__price')
	const checkbox = document.getElementById('private__checkbox')
	const text = document.getElementById('private-left__right-text')

	function renderNumber() {
		if (checkbox.checked) {
			price.textContent = '$75'
			text.textContent = 'Billed Annually'
		} else {
			price.textContent = '$99'
			text.textContent = 'Billed Monthly'
		}
	}
	checkbox.addEventListener('change', renderNumber)
	renderNumber()
})
=======
document.addEventListener('DOMContentLoaded', function () {
	const price = document.getElementById('private-left__price')
	const checkbox = document.getElementById('private__checkbox')
	const text = document.getElementById('private-left__right-text')

	function renderNumber() {
		if (checkbox.checked) {
			price.textContent = '$75'
			text.textContent = 'Billed Annually'
		} else {
			price.textContent = '$99'
			text.textContent = 'Billed Monthly'
		}
	}
	checkbox.addEventListener('change', renderNumber)
	renderNumber()
})
>>>>>>> 94ae2c5a99dd264b537bca67e3280cadbbf77caa
