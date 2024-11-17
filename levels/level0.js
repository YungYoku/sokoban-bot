import { BOX, SPACE, TARGET, WALL } from '../constants.js'

const level = [
	[WALL, WALL,  WALL,  WALL,   WALL],
	[WALL, SPACE, SPACE, SPACE,  WALL],
	[WALL, SPACE, BOX,   SPACE,  WALL],
	[WALL, SPACE, SPACE, TARGET, WALL],
	[WALL, WALL,  WALL,  WALL,   WALL],
]

const player = {
	x: 1,
	y: 1
}

export default {
	level,
	player
}
