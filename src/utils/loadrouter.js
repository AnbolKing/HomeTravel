/*路由懒加载(异步组件)*/
import React from 'react';
import Loadable from 'react-loadable';
import { Progress } from 'antd';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
 
//通用的过场组件
const LoadingComponent = ()=>{
  return (
    <div>Loading</div>
  )
}
 
//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = LoadingComponent)=>{
    return Loadable({
        loader,
        loading
    });
}