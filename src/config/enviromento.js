import dotenv from "dotenv"
// SE CARGA EN LA VARIABLE GLOBAL PROCESS.ENV LOS VALORES DEL ARCHIVO .ENV
dotenv.config()



const ENVIROMENT={
    PORT:process.env.PORT,
    SECRET_KEY_JWT:process.env.JWT_SECRET,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
    EMAIL_USERNAME:process.env.EMAIL_USERNAME,
    URL_FRONTEND:process.env.URL_FRONTEND,
    URL_BACKEND:process.env.URL_BACKEND,
    URL_MONGO:process.env.URL_MONGO
}
export default ENVIROMENT