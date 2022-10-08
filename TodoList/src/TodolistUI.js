import React  from 'react'
import 'antd/dist/antd.css'
import {Input,Button,List} from 'antd'

const TodoListUI = (props) =>{

        return(
        <div>
            <Input 

            value={props.inputValue} 
            placeholder='todolist'  
            style ={{ width:'350px',marginTop:'10px',marginLeft:'10px' }}
            onChange={props.handleInput}

            ></Input>   
            <Button 

            onClick={props.handleClick}
            type='primary' 
            style={{marginTop:'10px',width:'75px'}}

            >submit</Button>
            <List
                    
                    style={{marginTop:'10px', marginLeft:'10px', width:'425px'}}
                    bordered
                    dataSource={props.list}
                    renderItem={(item,index)=> ( <List.Item onClick={() =>{props.handledelete(index)}}> {item}</List.Item>)}

            />
        
        </div>
        )

       
}

/*
class TodoListUI extends Component{
    render(){

        return(
        

        )

    }
    

}
*/
export default TodoListUI