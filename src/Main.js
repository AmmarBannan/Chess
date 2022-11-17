import "./css/main.css"

import Plates from "./components/Plates"
import {charactersTeam1,charactersTeam2} from "./components/Characters"
import { useState,useEffect } from "react"
import {AddCharacter} from "./components/Plates"
import { savePosition,checkBetween } from "./function/Movement"

export const Main=()=>{
    let [changed,change]=useState(0)
    let move={from:null,to:null}
    let [player,changePlayer]=useState(true)
    let positionTeam1=savePosition(charactersTeam1).positions
    let positionTeam2=savePosition(charactersTeam2).positions
    let prev=0
    

    let plated=AddCharacter()
    useEffect(()=>{
        positionTeam1=savePosition(charactersTeam1).positions
        positionTeam2=savePosition(charactersTeam2).positions
        plated=AddCharacter()
        move={from:null,to:null}
    },[changed])
    

    function onClickHandler(plate){
        if(plate.character){ //character   
            if(changed>prev){
                if(player){if(plate.character.team==1)return 0}
                else{if(plate.character.team==0)return 0}
                prev=changed
            }
            if(move.from===null)move.from=plate.character  //select character
            else if(move.from===plate.character)return false
            else if(plate.character.team!==move.from.team){//if already a character selected select other character in different team to attacked 
                console.log("test",player,changed) 
                checkBetween(move,plate,charactersTeam1,charactersTeam2,positionTeam1,positionTeam2,change,true,changePlayer)
            }
        }
        else if(move.from){     // position move To Empty Space
            checkBetween(move,plate,charactersTeam1,charactersTeam2,positionTeam1,positionTeam2,change,false,changePlayer)
        }
        else{console.log("please Select a character first")}
    }
    
    return(
        <main>
         <Plates  plates={()=>AddCharacter()}  clickHandler={(e)=>onClickHandler(e)} />
        </main>
    )
}

