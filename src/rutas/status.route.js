import express from "express";


const statusRouter = express.Router();

statusRouter.get("/ping", (req, res) => {
   try{
    return res.json({
        status:200,
        ok:true,
        message:"pong"
    })
   }
   catch(error){
    console.error(error)
    res.json({"status":"error"})
   }
});

export default statusRouter
