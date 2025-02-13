import ENVIROMENT from "../config/enviromento.js"
import UserRepository from "../repository/user.repository.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { enviarMail } from "../utils/mail.util.js"
import userRepository from "../repository/user.repository.js"

export const registerControler = async (req, res) => {
 try{
    const { username, email, password} = req.body

    if(!username||username.length <5 || !email || !password || password.length <8){
        return res.json({
            ok: false,
            status:400,
            message: 'Missing required fields'
        })
    }
    const user_found= await UserRepository.findUserByEmail(email)
    if(user_found){
        return res.json({
            ok: false,
            status:400,
            message: 'User already exists'
        })
    }

    const verificationToken = jwt.sign({email},ENVIROMENT.SECRET_KEY_JWT,{expiresIn: "1d"})
    await enviarMail({
        to:email,
        subject:"valida tu mail",
        html:`
        <h1>Debes validar tu mail</h1>
        <p>click para validar</p>
        <a href=http://localhost:${ENVIROMENT.PORT}/api/auth/verify-email?verification_token=${verificationToken}>
        verificar
        </a>`
    })

    const password_hash= await bcrypt.hash(password, 10)

    const new_user = await UserRepository.createUser({ username, email, password:password_hash, verificationToken })
    res.json({
        ok: true,
        status:201,
        message: 'User created successfully',
        data: {
            username:new_user.username,
            email:new_user.email,
            
        }
    })
    
 }
 catch(error){
    console.log(error)
    return res.json({
        ok: false,
        status:500,
        message: 'Server error'
    })
}}


export const verifyEmailControler = async (req, res) => {
    try{
        const {verification_token} = req.query
        if(!verification_token){
            res.json({
                ok:false,
                status:500,
                message:"falta la verificaicon de usuario"
                }
            )
        }

        const payload = jwt.verify(verification_token, ENVIROMENT.SECRET_KEY_JWT)
        const user_to_verify= await UserRepository.findUserByEmail(payload.email)
        if(!user_to_verify){
            res.json({
                ok:false,
                status:500,
                message:"falta la verificaicon de usuario"
                }
            )
        }
        if(user_to_verify.verificationToken !== verification_token){
            res.json({
                ok:false,
                status:500,
                message:"verificacion incorrecta"
            })
        }
        await userRepository.verifyUser(user_to_verify._id)
        return res.redirect(`${ENVIROMENT.FRONTEND_URL}/login?verified=true`)
         /* res.json({
            ok: true,
            status:201,
            message: 'usuario verificado con exito',
            data: {
                username:user_to_verify.username,
                email:user_to_verify.email,
                
            }
        }) */
    }
    catch(error){
        console.log(error)
        res.json({
            ok: false,
            status:500,
            message: 'Server error'
        })
    }
    
}

export const loginControler = async (req,res)=>{
    try{
        const {email,password}=req.body
        //validar email correcto y password
        const user_found=await UserRepository.findUserByEmail(email)
        if(!user_found){
            return res.json({
                ok: false,
                status: 401,
                message: 'email incorrecto'
            })
        }
        const is_same_password= await bcrypt.compare(password,user_found.password)
        if(!is_same_password){
            return res.json({
                ok: false,
                status: 401,
                message: 'contraseña incorrecto'
            })
        }

        const user_info={
            id:user_found._id,
            name:user_found.username,
            email:user_found.email
        }

        const acces_token= jwt.sign(user_info,ENVIROMENT.SECRET_KEY_JWT)
        
        return res.json({
            ok: true,
            status: 200,            
            message: 'Logged in',
            data: {
                user_info: {
                    id:user_found._id,
                    name:user_found.username,
                    email:user_found.email
                },
                acces_token:acces_token
            }
        })

    }
    catch(error){
        console.error(error)
        res.json({
            ok: false,
            status:500,
            message: 'Server error login'
        })
    }




}
