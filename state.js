import {BOX, PLAYER, SPACE, TARGET, WALL} from './constants.js'

export class StateNode {
	parent = null

	state = null
	player = {}
	moves = []

	h = Infinity
	g = Infinity


	constructor(state, parent = null) {
		this.state = JSON.parse(JSON.stringify(state))
		this.player = this.#getStatePlayerCoords(state)
		this.parent = parent ? JSON.parse(JSON.stringify(parent)) : null
		this.generateMoves()
	}

	#getStatePlayerCoords(state) {
		for (let x = 0; x < state.length; x++) {
			for (let y = 0; y < state[0].length; y++) {
				if (state[x][y] === PLAYER) {
					return {
						x,
						y
					}
				}
			}
		}

		console.error('Игрок отсутствует на доске')
		return null
	}



	#isPossibleMove(next, nextNext) {
		return next === SPACE || next === TARGET || (next === BOX &&
			(nextNext === SPACE || nextNext === TARGET))
	}

	#appendMove({ nextX, nextY, nextNextX, nextNextY }) {
		const next = this.state[nextX][nextY]
		const nextNext = this.state[nextNextX]?.[nextNextY] ?? WALL

		if (this.#isPossibleMove(next, nextNext)) this.moves.push({
			x: nextX,
			y: nextY,
		})
	}

	generateMoves() {
		this.moves = []

		const { x, y } = this.player

		this.#appendMove({
			nextX: x - 1,
			nextY: y,
			nextNextX: x - 2,
			nextNextY: y
		})
		this.#appendMove({
			nextX: x + 1,
			nextY: y,
			nextNextX: x + 2,
			nextNextY: y
		})
		this.#appendMove({
			nextX: x,
			nextY: y - 1,
			nextNextX: x,
			nextNextY: y - 2
		})
		this.#appendMove({
			nextX: x,
			nextY: y + 1,
			nextNextX: x,
			nextNextY: y + 2
		})
	}

	getHash() {
		let result = ''

		for (const column of this.state) {
			for (const cell of column) {
				if (cell === WALL) continue

				result += cell[0]
			}
		}

		return result
	}

	f() {
		return this.h + this.g
	}
}
