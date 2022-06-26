//importing modules
const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const cors=require('cors');
const path = require('path');

//instantiate express new veno??
//var app=express();

//const  route=require('./route/routes');
const booksmodel = require('./model/booksmodel');

const usersmodel = require('./model/usersmodel');

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

app.use(express.static('./dist/frontend'));
    

const PORT=5000;
//adding middleware
app.use(cors());
//bodyparser
app.use(bodyparser.json());
//app.use('/api',route);


   

app.get('/api/books',(req,res)=>{
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


app.post('/api/insert',function(req,res){
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
app.post('/api/signup',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    console.log(req.body);
    var reg={        
            id:req.body.item.id,
            name:req.body.item.name,
            email:req.body.item.email,
            password:req.body.item.password,
            contact_no:req.body.item.contact_no
        }
        var user=new usersmodel(reg);
        user.save();
    })

//user login
app.get('/api/user/login/:email/:password',function(req,res)
{
    console.log(req)
   res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
   let email=req.params.email;
   let password=req.params.password;

   console.log(email);
   console.log(password);

   usersmodel.findOne({"email":email, "password":password})
   .then((user)=>{
       res.send(user);
   
   });

})



app.get('/api/users', function(req, res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    usersmodel.find()
       .then(function(book){
           console.log(book);
           res.send(book);
       })
})

//update
 app.get('/api/:id',function(req,res)
 {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    const id=req.params.id;
    console.log(id);
    booksmodel.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    
    });

 })




 app.put('/api/update',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    
    console.log(req.body);
    var id=req.body.book._id;
    var bookid=req.body.book.bookid;
    var booktitle=req.body.book.booktitle;
    var bookauthor=req.body.book.bookauthor;
    var bookpublisher=req.body.book.bookpublisher;
    var bookgenre=req.body.book.bookgenre;

    console.log("id     =  "+id)

    booksmodel.findByIdAndUpdate(id,{$set:{"bookid":bookid,
                                            "booktitle":booktitle,
                                            "bookauthor":bookauthor,
                                              "bookpublisher":bookpublisher,
                                              "bookgenre":bookgenre}})
                                              .then(function(){
                                                  res.send();
                                              })
 })



    //delete
    // app.delete('/api/remove/:id',function(req,res){
    //     res.header("Access-Control-Allow-Origin","*");
    //     res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");

    //     console.log(req.params.id);
    //     booksmodel.findByIdAndDelete(req.params.id)
    //     .then(()=>{
    //         console.log("success");
    //         res.send();
    //     })

  
    // })                       
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});

app.listen(process.env.PORT || 5000,()=>{
    console.log('server has been started at:'+5000);
});