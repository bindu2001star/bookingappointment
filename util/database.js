const Sequelize=require('sequelize');
const sequelize=new Sequelize('bookingappointment','root','BINDU@2001#123',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize;