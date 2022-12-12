import React from 'react'
import {charactersTeam1,charactersTeam2} from "../Renders/Characters"

export function NumberToPosition(num) {
    return {xNew:Math.floor(num/8),yNew:num%8}
}

export function PositionToNumber(...args) {
   
    if(typeof args[0]==="object"){
        let cord=Object.values(args[0])
        return cord[0]*8+cord[1]
    }
    return args[0]*8+args[1]
}

export function getCharacterByPosition(position){
    for(const [key, char] of Object.entries({...charactersTeam1,...charactersTeam2})){
        if(key=="team")continue
        if(Array.isArray(char)){
            let index=0
            for(let soldier of char){
                
                let {x,y}=soldier.getPosition()
                if(PositionToNumber(x,y)===position)return [char,index]
                index+=1
            }
        }
        else{
            let {x,y}=char.getPosition()
            if(PositionToNumber(x,y)===position)return [key,null]
        }
    }
    
}

