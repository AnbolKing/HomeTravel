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
        marginTop:'-163.5px',
        opacity:0,
        width:'3.21rem',
        height:'100%'
      },
      twoStyle: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        marginLeft:'-150px',
        marginTop:'-163.5px',
        opacity:0,
        zIndex:-9,
        width:'3.21rem',
        height:'100%'
      },
      start:false
    }
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
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
            marginTop:'-163.5px',
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
            marginLeft:'-150px',
            marginTop:'-163.5px',
            opacity:1,
            transition: 'all 0.5s',
            width:'3.21rem',
            height:'100%'
          },
          firstTwoStyle: {
            position:'absolute',
            top:0,
            opacity: 1,
            height:'100%',
            width:'100%',
            transition: 'all 1s',
            // filter: 'blur(5px)',
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
          marginLeft:'-150px',
          marginTop:'-163.5px',
          opacity:1,
          transition: 'all 0.3s',
          width:'3.21rem',
          height:'100%'
        },
        firstOneStyle: {
          height:'100%',
          width:'100%',
          transition: 'all 1s',
          // filter: 'blur(5px)',
        },
      })
    },100)
  }
  
  render() {
    return (
      <div style={mainStyle}>
        <div style={this.state.firstOneStyle}>
          <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/first1.jpeg" alt=""/>
        </div>
        <div style={this.state.firstTwoStyle}>
          <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/first2.jpeg" alt=""/>
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