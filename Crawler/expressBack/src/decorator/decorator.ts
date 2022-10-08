import { Router,RequestHandler} from "express";

export const router=Router()

enum Methods{
    get='get',
    post='post',
    delete ='delete'
}
export function controller(root:string){
    return function controller(target:new (...args :any[]) => any){
    
        for(let key in target.prototype){
            let path:string=Reflect.getMetadata('path',target.prototype,key);
            let method:Methods=Reflect.getMetadata('method',target.prototype,key);
            let handler=target.prototype[key];
            
            let middlewares:RequestHandler[]=Reflect.getMetadata('middlewares',target.prototype,key)
            if(path && method && handler){
               
                let fullpath=root ==='/' ? path: `${root}${path}`;
                fullpath=path ==='/' ? root:fullpath;
                if(middlewares){
                    
                    router[method](fullpath,...middlewares,handler)
                }else{
                    router[method](fullpath,handler)
                }
                
            }
        }
    }
}



export function Use(middle:RequestHandler){
   
    return function(target:any,key:string){
        let originMiddlewares=Reflect.getMetadata('middlewares',target,key) || []
        originMiddlewares.push(middle)
       
        Reflect.defineMetadata('middlewares',originMiddlewares,target,key)
    }
}


function makeRequetMethodt(method:Methods){
    return function(path:string){
        return (target:any,key:string) =>{
            Reflect.defineMetadata('path',path,target,key)
            Reflect.defineMetadata('method',method,target,key)
    
            
        }
    }
    

}

export const get=makeRequetMethodt(Methods.get)
export const post=makeRequetMethodt(Methods.post)
export const Delete=makeRequetMethodt(Methods.delete)

