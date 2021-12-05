const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();

const PostModel = mongoose.model('PostMethod', new mongoose.Schema({
    name: String,
    surname: String,
    number: String

}));

router.get('/', async (req, res, next) => {
    const students = await PostModel.find();
    res.send(students);
});

router.post('/', async (req, res) => {

    const students = new PostModel({
        name: req.body.name, surname: req.body.surname, number: req.body.number
    })
    const student = await students.save();
    res.send(student);
})

router.put('/:id', async (req, res) => {
    const students = await PostModel.findByIdAndUpdate(req.params.id,
        { name: req.body.name, surname: req.body.surname, number: req.body.number }, {
        new: true
    });

    if (!students) return res.status(404).send('The genre with the given ID was not found.');

    res.send(students);
});

router.delete('/:id', async (req, res) => {
    const user = await PostModel.findByIdAndRemove(req.params.id);
    res.send(user);
})

module.exports = router;