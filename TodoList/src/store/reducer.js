import {CHANGE_INPUT,ADD_ITEM,DELETE_ITEM,INIT_RESLIST} from './actionType'

const defaultState={
    inputValue:'',
    list:[1,2]
}

export default (state = defaultState,action) =>{
    
    if(action.type === INIT_RESLIST){
        let newstate=JSON.parse(JSON.stringify(state))
        newstate.list=[...newstate.list,...action.content,]
        return newstate
    }




    if(action.type === CHANGE_INPUT){
        let newstate=JSON.parse(JSON.stringify(state))
        newstate.inputValue=action.content
        return newstate
    }
    if(action.type ===ADD_ITEM){
        let newState=JSON.parse(JSON.stringify(state))
        newState.list.push(state.inputValue)///或者 action.content
        newState.inputValue=''
        return newState


    }
    if(action.type ===DELETE_ITEM){
        let newState=JSON.parse(JSON.stringify(state))
        
        newState.list.splice(action.content,1)
        return newState


    }

    return state;
}