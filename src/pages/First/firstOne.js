import React, { Component } from 'react';
import {
  mainStyle,
  textone,
  texttwo,
  textone_one
} from './style';
import { Drawer } from 'antd';

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
      visible:false,
      anotherVisible:false
    }
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      visible:false,
      anotherVisible:false
    })
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
          }
        })
      },500)
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
    },1000)
  }

  handleEnter() {
    console.log("opening");
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
        visible:true
      })
    },1000)
  }
  
  render() {
    return (
      <div style={mainStyle}>
        <div style={this.state.firstOneStyle} onClick={this.handleChange}>
          <img src={require('./pics/first1.png')} alt=""/>
        </div>
        <div style={this.state.firstTwoStyle} onClick={this.handleEnter}>
          <img src={require('./pics/first2.png')} alt=""/>
        </div>
        <Drawer
          closable={false}
          placement="bottom"
          visible={this.state.visible}
          onClose={this.handleClose}
        >
          <div className="screenText">
            <div className="textone" style={textone}>
              嗨呀，我是小家园，欢迎来到家园工作室！这里是我们日常工作和学习的地方，每个隐秘的角落都可能存放着掉落的灵感和飞走的脑洞，一些装满故事的物品也散落各处，而你，就是捕捉不寻常的小精灵~
            </div>
            <div className="texttwo" style={texttwo}>
              主动就会有故事，快来点击屏幕，开启这场奇妙的探险吧！
            </div>
          </div>
        </Drawer>
        <Drawer
          closable={false}
          placement="bottom"
          visible={this.state.anotherVisible}
          onClose={this.handleClose}
          title="游戏规则"
          headerStyle={{textAlign:'center'}}
        >
          <div className="screenText">
            <div className="textone" style={textone_one}>
              一群有趣的灵魂相遇，平凡的日子里也忍不住“起舞”。在工作室中，散落着
              <span style={{fontWeight:'800',fontSize:'0.15rem'}}>八个不同寻常的物品</span>
              以及一群平平无奇的“捣蛋鬼”，点击“可疑”物品进行判断，如果选择正确，就能看到关于它的故事啦！八个物品收集完毕时，游戏结束（记得来找小园认领奖品噢|ω･)و ̑̑༉
            </div>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default FirstOne;