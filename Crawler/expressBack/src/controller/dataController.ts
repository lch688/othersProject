import { Request, Response,NextFunction} from "express";
import 'reflect-metadata'
import {get,post,controller,Use} from '../decorator/decorator'
import {getResData} from '../untils/util'
import Crowlar from "../untils/crawler";
import Analyser from "../untils/analyser";
import fs from 'fs';
import path from 'path';


interface ResWihtBody extends  Request{
    body:{
        [key:string]:string | undefined
    }
}

const checkLogin=(req:Request,res:Response,next:NextFunction) :void => {
    
    const  isLogin = !! (req.session ? req.session.login :false)
    if (isLogin){
        next()
    }else {
        res.json(getResData(false,'you need to login'))
    }
}

@controller('/project/crawler')
class DataController{


   

    @get('/getdata')
    @Use(checkLogin)
    getdata(req:ResWihtBody,res:Response):void {


        try{
            let secret='secretKey';
            let url='http://www.dell-lee.com/typescript/demo.html?secret='+secret;

            let analeser=Analyser.getinstance()
            let c=new Crowlar(url,analeser)
            res.json(getResData(true))

        }catch(err){
            res.json(getResData(false,'failed to crawler'))
        }
        
       


    }

    @get('/showdata')
    @Use(checkLogin)
    showdata(req:ResWihtBody,res:Response):void{



        try {
            const location=path.resolve(__dirname,'../../data/crawler/save.json')
            const content=fs.readFileSync(location,'utf-8');
            res.json(getResData(JSON.parse(content)))



        }catch (e){
            res.json(getResData(false,'no data'))
        }




    }


}