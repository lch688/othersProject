import React ,{useContext,useEffect}from 'react'
import styles from './Robot.module.css'
import {appContext } from "../AppState"
import {withAddtoCart,useAddtoCart} from './AddtoCart'

export interface Robotprops{
    Id:number;
    name:string;
    email:string;
    addTocart:(id,name)=>void
}

const Robot:React.FC<Robotprops> =(props)=>{
    let {Id,name,email,addTocart } =props
    const value=useContext(appContext)
    
   
    
   
    return(
        <div className={styles.cardContainer}>
            <img alt='robot' src={'https://robohash.org/'+Id} />
            <h2>{name}</h2>
            <p>{email}</p>
            <p>author:{value.username}</p>
            <button onClick={() =>addTocart(Id,name)}>put in ShoppingCar</button>
        </div>
    )
}

export default withAddtoCart(Robot)