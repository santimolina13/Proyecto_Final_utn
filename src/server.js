import express from "express";
import mongoose from "./config/mongoDB.config.js";
import cors from "cors"
import ENVIROMENT from "./config/enviromento.js";
import authRouter from "./rutas/auth.route.js";
import contactsRouter from "./rutas/contacts.route.js";
import chatsRouter from "./rutas/chats.route.js";
import statusRouter from "./rutas/status.route.js";


const app = express()

const PORT = ENVIROMENT.PORT 

app.use(cors({
    origin:ENVIROMENT.URL_FRONTEND
}))

app.use(express.json())

app.use("/api/auth" ,authRouter)

app.use("/api/contacts",contactsRouter)

app.use("/api/chats",chatsRouter)
 

app.use("/api/status", statusRouter)









app.listen(PORT, () => {
    console.log(`servidor corrien en puerto ${PORT}`)
})
