import * as moment from 'moment';
export default{
    success(ctx:any,code:number,msg:string,data:any){
        const reponse = {
            code,
            msg,
            data,
            time:moment().unix
        }
        ctx.body = reponse;
    }
}