const express = require('express');
const router = express.Router();
const menuItem = require('./../models/Menuitem.js');


router.post('/', async(req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new menuItem(data);
        const response = await newMenuItem.save();
        console.log('menu-inserted')
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({mgs: "internal server error"});
    }
})

router.get("/", async(req, res) => {
    try {
        const data = await menuItem.find();
        console.log('data fetched successfully');
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        res.status(500).json({mgs: "internal server error"})
    }
})

module.exports = router;