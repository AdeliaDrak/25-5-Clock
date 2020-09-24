import React from 'react';

import "./App.scss"
import Countdown from "./Countdown"


class App extends React.Component {
  
  constructor(props){
    super(props);
    this.countdownElement = React.createRef();  
  


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

  play = () => {
    this.audio.play()
  }

  render(){
    return(
      <div id="main">  
       <h1>25/5 Clock</h1>
       <p id="timer-label">Session</p>
        <Countdown
          formatTime = {this.formatTime}
          play = {this.play}  
        />  
      </div>
    )
  }
}
export default App;
