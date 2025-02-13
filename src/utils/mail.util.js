import ENVIROMENT from "../config/enviromento.js"
import transporter from "../config/mail.config.js"





export const enviarMail= async({to,subject,html})=>{
    try{
        const data=await transporter.sendMail({
            from:ENVIROMENT.EMAIL_USERNAME,
            to,
            subject,
            html
        })
        return data
    }
    catch(error){
        console.log("error al enviar el mail",error)
    }
}