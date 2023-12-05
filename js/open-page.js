<<<<<<< HEAD
const scrollbarHorizontal = document.getElementById('scrollbar-horizontal')
const scrollbarThumbHorizontal = document.getElementById(
	'scrollbar-thumb-horizontal'
)

window.addEventListener('scroll', () => {
	const scrollableWidth =
		document.documentElement.scrollHeight - window.innerHeight
	const scrollX = window.scrollY
	const thumbWidth = (scrollX / scrollableWidth) * 100

	scrollbarThumbHorizontal.style.width = thumbWidth + '%'
})
=======
const scrollbarHorizontal = document.getElementById('scrollbar-horizontal')
const scrollbarThumbHorizontal = document.getElementById(
	'scrollbar-thumb-horizontal'
)

window.addEventListener('scroll', () => {
	const scrollableWidth =
		document.documentElement.scrollHeight - window.innerHeight
	const scrollX = window.scrollY
	const thumbWidth = (scrollX / scrollableWidth) * 100

	scrollbarThumbHorizontal.style.width = thumbWidth + '%'
})
>>>>>>> 94ae2c5a99dd264b537bca67e3280cadbbf77caa
