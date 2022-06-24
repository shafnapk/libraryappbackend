var express=require('express');
var router=express.Router();


const book=require('../model/booksmodel');

//retrieving data from db
router.get('/books',(req,res,next)=>{

    book.find(function(err,books){
        if(err){
            res.json(err);
        }
        else{
            res.json(books);
        }
    });
//res.send('get route tested');
});
router.post('/book',(req,res,next)=>{
    //to do later
    let newbook=new book({
  bookid:Number,
  booktitle:String,
  bookauthor:String,
  bookpublisher:String,
  bookgenre:String

    });
    newbook.save((err,book)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json({msg:'Book has been added successfully'});
        }
    });
});

//updating the data
router.put('/item/:id',(req,res,next)=>{
    //to do later
    book.findOneAndUpdate({_id:req.params.id},{
       $set:{
        booktitle:req.body.booktitle,
        bookauthor:req.body.bookauthor,
        bookpublisher:req.body.bookpublisher,
        bookgeneric:req.body.bookgeneric
        
       }
       },
       function(err,result){
           if(err){
               res.json(err);
           }
           else{
               res.json(result);
           }
       })

});

//deleting the data
router.delete('/delete_route',(req,res,next)=>{
    //to do later
});

module.exports=router;