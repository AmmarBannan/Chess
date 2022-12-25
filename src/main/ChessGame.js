import "../css/main.css"

import Plates from "../components/Renders/Ground"
import {charactersTeam1,charactersTeam2} from "../components/Renders/Characters"
import { useState,useEffect } from "react"
import {AddCharacter} from "../components/Renders/Ground"
import { savePosition,checkBetween } from "../components/function/Movement"
import Scope from "../components/function/Scope"
import AllPaths from "../components/function/AllPaths"
import SupportBtn from "../components/Renders/SupportBtn.js"
import { PositionToNumber,NumberToPosition } from "../components/function/PositionAlter"
import React from 'react'
import StartOver from '../components/Renders/StartOver.js'
import Color from "../components/Renders/Color.js"




export default function ChessGam(){
    let [changed,change]=useState(0)
    let [player,changePlayer]=useState(true)
    let positionTeam1=savePosition(charactersTeam1).positions
    let positionTeam2=savePosition(charactersTeam2).positions
    let prev=0
    let [scope,setScope]=useState([])
    let [drop,setDrop]=useState([])
    let [selected,select]=useState(null)
    let [showPaths,setShowPaths]=useState(false)
    let queenPosition0=PositionToNumber(charactersTeam1.queen_0.positionX,charactersTeam1.queen_0.positionY)
    let queenPosition1=PositionToNumber(charactersTeam2.queen_1.positionX,charactersTeam2.queen_1.positionY)
    let paths={team0:AllPaths(charactersTeam1,charactersTeam2),team1:AllPaths(charactersTeam2,charactersTeam1)}
    let [prevMove,setPrevMove]=useState(null)
    let [lastPosition,setLastPosition]=useState(null)
    let stepBack=(character,lastPosition)=>character.setPosition(lastPosition)
    let circle=showPaths?drop:scope
    let [load,save]=useState({team1:null,team2:null,turn:null,stepNumber:0})
    let [color,setColor]=useState({color1:"gold",color2:"gray"})
    function update(team,position){
        let i=0
        for(const [key,char] of Object.entries(team)){
            if(key==="team")continue
            if(Array.isArray(char)){
                let j=i
                for(let soldier of char){
                    soldier.setPosition(position[j])
                    j++
                }
                
            }
            else{
                char.setPosition(position[i])
            }
            i++
        }
    }
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('items'))
        if (items) {
            if(items.stepNumber){
            save(items);
            update(charactersTeam1,items.team1)
            update(charactersTeam2,items.team2)}
        }
       
      }, [])
    useEffect(()=>{
        const colors = JSON.parse(localStorage.getItem('color'))
        console.log("colors:",colors)
        if(JSON.stringify(colors)!==JSON.stringify(color) && colors){
            console.log("ture",color,colors,"fdsf")
            setColor(colors)
            console.log("first color set",colors,"color:",color)
        }else{
            localStorage.setItem('color', JSON.stringify(color))
        }
    },[])

    useEffect(()=>{if(color)localStorage.setItem('color', JSON.stringify(color))},[color])

    useEffect(() => {if(load)localStorage.setItem('items', JSON.stringify(load))}, [load])
    if(changed<load.stepNumber){console.log("pass");change(load.stepNumber)}
    function onClickHandler(plate){
        console.log("check1 odd",changed,changed%2==0)
        if(plate.character){ //character 
            try{
                if(changed%2==0){if(plate.character.team===1 && selected.team===1)return 0}
                else if(plate.character.team===0 && selected.team===0)return 0}
            catch(e){console.log("%c other team need to make its move now", "color:red; font-family:sans-serif; font-size: 15px")
            return 0}
            if(selected && plate.character.position===PositionToNumber(selected.getPosition))select(null)
            
            if(selected===null || selected.team===plate.character.team){ //select character
               
                select(plate.character)
                setScope(Scope(plate.character,positionTeam1,positionTeam2))
                setLastPosition(plate.character.getPosition())
            }
            else if(selected===plate.character)return false
            else if(plate.character.team!==selected.team){//if already a character selected select other character in different team to attacked 
                if(checkBetween(selected,plate,charactersTeam1,charactersTeam2,positionTeam1,positionTeam2,change,true,changePlayer)){
                    selected.team?changePlayer(true):changePlayer(false)
                    change(prev=>prev+1)
                    selected.setPosition(NumberToPosition(plate.position))
                    select(null)
                }
            }
        }
        else if(selected){     // position move To Empty Space
            if(checkBetween(selected,plate,charactersTeam1,charactersTeam2,positionTeam1,positionTeam2,change,false,changePlayer)){
                // setPrevMove({character:selected,lastPosition:selected.getPosition(),plate:plate})
                selected.setPosition(NumberToPosition(plate.position))

                positionTeam1=savePosition(charactersTeam1).positions
                positionTeam2=savePosition(charactersTeam2).positions
               

                paths={team0:AllPaths(charactersTeam1,charactersTeam2),team1:AllPaths(charactersTeam2,charactersTeam1)}
                
                if(player && paths.team1.includes(PositionToNumber(charactersTeam1.queen_0.getPosition()))){
                    stepBack(selected,lastPosition)
                    return false
                }
                if(!player && paths.team0.includes(PositionToNumber(charactersTeam2.queen_1.getPosition()))){
                    stepBack(selected,lastPosition)
                    return false
                }
                change(prev=>prev+1)
                selected.team?changePlayer(true):changePlayer(false)   
            }
        }
        else{console.log("please Select a character first")}

    }
    useEffect(()=>{
        queenPosition0=PositionToNumber(charactersTeam1.queen_0.positionX,charactersTeam1.queen_0.positionY)
        queenPosition1=PositionToNumber(charactersTeam2.queen_1.positionX,charactersTeam2.queen_1.positionY)
        paths={team1:AllPaths(charactersTeam1,charactersTeam2),team2:AllPaths(charactersTeam2,charactersTeam1)}
        setScope([])
        select(null)
        if(changed>load.stepNumber)save({team1:positionTeam1,team2:positionTeam2,turn:player,stepNumber:changed})
    },[changed])

    let reset=()=>{
        localStorage.clear()
        window.location.reload(false)
        console.log("%c other team need to make its move now", "color:red; font-family:sans-serif; font-size: 15px")
    }

    let findPath=(plate)=>{
       
        if(!selected && plate.character){
            setScope(Scope(plate.character,positionTeam1,positionTeam2))
            circle=scope
        }
    }

    return(
        <main>
        
         <Plates  plates={()=>AddCharacter()}  clickHandler={(e)=>onClickHandler(e)} scope={circle} cursor={selected}  hovering={(e)=>findPath(e)} color={color}/>
         <SupportBtn clickHandler={()=>{setShowPaths(prev=>!prev);console.log("show_paths:",showPaths)}}/>
         <StartOver clickHandler={()=>reset()}/>
         <Color changeColor={setColor} lastColor={color}/>
        </main>
    )
}

