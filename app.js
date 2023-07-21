const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const axios=require('axios');

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const controller=require('./controller')
const sequelize=require('./util/database');
const User=require('./models/User');


sequelize.sync()
.then(()=>{
    console.log('details synchronised with database')
})
.catch((err)=>{
    console.log('failed to synchronise with database')
})
app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'form.html'));
})
app.post('/submit-details',controller.insertData);
app.get('/get-details',controller.fetchData);
app.put('/edit-details/:id',controller.edituser);
app.delete('/delete-user/:id',controller.deleteuser);

app.listen(8001);
