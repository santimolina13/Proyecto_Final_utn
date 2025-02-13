import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017/PlaticApp")
    .then(() => {
        console.log("Connected to MongoDB")
    })      
    .catch((error) => {
        console.log("conection error to MongoDB", error)
    })

export default mongoose