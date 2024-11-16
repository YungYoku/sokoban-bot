import {BOX, SPACE, TARGET, WALL} from '../constants.js'

const level = [
    [WALL, WALL,   WALL,   WALL,  WALL,   WALL,   WALL,   WALL, WALL, WALL],
    [WALL, WALL,   WALL,   SPACE, SPACE,  SPACE,  WALL,   WALL, WALL, WALL],
    [WALL, TARGET, SPACE, BOX,   SPACE,  SPACE,  WALL,   WALL, WALL, WALL],
    [WALL, WALL,   WALL,   SPACE, BOX,    TARGET, WALL,   WALL, WALL, WALL],
    [WALL, TARGET, WALL,   WALL,  BOX,    SPACE,  WALL,   WALL, WALL, WALL],
    [WALL, SPACE,  WALL,   SPACE, TARGET, SPACE,  WALL,   WALL, WALL, WALL],
    [WALL, BOX,    SPACE,  SPACE, SPACE,  BOX,    SPACE,  WALL, WALL, WALL],
    [WALL, SPACE,  SPACE,  SPACE, SPACE,  SPACE,  SPACE,  WALL, WALL, WALL],
    [WALL, SPACE,  SPACE,  SPACE, SPACE,  TARGET, SPACE,  WALL, WALL, WALL],
    [WALL, WALL,   WALL,   WALL,  WALL,   WALL,   WALL,   WALL, WALL, WALL]
]

const player = {
    x: 2,
    y: 2
}

export default {
    level,
    player
}

