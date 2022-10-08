import React,{useState,useEffect} from 'react';
import Robot from './component/Robot'
import styles from './App.module.css'
import logo from './assets/images/logo.svg'
import ShoppingCar from './component/ShoppingCar'
import RobotDiscount from './component/Robotdiscount'



interface Props{
  
}
interface State{
  robotData:any[]
}



const App :React.FC = (props:any) => {



    const [robotData,setRobotData] =useState<any[]>([])
    const [loading,setLoad] =useState<boolean>(false)
    const [error,setError] =useState<string>()



    useEffect(() =>{


      const fetchdata= async()=>{
        setLoad(true)

        try{
          const res=await fetch("https://jsonplaceholder.typicode.com/users") 

          const data= await res.json()
          setRobotData(data)
        
        
         
        }catch(e){
         
          if(e instanceof Error){
           
            setError(e.message)
          }
        }
        setLoad(false)
      }
      fetchdata()
     
    },[])
    return (
      <div className={styles.app}>
        <div  className={styles.appHeader}>
            <img src={logo} className={styles.appLogo}/>
            <h1>online robot shopping paltform</h1>
        </div>
        <ShoppingCar />
        {
          !error || error !=='' && <div>got error : {error}</div> 
        }


        <div className={styles.robotList}>
          { !loading ?(
            robotData.map(
              (item,index) =>
                  index % 2==0?(<RobotDiscount  Id={item.id} name={item.name} email={item.email}/>)
                  :(<Robot  Id={item.id} name={item.name} email={item.email}/>)

                  
                
          )
          ):(
            <h2>loading</h2>
          )
            
          }
          
        </div>
      </div>
    );
  
  
}

export default App;
