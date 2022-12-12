import React from 'react'

function StartOver(props) {
    return (
        <div>
            <button className="paths_btn" onClick={()=>props.clickHandler()}>reset</button>
        </div>
    )
}

export default StartOver
