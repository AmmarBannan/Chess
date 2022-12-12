import {PositionToNumber} from "./PositionAlter"

function Scope(character,positionTeam1,positionTeam2,ordered=false) {
    let positions,opponent
    if(ordered){return character.scopeRange(positionTeam1,positionTeam2).map(e=>PositionToNumber(e.x,e.y))}
    if(character.team){positions=positionTeam2;opponent=positionTeam1}else{positions=positionTeam1;opponent=positionTeam2}
    return character.scopeRange(positions,opponent).map(e=>PositionToNumber(e.x,e.y))
    return false
}

export default Scope
