import { Figure } from './figure.js'
import { Levels } from './levels.js'
import { StateNode } from './state.js'
import { BOX, SPACE, TARGET, WALL } from './constants.js'

export default class Game {
	#appNode

	#levels = new Levels()
	level = null
	columns = 0
	rows = 0
	fields = null
	figureSize = 60

	stateNode = {}

	constructor() {
		this.#appNode = document.querySelector("#app")
		this.#initEventListeners()
	}

	build(levelIndex) {
		this.loadLevel(levelIndex)
		this.initFields()
		this.renderDesk()

		this.stateNode = this.getInitialStateNode()
	}

	getInitialStateNode() {
		return new StateNode(JSON.parse(JSON.stringify(this.level)))
	}

	#getPlayerNextMoveCoordinates(direction, x, y) {
		if (direction === 'up') return {
			nextTargetX: x,
			nextTargetY: y - 1,
			nextNextTargetX: x,
			nextNextTargetY: y - 2
		}
		if (direction === 'down') return {
			nextTargetX: x,
			nextTargetY: y + 1,
			nextNextTargetX: x,
			nextNextTargetY: y + 2
		}
		if (direction === 'left') return {
			nextTargetX: x - 1,
			nextTargetY: y,
			nextNextTargetX: x - 2,
			nextNextTargetY: y
		}
		if (direction === 'right') return {
			nextTargetX: x + 1,
			nextTargetY: y,
			nextNextTargetX: x + 2,
			nextNextTargetY: y
		}

		throw new Error(`Invalid direction: ${direction}`)
	}

	#updatePlayerPosition(direction, stateNode = this.stateNode) {
		if (direction === 'up') {
			stateNode.player.y--
		} else if (direction === 'down') {
			stateNode.player.y++
		} else if (direction === 'left') {
			stateNode.player.x--
		} else if (direction === 'right') {
			stateNode.player.x++
		} else {
			throw new Error(`Invalid direction: ${direction}`)
		}
	}

	movePlayer(direction, stateNode = null) {
		stateNode = stateNode ?? this.stateNode

		const state = stateNode.state
		const { x, y } = stateNode.player

		const {
			nextTargetX,
			nextTargetY,
			nextNextTargetX,
			nextNextTargetY
		} = this.#getPlayerNextMoveCoordinates(direction, x, y)

		const nextTarget = state[nextTargetX][nextTargetY]
		const nextNextTarget = state[nextNextTargetX]?.[nextNextTargetY] ?? WALL

		if (nextTarget === WALL || (nextTarget === BOX && (nextNextTarget === WALL || nextNextTarget === BOX))) return state

		this.#updatePlayerPosition(direction, stateNode)

		if (nextTarget === TARGET) {
			if (this.level[x][y] === TARGET) {
				state[nextTargetX][nextTargetY] = TARGET;
			} else {
				state[nextTargetX][nextTargetY] = SPACE;
			}
			[state[nextTargetX][nextTargetY], state[x][y]] = [state[x][y], state[nextTargetX][nextTargetY]]
		} else if (nextTarget === SPACE) {
			[state[nextTargetX][nextTargetY], state[x][y]] = [state[x][y], state[nextTargetX][nextTargetY]]

			if (this.level[x][y] === TARGET) state[x][y] = TARGET
		} else if (nextTarget === BOX) {
			if (state[nextNextTargetX][nextNextTargetY] === SPACE || state[nextNextTargetX][nextNextTargetY] === TARGET) {
				[state[nextNextTargetX][nextNextTargetY], state[nextTargetX][nextTargetY]] = [state[nextTargetX][nextTargetY], state[nextNextTargetX][nextNextTargetY]];
				[state[nextTargetX][nextTargetY], state[x][y]] = [state[x][y], state[nextTargetX][nextTargetY]]
			}
			if (state[x][y] === TARGET) {
				state[x][y] = SPACE
			}

			if (this.level[x][y] === TARGET) state[x][y] = TARGET
		}

		return state
	}

	#initEventListeners() {
		window.addEventListener('keydown', ({ key }) => {
			if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(key)) {
				if (key === 'ArrowUp') this.movePlayer('up')
				if (key === 'ArrowRight') this.movePlayer('right')
				if (key === 'ArrowDown') this.movePlayer('down')
				if (key === 'ArrowLeft') this.movePlayer('left')

				this.updateFields()
				this.renderDesk()
			}
		})
	}

	loadLevel(levelIndex) {
		const { level, levelPlayer } = this.#levels.get(levelIndex)
		this.level = level

		this.rows = this.level.length
		this.columns = this.level[0].length

		return { levelPlayer }
	}

	#initEmptyFields() {
		this.fields = []
		for (let _ = 0; _ < this.rows; _++) {
			this.fields.push([])
		}
	}

	#updateAppSize() {
		const appWidth = this.figureSize * this.columns
		const appHeight = this.figureSize * this.rows

		this.#appNode.style.width = `${appWidth}px`
		this.#appNode.style.height = `${appHeight}px`
	}

	initFields(state) {
		this.#initEmptyFields()

		for (let x = 0; x < this.columns; x++) {
			for (let y = 0; y < this.rows; y++) {
				const figureProps = {
					x,
					y,
					size: this.figureSize,
					type: state ? state[x][y] : this.level[x][y]
				}

				this.fields[x].push(new Figure(figureProps))
			}
		}

		this.#updateAppSize()
	}

	updateFields() {
		for (let x = 0; x < this.columns; x++) {
			for (let y = 0; y < this.rows; y++) {
				this.fields[x][y].setIcon(this.stateNode.state[x][y])
			}
		}
	}

	clearDesk() {
		this.#appNode.innerHTML = ''
	}

	renderDesk(state) {
		this.clearDesk()
		if (state) this.initFields(state)

		for (let x = 0; x < this.columns; x++) {
			for (let y = 0; y < this.rows; y++) {
				this.#appNode.appendChild(this.fields[x][y].getNode())
			}
		}
	}

	stepBack() {
	}

	stepForward() {
	}

	getBoxTargetDistance(nextState) {
		let totalDistance = 0
		const boxes = []
		let targets = []

		nextState.forEach((col, x) => {
			col.forEach((row, y) => {
				if (row === BOX) boxes.push({ x, y })
				if (row === TARGET) targets.push({ x, y })
			})
		})


		for (let i = 0; i < boxes.length; i++) {
			const box = boxes[i]
			let targetIndex = null
			let closestTargetDistance = Infinity

			for (let j = 0; j < targets.length; j++) {
				const target = targets[j]

				let distance = Math.abs(box.x - target.x) + Math.abs(box.y - target.y)

				if (distance < closestTargetDistance) {
					closestTargetDistance = distance
					targetIndex = j
				}
			}

			totalDistance += closestTargetDistance
			if (targetIndex) {
				targets.splice(targetIndex, 1)
			}
		}

		return totalDistance
	}

	boxTargetHeuristic(stateNode) {
		return this.getBoxTargetDistance(stateNode.state)
	}

	boxTargetPlayerHeuristic(stateNode) {
		let totalDistance = this.getBoxTargetDistance(stateNode.state)
		const boxes = []

		stateNode.state.forEach((col, x) => {
			col.forEach((row, y) => {
				if (row === BOX) boxes.push({ x, y })
			})
		})

		const playerPos = stateNode.player
		boxes.forEach(box => {
			let closestBoxDistance = Infinity
			let distance = Math.abs(box.x - playerPos.x) + Math.abs(box.y - playerPos.y)
			if (distance < closestBoxDistance) {
				closestBoxDistance = distance
			}

			totalDistance += closestBoxDistance
		})

		return totalDistance
	}

	completedTargetsHeuristic(stateNode) {
		const targets = []

		stateNode.state.forEach((col, x) => {
			col.forEach((row, y) => {
				if (row === TARGET) targets.push({ x, y })
			})
		})

		return targets.length
	}
}
