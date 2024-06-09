const express =require('express');
const morgan =require('morgan');
const cors=require('cors');
const bodyparser=require('body-parser');

const app=express();
const dotenv=require('dotenv');
const connectDB=require('./config/db')
//dotenv
dotenv.config()
//connection of mongodb
connectDB();

app.use(cors());
app.use(express.json());  //it will transfer the json data 

app.use(bodyparser.urlencoded({extended:false}));
//morgan for http login tool
app.use(morgan('dev'));


//listen server
const PORT=process.env.PORT||3001;

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})
