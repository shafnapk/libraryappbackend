//importing modules
const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const cors=require('cors');

//instantiate express new veno??
//var app=express();

//const  route=require('./route/routes');
const booksmodel = require('./model/booksmodel');
const app=new express;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//connect to mongodb
// mongoose.connect('mongodb://localhost:27017/library');

//on connection
// mongoose.connection.on('connected',()=>{
   // console.log('MongoDB connected at port 27017');
// });

//on connection error
// mongoose.connection.on('error',(err)=>{
//     console.log(err);
// });

const PORT=3000;
//adding middleware
app.use(cors());
//bodyparser
app.use(bodyparser.json());
// app.use('/api',route);

app.get('/books',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    booksmodel.find()
       .then(function(book){
           console.log(book);
           res.send(book);
       })
// app.get('/',(req,res)=>{
//    res.send('some changes');
})

//insert


app.post('/insert',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    console.log(req.body);
    var books={
        bookid:req.body.item.bookid,
        booktitle:req.body.item.booktitle,
        bookauthor:req.body.item.bookauthor,
        bookpublisher:req.body.item.bookpublisher,
        bookgenre:req.body.item.bookgenre
    
    }
    var book=new booksmodel(books);
    book.save();
})
// app.post('/signup',function(req,res){
//     res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    // console.log(req.body);
    // var regs={
        
    //     regid=req.body.item.regid,
    //     regname=req.body.item.regname,
    //     regemail=req.body.item.regemail,
    //     regpassword=req.body.item.regpassword,
    //     regnum=req.body.item.regnum

    //     }
    //     var reg=new regmodelschema(regs);
    //      reg.save();
    // })
    


app.listen(PORT,()=>{
    console.log('server has been started at:'+PORT);
});