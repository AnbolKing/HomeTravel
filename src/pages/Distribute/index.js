import React, { Component } from 'react';
import {
  boxStyle
} from './style';
import { imgStyle } from '../Collections/style';

class Distribute extends Component {

  render() {
    return (
      <div className="box"style={boxStyle}>
        {/* <div style={imgStyle}>
          <img src={require('./pics/detail.png')} alt=""/>
        </div> */}
      </div>
    )
  }
}

export default Distribute;