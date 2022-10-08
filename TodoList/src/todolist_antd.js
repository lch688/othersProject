
import React ,{Fragment, Component} from 'react'
import 'antd/dist/antd.css'
import store from './store/index.js'
import {changeInput_acion,additem_acion,deleteitem_acion,init_data,get_saga_action} from './store/actionCreator'
import TodolistUI from './TodolistUI'
import axios from 'axios'


  
class Todolists extends Component{

    constructor(props){
        super(props);
        this.state = store.getState();
        this.change=this.change.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handleInput=this.handleInput.bind(this);
        this.handledelete=this.handledelete.bind(this)

        store.subscribe(this.change)
    }

    render(){
        return(
           <Fragment>
              <TodolistUI
                inputValue={this.state.inputValue}
                handleInput={this.handleInput}
                handleClick={this.handleClick}
                handledelete={this.handledelete}
                list={this.state.list}
              
              /> 

           </Fragment>
        )
    }

    componentDidMount(){
     
        const action=get_saga_action()
       
        store.dispatch(action)
         
       
        
       

      
    }

    handleInput(e){

        
        const action=changeInput_acion(e.target.value)
        store.dispatch(action)


    }
    handleClick(){
       
        const action= additem_acion(this.state.inputValue)
        store.dispatch(action)
    }

    handledelete(index){
        
    
        const action= deleteitem_acion(index)
        store.dispatch(action)

    }
    change(){
        this.setState(store.getState())
    }
}
export default Todolists