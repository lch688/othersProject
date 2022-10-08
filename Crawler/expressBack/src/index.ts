import express from 'express'
import './travelProject/travelApi'
import './controller/LoginController'
import './controller/dataController'
import {router} from './decorator/decorator'
import bodyParser from "body-parser";
import cookieSession from 'cookie-session'


const app=express()
const json=express.json({type:'*/json'})



app.use(json)
app.use(bodyParser.urlencoded({extended:true}))
app.use(
    cookieSession({
        name:'session',
        keys:['chenhaoliu'],
        maxAge:24*60*60*1000

    })
)
app.use(router)

app.listen(7001,() =>{
    console.log('runing')
})