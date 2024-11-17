import {BOX, SPACE, TARGET, WALL} from '../constants.js'

const level = [
	[WALL,  WALL,   WALL,   WALL,   WALL,   WALL,   WALL,  WALL],
	[WALL,  WALL,   WALL,   WALL,   WALL,   WALL,   WALL,  WALL],
	[WALL,  SPACE,  SPACE,  SPACE,  SPACE,  WALL,   WALL,  WALL],
	[WALL,  SPACE,  SPACE,  SPACE,  TARGET,  TARGET, SPACE, WALL],
	[WALL,  SPACE,  BOX,    BOX,    BOX,    SPACE, SPACE, WALL],
	[WALL,  SPACE,  SPACE,  WALL,   SPACE,  TARGET, SPACE, WALL],
	[WALL,  WALL,   WALL,   WALL,   WALL,   WALL,   WALL,  WALL],
	[WALL,  WALL,   WALL,   WALL,   WALL,   WALL,   WALL,  WALL],
]

const player = {
	x: 5,
	y: 4
}

export default {
	level,
	player
}
