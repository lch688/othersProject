
import React ,{Fragment, Component} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import './APP.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      list:[]
    }
    this.handleToogle =this.handleToogle.bind(this)
  }
  render(){
    return (
      <Fragment>
        {///TransitionGroup用于多个标签动画效果,多个元素时 in 不需要了
  }
        <TransitionGroup>
        {///用下面标签 包裹需要动画效果的标签，被包裹的标签会被自动挂载多个样式
        ///即 被包裹的标签自动被赋予类名，并且不同时刻有多个可以选择的样式类名 如：fade-enter等。enter是固定的，fade是传入的，已区分不同标签

          //in 传入状态来，判断如何更改
          //timeout为动画时间
          //className 传入名字来区别其他标签
          ///unmount... 隐藏后移除dom元素，即把包裹的标签元素移除\
          ///onEentered  钩子，自动执行，在动画进场完毕后自动执行，自动
          //介绍 参数 即el ，参数内容为被包裹的元素，因此使用它可以用js方法修改 style
          ///appear 第一次展示在页面也要动画效果，即第一次挂载显示在页面上时
          //true为需要，这是它自动多给了几个类名，可以在css选择使用 为fade-appear fade-appear-active
          ///还有很多功能 钩子，去文档看 github
          }
          {
          this.state.list.map((item,index) =>{
            return(<CSSTransition
              
              timeout={1000}
              classNames='fade'
              unmountOnExit
              onEntered={(el) => {el.style.color ='blue'}}
              appear={true}
              key={index}
            >

                <div>{item}</div>
              
              </CSSTransition>)
              
          })
        }
          
        </TransitionGroup>
        <button onClick ={this.handleToogle}>toggle</button>
        
          
      </Fragment>
       
  
      
    );
  }
  handleToogle(){
    this.setState((prevState) =>{
        return{
          list:[...prevState.list,'item']
        }  
    })
  }
}

export default App;
