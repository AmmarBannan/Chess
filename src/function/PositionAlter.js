import React from 'react'
import {charactersTeam1,charactersTeam2} from "../components/Characters"

export function NumberToPosition(num) {
    return {xNew:Math.floor(num/8),yNew:num%8}
}

export function PositionToNumber(x,y) {
    return x*8+y
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

