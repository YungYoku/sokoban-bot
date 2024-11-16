import { StateNode } from '../state.js'
import Algorithm from './algorithm.js'

export default class IterativeDFS extends Algorithm {
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

            const stateKey = newState.getHash()
            if (this.listC[stateKey]) {
                if (this.getStateHistory(newState).length <= this.getStateHistory(this.listC[stateKey]).length) {
                    delete this.listC[stateKey]
                }
            }

            if (!this.listC[stateKey]) this.listO.push(newState)
        }

        return null
    }

    async run() {
        this.reset()
        this.listO.push(new StateNode(this.game.getDefaultState()))

        let limit = 0
        while (this.listO.length) {
            this.increaseIteration()

            const stateNode = this.listO.pop()
            this.listC[stateNode.getHash()] = true

            if (this.getStateHistory(stateNode).length < limit) {
                const result = this.testMoves(stateNode)
                if (result) return await this.renderResult(result)
            }

            if (this.listO.length === 0) {
                this.listC = {}
                limit++
                this.listO.push(new StateNode(this.game.getDefaultState()))
            }
        }

        return true
    }
}
