import React ,{useContext,useEffect}from 'react'
import styles from './Robot.module.css'
import {appContext } from "../AppState"
import {useAddtoCart} from './AddtoCart'

export interface Robotprops{
    Id:number;
    name:string;
    email:string;
    
}

const RobotDiscount:React.FC<Robotprops> =(props)=>{
    let {Id,name,email } =props
    const value=useContext(appContext)
    
    const addtocart=useAddtoCart()
    
   
    return(
        <div className={styles.cardContainer}>
            <img alt='robot' src={'https://robohash.org/'+Id} />
            <h2>Discount</h2>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>author:{value.username}</p>
            <button onClick={()=>addtocart(Id,name)}>put in ShoppingCar</button>
        </div>
    )
}

export default  RobotDiscount