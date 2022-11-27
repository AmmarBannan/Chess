import {PositionToNumber,NumberToPosition} from "../function/PositionAlter"
import {charactersTeam1,charactersTeam2} from "./Characters"
import Picker from "../images/Picker"
import Scope from "../function/Scope"

function Field(arr) {
    let i=0
    let color="white"
    let plates=[]
    // console.log("contractor",arr.includes(i))
    while(i<64){
        if(i%8)color=color==='black'?'white':'black'
        if(arr.includes(i)){plates.push({color:color+' red',character:null,position:i})}
        else{plates.push({color:color,character:null,position:i})}
        i++ 
    }
    return plates
}

export function AddCharacter(arr=[]) {
    let plates=Field(arr)
    for(const [key, char] of Object.entries({...charactersTeam1,...charactersTeam2})){
        if(key=="team")continue
        if(Array.isArray(char))char.map(soldier=>{
            let src=soldier.getName()+"Img"
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
    let colorTeam=(plate)=>{if(plate.character)return plate.character.team?"":"0"}
    let displayCharacter=(plate)=>{return plate.character?plate.character.render(images[plate.character.getName()+"Img"+colorTeam(plate)]):""}
    let tablet=blocks.map((plate,index)=>{ 
        return <div className={plate.color+" plate"}
            key={index} 
            onClick={()=>props.clickHandler(plate)}
            id={"id"+index}>
            {displayCharacter(plate)}</div>
    })
    return (   
    <div className="ground">{tablet}</div>
    )
}

export default Plates
