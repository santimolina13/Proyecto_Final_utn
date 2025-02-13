import nodemailer from "nodemailer"
import ENVIROMENT from "./enviromento.js";





const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ENVIROMENT.EMAIL_USERNAME,
        pass: ENVIROMENT.EMAIL_PASSWORD
    }
})

export default transporter