import React,{Component} from 'react'


class Test extends Component{
    
    render(){
        console.log('render a');
        return <div>{this.props.data}</div>
    }
}
export default Test