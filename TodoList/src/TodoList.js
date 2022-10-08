import React, {Component} from 'react';///引入react 编译jsx
import './style.css';///react脚手架 运行 引入css
import TodoItem from './TodoItem'////引入 todoitem 子组件
import axios from 'axios'

 class TodoList extends Component{///react中 class组件定义写法，不论函数组件还是类组件，名字开头大写  
     constructor(props){//固定写法
         super(props)
         ///state 存储内部数据
         this.handleClick=this.handleClick.bind(this)
         this.hanleInput=this.hanleInput.bind(this)
         this.handleDelete=this.handleDelete.bind(this)
        
         
         this.state={
             inputValue:'',
             list:[]
         }
        
     }
    render(){
        /// 当 state或props的值改变时 ，render会被重新运行
        ///当 父组件render被重新运行，子组件render也重新运行
        return(
            <div>
                <div>  
                    {///原生html中 for为了给input框指定标签，在jsx中为了与for循环区分，改为htmlFor，class同理，改为className来定义名字
                    }
                    <label htmlFor='insert'>Input Content</label>
                    <input
                    id='insert'
                    className='input'
                    value={this.state.inputValue}
                    onChange={this.hanleInput}//绑定this，让this指向TodoList，不然input标签中，无法找到TodoList里面的内容,更好的写法，写在constructor里面
                    ref={(input) =>{this.input=input}}
                    ///ref 用于在react里面直接获取DOM元素，使用以上写法，用箭头函数，自动获取一个本元素的值，用变量接收，变量名任意，一般为标签名
                  />
                
                  <button onClick={this.handleClick}>submit</button></div>
                  
                <ul ref={(ul) =>{this.ul=ul}}>
                   
                    {this.getTodoItem()
                        ///用函数，拆分，好维护后期;直接调用函数，不用绑定this，因为，this指向在本类（本组件），但在标签，事件调用函数时，需要绑定this，如onClick
                        ///因为，事件调用函数，相当于把本类（本组件）的函数，用属性形式传入，因此需要用 bind 绑定this指向，指向到本类，不然this指向的是其他类，会找不到函数                    
                    } 
                     
                </ul>
            
            </div>
        );
    }
    componentDidMount(){
        axios.get('/api/todolist')
        .then((res)=>{
            console.log(res.data);
            this.setState(() => ({
                list:[...res.data]
            }))
        })
    
        .catch(() =>{alert('error')})
    }
        
    getTodoItem(){
        return this.state.list.map((item,index) =>{
            return( 
                <div key={index}>
                    {   ///key 放在循环最外面标签
                        ///父组件给子组件传参，用属性形式传，即可传数据也可传方法，然后子组件用 this.props. 来调用
                        /// 若子组件需要用 父组件方法（如在子组件中改父组件值），可用属性形式把需要方法传递过去，但注意
                        ///!!!需要 用bind 绑定this，这样当父组件 方法传递到子组件并调用后，能准确找到此方法，不然子组件中this指向的是子组件的方法，bind绑定后，this指向父组件
                    }
                    <TodoItem 
                        
                        content={item}
                        index={index}
                        deleteItem={this.handleDelete}
                    /> 

                    {/*<li key ={index}///在react中做循环渲染时 需要唯一key，但一般不用index做key
                        onClick={this.handleDelete.bind(this,index)}//bind 也可以为函数传递参数
                        dangerouslySetInnerHTML={{__html:item}}  ///不转译标签，即用户输入html标签，如h1，不直接显示而是作为html标签,//第二个{}意味着对象，即__html（key）:item(值);
                        >                                         

                                                                    
                    </li>
                     */} 
                </div>
            )
            })
    }
    
    hanleInput(e){
        ///() =>{}  箭头函数，{}外再加(),如 () =>({}) 意思为，return
        ///的简便写法，相当于() ={ return{ ......} }
        /// this.State,不仅可以传参数，也可以直接传函数
        ///this.State，可以接受参数，prevState，它被自动赋值为，修改数据之前的this.state的数据，
        ///也就是当前的this.state数据，因此，this.setState中 preState可以替换this.state   
        
        
        
        ////因异步问题，给this.setState传入函数的时候直接调用e.target.value，会出错，因此先用变量接受，在函数里用变量      
        
        ////给this.setState传入函数，用return来修改this.state的值，（{}），为return的简便写法  
                 
        this.setState(() =>{
           
            const inputValue= this.input.value///由于获得了DOM元素，可以直接用DOM的value
            return {inputValue}
        },)

       ///必须用 setSate改变state内容，用对象方法改变
        /*this.setState({
            inputValue:e.target.value
        })
        老的写法不推荐了
        */ 
    }
    handleClick(){
      
        this.setState((prevState) => ({
            ///prevState 替换this.state
           list: [...prevState.list,prevState.inputValue],
           inputValue:''
        }),() =>{console.log(this.ul.querySelectorAll('div').length)})///由于setState异步，用回调保证准确
        
       /* 
        this.setState({
            ///...为展开函数，让this.state.list展开添加进去,可以避免直接操作this.state
            list:[...this.state.list,this.state.inputValue],
            inputValue:''
        })
        */
    }
    handleDelete(index){
        ////不要直接操作this.state里面数据，用setState操作 state特性immutable
      
      
       this.setState((prevState) =>{
        const list=[...prevState.list]
        list.splice(index,1)
        return {list}
        /// return {list}，相当于 return {list:list},react 自动找到变量名相同的数据，覆盖它
        //前提是this.state里面和要改变的变量名都一样，如{list：list}这样
       })
    }
 }
export default TodoList;///导出组件