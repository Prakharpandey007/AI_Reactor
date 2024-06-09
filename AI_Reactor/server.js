const express =require('express');
const morgan =require('morgan');
const cors=require('cors');
const bodyparser=require('body-parser');

const app=express();
const dotenv=require('dotenv');
const connectDB=require('./config/db')
//routes path 
const authRoutes=require('./routes/authRoutes');


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
//api routes
app.use('/api/v1/auth',authRoutes);
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})
