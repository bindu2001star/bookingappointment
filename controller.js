const bodyParser=require('body-parser');
const User=require('./models/User');
const axios=require('axios');
async function insertData(req,res){
    console.log(req.body, "data posting");
    if (!req.body.name || !req.body.email || !req.body.number){
        console.log("error");
        return res.status(400).send({
            message:"Please fill all the details"
        })
    }
    const obj={
        name : req.body.name,
        email : req.body.email,
        number : req.body.number
    }

    try{
        const data = await User.create(obj)
        res.redirect('/');
    }catch(error){
        res.status(500).send(error);
        console.log(JSON.stringify(error))
        console.log('could not send the data');
    }
}
async function fetchData(req,res){
    try{
        const users= await User.findAll();
        console.log('data retrived');
        res.status(200).send(users);
    
    }catch(err){
        console.log(err);
        res.status(500).send('something went wrong');

    };
}
async function edituser(req,res){
    try{
    const {name,email,number}=req.body;
    const user=await User.findByPk(req.params.id);
    if(!user){
        return res.status(404).send({message:'user not found'})
    }
    user.name=name;
    user.email=email;
    user.number=number;
    await user.save();
    res.send({message:"user updated successfully",user})

    }
    catch(error){
        console.log(error);
        res.status(500).send({message:'error updating user in backend'});
    }
}
async  function deleteuser(req,res){
    try{
    const userId=req.params.id;
    await User.destroy({where:{ id:userId}})
    res.json({message:'deleted sucessfully'})
    

    }catch(error){
        res.status(404).json({
            error:error
        })

    }
   

}
    

module.exports={
    insertData:insertData,
    fetchData:fetchData,
    edituser:edituser,
    deleteuser:deleteuser
}