import React from 'react'

function Checkmates(queenPosition,threats) {
    return threats.includes(queenPosition)

}

export default Checkmates
