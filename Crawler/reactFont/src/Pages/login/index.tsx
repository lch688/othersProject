import { Button, message, Form, Input } from 'antd';
import React,{Component} from 'react';
import './login.css'
import axios from 'axios';
import qs from 'qs'
import {Navigate} from 'react-router-dom'
import { read } from 'fs';

interface Value{
  password:string
}

class Loginpage extends Component {
  state={
    islogin:false
  }


  onFinish = (values:Value) => {
    
      console.log('Success:', values);
    
      axios.post('/project/crawler/login',
      qs.stringify({
        password:values.password
      }),
      {
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }

    ).then(res =>{
      if(res.data.data){
          this.setState({
            islogin:true
          })
      }else{
        if(res.data.errMsg==='already login'){
            message.info('already login')
            this.setState({
              islogin:true
            })
        }else{
          message.error(res.data.errMsg)
        }
       
      }


    }).catch(e=>{
      message.error('Error')
      
    })

    };

  onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };
  

  render(){
    if(this.state.islogin){
        return    <Navigate to="/" />
    }else{
      return (
        <div className="login-page">
            <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish.bind(this)}
          onFinishFailed={this.onFinishFailed.bind(this)}
          autoComplete="off"
        >
         
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
    
        
    
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
        
      );
    }
    
  }
  
};

export default Loginpage;