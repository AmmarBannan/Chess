
import { SketchPicker } from 'react-color';
import { useState,useEffect } from 'react';

export default function Color(props) {
    let [background,setBackGround]=useState("gold");
    let [selectedColor,selectColor]=useState(null)
    useEffect(() => {
        if(props.lastColor.color2===background || props.lastColor.color1===background)return
        else if(selectedColor==1){
            props.changeColor({color2:props.lastColor.color2,color1:background})
        }else if(selectedColor==0){
            props.changeColor({color1:props.lastColor.color1,color2:background})
        }
        console.log("selectedColor:",selectedColor)
    }, [selectedColor,background])

    let changeColorOf=(e)=>{
        selectColor(parseInt(e.target.value))
    }
    return <>
        <select onChange={(e)=>changeColorOf(e)}>
            <option value={0}>Color#1</option>
            <option value={1}>Color#2</option>
        </select>
        <SketchPicker   color={background } onChangeComplete={(color)=>setBackGround(color.hex) }/>
    </>
}