import React from 'react'
import {PositionToNumber} from "./PositionAlter"

function Scope(character=null,positionTeam1=null,positionTeam2=null) {
    let positions,opponent
    let scopeNumber=[]
    if(character!=null){
        if(character.team){positions=positionTeam2;opponent=positionTeam1}else{positions=positionTeam1;opponent=positionTeam2}
        scopeNumber=character.scopeRange(positions,opponent).map(e=>PositionToNumber(e.x,e.y))
    }
    return scopeNumber
}

export default Scope
