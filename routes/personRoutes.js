const express = require('express');
const router = express.Router();
const Person = require('./../models/Person.js');

router.post("/", async (req, res) => {
    try {
        const data = req.body;

        // save the new person to the database
        const newPerson = new Person(data);

        const response = await newPerson.save();

        console.log('data-saved');
        res.status(200).json(response);

    } catch (error) {
        console.log(error); // Log the full error
        res.status(500).json({ error: error.message || "internal server error" }); // Provide more details on error
    }
});



router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched')
        res.status(200).json(data);
    } catch (error) {
        console.log(error); // Log the full error
        res.status(500).json({ error: error.message || "internal server error" });
    }
})



router.get("/:workType", async(req, res) => {
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({work: workType})
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({mgs: "user not found"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({mgs: "internal server error"})
    }
})

// User update route
router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true,
        });

        if(!response) {
            return res.status(404).json({mgs: "person not found"});
        }

        console.log('data updated successfully');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
    }
})

// user delete route
router.delete("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log('Data deleted');
        res.status(200).json({ msg: "Person deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;