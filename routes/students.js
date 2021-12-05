const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const app = express();
const router = express.Router();




const Students = mongoose.model('Students', new mongoose.Schema({
    name: String,
    surname: String,
    number: String

}));

router.get('/', async (req, res) => {
    const students = await Students.find();
    res.send(students);
});
router.post('/save', function(req, res) {
    var newStudent = new Students();
       newStudent.name = req.body.name;
       newStudent.surname = req.body.surname;
       newStudent.number = req.body.number;
       
       newStudent.save(function(err, data){
           if(err){
               console.log(error);
           }
           else{
               res.send(data);
           }
       });
    });

router.post('/', async (req, res) => {

    const students = new Students({
        name: req.body.name, surname: req.body.surname, number: req.body.number
    })
    const student = await students.save();
    res.send(student);
})
router.put('/:id', async (req, res) => {
    const students = await Students.findByIdAndUpdate(req.params.id,
        { name: req.body.name, surname: req.body.surname, number: req.body.number }, {
        new: true
    });

    if (!students) return res.status(404).send('The genre with the given ID was not found.');

    res.send(students);
});

router.delete('/:id', async (req, res) => {
    const user = await Students.findByIdAndRemove(req.params.id);
    res.send(user);
})

router.get('/:id', async (req, res) => {
    const students = await Students.findById(req.params.id);
    res.send(students);
})
module.exports = router;