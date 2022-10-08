import { Button, message } from 'antd';
import React,{Component}from 'react';
import './home.css'
import {Navigate} from 'react-router-dom'
import axios from 'axios'
import ReactEcharts from 'echarts-for-react'
import { dataTool } from 'echarts';
import { time } from 'console';
import moment from 'moment'

interface CrawlerInfo{
  title:string;
  count:number;
}
interface State{
  islogin:boolean;
  load:boolean;
  data:{
    [key:string]:CrawlerInfo[]
  }
}
interface Showcontent{
    name:string;
    type:string;
    data:number[]

}


class  Home extends Component {
    state:State={
        islogin:true,
        load:false,
        data:{}
    }


    componentDidMount(){
        axios.get('/project/crawler/islogin').then( (res) =>{
          
            if( !res.data.data){
                this.setState({
                    islogin:false,
                    
                })
                



            }else{
                
                this.getshowdata()
                this.setState({
                      
                  load:true
                  
              })
                
            }
        }).catch((e)=>{
            message.error('Error')
        })

        
    }


    render(){
        if(this.state.islogin){
            if(this.state.load){
                return(
                    <div className='home-page'>
                        <div className='buttons'>
                            <Button type='primary' onClick={this.handleCrawlerClick.bind(this)}>crawler</Button>
                        
                            <Button type='primary' className='button2' onClick={this.handleLogoutClick.bind(this)} > exit</Button>
                        </div>
                        
                            <ReactEcharts option={this.getOptions()}></ReactEcharts>
                    </div>
            
            
                )
            }else{
                return null
            }
        }else{
            return <Navigate to="/login" />
        }
        
    
    }
    getOptions():echarts.EChartsOption{

        let {data}=this.state
        console.log(data)
        let itemtitle:string[] =[]
        let tempcount:{
          [key:string]:number[]
        }={}
        let times:string[] =[]
        let showcontent:echarts.EChartsCoreOption[]=[]
        for(let i in data){
          let item=data[i]
          times.push(moment(Number(i)).format('MM-DD HH:mm'))
        
          item.forEach(innerOb =>{
              let {title, count} = innerOb 
               if(itemtitle.indexOf(title )=== -1){
                  itemtitle.push(title)
               }
               
              tempcount[title] ? tempcount[title].push(count) : (tempcount[title]= [count])
              
          })


        }
        
        for(let i in tempcount){
            showcontent.push({
                name: i,
                type: 'line',
                
                data: tempcount[i]
            })
         
        }


      
        return  {
            title: {
              text: 'Stacked Line'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: itemtitle
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: times
            },
            yAxis: {
              type: 'value'
            },
            series: showcontent
          };
          
          
    }
    handleCrawlerClick(){
        axios.get('/project/crawler/getdata').then( (res) =>{
            
            if(res.data.data){
                
                message.success('crawler sucess ')
                this.getshowdata()


            }else{
                message.error(res.data.errMsg)
            }
        }).catch((e)=>{
            message.error('Error')
        })
    }
    
    getshowdata(){
        
        axios.get('/project/crawler/showdata').then( (res:any) =>{
                  
        if(res.data.sucess){
          this.setState({
            data:res.data.data,
            
            
        })
        }else{
          message.error(res.data.errMsg)
         
        }
        
    }).catch((e)=>{
        message.error('Error')
    })

    }

    handleLogoutClick(e:React.MouseEvent){
        axios.get('/project/crawler/logout').then( (res) =>{
            
            if(res.data.data){
                this.setState({
                    islogin:false,
                })
                message.success('logout sucess')
            }else{
                message.error('Failed to exit')
            }
        }).catch((e)=>{
            message.error(e)
        })
    }
}
export default Home;