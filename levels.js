import level0 from './levels/level0.js'
import level1 from './levels/level1.js'
import level2 from './levels/level2.js'
import level3 from './levels/level3.js'
import level4 from './levels/level4.js'
import { PLAYER } from './constants.js'

export class Levels {
	#levels = [level0, level1, level2, level3, level4]

	#rotate(source) {
		const res = source[0].map(() => [])
		for (let i = 0; i < source.length; i++) {
			for (let j = 0; j < source[0].length; j++) {
				res[j][i] = source[i][j]
			}
		}

		return res
	}

	get(index) {
		const { level, player } = this.#levels[index]
		if (!level || !player) {
			throw new Error('Wrong level index')
		}

		level[player.x][player.y] = PLAYER
		return {
			level: this.#rotate(level),
			levelPlayer: player
		}
	}
}