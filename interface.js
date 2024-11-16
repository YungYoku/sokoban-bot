import BFS from './algorithms/bfs.js'
import DFS from './algorithms/dfs.js'
import IterativeDFS from './algorithms/iterativeDfs.js'
import AStar from './algorithms/aStar.js'
import Game from './game.js'

class InterfaceField {
	node

	constructor (id) {
		this.node = document.getElementById(id)
	}
}
class InterfaceSelect extends InterfaceField {
	constructor (id, cb) {
		super(id)
		this.node.addEventListener('change', cb)
	}
}

class InterfaceButton extends InterfaceField {
	constructor (id, cb) {
		super(id)

		this.node.addEventListener('click', cb)
	}
}

class InterfaceInfo extends InterfaceField {
	constructor (id) {
		super(id)
	}

	print(text) {
		this.node.innerText = text
	}
}

class Interface {
	game

	levelIndex = 0
	algorithmIndex = 0

	algorithms = []

	stepsCountField
	iterationsCountField

	constructor () {
		this.game = new Game()
		this.game.build(0)

		new InterfaceSelect('level-selection', this.changeLevel.bind(this))
		new InterfaceSelect('algorithm-selection', this.changeAlgorithm.bind(this))

		new InterfaceButton('start', () => this.run())
		new InterfaceButton('reset', () => this.resetLevel())

		this.stepsCountField = new InterfaceInfo('steps-count')
		this.iterationsCountField = new InterfaceInfo('iterations-count')

		this.algorithms = [
			() => new BFS(this.game).run(),
			() => new DFS(this.game).run(),
			() => new IterativeDFS(this.game).run(),
			() => new AStar(this.game).run(value => this.game.completedTargetsHeuristic(value)),
			() => new AStar(this.game).run(value => this.game.boxTargetHeuristic(value)),
			() => new AStar(this.game).run(value => this.game.boxTargetPlayerHeuristic(value)),
		]
	}

	#printInfo(info = { steps: 0, iterations: 0 }) {
		this.stepsCountField.print(`Количество ходов: ${info.steps}`)
		this.iterationsCountField.print(`Количество итераций: ${info.iterations}`)
	}

	async run() {
		this.algorithms[this.algorithmIndex]()
			.then(info => {
				this.#printInfo(info)
			})
	}

	resetLevel() {
		this.#printInfo()
		this.game.build(this.levelIndex)
	}

	changeLevel ({ target }) {
		this.levelIndex = target.selectedIndex

		this.resetLevel()
	}

	changeAlgorithm ({ target }) {
		this.algorithmIndex = Number(target.value)

		this.resetLevel()
	}
}

new Interface()