import React, { Component } from 'react';
import {
  im1Style,
  im2Style,
  im3Style,
  im4Style,
  imgStyle,
  mapsStyle,
  rightStyle,
  leftStyle,
  buttonContainerStyle,
  buttonStyle,
  containStyle,
  detailStyle,
  shadowStyle,
  fullBeforeStyle,
  fullAfterStyle,
  textStyle,
  tipStyle
} from './style';
import {
  RightCircleOutlined,
  LeftCircleOutlined
} from '@ant-design/icons';
import { message } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import axios from 'axios';
import DetailOne from '../../DetailOne/index';
import '../config/style.css';
import store from '../../../store/index';

class mapFour extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisable:false,
      isVisableGet:false,
      number:0,
      get:false
    }
    // this.handleGet = this.handleGet.bind(this);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleShut = this.handleShut.bind(this);
    this.handleShutFull = this.handleShutFull.bind(this);
  }

  handleShutFull() {
    this.setState({
      isVisableGet:false,
      get:false
    })
    this.props.history.push('/all')
  }

  handleShut() {
    this.setState({
      isVisable:false,
    })
    if(store.getState().toJS().mapReducer.number === 8) {
      this.setState({
        get:true,
        isVisableGet:true
      })
    }
    else {
      setTimeout(() => {
        message.destroy();
        message.success({
          content:'恭喜你找到了一个物品！',
          duration:1,
          style:{
            marginTop:'70%',
          }
        })
      },0)
    }
  }

  async handleGot(mes) {
    let disurl = 'http://112.124.26.56:8999/obj/getone?id=' + mes;
    let token = store.getState().toJS().mapReducer.token
    const result = await axios.get(disurl,{
      headers:{
        'Content-Type':'application/json',
        'Accept':'*/*',
        'Authorization':token
      }
    })
    const disText = result.data.data.Text;
    message.destroy();
    message.success({
      content:disText,
      duration:1.5,
      style:{
        marginTop:'70%',
        borderRadius:'0.11rem',
        fontSize:'0.14rem'
      },
      icon:<SmileTwoTone spin/>
    })
  }

  async handleGet(mes) {
    if(!((store.getState().toJS().mapReducer.judge)[mes])) {
      this.setState({
        isVisable:true,
        number:mes,
      });
      const action = {
        type:'get_thing',
        id:mes,
      };
      store.dispatch(action);
      //axios请求，点亮物品 Todo
      let username = store.getState().toJS().mapReducer.username
      let token = store.getState().toJS().mapReducer.token
      let url = 'http://112.124.26.56:8999/api/add?id=' + mes + '&name=' + username
      let res = await axios.get(url,{
        headers:{
          'Content-Type':'application/json',
          'Accept':'*/*',
          'Authorization':token
        }
      });
      return ;
    }
    else {
      message.destroy();
      message.warning({
        content:'它已经收集了哦~再去找找其他物品吧！',
        duration:1,
        style:{
          marginTop:'70%',
        }
      })
      return ;
    }
  }

  handleShow() {
    return (
      <DetailOne id={this.state.number}></DetailOne>
    )
  }

  handleFull() {
    return (
      <div style={this.state.get?fullAfterStyle:fullBeforeStyle}  onClick={this.handleShutFull}>
        <img src={require('../pics/full.png')} alt=""/>
      </div>
    )
  }

  handleLeft() {
    this.props.history.push('/mapThree');
  }

  handleRight() {
    this.props.history.push('/mapOne');
  }

  handleColl() {
    this.props.history.push('/collections');
  }

  handleLine() {
    this.props.history.push('/all');
  }
  
  render() {
    return (
      <div style={mapsStyle}>
        <div className="tipText" style={tipStyle}>
          可左右滑动查看完整地图喔
        </div>
        <div style={leftStyle} onClick={this.handleLeft}>
          <LeftCircleOutlined />
        </div>
        <div style={rightStyle} onClick={this.handleRight}>
          <RightCircleOutlined />
        </div>
        {
          this.state.isVisable?(<div style={shadowStyle} onClick={this.handleShut}></div>):null
        }
        {
          this.state.isVisableGet?(<div style={shadowStyle} onClick={this.handleShutFull}></div>):null
        }
        <div style={detailStyle}>
          {
            this.state.isVisable?(this.handleShow()):null
          }
          {
            this.state.get?(this.handleFull()):null
          }
        </div>
        <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/roomFour.png" alt="" useMap="#map"/>
        <map name="map">
          <area shape="rect" coords="153,152,414,342" alt="显示屏" href="javascript:;" onClick={this.handleGet.bind(this,6)} />
          <area shape="circle" coords="689,248,30" alt="太阳花" href="javascript:;" onClick={this.handleGet.bind(this,3)} />
          <area shape="circle" coords="851,518,50" alt="遥控器" href="javascript:;" onClick={this.handleGet.bind(this,8)} />
          <area shape="rect" coords="443,382,572,426" alt="吊牌" href="javascript:;" onClick={this.handleGot.bind(this,15)} />
        </map>
        {/* <img rel="preload" src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/roomFour.png" as="image" /> */}
        {/* <div className="num2" style={im1Style} onClick={this.handleGet.bind(this,6)}>
          <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/0.png" alt="" style={imgStyle}/>
        </div>
        <div className="num2" style={im2Style} onClick={this.handleGet.bind(this,3)}>
          <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/0.png" alt="" style={imgStyle}/>
        </div>
        <div className="num2" style={im3Style} onClick={this.handleGet.bind(this,8)}>
          <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/0.png" alt="" style={imgStyle}/>
        </div>
        <div className="num2" style={im4Style} onClick={this.handleGot.bind(this,15)}>
          <img src="https://ncu-hometracking.oss-accelerate.aliyuncs.com/0.png" alt="" style={imgStyle}/>
        </div> */}
        <div style={containStyle}>
          <div style={buttonContainerStyle} className="buttonContainer">
            <div className="collection" style={buttonStyle} onClick={this.handleColl.bind(this)}>
              <div className="img">
                <img src={require('../pics/story.png')} alt=""/>
              </div>
              <div className="text" style={textStyle}>
                已收集
              </div>
            </div>
            <div className="guide" style={buttonStyle} onClick={this.handleLine.bind(this)}>
              <div className="img">
                <img src={require('../pics/list.png')} alt=""/>
              </div>
              <div className="text" style={textStyle}>
                收集进度
              </div>
            </div>
            {/* <Button type="primary" style={buttonStyle} onClick={this.handleColl.bind(this)}>已收集</Button>
            <Button type="primary" style={buttonStyle} onClick={this.handleLine.bind(this)}>线下引导</Button> */}
          </div>
        </div>
      </div>
    )
  }
}

export default mapFour;