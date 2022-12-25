import {PositionToNumber,NumberToPosition} from "../function/PositionAlter"
import {charactersTeam1,charactersTeam2} from "./Characters"
import Picker from "../../images/Picker"
import Scope from "../function/Scope"
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Field(arr) {
    let i=0
    let color="color1"
    let plates=[]
    // console.log("contractor",arr.includes(i))
    while(i<64){
        if(i%8)color=color==='color2'?'color1':'color2'
        if(arr.includes(i)){plates.push({color:color,character:null,position:i,selected:' red'})}
        else{plates.push({color:color,character:null,position:i,selected:""})}
        i++ 
    }
    return plates
}

export function AddCharacter(arr=[]) {
    let plates=Field(arr)
    for(const [key, char] of Object.entries({...charactersTeam1,...charactersTeam2})){
        if(key=="team")continue
        if(Array.isArray(char))char.map(soldier=>{
            plates[PositionToNumber(soldier.positionX,soldier.positionY)].character=soldier //.render(images[src])
            
        })
        else{
            plates[PositionToNumber(char.positionX,char.positionY)].character=char //.render(images[src])
        }
    }
    return plates
}



function Plates(props) {
    let blocks=AddCharacter(props.scope) 
    let images=Picker()
    let colorTeam=(char)=>{if(char)return char.team?"1":"0"}
    let displayCharacter=(char)=>{
        let display=""
        if(char){
            display=char.render(images[char.getName()+"Img"+colorTeam(char)])
        }
        return display
    }
    let tablet=blocks.map((plate,index)=>{ 
        let color=plate.color
        console.log("117:",props.color[color])
        return <div 
            className={"plate"+plate.selected}
            style={{"backgroundColor":props.color[color]}}
            key={index} 
            onClick={()=>props.clickHandler(plate)}
            id={"id"+index}
            onMouseOver={()=>props.hovering(plate)}>
            {displayCharacter(plate.character)}</div>
    })
    let cursorImg=null
    if(props.cursor){
        cursorImg=images[props.cursor.getName()+"Small"]
    }
    return (   
    <div className="ground" style={{cursor:`url(${cursorImg}),auto`}}>{tablet}</div>
    )
}

export default Plates
