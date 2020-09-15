import React, { Component } from 'react';
import {
  containStyle,
  SpinContain,
  inputStyle,
  boxContain,
  buttonContainer,
  buttonStyle,
  imgContainStyle,
  imgStyle,
  backStyle
} from './style';
import { Input, Button, Spin, message } from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import storageUtils from '../../utils/storge';
import memoryUtils from '../../utils/memory';
import axios from 'axios';
import store from '../../store/index';
import './style.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      user:'',
      pass:'',
      percent:'',
    }
    this.handleUser = this.handleUser.bind(this);
    this.handleChangePsss = this.handleChangePsss.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChangePsss(event) {
    this.setState({
      pass:event.target.value
    })
  }

  handleUser(event) {
    this.setState({
      user:event.target.value
    })
  }

  handleRegister() {
    this.props.history.push('/register');
  }

  handleSubmit() {
    if(this.state.user==='' || this.state.pass==='') {
      message.warning({
        content:'填好账号和密码哦~',
        duration:1
      });
      return ;
    }
    this.setState((state) => ({
      isLoading:true
    }),async () => {
      let obj = {
        username:this.state.user,
        password:this.state.pass
      }
      //axios请求---获取token
      const result = await axios.post('https://os.ncuos.com/api/user/token',JSON.stringify(obj),{
        headers: {
          'Content-Type':'application/json',
          'Accept':'*/*',
        }
      });
      var wrongMess = result.data.message;
      //status = 1 登陆成功
      if(result.data.status === 1) {
        const action = {
          type:'get_token',
          token:'passport '+result.data.token,
        }
        store.dispatch(action);
        //保存登录信息
        let user = {
          username:this.state.user,
          password:this.state.pass
        }
        memoryUtils.user = user;
        storageUtils.saveUser(user);
        //进行图片预加载
        // let imgs = [
        //   "https://s1.ax1x.com/2020/09/04/wkHk4g.png",
        //   "https://s1.ax1x.com/2020/09/04/wkH8C4.png",
        //   "https://s1.ax1x.com/2020/09/04/wF6YtK.png",
        //   "https://s1.ax1x.com/2020/09/04/wF6kmn.jpg"
        // ];
        // let count = 0;
        // for(let img of imgs) {
        //   let image = new Image()
        //   image.src = img
        //   image.onload = () => {
        //     count++
        //     // 计算图片加载的百分数，绑定到percent变量
        //     let percentNum = Math.floor(this.count / 14 * 100)
        //     this.setState({
        //       percent: `${percentNum}%`
        //     })
        //   }
        // }
        // this.setState({
        //   isLoading:false
        // })
        this.props.history.replace('/');
      }
      axios.get('https://os.ncuos.com/api/user/profile/basic',{
        headers: {
          'Content-Type':'application/json',
          'Accept':'*/*',
          'Authorization':store.getState().toJS().mapReducer.token
        }
      }).then(res => {
        const action = {
          type:'get_name',
          username:res.data.base_info.xm
        };
        store.dispatch(action);
      })
      if(result.data.status === 0) {
        this.setState({
          isLoading:false
        })
        message.error({
          content:wrongMess,
          duration:1
        });
      }
    })
  }

  componentDidMount() {

  }
  
  render() {
    return (
      <div style={containStyle}>
        <Spin spinning={this.state.isLoading} style={SpinContain} tip={this.state.percent}>
        <div style={backStyle}></div>
        <div className="title-img" style={imgContainStyle}>
          <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/title.png" alt="" style={imgStyle}/>
        </div>
        <div style={boxContain}>
          <Input id="user" size="large" placeholder="请输入学号" prefix={<UserOutlined />} style={inputStyle} onChange={this.handleUser} value={this.state.user}/>
          <Input.Password id="pass" size="large" placeholder="使用云家园密码登录哦" prefix={<LockOutlined  />} style={inputStyle} onChange={this.handleChangePsss} value={this.state.pass}/>
        </div>
        <div style={buttonContainer}>
          <Button type="primary" style={buttonStyle} onClick={this.handleSubmit}>登录</Button>
          <Button type="primary" style={buttonStyle} onClick={this.handleRegister}>注册</Button>
        </div>
        </Spin>
      </div>
    )
  }
}

export default Login;