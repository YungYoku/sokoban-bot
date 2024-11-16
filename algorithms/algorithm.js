import { PLAYER, TARGET } from '../constants.js'

export default class Algorithm {
	game

	listO = []
	listC = {}

	iteration = 0

	constructor (game) {
		this.game = game
	}

	reset() {
		this.listO = []
		this.listC = {}
		this.iteration = 0
	}

	getDirection(current, next) {
		if (current.x === next.x) {
			if (next.y > current.y) {
				return 'down'
			} else if (next.y < current.y) {
				return 'up'
			}
		}
		if (current.y === next.y) {
			if (next.x > current.x) {
				return 'right'
			} else if (next.x < current.x) {
				return 'left'
			}
		}

		throw new Error(`Direction calculation error. Current x: ${current.x}, y: ${current.y}. Next x: ${next.x}, y: ${next.y}.`)
	}

	isGameFinished(state) {
		const columns = state.length
		const rows = state[0].length

		for (let x = 0; x < columns; x++) {
			for (let y = 0; y < rows; y++) {
				if (state[x][y] === TARGET) return false
				if (state[x][y] === PLAYER && this.game.level[x][y] === TARGET) return false
			}
		}

		return true
	}

	getStateHistory(state) {
		let _state = JSON.parse(JSON.stringify(state))
		const states = []

		while (true) {
			states.unshift(_state.state)

			if (!_state.parent) break

			_state = JSON.parse(JSON.stringify(_state.parent))
		}

		return states
	}

	increaseIteration() {
		this.iteration++
	}

	async renderResult(result) {
		if (!result) return

		const history = this.getStateHistory(result)

		for (let i = 0; i < history.length; i++) {
			await new Promise(resolve => {
				setTimeout(() => {
					const state = history[i]
					this.game.renderDesk(state)
					resolve()
				}, 100)
			})
		}

		return await new Promise(resolve => {
			resolve({
				steps: history.length - 1,
				iterations: this.iteration,
			})
		})
	}

	testMoves() {
		return null
	}
}
