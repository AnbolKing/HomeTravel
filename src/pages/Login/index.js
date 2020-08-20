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
import axios from 'axios';
import store from '../../store/index'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      user:'',
      pass:'',
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
    console.log(123);
    // this.setState((state) => ({
    //   isLoading:true
    // }));
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
      // console.log(this.state.isLoading)
      let obj = {
        username:this.state.user,
        password:this.state.pass
      }
      console.log(JSON.stringify(obj))
      //axios请求---获取token
      const result = await axios.post('https://os.ncuos.com/api/user/token',JSON.stringify(obj),{
        headers: {
          'Content-Type':'application/json',
          'Accept':'*/*',
        }
      });
      // console.log(result.data);
      var wrongMess = result.data.message;
      if(result.data.status === 1) {
        this.setState({
          isLoading:false
        })
        this.props.history.push('/first');
        const action = {
          type:'get_token',
          token:'passport '+result.data.token,
        }
        store.dispatch(action);
      }
      axios.get('https://os.ncuos.com/api/user/profile/basic',{
        headers: {
          'Content-Type':'application/json',
          'Accept':'*/*',
          'Authorization':store.getState().toJS().mapReducer.token
        }
      }).then(res => {
        // console.log(res.data.base_info.xm);
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
  
  render() {
    return (
      <div style={containStyle}>
        <Spin spinning={this.state.isLoading} style={SpinContain}>
        <div style={backStyle}></div>
        <div className="title-img" style={imgContainStyle}>
          <img src={require('./pics/title.png')} alt="" style={imgStyle}/>
        </div>
        <div style={boxContain}>
          <Input id="user" size="large" placeholder="学号" prefix={<UserOutlined />} style={inputStyle} onChange={this.handleUser} value={this.state.user}/>
          <Input.Password id="pass" size="large" placeholder="密码" prefix={<LockOutlined  />} style={inputStyle} onChange={this.handleChangePsss} value={this.state.pass}/>
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