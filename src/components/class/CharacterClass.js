import {drag} from "../function/Drag"
export class character{
    constructor(name,positionX,positionY,moves,scope,id,team,alive=true){
        this.name=name;
        this.positionX=positionX;
        this.positionY=positionY;
        this.moves=moves;
        this.alive=alive
        this.id=id
        this.team=team
        this.scope=scope
    }
    getID(){
        return this.id
    }
    getName(){
        return this.name
    }
    getAlive(){
        return this.alive
    }
    setAlive(alive){
        this.alive=alive
    }
    getTeam(){
        return this.team
    }
    setTeam(team){
        this.team=team
    }
    render(img){
        return <img src={img}
                    id={"id-"+this.name+this.id}
                    alt={this.name}
                    onDragStart={e=>drag(e)}></img>
    };
    getPosition(){
        return {x:this.positionX,y:this.positionY};
    };
    setPosition(position){
        let cord=Object.values(position)
        this.positionX=cord[0];
        this.positionY=cord[1];
    };
    moveStep({xNew,yNew},teamPositions,opponentPosition,attack){
        let canMove
        for(let move of this.moves){
                canMove=move(this.getPosition(),{xNew,yNew},teamPositions,opponentPosition,this.getTeam(),attack)
                if(canMove)return canMove
            }
        return false
    }
    scopeRange(teamPositions,opponentPosition){
        let possibilities=[]
        for(let possibility of this.scope){
            possibilities=possibilities.concat(possibility(this.positionX,this.positionY,teamPositions,opponentPosition,this.team))
        }
        return possibilities
    }
}

