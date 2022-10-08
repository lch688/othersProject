
import { Request, Response} from "express";
import 'reflect-metadata'
import {get,post,controller} from '../decorator/decorator'
import {getResData} from '../untils/util'
interface ResWihtBody extends  Request{
    body:{
        [key:string]:string | undefined
    }
    session:{
        login:boolean
    }
}

  

@controller('/project/crawler')
class PageController{
    static  isLogin(req:ResWihtBody):boolean{
       
        let status = req.session ? req.session.login :false
        if(status === undefined){
            status=false
        }

        return status

    }
    @get('/islogin')
    islogin(req:ResWihtBody,res:Response):void{
        const  isLogin = PageController.isLogin(req)
        console.log(req.session)
        res.json(getResData(isLogin))
    }


    
    @post('/login')
    login(req:ResWihtBody,res:Response):void{
       
        const { password } =req.body
        console.log(req.session)

        const  isLogin = PageController.isLogin(req)
    
        if (isLogin){
           res.json(getResData(false,'already login'))
    
        }else {
           if (password === '123'&& req.session){
               req.session.login=true
               res.json(getResData(true))

           }else {
               res.json(getResData(false,'Password Error'))
           }
        }
         
         
        
    }

    @get('/logout')
    logout(req:ResWihtBody,res:Response):void{
       
            if(req.session && req.session.login){
                req.session.login=false
                res.json(getResData(true))
            }else{
                res.json(getResData( false,'have not login yet') )
            }
            
         
         
        
    }

    
}




