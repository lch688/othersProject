import React,{Component} from 'react'
import PropTypes from 'prop-types'
///react 中自带这个包，用于校验 父组件用props传给子组件的值，
///可以限制传值类型，不符合类型会报warning。 32行继续

class TodoItem extends Component{

    constructor(props){
        super(props)
        this.handleCLick=this.handleCLick.bind(this)
        ///可以用这种方法给 本组件的函数 绑定this 指向，性能好
    }
    

    /// nextProps 接收父组件穿过来的值，因为在更新前先执行 下面生命周期函数
    ///因此，this.props的值还没有改变，当执行到render的时候，this.props就被更新了
    //所以在这里，用nextProps拿到的最新值和this.props比较，看是否改变

    /// 子组件挂载时会执行render，然后父组件更新props后，判断是否改变了值，没变就不再渲染了
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.content !== this.props.content){
            return true
        }else{
            return false
        }
        
    }
    
    render(){
        console.log('child')
        const {content}=this.props; ///es6语法，react自动 从props中 匹配和{}中一样变量名的值，相当于 const content=this.props.content ，但注意变量名，不能和内置函数重复，不然没法使用，如delete等
        return(
            
            <li onClick={this.handleCLick}>
                {content} 
            </li>
            ///this.props 拿数据
        )

    }
    handleCLick(){
        const {deleteItem, index} = this.props
        deleteItem(index)  ///也可以 调父组件传递过来的方法，前提传递时 用bind 绑定this ，让其指向父组件
    }
    
}
///在类或函数子组件外，用以下形式为父组件传进来的 props定义类型，
///如以下，字符串，函数，数字类型，或，用oneOfType来定义多种类型，若父组件传入不符合，则报warning
TodoItem.propTypes={
    content:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    deleteItem:PropTypes.func,
    index:PropTypes.number,
    test:PropTypes.string.isRequired

}
////也可能定义了类型的参数，父组件没有传入，使用 isRequired 后，若父组件没传人，报warning，不用的话，不传入也没问题
///用以下形式定义，参数默认值，这样父组件不传入也会有值，并且isRequired规定的参数，也不会报错 
TodoItem.defaultProps = {
    test:'hellow world'
}

export default TodoItem