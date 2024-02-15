const express = require("express");
const router = express.Router();

const Data=require('../models/data');

//CREATE
router.post("/create", async (req, res) => {
    try {
       
        const newData = new Data(req.body);
        const savedData = await newData.save();
        res.json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//GET BY ID
router.get("/getProductbyId/:id", async (req, res) => {
    try {
        
        const data = await Data.find({ productId: req.params.id });
        

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//UPDATE
router.patch("/update/:id", async (req, res) => {
    try {
        const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedData) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(updatedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedData = await Data.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json({ message: "Data deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



//GET ALL
router.get("/getalldata", async(req,res)=>{
    try {
        const rows = await Data.find({});
        // return res.json({rooms});
        // console.log(rows);
       
        res.send(rows);
        
    } catch (error) {
        return res.status(400).json({messsage: error});
        
    }

});

module.exports=router;
