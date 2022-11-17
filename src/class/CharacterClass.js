import {drag} from "../function/Drag"
export class character{
    constructor(name,positionX,positionY,moves,id,team,alive=true){
        this.name=name;
        this.positionX=positionX;
        this.positionY=positionY;
        this.moves=moves;
        this.alive=alive
        this.id=id
        this.team=team
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
                    draggable="true" 
                    onDragStart={e=>drag(e)}></img>
    };
    getPosition(){
        return {x:this.positionX,y:this.positionY};
    };
    setPosition(position){
        this.positionX=position.xNew;
        this.positionY=position.yNew;
    };
    moveStep({xNew,yNew},teamPositions,opponentPosition,attack){
        for(let move of this.moves){
                let canMove=move(this.getPosition(),{xNew,yNew},teamPositions,opponentPosition,this.getTeam(),attack)
                if(canMove)return canMove
            }
            return false
    }
}

