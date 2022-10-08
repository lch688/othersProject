import cheerio from "cheerio";
import fs from "fs";


interface Info{
    title:string,
    count:number
}

interface finaldata{
    time:number,
    data:Info[]
}


interface content{
    [propName:number]:Info[]
}

export default class Analyser{
    private static instance:Analyser;

    private constructor() {
    }

    static getinstance(){
        if (! this.instance){
            this.instance =new Analyser()
        }
        return this.instance
    }

    private getInfo(html:string){

        const infoarray:Info[]=[]
        const $ =cheerio.load(html);
        const item=$('.course-item');
        item.map((index, element) => {
            let des=$(element).find('.course-desc');
            let title=des.eq(0).text()
            let count=parseInt(des.eq(1).text().split('：')[1])
            infoarray.push({
                title, count
            })
        })
        const finaldata ={
            time:(new Date()).getTime(),
            data:infoarray
        }

        return finaldata

    }
    private makeJsondata(finaldata:finaldata,filepath:string){

        let filecontent:content={}
        if (fs.existsSync(filepath)){
            filecontent=JSON.parse(fs.readFileSync(filepath,'utf-8'));
        }
        filecontent[finaldata.time] = finaldata.data;
        return filecontent

    }

    public analyse(html:string,filepath:string){
         let finaldata= this.getInfo(html)
         let jsonData= this.makeJsondata(finaldata,filepath)
         return JSON.stringify(jsonData)
     }
}