import {character} from "../class/CharacterClass"
import {savePosition} from "../function/Movement"
import {orthogonal,cross,surround,L_move,two_step,one_step} from "../function/Closer"

function swap({x,y},{xNew,yNew}){
    let fromPos=document.querySelector(`[data-rows="${x}"][data-columns="${y}"]`)
    let toPos=document.querySelector(`[data-rows="${xNew}"][data-columns="${yNew}"]`)
    toPos.innerHTML=fromPos.innerHTML
    fromPos.innerHTML=""
}

let move={
    order(x,y,xNew,yNew){let order=[]
                        xNew>x?order.push(xNew,x):order.push(x,xNew)
                        yNew>y?order.push(yNew,y):order.push(y,yNew)
                        return {xLarge:order[0],xSmall:order[1],yLarge:order[2],ySmall:order[3]}},

    "orthogonal":({x,y},{xNew,yNew},positions,opponent,team)=>{
            let {xLarge,xSmall,yLarge,ySmall}=move.order(x,y,xNew,yNew)
            if(xNew==x || yNew==y){
                for(let cord of [...positions,...opponent]){
                    if(xLarge>cord.x&&cord.x>xSmall&&cord.y==ySmall||yLarge>cord.y&&cord.y>ySmall&&xLarge==cord.x){
                        return false
                    }
                }
                return  true;
            }
            else{
                return false;}
        },
    "cross":({x,y},{xNew,yNew},positions,opponent,team)=>{
            let xSlope=xNew-x;
            let ySlope=yNew-y;
            if(Math.abs(ySlope/xSlope)===1){
                let cantCross=[...positions,...opponent].filter((cord)=>cord.x===x+Math.sign(xSlope)&&cord.y===y+Math.sign(ySlope))
                return cantCross.length===0?true:false            
            }
            else{return false}
        },
    "L":({x,y},{xNew,yNew},positions,opponent,team)=>{
            if(Math.abs(yNew-y)==2 && Math.abs(xNew-x)==1 || Math.abs(xNew-x)==2 && Math.abs(yNew-y)==1 ){
                return true;}
            else{
                return false}
        },
    "one_step":({x,y},{xNew,yNew},positions,opponent,team)=>{
        let direction=1
        if(team){direction=-1;if(x<xNew)return false}else{if(x>xNew)return false}
        if(Math.abs(xNew-x)==1 && y==yNew ){ return "only_Move";}else{return false}
        },
    "two_step":({x,y},{xNew,yNew},positions,opponent,team)=>{
        let direction=1
        if(team){direction=-1;if(x<xNew)return false}else if(x>xNew)return false
        if(3==xNew && direction>0 && y==yNew || 4==xNew && direction<0 && y==yNew ){
            for(let cord of [...positions,...opponent]){
                if(cord.x==x+direction&&y==cord.y){
                    return false
                }
            }
            return "only_Move";}
        else{return false}
    },
    "queen":({x,y},{xNew,yNew},positions,opponent,team)=>{
        if(Math.abs(yNew-y)<2 && Math.abs(xNew-x)<2){
            return {xNew,yNew};}
        else{
        return 0}
        },
    "attack":({x,y},{xNew,yNew},positions,opponent,team,attack)=>{
        if(!attack)return false
        let direction=1
        if(team){direction=-1;if(x<xNew)return false}else if(x>xNew)return false
        if(x+direction==xNew&&(y+1==yNew||y-1==yNew)){
            return true}
        return false
    }

}
let scope={
    "orthogonal":(x,y,team,opponent)=>orthogonal(x,y,team,opponent),
    "cross":(x,y,team,opponent)=>cross(x,y,team,opponent),
    "L":(x,y,team,opponent)=>L_move(x,y,team,opponent),
    "two_step":(x,y,team,opponent)=>two_step(x,y,team,opponent),
    "one_step":(x,y,team,opponent,teamNumber)=>one_step(x,y,team,opponent,teamNumber),
    "queen":(x,y,team,opponent)=>surround(x,y,team,opponent)
}

function soldiersCreator(team){
    let i=0; 
    let soldier=[]
    let row=team?6:1
    while(i<8){
        soldier.push(new character("soldier",row,i,[move.one_step,move.two_step,move.attack],[scope.one_step,scope.two_step],i+10,team))
        i+=1
    }
    return soldier
}

export const charactersTeam1={
    "team":0,
    "queen_0":new character("queen",0,4,[move.queen],[scope.queen],"1",0),
    "king_0":new character("king",0,3,[move.orthogonal,move.cross],[scope.orthogonal,scope.cross],"2",0),
    
    "bishop-l_0":new character("bishop",0,2,[move.cross],[scope.cross],"3",0),
    "bishop-r_0":new character("bishop",0,5,[move.cross],[scope.cross],"4",0),

    "knight_l_0":new character("knight",0,1,[move.L],[scope.L],"5",0),
    "knight_r_0":new character("knight",0,6,[move.L],[scope.L],"6",0),

    "castel_l_0":new character("castel",0,0,[move.orthogonal],[scope.orthogonal],"7",0),
    "castel_r_0":new character("castel",0,7,[move.orthogonal],[scope.orthogonal],"8",0),

    "soldiers_0":soldiersCreator(0)       
}
export const charactersTeam2={
    "team":1,
    //7,4
    "queen_1":new character("queen",7,4,[move.queen],[scope.queen],"1",1),
    "king_1":new character("king",7,3,[move.orthogonal,move.cross],[scope.orthogonal,scope.cross],"2",1),
    
    "bishop-l_1":new character("bishop",7,2,[move.cross],[scope.cross],"3",1),
    "bishop-r_1":new character("bishop",7,5,[move.cross],[scope.cross],"4",1),

    "knight_l_1":new character("knight",7,1,[move.L],[scope.L],"5",1),
    "knight_r_1":new character("knight",7,6,[move.L],[scope.L],"6",1),

    "castel_l_1":new character("castel",7,0,[move.orthogonal],[scope.orthogonal],"7",1),
    "castel_r_1":new character("castel",7,7,[move.orthogonal],[scope.orthogonal],"8",1),

    "soldiers_1":soldiersCreator(1)       
}

