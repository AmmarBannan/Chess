import React from 'react'

function SupportBtn(props) {
    return (
        <div>
            <button className="paths_btn" onClick={()=>props.clickHandler()}>showPaths</button>
        </div>
    )
}

export default SupportBtn
