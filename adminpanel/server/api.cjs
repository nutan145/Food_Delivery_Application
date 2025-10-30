//import libraries
const multer = require('multer');
const cors=require("cors");
const express=require("express");
const { MongoClient, ObjectId } = require("mongodb");
const mongoClient=require("mongodb").MongoClient;
const fs=require('fs');
const path=require('path');
const { error } = require('console');

//create connection string
const conString="mongodb://127.0.0.1:27017";

//middlewares
const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/uploads',express.static('uploads')); //server uploads folder

//multer configuration for store images into uploads folder
 const storage=multer.diskStorage({
      destination:(req,file,cb)=>{
            cb(null,'uploads');
      },

      filename:(req,file,cb)=>{
          cb(null,Date.now()+ '-' + file.originalname);
      }
 });

 const upload=multer({storage:storage});

//API endpoints for food

app.post('/add-foodItem',upload.single('image'),(req,res)=>{
       
       const food={
          name:req.body.name,
          description:req.body.description,
          imageUrl: `http://127.0.0.1:4040/uploads/${req.file.filename}`,
          price:parseFloat(req.body.price),
          category:req.body.category
       }

       MongoClient.connect(conString).then(clientObject=>{

             const database=clientObject.db("food-delivery");
             database.collection("foods").insertOne(food).then(document=>{
                  console.log('food item added');
                  res.end();
             })
       })
      .catch(error=>{
            console.error(error);
            res.status(500).send('Database Connection error');
      })
});

app.get('/foodItems',(req,res)=>{

      mongoClient.connect(conString).then(clientObject=>{

            const database=clientObject.db("food-delivery");
            database.collection("foods").find({}).toArray().then(documents=>{
                  res.send(documents);
                  res.end();
            });
      })
      .catch(error=>{
            console.error(error);
            res.status(500).send('Database Connection error');
      })
});

app.get('/foodItem/:id',(req,res)=>{

      var foodId=req.params.id;
      const objectId=new ObjectId(foodId);

      MongoClient.connect(conString).then(clientObject=>{

            const database=clientObject.db("food-delivery");
            database.collection("foods").findOne({_id:objectId}).then(document=>{
                  res.send(document);
                  res.end();
            });
      })
      .catch(error=>{
            console.error(error);
            res.status(500).send('Database Connection error');
      })
});


// DELETE: Delete food item and its image
app.delete('/delete-foodItem/:id', (req, res) => {
      const foodId = req.params.id;
      const objectId = new ObjectId(foodId);
    
      MongoClient.connect(conString)
        .then(clientObject => {
          const database = clientObject.db("food-delivery");
    
          database.collection("foods").findOne({ _id: objectId })
            .then(document => {
              if (document && document.imageUrl) {
                const filename = path.basename(document.imageUrl);
                const filePath = path.join(__dirname, '../uploads', filename);
                 console.log(filePath);
                // Delete image file
                fs.unlink(filePath, (err) => {
                  if (err)
                  {
                     console.error('Error deleting image:', err);
                  }
                  else
                  {
                      console.log('Image deleted:', filename);

                      // Delete document from collection
                      database.collection("foods").deleteOne({ _id: objectId })
                      .then(() => {
                      console.log('Food item deleted');
                      res.end();
                      });
                  }
                });
              }
    
            });
        });
    });

    //API endpoints for users

    app.post('/register',(req,res)=>{
          
        const user={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }

        MongoClient.connect(conString).then(clientObject=>{
           
           const database=clientObject.db("food-delivery");

           database.collection("users").insertOne(user).then(()=>{
               console.log('user register successfully');
               res.end();
           })

        })
        .catch(error=>{
             console.error(error);
             res.status(500).send('Database connection error');
        })
    })

    app.get('/login',(req,res)=>{
         
          mongoClient.connect(conString).then(clientObject=>{
             
                 const database=clientObject.db("food-delivery");

                 database.collection("users").find({}).toArray().then(documents=>{
                       res.send(documents);
                       res.end();
                 }).
                 catch(error=>{
                       console.error(error);
                       res.status(500).send('Database connection error');
                 })
          })

    })
    

app.listen(4040);
console.log(`server started at http://127.0.0.1:4040`);
