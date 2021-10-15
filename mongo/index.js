const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://sabahat:<password>@cluster0.sltaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
    if (err) 
        throw err;
    const usercollection = client.db("Users").collection("User");
    // perform actions on the collection object

    //Read
    const userCursor = usercollection.find({});
    console.log(await userCursor.toArray());


  client.close();
});
