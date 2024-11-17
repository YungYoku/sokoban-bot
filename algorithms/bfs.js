import { StateNode } from '../state.js'
import Algorithm from './algorithm.js'

export default class BFS extends Algorithm {
	constructor (game) {
		super(game)
	}

	testMoves(stateNode) {
		const { state, player, moves } = stateNode

		for (let i = 0; i < moves.length; i++) {
			const move = moves[i]
			const direction = this.getDirection(player, move)

			const newState = new StateNode(state, stateNode)
			newState.state = this.game.movePlayer(direction, newState)
			newState.generateMoves()

			if (this.isGameFinished(newState.state)) return newState

			if (!this.listC[newState.getHash()]) this.listO.push(newState)
		}

		return null
	}

	async run() {
		this.reset()
		this.listO.push(this.game.getInitialStateNode())

		while (this.listO.length) {
			this.increaseIteration()

			const stateNode = this.listO.shift()
			this.listC[stateNode.getHash()] = true

			const result = this.testMoves(stateNode)
			if (result) return await this.renderResult(result)
		}
	}
}
