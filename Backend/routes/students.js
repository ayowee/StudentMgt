const router = require("express").Router();
let Student = require("../models/Student");

//Student Insert Route(Create)
router.route("/add").post((req,res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    //Initializing newStudent
    const newStudent = new Student({
        name,
        age,
        gender
    });

    //Save inserted data and check whether it was successful
    newStudent.save().then(() => {
        res.json("Student Added!")
    }).catch(() => {
        console.log(err);
    });
}) 

//view data
router.route("/").get((req,res) => {
    Student.find().then((students) => {
        res.json(students);
    }).catch((err) => {
        console.log(err);
    })
});

//Update entry
router.route("/update/:id").put(async (req,res) => {
    let userId = req.params.id; 
    const {name, age, gender} = req.body;

    const updateStudent = {
        name,
        age, 
        gender
    }

    const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
        res.status(200).send({status: "User Updated!", user: update});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Updating data", error: err.message});
    });
});

//Delete User
router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await  Student.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "User deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message})
    })
})

//get user
router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;
    const user = await Student.findById(userId)
    .then(() => {
        res.status(200).send({status: "User fetched", user: user})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

//Add this first
module.exports = router;