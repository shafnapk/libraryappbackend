const mongoose=require('mongoose');

const mongoAtlasUri = 'mongodb+srv://pkshafna:123@cluster0.vzhbl.mongodb.net/?retryWrites=true&w=majority';
 try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected"),
    );
  } catch (e) {
      console.log(e);
    console.log("could not connect");
  }


const bookmodelschema=mongoose.Schema({
bookid:Number,
booktitle:String,
bookauthor:String,
bookpublisher:String,
bookgenre:String

});

const book=module.exports=mongoose.model('book',bookmodelschema);