import React from 'react';
import ReactDOM from 'react-dom/client';
import Newtodolist from './react_rudx_todolist/newtodolist';
import {Provider} from 'react-redux';
import store from './react_rudx_todolist/newstore/mian.js'


///现在最外层组件 引入 ，react——redux，使用它的provider工具
///然后在，所用要使用的组件的最层 使用provider这个组件，并且把创建好的store传入
//这个文件，用属性方式传入provider组件，这样所有被包含的组件可以接受store里的数据
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 // <React.StrictMode>
  <Provider store={store}>
    <Newtodolist />
  </Provider>
   
  
  ///</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

