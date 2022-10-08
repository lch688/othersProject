import {CHANGE_INPUT,ADD_ITEM,DELETE_ITEM ,INIT_RESLIST,SAGA_ACTION} from './actionType'


export const changeInput_acion = (value) =>({
    type:CHANGE_INPUT,
    content:value
})


export const additem_acion = (value) =>({
    type:ADD_ITEM,
    content:value
})

export const deleteitem_acion = (index) =>({
    type:DELETE_ITEM,
    content:index
})
export const init_data=(data) =>({
    type:INIT_RESLIST,
    content:data
})

export const get_saga_action=() =>({
    type:SAGA_ACTION
    
})
