const mongoose= require('mongoose');
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


const usermodelschema=mongoose.Schema({
    id:Number,
    name:String,
    email:String,
    password:String,
    contact_no:Number
});

const reg=module.exports=mongoose.model('user', usermodelschema);