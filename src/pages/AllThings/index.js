import React, { Component } from 'react';
import { Divider } from 'antd';
import {
  FirstStyle,
  backStyle,
  arrowStyle,
  arrowInsideStyle,
  naviStyle,
  naviTextStyle,
  chanaviTextStyle,
  contentStyle,
  headerStyle,
  textStyle,
  dividerStyle,
  itemStyle,
  textItemStyle,
  fuzhu,
  itemUniqStyle
} from './style';
import store from '../../store/index';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'

class AllThings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[],
      allIn:0
    }
  }

  componentDidMount() {
    this.setState({
      list:store.getState().toJS().mapReducer.list
    })
    let num = 0;
    store.getState().toJS().mapReducer.list.map(item => {
      if(item.getOline) {
        num++;
      }
    });
    this.setState({
      allIn:num
    })
    console.log(this.state.list);
    console.log(this.state.allIn);
  }

  handleBack() {
    this.props.history.go(-1);
  }
  
  render() {
    return (
      <div style={FirstStyle}>
        <div style={backStyle}></div>
        <div className="arrow" style={arrowStyle} onClick={this.handleBack.bind(this)}>
          <img src={require('../Collections/pics/arrow.png')} alt="" style={arrowInsideStyle}/>
        </div>
        <div className="navi" style={naviStyle}>
          <div style={fuzhu}>
            {
              this.state.allIn==8?(
                <div>
                  <div className="naviText" style={naviTextStyle}>
                    恭喜你，成功集齐八个物品，奖励一份小家园用心准备的小礼物！具体领取方式会在活动结束后由家园工作室官方
                    <span style={{fontWeight:'800'}}>QQ（2459289916）</span>
                    发布，请保存游戏截图，关注小家园发布的信息噢~
                  </div>
                  <div className="naviURL" style={naviTextStyle}>
                    最后，非常欢迎大家线下体验游戏（
                    <span style={{fontWeight:'800'}}>地址：七栋零层家园工作室</span>
                    ），我们会常备零食等候各位小精灵的到来，一场不一样的相遇，或许会创造你想要的可能性。
                  </div>
                </div>
              ):(
                <div>
                  <div style={chanaviTextStyle}>还差{8-this.state.allIn}个小物品没收集哦~快去仔细找找吧！</div>
                </div>
              )
            }
          </div>
        </div>
        <div className="content" style={contentStyle}>
          <div className="header" style={headerStyle}>
            <div className="left" style={textStyle}>物品</div>
            <div className="center" style={textStyle}>线上点亮</div>
            <div className="right" style={textStyle}>线下点亮</div>
          </div>
          <Divider style={dividerStyle}/>
          {
            this.state.list.map((item,index) => {
              return (
                <div className="content-item" style={index===0?itemUniqStyle:itemStyle} key={index}>
                  <div style={textItemStyle}>{item.getOline?item.name:'-'}</div>
                  <div style={textItemStyle}>{item.getOline?(<CheckCircleTwoTone twoToneColor="#52c41a" />):'-'}</div>
                  <div style={textItemStyle}>{item.getOffline?(<CheckCircleTwoTone twoToneColor="#52c41a" />):(<CloseCircleTwoTone twoToneColor="#B22222"/>)}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default AllThings;