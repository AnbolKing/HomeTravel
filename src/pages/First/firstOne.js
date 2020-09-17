import React, { Component } from 'react';
import {
  mainStyle,
  imgShow,
  buttonBox,
  buttonStyle,
  imgStyle
} from './style';
import './style.css';
import { Button,message } from 'antd';
import axios from 'axios';
import memoryUtils from '../../utils/memory';
import storageUtils from '../../utils/storge';
import store from '../../store/index';
import 'animate.css';

class FirstOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mainStyle: {
        background:'url("https://ncu-hometracking.oss-accelerate.aliyuncs.com/first1.jpeg")',
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat',
        height:'100%',
        width:'100%',
        zIndex:'-10',
        position:'absolute'
      },
      firstOneStyle: {
        background:'url("https://ncu-hometracking.oss-accelerate.aliyuncs.com/first1.jpeg")',
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat',
        height:'100%',
        width:'100%',
        zIndex:'-10',
        position:'absolute',
        opacity:1
      },
      firstTwoStyle: {
        position:'absolute',
        opacity:0,
        background:'url("https://ncu-hometracking.oss-accelerate.aliyuncs.com/first1.jpeg")',
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat',
        height:'100%',
        width:'100%',
        zIndex:'-10',
        position:'absolute',
        top:'0',
      },
      oneStyle: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        marginLeft:'-1.605rem',
        marginTop:'-1.635rem',
        opacity:0,
        width:'3.21rem',
        height:'100%'
      },
      twoStyle: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        marginLeft:'-1.605rem',
        marginTop:'-1.635rem',
        opacity:0,
        zIndex:-9,
        width:'3.21rem',
        height:'100%'
      },
      start:false,
      rule:'',
      explore:'',
      text:'开始游戏'
    }
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState((state) => ({
      firstOneStyle: {
        transition: 'all 1s',
        background:'url("https://ncu-hometracking.oss-accelerate.aliyuncs.com/first1.jpeg")',
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat',
        height:'100%',
        width:'100%',
        zIndex:'-10',
        position:'absolute',
        opacity: 0,
      },
      start:true,
      //rule:'animate__animated animate__swing',
      explore:'animate__animated animate__flip',
      text:'开启探险'
    }),() => {
      setTimeout(() => {
        this.setState({
          firstTwoStyle: {
            opacity: 1,
            background:'url("https://ncu-hometracking.oss-accelerate.aliyuncs.com/first1.jpeg")',
            backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            height:'100%',
            width:'100%',
            zIndex:'-10',
            position:'absolute',
            transition: 'all 1s',
          },
          oneStyle: {
            position: 'fixed',
            left: '50%',
            top: '50%',
            marginLeft:'-1.605rem',
            marginTop:'-1.635rem',
            opacity:0,
            transition: 'all 0.5s',
            width:'3.21rem',
            height:'100%'
          },
        })
      },500);
      setTimeout(() => {
        this.setState({
          twoStyle: {
            position: 'fixed',
            left: '50%',
            top: '50%',
            marginLeft:'-1.605rem',
            marginTop:'-1.635rem',
            opacity:1,
            transition: 'all 0.5s',
            width:'3.21rem',
            height:'100%'
          },
          firstTwoStyle: {
            position:'absolute',
            opacity: 1,
            background:'url("https://ncu-hometracking.oss-accelerate.aliyuncs.com/first1.jpeg")',
            backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            height:'100%',
            width:'100%',
            zIndex:'-10',
            position:'absolute',
            transition: 'all 1s',
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
    if(!this.state.start) {
      this.handleChange();
      message.destroy();
      message.warning({
        content:'请先阅读游戏规则哦~',
        duration:1
      });    

      return ;
    }
    this.props.history.push('/mapOne');
  }

  handleJudgeLogin = async () => {
    const user = storageUtils.getUser();
    console.log(user);
    if(JSON.stringify(user) == "{}") {
      this.props.history.replace('/login');
      return ;
    }
    else {
      //获取token
      const result = await axios.post('https://os.ncuos.com/api/user/token',JSON.stringify(user),{
        headers: {
          'Content-Type':'application/json',
          'Accept':'*/*',
        }
      });
      if(result.data.status === 1) {
        const action = {
          type:'get_token',
          token:'passport '+result.data.token,
        }
        store.dispatch(action);
      }
      //获取信息
      console.log(store.getState().toJS().mapReducer.token);
      axios.get('https://os.ncuos.com/api/user/profile/basic',{
        headers: {
          'Content-Type':'application/json',
          'Accept':'*/*',
          'Authorization':store.getState().toJS().mapReducer.token
        }
      }).then(res => {
        console.log(res.data.base_info.xm);
        const action = {
          type:'get_name',
          username:res.data.base_info.xm
        };
        store.dispatch(action);
      })
    }
  }

  componentDidMount() {
    this.handleJudgeLogin();
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
          marginLeft:'-1.605rem',
          marginTop:'-1.635rem',
          opacity:1,
          transition: 'all 0.3s',
          width:'3.21rem',
          height:'100%'
        },
        firstOneStyle: {
          background:'url("https://ncu-hometracking.oss-accelerate.aliyuncs.com/first1.jpeg")',
          backgroundSize:'cover',
          backgroundRepeat: 'no-repeat',
          height:'100%',
          width:'100%',
          zIndex:'-10',
          position:'absolute',
          transition: 'all 1s',
          width:'100%',
          height:'100%'
        },
      })
    },100)
  }
  
  render() {
    return (
      <div>
        <div style={this.state.firstOneStyle}></div>
        <div style={this.state.firstTwoStyle}></div>
        <div>
          {/* <div style={this.state.firstOneStyle}>
            <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/first1.jpeg" alt="" style={{width:'100%',height:'100%'}}/>
          </div>
          <div style={this.state.firstTwoStyle}>
            <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/first2.jpeg" alt=""/>
          </div> */}
        </div>
        <div className="imgShow" style={imgShow}>
          <div className="imgOne" style={this.state.oneStyle}>
            <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/one.png" alt="" style={imgStyle}/>
          </div>
          <div className="imgTwo" style={this.state.twoStyle}>
            <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/two.png" alt="" style={imgStyle}/>
          </div>
        </div>
        <div className="buttonBox" style={buttonBox}>
          <div className="button" onClick={this.handleEnter}>
            <Button type="primary" style={buttonStyle}>
              <span className={this.state.explore}>{this.state.text}</span>
            </Button>
          </div>
          <div className="button" onClick={this.handleChange}>
            <Button type="primary" style={buttonStyle}>
              <span className={this.state.rule}>游戏规则</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default FirstOne;