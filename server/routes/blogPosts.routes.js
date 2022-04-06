import express from "express";

const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Amezing things are going to happen")
})

export default router;