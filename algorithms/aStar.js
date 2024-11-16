import Algorithm from './algorithm.js'
import { StateNode } from '../state.js'

export default class AStar extends Algorithm {
	constructor (game) {
		super(game)
	}

	getSortedListO() {
		return this.listO.sort((a, b) => a.f() - b.f())
	}

	runWays(stateNode, cb) {
		let f = []
		let minDistance = 200
		const newStates = []

		const { state, player, moves } = stateNode
		for (let i = 0; i < moves.length; i++) {
			const move = moves[i]
			const direction = this.getDirection(player, move)

			newStates[i] = new StateNode(state, stateNode)
			newStates[i].state = this.game.movePlayer(direction, newStates[i])
			newStates[i].generateMoves()

			if (this.isGameFinished(newStates[i].state)) return newStates[i]

			newStates[i].h = cb(newStates[i])
			newStates[i].g = this.getStateHistory(newStates[i]).length
			f[i] = newStates[i].f()
			if (f[i] < minDistance) minDistance = f[i]
		}

		const waysOrder = []
		const isDistancesEmpty = () => !f.find(item => typeof item === 'number' && item !== Number.POSITIVE_INFINITY)
		for (let i = 0; i < f.length; i++) {
			let distance = f[i]
			if (typeof distance === 'number' && distance <= minDistance) {
				waysOrder.push(i)
				f[i] = null
			}

			if (i === f.length - 1) {
				if (isDistancesEmpty()) {
					break
				} else {
					minDistance++
					i = -1
				}
			}
		}

		waysOrder.forEach(index => {
			const keyInListC = newStates[index].getHash()
			const isElInListC = this.listC[keyInListC] === true
			const indexInListO = this.listO.indexOf(el => JSON.stringify(el.state) === JSON.stringify(newStates[index].state))
			const isElInListO = indexInListO !== -1
			if (
				!isElInListC &&
				!isElInListO
			) {
				this.listO.push(newStates[index])
			}
			else if (isElInListO) {
				if (this.listO[indexInListO].f() > newStates[index].f()) {
					this.listO[indexInListO] = newStates[index]
				}
			}
			else if (isElInListC) {
				if (this.listC[keyInListC].f() > newStates[index].f()) {
					delete this.listC[keyInListC]
					this.listO.push(newStates[index])
				}
			}
		})

		this.listO = this.getSortedListO()

		return null
	}

	async run(cb) {
		this.reset()
		this.listO.push(this.game.getInitialStateNode())

		while (this.listO.length) {
			this.increaseIteration()

			const stateNode = this.listO.shift()
			this.listC[stateNode.getHash()] = stateNode

			const result = this.runWays(stateNode, cb)
			if (result) return await this.renderResult(result)
		}
	}
}