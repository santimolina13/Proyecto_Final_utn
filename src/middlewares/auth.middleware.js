import jwt from "jsonwebtoken"
import ENVIROMENT from "../config/enviromento.js"


export const authMiddleware=(req,res,next)=>{
    try{
        const acces_token=req.headers.authorization.split(" ")[1]
        const user_info=jwt.verify(acces_token,ENVIROMENT.SECRET_KEY_JWT)
        req.user=user_info
        return next()
    }
    catch(error){
        console.error(error)
        res.json({
            ok:false,
            status:401,
            messages:"no esta autorizado"
        })
        }
}