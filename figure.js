import { PLAYER } from './constants.js'

export class Figure {
	#node = null
	#imgNode = null
	#icon = ''
	#size = 0

	constructor({x = 0, y = 0, size = 0, type = null}) {
		this.#size = size

		this.#initNode(x, y)
		this.setIcon(type)

		if (type === PLAYER) {
			this.#node.classList.add('player')
		}
	}

	#initNode(x, y) {
		this.#node = document.createElement("div")
		this.#node.classList.add('figure')
		this.#node.style.width = `${this.#size}px`
		this.#node.style.height = `${this.#size}px`
		this.updatePosition(x, y)

		this.#imgNode = document.createElement("img")
		this.#imgNode.style.width = `${this.#size}px`
		this.#imgNode.style.height = `${this.#size}px`

		this.#node.appendChild(this.#imgNode)
	}

	updatePosition(x ,y) {
		this.#node.style.left = `${x * this.#size}px`
		this.#node.style.top = `${y * this.#size}px`
	}

	#loadIcon() {
		if (this.#icon) {
			this.#imgNode.src = `/assets/img/${this.#icon}.png`
		} else {
			throw Error('Unknown figure')
		}
	}

	setIcon(type) {
		this.#icon = type
		this.#loadIcon()
	}

	getNode() {
		return this.#node
	}
}
