import React from "react"
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Countdown extends React.Component {
    
    constructor(props){
        super(props)  
   
      this.state = {
        sessionLength: 25,
        breakLength: 5,
        pause: false,
        reset: false,
        realTime: 0
      };
    }
    
    decreaseSession = () => {
        let current = this.state.sessionLength;
        let newNum = current -1;
        this.setState({
          display: this.props.formatTime(Number(newNum) * 60),
          pause: false,
          sessionLength: newNum
        });
        document.getElementById("cd-div").innerHTML = this.props.formatTime(
            Number(newNum) * 60
          );
    }
      
    increaseSession = () => {
        let current = this.state.sessionLength;
        let newNum = current + 1;
    
        this.setState({
          display: this.props.formatTime(Number(newNum) * 60),
          pause: false,
          sessionLength: newNum
        });
        document.getElementById("cd-div").innerHTML = this.props.formatTime(
            Number(newNum) * 60
          );
    }
    
    increaseBreak = () => {
        let current = this.state.breakLength;
        this.setState({
          breakLength:  Number(current) + 1,
          realTime: this.state.realTime
        });
    }
    
    decreaseBreak = () => {
        let current = this.state.breakLength;
        this.setState({
          breakLength:  Number(current) - 1,
          realTime: this.state.realTime
        });
    }

    startCountdown = () => {
        
        this.setState({
            realTime: this.state.sessionLength * 60
        });
        
        console.log(this.state.sessionLength);
        if (this.state.pause === true || this.state.reset === true){
         
            this.setState({
                pause: false,
                reset: false,
                realTime: this.state.realTime
            });
         
            console.log("starting")  
        } 
        
        const interval = setInterval(() => {
            console.log(this.state.realTime);

            this.setState({
          
            realTime: this.state.realTime - 1
            });

            document.getElementById("cd-div").innerHTML = this.props.formatTime(this.state.realTime);

        if (this.state.realTime <= 0 ) {
          clearInterval(interval);
          this.props.play();
          this.startBreak();
          console.log("break started");
        } else if (this.state.pause === true){
          clearInterval(interval);
          console.log("cleared");
          return; 
        } 
      }, 1000);
    }

    startBreak = () => {
        this.setState({
          realTime: this.state.breakLength * 60
        });
    
        console.log("starting break")
        const interval = setInterval(() => {
          console.log(this.state.realTime);
          this.setState({
            realTime: this.state.realTime - 1
          })
          document.getElementById("cd-div").innerHTML = this.props.formatTime(this.state.realTime)
          document.getElementById("timer-label").innerHTML = "Break";
          if (this.state.realTime <= 0 ) {
            clearInterval(interval);
            this.props.play();
            document.getElementById("timer-label").innerHTML = "Session";
            this.startCountdown();
            
          } else if (this.state.pause === true){
            clearInterval(interval)
          }
        }, 1000);
    }

    pause = () => {
        this.setState({
            pause: true
        }); 
        console.log("paused")  
    }

    reset = () => {
        this.setState({
            sessionLength: 25,
            breakLength: 5,
            //reset: true,
            pause: true,
            realTime: 1501
        });  
        
        document.getElementById("cd-div").innerHTML = "25:00";

        
        console.log("reset has been clicked");
    }

    render(){
        return(
            <div>
                <div id="cd-div">25:00</div>
                <FontAwesomeIcon
                    icon={faPlayCircle} 
                    className="play-icons"
                    onClick={this.startCountdown}/>
                <FontAwesomeIcon
                    icon={faPauseCircle}
                    className="play-icons"
                    onClick={this.pause}/>
                <FontAwesomeIcon
                    icon={faSyncAlt}
                    className="play-icons"
                    onClick={this.reset}/>
                <form method="post" action="">
                    <p id="container"><label for="ses">Session Length </label>
                    <label for="break">Break Length</label></p>
                    <div id="container">
                        <p>
                            <FontAwesomeIcon 
                                icon={faAngleDown} 
                                className="num-icons"
                                onClick={this.decreaseSession}/>
                            <input 
                                className="nums"
                                type="text" 
                                name="session" 
                                id="session"
                                value={this.state.sessionLength}>
                            </input>
                            <FontAwesomeIcon 
                                icon={faAngleUp} 
                                className="num-icons"
                                onClick={this.increaseSession}/>
                        </p>
                        <p>
                            <FontAwesomeIcon 
                                icon={faAngleDown} 
                                className="num-icons"
                                onClick={this.decreaseBreak}/>
                            <input 
                                className="nums"
                                type="text" 
                                name="break" 
                                id="break" 
                                value={this.state.breakLength}>
                            </input>
                            <FontAwesomeIcon 
                                icon={faAngleUp} 
                                className="num-icons"
                                onClick={this.increaseBreak}/>
                        </p>
                    </div>  
                </form> 
            </div>
        )
    }
}

export default Countdown;