import "./css/main.css"

import Plates from "./components/Plates"
import {charactersTeam1,charactersTeam2} from "./components/Characters"
import { useState,useEffect } from "react"
import {AddCharacter} from "./components/Plates"
import { savePosition,checkBetween } from "./function/Movement"
import Scope from "./function/Scope"
import Checkmate from "./function/Checkmate"

export const Main=()=>{
    let [changed,change]=useState(0)
    let move={from:null,to:null}
    let [player,changePlayer]=useState(true)
    let positionTeam1=savePosition(charactersTeam1).positions
    let positionTeam2=savePosition(charactersTeam2).positions
    let prev=0
    let [scope,setScope]=useState([])
    let plated=AddCharacter([])
    let [clicked,click]=useState(true)
    let [selected,select]=useState(null)


    
    function onClickHandler(plate){
        if(plate.character){ //character  
            if(changed>prev){
                try{if(player){if(plate.character.team==1 && selected.team!==0)return 0}
                else{if(plate.character.team==0 && selected.team!==1)return 0}
                prev=changed}
                catch(e){console.log("%c other team need to make its move now", "color:red; font-family:sans-serif; font-size: 15px")
                return 0}
                
            }
            if(selected===null || selected.team===plate.character.team){ //select character
                select(plate.character)
                setScope(Scope(plate.character,positionTeam1,positionTeam2))
            }
            else if(selected===plate.character)return false
            else if(plate.character.team!==selected.team){//if already a character selected select other character in different team to attacked 
                if(checkBetween(selected,plate,charactersTeam1,charactersTeam2,positionTeam1,positionTeam2,change,true,changePlayer))select(null)
            }
        }
        else if(selected){     // position move To Empty Space
            if(checkBetween(selected,plate,charactersTeam1,charactersTeam2,positionTeam1,positionTeam2,change,false,changePlayer))select(null)
        }
        else{console.log("please Select a character first")}
    }
    
    useEffect(()=>{
        positionTeam1=savePosition(charactersTeam1).positions
        positionTeam2=savePosition(charactersTeam2).positions
        setScope([])
    },[changed])
    return(
        <main>

         <Plates  plates={()=>AddCharacter()}  clickHandler={(e)=>onClickHandler(e)} scope={scope}/>
        </main>
    )
}

