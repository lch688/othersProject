import {Router, Request, Response, NextFunction} from "express";
import Crowlar from "./untils/crawler";
import Analyser from "./untils/analyser";
import fs from 'fs';
import path from 'path';
import {getResData} from './untils/util'

interface ResWihtBody extends  Request{
    body:{
        [key:string]:string | undefined
    }
}
const checkLogin=(req:Request,res:Response,next:NextFunction) => {
    const  isLogin =req.session ? req.session.login :false
    if (isLogin){
        next()
    }else {
        res.json(getResData('','you need to login'))
    }
}
const router=Router();



router.get('/',(req:ResWihtBody,res:Response) =>{
    const  isLogin =req.session ? req.session.login :false
    if(isLogin){
        res.send(`
    <html>
        <body>
            <div>already login</div>
            <a href='/logout'>exit</a>
             <a href='/getfunction'>use function</a>
        </body>
    </html>
        `)
    }else {
        res.send(`
     <html>
        <body>
            <form method="post" action="/login">
                <input type='password' name='password'>
                <button>submit</button>
            </form>
        </body>
    </html>`
        )

    }


})

router.get('/logout',(req:ResWihtBody,res:Response) =>{
   if(req.session){
       req.session.login=false
   }
   res.json(getResData('logout sucecc'))


})

router.post('/login',(req:ResWihtBody,res:Response) =>{
    const { password } =req.body

    const  isLogin =req.session ? req.session.login :false

    if (isLogin){
       res.json(getResData('','already lgoin'))

    }else {
       if (password === '123'&& req.session){
           req.session.login =true
           res.send(` 
                <html>
                    <body>
                        <div>login sucess</div>
                        <a href='/logout'>exit</a>
                        <a href='/getfunction'>use function</a>
                        
                    </body>
                </html>
`)
       }else {
           res.send(` 
                <html>
                    <body>
                        <div>passwoed error!</div>
                        <a href='/'>back</a>
                        
                        
                    </body>
                </html>
            `)
       }
    }



})

router.get('/getfunction',checkLogin,(req:ResWihtBody,res:Response) =>{


        res.send(` 
            <html>
                <body>
       
                    <a href='/logout'>exit</a>
                    <a href='/getdata'>crawler data</a>
                    <a href='/showdata'>show data</a>
                    
                </body>
            </html>
            `)





})

router.get('/getdata',checkLogin,(req:ResWihtBody,res:Response) =>{

        let secret='secretKey';
        let url='http://www.dell-lee.com/typescript/demo.html?secret='+secret;

        let analeser=Analyser.getinstance()
        let c=new Crowlar(url,analeser)

        res.json(getResData(true))


})

router.get('/showdata',checkLogin,(req:ResWihtBody,res:Response) =>{



        try {
            const location=path.resolve(__dirname,'../data/save.json')
            const content=fs.readFileSync(location,'utf-8');
            res.json(getResData(JSON.parse(content)))



        }catch (e){
            res.json(getResData('','no data'))
        }




})

export  default  router