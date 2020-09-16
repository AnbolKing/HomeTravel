import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import axios from 'axios';
import {
  FirstStyle,
  backStyle,
  arrowStyle,
  arrowInsideStyle,
  listStyle,
  itemStyle,
  imgStyle,
  descStyle,
  imgInsideStyle,
} from './style';
import store from '../../store/index';
import { FrownTwoTone  } from '@ant-design/icons';

class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[
        {
          ObjID:0,
          Text:'还没有收集到物品哦~快去寻找吧！'
        }
      ],
    }
  }

  //进行axios请求，获得已收集的物品列表
  componentDidMount() {
    // let username = store.getState().toJS().mapReducer.username;
    let token = store.getState().toJS().mapReducer.token
    let url = 'http://112.124.26.56:8999/api/list';
    axios.get(url,{
      headers:{
        'Content-Type':'application/json',
        'Accept':'*/*',
        'Authorization':token
      }
    }).then(res => {
      const result = res.data;
      console.log('bool:',this.state.data===null)
      if(result.status !== 1) {
        message.error({
          content:'请求错误，请稍后重试',
          style:{
            marginTop:'20%'
          },
          duration:2,
        })
        return ;
      }
      if(result.data.objList === null) {
        message.success({
          content:'空空如也~快去收集物品吧！',
          duration:1.5,
          style:{
            marginTop:'70%',
            borderRadius:'0.11rem',
            fontSize:'0.14rem'
          },
          icon:<FrownTwoTone spin twoToneColor="#B22222"/>,
          top:100
        })
        return ;
      }
      const data = result.data;
      const list = data.objList;
      this.setState({
        data:list,
      })
      console.log(this.state.data);
    })
  }

  handleBack() {
    this.props.history.go(-1)
  }
  
  render() {
    return (
      <div style={FirstStyle}>
        <div style={backStyle}></div>
        <div className="arrow" style={arrowStyle} onClick={this.handleBack.bind(this)}>
          <img src={require('./pics/arrow.png')} alt="" style={arrowInsideStyle}/>
        </div>
        <div className="content-list" style={listStyle}>
          {
            this.state.data.map((item) => {
              return (
                <div className="content-item" style={itemStyle} key={item.ObjID}>
                  <Row>
                    <Col span={6} style={imgStyle}>
                      <div className="item-img" >
                      {/* <img src={'https://ncu-hometracking.oss-accelerate.aliyuncs.com/'+this.state.id+'.png'}  alt="" style={imgStyle}/> */}
                      <img src={'https://ncu-hometracking.oss-accelerate.aliyuncs.com/'+parseInt(item.ObjID)+'.png'} alt="" style={imgInsideStyle}/>
                      </div>
                    </Col>
                    <Col span={18}>
                      <div className="item-desc" style={descStyle}>
                        {item.Text}
                      </div>
                    </Col>
                  </Row>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Collections;