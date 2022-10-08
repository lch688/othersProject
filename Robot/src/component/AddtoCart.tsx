import React,{useContext} from "react";
import {appSetContext } from "../AppState"
import {Robotprops} from './Robot'


export const withAddtoCart=(ChildComponent:React.ComponentType<Robotprops>) =>{
    return(props)=>{
        const setstate=useContext(appSetContext )
        const addTocart =(id,name) =>{
        if(setstate){
            console.log(1141)
            setstate(
                (state)=>{
                    
                    
                    return{
                        ...state,
                        ShoppingCar:{items:[...state.ShoppingCar.items,{id:id,name}]}
                    }
                        
                    
                }
            )
        }
    }
        return <ChildComponent {...props} addTocart={addTocart}/>
    }
}


export const useAddtoCart=() =>{
    const setstate=useContext(appSetContext )
        const addTocart =(id,name) =>{
        if(setstate){
            console.log(1141)
            setstate(
                (state)=>{
                    
                    
                    return{
                        ...state,
                        ShoppingCar:{items:[...state.ShoppingCar.items,{id:id,name}]}
                    }
                        
                    
                }
            )
        }
    }
        return addTocart
}