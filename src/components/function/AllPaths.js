import {two_step,one_step,orthogonal,cross,surround,L_move} from "./Closer"
import { PositionToNumber } from "./PositionAlter"
import { savePosition } from "./Movement"
import Scope from "./Scope"

function AllPaths(team,opponent) {
    let teamPosition=savePosition(team).positions
    let opponentPosition=savePosition(opponent).positions
    let allPaths=[]
    for(let [key,char] of Object.entries(team)){
        if(key=="team")continue
        if(Array.isArray(char)){
            for(let soldier of char){
                allPaths.push(Scope(soldier,teamPosition,opponentPosition,true))
            }
        }
        else{
            allPaths.push(Scope(char,teamPosition,opponentPosition,true))
        }
    }
    return allPaths.flatMap(e=>e)
}

export default AllPaths

