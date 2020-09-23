import React from "react"
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.scss"

class TimerSet extends React.Component {

render(){
    return(

        <form method="post" action="">
            <p id="container"><label for="ses">Session Length </label>
            <label for="break">Break Length</label></p>
            <div id="container">
                <p>
                    <FontAwesomeIcon 
                    icon={faAngleDown} 
                    class="num-icons"
                    onClick={this.props.decreaseSession}/>
                <input 
                class="nums"
                type="text" 
                name="session" 
                id="session"
                defaultValue="25">
                </input>
                <FontAwesomeIcon 
                icon={faAngleUp} 
                class="num-icons"
                onClick={this.props.increaseSession}/>
            </p>
            <p>
                <FontAwesomeIcon 
                icon={faAngleDown} 
                class="num-icons"
                onClick={this.props.decreaseBreak}/>
                <input 
                class="nums"
                type="text" 
                name="break" 
                id="break" 
                defaultValue="5">
                </input>
                <FontAwesomeIcon 
                icon={faAngleUp} 
                class="num-icons"
                onClick={this.props.increaseBreak}/>
            </p>
        </div>  
      </form> 
    )
    }
}

export default TimerSet;