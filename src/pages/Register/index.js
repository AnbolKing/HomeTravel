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

class Register extends Component {
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

  async handleRegister() {
    let obj = {
      name:this.state.user,
      password:this.state.pass
    }
    const res = await axios.post('http://112.124.26.56:8999/register',JSON.stringify(obj),{
      headers:
        new Headers({
            'Content-Type':'application/json',
            'Content-Length':'<calculated when request is sent>',
            'Host':'<calculated when request is sent>',
            'User-Agent':'PostmanRuntime/7.26.3',
            'Accept':'*/*',
            'Accept-Encoding':'gzip, deflate, br',
            'Connection':'keep-alive'
        })
    });
    const status = res.data.status;
    console.log(status);
    if(status === 1) {
      this.setState({
        user:'',
        pass:''
      })
      message.success({
        content:'注册成功~快去登录账号进入家园吧！',
        duration:1
      });
      this.props.history.push('/');
    }
    if(status === 0) {
      this.setState({
        user:'',
        pass:''
      })
      console.log(this.state.isLoading)
      message.error({
        content:'这个账号已经注册了哦！快去登录吧！',
        duration:1
      });
    }
    // const status = null;
    // this.setState((state) => ({
    //   isLoading:true
    // }),async () => {
    //   let obj = {
    //     name:this.state.user,
    //     password:this.state.pass
    //   }
    //   const res = await axios.post('http://112.124.26.56:8999/register',JSON.stringify(obj),{
    //     headers:
    //       new Headers({
    //           'Content-Type':'application/json',
    //           'Content-Length':'<calculated when request is sent>',
    //           'Host':'<calculated when request is sent>',
    //           'User-Agent':'PostmanRuntime/7.26.3',
    //           'Accept':'*/*',
    //           'Accept-Encoding':'gzip, deflate, br',
    //           'Connection':'keep-alive'
    //       })
    //   });
    //   const status = res.data.status;
    //   console.log(status);
    //   if(status === 1) {
    //     this.setState((state) => {
    //       isLoading:false
    //     })
    //     message.success({
    //       content:'注册成功~快去登录账号进入家园吧！',
    //       duration:1
    //     });
    //     this.props.history.push('/login');
    //   }
    //   if(status === 0) {
    //     this.setState((state) => {
    //       isLoading:false
    //     })
    //     console.log(this.state.isLoading)
    //     message.error({
    //       content:'注册失败，请重试！',
    //       duration:1
    //     });
    //   }
    // });
  }

  handleSubmit() {
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div style={containStyle}>
        <Spin spinning={this.state.isLoading} style={SpinContain}>
          <div style={backStyle}></div>
          <div className="title-img" style={imgContainStyle}>
            <img src={require('../Login/pics/title.png')} alt="" style={imgStyle}/>
          </div>
          <div style={boxContain}>
            <Input id="user" size="large" placeholder="请设置你的账号哦！" prefix={<UserOutlined />} style={inputStyle} onChange={this.handleUser} value={this.state.user}/>
            <Input.Password id="pass" size="large" placeholder="偷偷写下你的密码！" prefix={<LockOutlined  />} style={inputStyle} onChange={this.handleChangePsss} value={this.state.pass}/>
          </div>
          <div style={buttonContainer}>
            <Button type="primary" style={buttonStyle} onClick={this.handleSubmit}>已有账号</Button>
            <Button type="primary" style={buttonStyle} onClick={this.handleRegister}>万事俱备</Button>
          </div>
        </Spin>
      </div>
    )
  }
}

export default Register;