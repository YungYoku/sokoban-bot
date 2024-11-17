import { BOX, SPACE, TARGET, WALL } from '../constants.js'

const level = [
	[WALL, WALL, WALL, WALL, WALL, WALL],
	[WALL, SPACE, SPACE, SPACE, SPACE, WALL],
	[WALL, SPACE, SPACE, BOX, TARGET, WALL],
	[WALL, SPACE, TARGET, BOX, SPACE, WALL],
	[WALL, SPACE, WALL, WALL, SPACE, WALL],
	[WALL, WALL, WALL, WALL, WALL, WALL],
]

const player = {
	x: 1,
	y: 1
}

export default {
	level,
	player
}
