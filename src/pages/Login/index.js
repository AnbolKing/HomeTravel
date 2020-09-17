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
import getAppData from '../../utils/getAppData'
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

  handleSubmit() {
    if(this.state.user==='' || this.state.pass==='') {
      message.destroy();
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
      //使用incu-webview
      // getAppData().then(res => {
      //   let token = res.user.token;
      //   console.log(token);
      //   const action = {
      //     type:'get_token',
      //     token:'passport '+result.data.token,
      //   }
      //   store.dispatch(action);
      // })

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
        this.props.history.replace('/');
      }
      //获取信息==> 并没有用到
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
        message.destroy();
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
          {/* <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/title.png" alt="" style={imgStyle}/> */}
        </div>
        <div style={boxContain}>
          <Input id="user" size="large" placeholder="请输入学号" prefix={<UserOutlined />} style={inputStyle} onChange={this.handleUser} value={this.state.user}/>
          <Input.Password id="pass" size="large" placeholder="使用云家园密码登录哦" prefix={<LockOutlined  />} style={inputStyle} onChange={this.handleChangePsss} value={this.state.pass}/>
        </div>
        <div style={buttonContainer}>
          <Button type="primary" style={buttonStyle} onClick={this.handleSubmit}>登录</Button>
        </div>
        </Spin>
      </div>
    )
  }
}

export default Login;