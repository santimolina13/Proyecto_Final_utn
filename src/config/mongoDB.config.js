import mongoose from "mongoose";
import ENVIROMENT from "./enviromento.js"


mongoose.connect(ENVIROMENT.URL_MONGO)
    .then(() => {
        console.log("Connected to MongoDB")
    })      
    .catch((error) => {
        console.log("conection error to MongoDB", error)
    })

export default mongoose




