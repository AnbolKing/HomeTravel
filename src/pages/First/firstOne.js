import React, { Component } from 'react';
import {
  mainStyle,
  imgShow,
  buttonBox,
  buttonStyle
} from './style';
import './style.css';
import { Button,message } from 'antd';

class FirstOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstOneStyle: {
        height:'100%',
        width:'100%',
        opacity:1
      },
      firstTwoStyle: {
        position:'absolute',
        // display:'none',
        opacity:0,
        height:'100%',
        width:'100%',
        top:'0',
        zIndex:-9,
      },
      oneStyle: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        marginLeft:'-150px',
        marginTop:'-143.5px',
        opacity:0
      },
      twoStyle: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        marginLeft:'-150px',
        marginTop:'-143.5px',
        opacity:0,
        zIndex:-9,
      },
      start:false
    }
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    console.log(123);
    this.setState((state) => ({
      firstOneStyle: {
        height:'100%',
        width:'100%',
        transition: 'all 1s',
        opacity: 0,
      },
      start:true
    }),() => {
      setTimeout(() => {
        this.setState({
          firstTwoStyle: {
            position:'absolute',
            top:0,
            opacity: 1,
            height:'100%',
            width:'100%',
            transition: 'all 1s',
          },
          oneStyle: {
            position: 'fixed',
            left: '50%',
            top: '50%',
            marginLeft:'-150px',
            marginTop:'-143.5px',
            opacity:0,
            transition: 'all 0.5s',
          },
        })
      },500);
      setTimeout(() => {
        this.setState({
          twoStyle: {
            position: 'fixed',
            left: '50%',
            top: '50%',
            marginLeft:'-150px',
            marginTop:'-143.5px',
            opacity:1,
            transition: 'all 0.5s',
          },
          firstTwoStyle: {
            position:'absolute',
            top:0,
            opacity: 1,
            height:'100%',
            width:'100%',
            transition: 'all 1s',
            filter: 'blur(5px)',
          },
        })
      },800)
    })
    var time = 0;
    var timeKeep = setInterval(() => {
      if(time == 1) {
        clearInterval(timeKeep);
      }
      time++;
      this.setState({
        anotherVisible:true
      })
    },100)
  }

  handleEnter() {
    console.log("opening");
    if(!this.state.start) {
      message.destroy();
      message.warning({
        content:'请先阅读游戏规则哦~',
        duration:1
      });
      return ;
    }
    this.props.history.push('/mapOne');
  }

  componentDidMount() {
    var time = 0;
    var timeKeep = setInterval(() => {
      if(time == 1) {
        clearInterval(timeKeep);
      }
      time++;
      this.setState({
        visible:true,
        oneStyle:{
          position: 'fixed',
          left: '50%',
          top: '50%',
          marginLeft:'-150px',
          marginTop:'-143.5px',
          opacity:1,
          transition: 'all 0.3s',
        },
        firstOneStyle: {
          height:'100%',
          width:'100%',
          transition: 'all 1s',
          filter: 'blur(5px)',
        },
      })
    },100)
  }
  
  render() {
    return (
      <div style={mainStyle}>
        <div style={this.state.firstOneStyle}>
          {/* <img src={require('./pics/first1.jpeg')} alt=""/> */}
          <img src="https://s1.ax1x.com/2020/09/04/wkHk4g.png" alt=""/>
        </div>
        <div style={this.state.firstTwoStyle}>
          {/* <img src={require('./pics/first2.jpeg')} alt=""/> */}
          <img src="https://s1.ax1x.com/2020/09/04/wkH8C4.png" alt=""/>
        </div>
        <div className="imgShow" style={imgShow}>
          <div className="imgOne" style={this.state.oneStyle}>
            {/* <img src={require('./pics/one.jpeg')} alt=""/> */}
            <img src='https://s1.ax1x.com/2020/09/04/wF6YtK.png' alt=""/>
          </div>
          <div className="imgTwo" style={this.state.twoStyle}>
            {/* <img src={require('./pics/two.jpeg')} alt=""/> */}
            <img src='https://s1.ax1x.com/2020/09/04/wF6kmn.jpg' alt=""/>
          </div>
        </div>
        <div className="buttonBox" style={buttonBox}>
          <div className="button" onClick={this.handleEnter}>
            <Button type="primary" style={buttonStyle}>开始游戏</Button>
          </div>
          <div className="button" onClick={this.handleChange}>
            <Button type="primary" style={buttonStyle}>游戏规则</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default FirstOne;