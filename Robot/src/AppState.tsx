import React,{useState,useEffect, PropsWithChildren} from 'react';



interface AppState{
    username:string;
    ShoppingCar:{items:{id:number,name:string}[]}
}
const defaultContentVlaue:AppState = {
    username:'chenhao',
    ShoppingCar:{items:[]}
}

export const appContext=React.createContext(defaultContentVlaue)
export const appSetContext = React.createContext< React.Dispatch<React.SetStateAction<AppState>>| undefined>(undefined)

export const AppStatePrivider:React.FC<PropsWithChildren<{}>> =(props) =>{

    const [state,setState]=useState(defaultContentVlaue)
    return(
        <appContext.Provider value={state}>
            <appSetContext.Provider value={setState}>
            {props.children}
            </appSetContext.Provider>
           
        </appContext.Provider>
    )
}