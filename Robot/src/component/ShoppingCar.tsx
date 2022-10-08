import React,{Component,useContext} from 'react';
import styles from './ShoppingCart.module.css';
import {FiShoppingCart} from 'react-icons/fi';
import {appContext } from "../AppState"



interface Props{}
interface State{
    isOpen:boolean
}


class ShoppingCar extends React.Component<Props,State>{
    constructor(props:Props){
        super(props)
        this.state={
            isOpen:false
        };
    }

    

    handleClick=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{

        if((e.target as HTMLElement).nodeName === 'SPAN'){
            this.setState({
                isOpen: !this.state.isOpen
            })
        }


        
    }
    render(){
        
        return(
            <appContext.Consumer>
                {
                    (value)=>{
                        return (
                            <div  className={styles.cartContainer}>
                                <button className={styles.button}
                                        onClick={this.handleClick}
                                >
                                <FiShoppingCart></FiShoppingCart>
                                <span>Shopping Car:{value.ShoppingCar.items.length} </span>
                                
                                
                                </button>
                                <div 
                                style={{
                                    display:this.state.isOpen ? 'block' :'none'
                                }}
                                className={styles.cartDropDown}>
                                    <ul>
                                        {
                                            value.ShoppingCar.items.map((i) =>(
                                            <li>{i.name}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                }
            </appContext.Consumer>
            
        )
    }

}

export default ShoppingCar