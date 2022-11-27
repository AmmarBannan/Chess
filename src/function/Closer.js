function hasPosition(arr,x,y){return arr.find(pos=>pos.x===x&&pos.y===y)&&true}

export function orthogonal(x,y,team,opponent) {
    let left=y-1,right=y+1,up=x-1,down=x+1
    let leftHit=true,rightHit=true,upHit=true,downHit=true
    let steps=[]
    while(left>=0&&!hasPosition(team,x,left)&&leftHit){steps.push({x:x,y:left});leftHit=!hasPosition(opponent,up,left);left--}
    while(right<=7&&!hasPosition(team,x,right)&&rightHit){steps.push({x:x,y:right});rightHit=!hasPosition(opponent,up,left);right++}
    while(up>=0&&!hasPosition(team,up,y)&&upHit){steps.push({x:up,y:y});upHit=!hasPosition(opponent,up,left);up--}
    while(down<=7&&!hasPosition(team,down,y)&&downHit){steps.push({x:down,y:y});downHit=!hasPosition(opponent,up,left);down++}
    return steps
}
export function cross(x,y,team,opponent) {
   
    let ul=true,ur=true,dl=true,dr=true
    let steps=[]
    let left=y-1,right=y+1,up=x-1,down=x+1
    while(left>=0&&up>=0&&!hasPosition(team,up,left)&&ul){steps.push({x:up,y:left});ul=!hasPosition(opponent,up,left);left--;up--}
    left=y-1;right=y+1;up=x-1;down=x+1
    while(right<=7&&up>=0&&!hasPosition(team,up,right)&&ur){steps.push({x:up,y:right});ur=!hasPosition(opponent,up,right);right++;up--}
    left=y-1;right=y+1;up=x-1;down=x+1
    while(left>=0&&down<=7&&!hasPosition(team,down,left)&&dl){steps.push({x:down,y:left});dl=!hasPosition(opponent,down,left);left--;down++}
    left=y-1;right=y+1;up=x-1;down=x+1
    while(right<=7&&down<=7&&!hasPosition(team,down,right)&&dr){steps.push({x:down,y:right});dr=!hasPosition(opponent,down,right);right++;down++}
    return steps
}

export function surround(x,y,team){
    let steps=[]
    for(let i=-1;i<2;i++){
        for(let j=-1;j<2;j++){
            if(x+i>-1&&x+i<8&&y+j>-1&&y+j<8&&!hasPosition(team,x+i,y+j)){steps.push({x:x+i,y:y+j})}
        }
    }
    return steps
}
export function L_move(x,y,team){
    let steps=[]
    let arr=[2,-2,1,-1]
    for(let i of arr){
        for(let j of arr){
            if(Math.abs(i)===Math.abs(j))continue
            if(x+i>-1&&x+i<8&&y+j>-1&&y+j<8&&!hasPosition(team,x+i,y+j))steps.push({x:x+i,y:y+j})
        }
    }
    return steps
}
export function two_step(x,y,team){
    if(x==1&&!hasPosition(team,x+1,y)&&!hasPosition(team,x+2,y))return [{x:x+2,y:y}]
    if(x==6&&!hasPosition(team,x-1,y)&&!hasPosition(team,x+2,y))return [{x:x-2,y:y}]
    return []
}
export function one_step(x,y,team,opponent,teamNumber){
    let direction=teamNumber?-1:1
    let steps=[]
    if(!hasPosition(team,x+direction,y))steps.push({x:x+direction,y:y})
    if(hasPosition(opponent,x+direction,y+1))steps.push({x:x+direction,y:y+1})
    if(hasPosition(opponent,x+direction,y-1))steps.push({x:x+direction,y:y-1})
    return steps
}

