const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Student = require('./models/student');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/yopex'),{
    // useNewUrlParser: true,
    // useCreateIndex
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("Database connected");
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true})); // to parse res.body
app.use(methodOverride('_method'));

app.get("/students", async (req,res) =>{
    const students = await Student.find({});
    res.render('students/index', {students})  // {students} to be used in index.js
})
app.get('/students/new', (req,res) =>{
    res.render('students/new')
    
    })

app.post('/students', async (req,res) =>{
    const student = new Student(req.body.student);
    student.save();
    res.redirect(`/students/${student._id}`)
})


app.get('/students/:id', async(req,res)=>{
    // const s = new Student({name:"souhaib"}); // just an example
    // await s.save();
    const student = await Student.findById(req.params.id);
    res.render('students/show', {student});
})

//update
app.get('/students/:id/edit',async (req,res) => {
    const student = await Student.findById(req.params.id);
    
    res.render('students/edit',{student});
})

app.put('/students/:id', async (req,res) =>{
    const {id} = req.params;
    
    const student = await Student.findByIdAndUpdate(id, {...req.body.student}, {new: true});
    res.redirect(`/students/${student._id}`);
})

//DELETE
app.delete('/students/:id',async (req,res) =>{
    const {id} = req.params;
    const student = await Student.findById(id);
    
     await Student.findByIdAndDelete(id);  
     res.redirect('/students');
})


app.listen(3000, () =>{
    console.log('Serving on port 3000')
})