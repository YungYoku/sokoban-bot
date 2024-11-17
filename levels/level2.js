import { BOX, SPACE, TARGET, WALL } from '../constants.js'

const level = [
	[WALL, WALL, WALL, WALL, WALL, WALL, WALL],
	[WALL, WALL, WALL, SPACE, SPACE, WALL, WALL],
	[WALL, SPACE, SPACE, TARGET, BOX, WALL, WALL],
	[WALL, SPACE, SPACE, SPACE, BOX, SPACE, WALL],
	[WALL, SPACE, WALL, TARGET, SPACE, SPACE, WALL],
	[WALL, SPACE, SPACE, SPACE, SPACE, SPACE, WALL],
	[WALL, WALL, WALL, WALL, WALL, WALL, WALL],
]

const player = {
	x: 1,
	y: 2
}

export default {
	level,
	player
}
