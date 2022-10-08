import React  from 'react';
import {connect} from 'react-redux'
import {CHANGE_INPUT} from './newstore/actionType'
import { ADD_ITEM, DELETE_ITEM } from '../store/actionType';



const Newtodolist=(props) =>{
        const {inputValue,list,hanleClick,hanle_delete,changeInputValue} = props
        return(
           

             <div>
                 <div>
                    <input 
                    value={inputValue}
                    onChange={changeInputValue}
                    
                    ></input>
                    <button
                      onClick={hanleClick}
                    >submit</button>
                 </div>

                 <ul>
                        {
                                list.map((item,index) =>{
                                return  <li
                                        key={index}
                                        onClick={
                                            () =>{hanle_delete(index)     }
                                                }
                                        >{item}</li>
                                
                                })
                        
                        }
                 </ul>
             
            </div>

        )

    
}




const mapDispatchToProps = (dispatch) =>{
    return{
        changeInputValue(e){
            
            const action={
                type:CHANGE_INPUT,
                content:e.target.value
            }
            dispatch(action)

        },

        hanleClick(){
            const action={
                type:ADD_ITEM,
               
               
                
            }
            dispatch(action)
        },

        hanle_delete(index){
            const action={
                type:DELETE_ITEM,
                content:index
               
               
                
            }
            dispatch(action) 
        }

    }

}

const mapStateToProps = (state) =>{
    return{
        inputValue:state.inputValue,
        list:state.list,
        

    }

}


export default connect(mapStateToProps,mapDispatchToProps)(Newtodolist);