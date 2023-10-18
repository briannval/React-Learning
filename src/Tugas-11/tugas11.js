import React, {Component} from 'react';
import './tugas11.css';

//timerfunction
class Countdown extends Component{
    constructor(props){
        super(props);
        this.state={date: new Date(),timer: 100};
    }

    componentDidMount(){
        this.clock = setInterval(() => {
            this.second()
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.clock);
    }

    second(){
        this.setState({date: new Date(),timer: this.state.timer - 1})
    }

    render(){
        if(this.state.timer>0){
        return(
            <div id="timer">
            <h1 id="jam">sekarang jam : {this.state.date.toLocaleTimeString()}</h1>
            <h1 id="hitung">hitung mundur : {this.state.timer}</h1>
            </div>
        )
        }
        else{
            return(
                null
            )
        }
    }
}

export default Countdown