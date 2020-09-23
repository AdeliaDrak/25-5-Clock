import React from 'react';
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.scss"
import TimerSet from "./TimerSet.js"


class App extends React.Component {
  
  constructor(props){
    super(props)  
  
  this.state = {
    counterTimer: 0,
    pause: false,
    countdown: false,
    timeElapsed: 0,
    reset: false
  };


  this.formatTime = this.formatTime.bind(this)
  this.audio = new Audio("https://freesound.org/data/previews/198/198841_285997-lq.mp3");
}

  formatTime(time) {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;

    if (seconds < 10){
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  decreaseSession = () => {
    let current = document.getElementById("session").value;
    let newNum = current -1;
    document.getElementById("session").value = newNum;
    document.getElementById("cd-div").innerHTML = this.formatTime(Number(newNum) * 60);
    this.setState({
      pause: false
    });
  }
  
  increaseSession = () => {
    let current = document.getElementById("session").value;
    let newNum = Number(current) + 1;
    document.getElementById("session").value = newNum;
    document.getElementById("cd-div").innerHTML = this.formatTime(Number(newNum) * 60);
    this.setState({
      pause: false
    });
  }

  increaseBreak = () => {
    let current = document.getElementById("break").value;
    document.getElementById("break").value = Number(current) + 1;
    this.setState({
      pause: false
    });
  }

  decreaseBreak = () => {
    let current = document.getElementById("break").value;
    document.getElementById("break").value = Number(current) - 1;
    this.setState({
      pause: false
    });
  }

  play = () => {
    this.audio.play()
  }

  startBreak = () => {
    this.setState({
      counterTimer: document.getElementById("break").value * 60
    });

    console.log("starting break")
    const interval = setInterval(() => {
      console.log(this.state.counterTimer);
      this.setState({
        counterTimer: this.state.counterTimer - 1
      })

     
      document.getElementById("cd-div").innerHTML = this.formatTime(this.state.counterTimer);
      document.getElementById("timer-label").innerHTML = "Break";
      if (this.state.counterTimer <= 0 ) {
        clearInterval(interval);
        this.play();
        this.startCountdown();
      } else if (this.state.pause === true){
        clearInterval(interval)
      }
    }, 1000);
  }


//merge countdown and break into one function


  startCountdown = () => {
    
    this.setState({
      counterTimer: document.getElementById("session").value * 60
    });
    console.log(document.getElementById("session").value);
     if (this.state.pause === true || this.state.reset === true){
      this.setState({
        pause: false,
        reset: false,
        counterTimer:  this.state.counterTimer
      });
      console.log("starting")  
    } 
    
    const interval = setInterval(() => {
      console.log(this.state.counterTimer);
      this.setState({
        counterTimer: this.state.counterTimer - 1
      });
    
    document.getElementById("cd-div").innerHTML = this.formatTime(this.state.counterTimer);
    
    document.getElementById("timer-label").innerHTML = "Session";
    this.setState({
      countdown: true
    });
    if (this.state.counterTimer <= 0 ) {
      clearInterval(interval);
      this.play();
      this.startBreak();
      console.log("break started");
    } else if (this.state.reset === true){
      clearInterval(interval);
      return;
      /*document.getElementById("break").value = 5;
      document.getElementById("session").value = 25;
      document.getElementById("cd-div").innerHTML = "25:00";
      this.setState({
        reset: false,
        pause: false,
        counterTimer: 1501
      });    
      console.log("reset" + this.state.counterTimer);
      */
    } else if (this.state.pause === true){
      clearInterval(interval);
      return;
      
     /* console.log("cleared")
      clearInterval(interval);
      this.setState({
        pause: false
        });
        */
     
    } 
  }, 1000);
}

pause = () => {
  this.setState({
    pause: true
  })
  

  console.log("paused")
  
}

setLabel = () => {
  if (this.state.countdown === true){
    document.getElementById("timer-label").innerHTML = "Session";
  } else {
  document.getElementById("timer-label").innerHTML = "Break"
  }
}

reset = () => {
  
  document.getElementById("break").value = 5;
  document.getElementById("session").value = 25;
  document.getElementById("cd-div").innerHTML = "25:00";
  this.setState({
    reset: true,
    pause: true,
    counterTimer: 1501
  });  
  
  console.log("reset has been clicked" + this.state.counterTimer);
}

  render(){
    return(
      <div id="main">  
       <h1>25/5 Clock</h1>
       <p id="timer-label">Session</p>
       <div id="cd-div">25:00</div>
      <FontAwesomeIcon
      icon={faPlayCircle} 
      class="play-icons"
      onClick={this.startCountdown}/>
      <FontAwesomeIcon
      icon={faPauseCircle}
      class="play-icons"
      onClick={this.pause}/>
      <FontAwesomeIcon
      icon={faSyncAlt}
      class="play-icons"
      onClick={this.reset}/>
      <TimerSet
      increaseSession = {this.increaseSession}
      decreaseSession = {this.decreaseSession}
      increaseBreak = {this.increaseBreak}
      decreaseBreak = {this.decreaseBreak}/>
       
      
      </div>
    )
  }
}
export default App;
