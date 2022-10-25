const router = require("express").Router();

let Student = require("../models/Student");

router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender
    })
    newStudent.save().then(()=>{
        res.json("Student added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {name, age, gender} = req.body;
    const updateStudent = {
        name,
        age,
        gender
    } 
    const update = await Student.findByIdAndUpadate(userId, updateStudent).then(()=>{
        res.status(200).send({status:"User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await Student.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"User delete"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error", error: err.message});
    })
})

module.exports = router;
