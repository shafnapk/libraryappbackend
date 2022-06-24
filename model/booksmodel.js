const mongoose=require('mongoose');
 mongoose.connect('mongodb://localhost:27017/library');
const bookmodelschema=mongoose.Schema({
bookid:Number,
booktitle:String,
bookauthor:String,
bookpublisher:String,
bookgenre:String

});

const book=module.exports=mongoose.model('book',bookmodelschema);