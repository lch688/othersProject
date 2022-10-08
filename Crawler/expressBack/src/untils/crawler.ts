import superagent from 'superagent';
import fs from  'fs'
import Analyser from './analyser'
import path from "path";

interface Analysis{
    analyse:(html:string,filepath:string) =>string
}

class Crowlar{

    private filepath=path.resolve(__dirname,'../../data/save.json')
    constructor(private url:string , private analyser:Analysis) {
        this.initProcess()
    }

    private async initProcess(){
        let html=await this.getHtml();
        let jsonData=this.analyser.analyse(html,this.filepath)

        this.saveJsondata(jsonData)
    }
    private async getHtml(){
        const result=await  superagent.get(this.url)
        return result.text

    }




    private saveJsondata(content:string){
        fs.writeFileSync(this.filepath,content)
    }



}
export default Crowlar


