import { NumberToPosition,PositionToNumber,getPositionByCharacter } from "./PositionAlter"
import { getCharacterByPosition } from "./PositionAlter"; 

export function savePosition(characters){
    let characterPositions=new Map();
    let positions=[]
    for(const [key, char] of Object.entries(characters)){
        if(key=="team")continue
        if(Array.isArray(char))char.map(soldier=>{
            characterPositions.set(PositionToNumber(soldier.positionX,soldier.positionY),"soldier")
            positions.push({x:soldier.positionX,y:soldier.positionY})
        })
        else{
            characterPositions.set(PositionToNumber(char.positionX,char.positionY),key)}
            positions.push({x:char.positionX,y:char.positionY})
    }
    return {"characterPositions":characterPositions,"positions":positions}

}
export function checkBetween(move,plate,charactersTeam1,charactersTeam2,positionTeam1,positionTeam2,change,attack,changePlayer){
    let positions ;let opponent
    if(move.team){positions=positionTeam2;opponent=positionTeam1}else{positions=positionTeam1;opponent=positionTeam2}
    let moveTo=NumberToPosition(plate.position)
    let canMove=move.moveStep(moveTo,positions,opponent,attack)
    if(canMove){
        if(attack){
            let aim=getCharacterByPosition(plate.position) //has character key and position and index if soldier
            if(canMove==="only_Move") return false
            else if(aim[1]!=null){
                aim[0].splice(aim[1],1)
            }
            else{
                let char=aim[0]
                opponent===positionTeam1?delete charactersTeam1[char]:delete charactersTeam2[char]
                opponent===positionTeam1?delete console.log(charactersTeam1):console.log(charactersTeam2)
            }
        }
        // if(underThreat){return false}
        // else{
        // underThreat
        return true
    }
    return false
}
