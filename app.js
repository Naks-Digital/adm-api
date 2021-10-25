const express = require('express')
const {sequelize,Media,Post} = require('./models')
// const user = require('./models/user')

const app = express()

app.use(express.json())

app.post('/media',async(req,res) =>{
   const {sitecode,subenvironment,statename,cityname,location,trafficmovement,postcode,latitude,longitude,mediavehicle,sizew,sizeh,position,mediatype,displaycost,additionalsizecomments,printingmaterial,onwerOfmedia} = req.body
  try {
    const user = await Media.create({sitecode,subenvironment,statename,cityname,location,trafficmovement,postcode,latitude,longitude,mediavehicle,sizew,sizeh,position,mediatype,displaycost,additionalsizecomments,printingmaterial,onwerOfmedia})
    return res.json(user)
    
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
    
    
  }
  })
//  app.post('/posts',async(req,res) =>{
//    const {userid,body} = req.body
//    try{
//      const user = await Media.findOne({where : {id:userid}})
//      const post = await Post.create({body,mediaId:user.id})
//      return res.json(post)
//    } catch(err){
//      console.log(err)
//      return res.status(500).json(err)

//    }
//  })

 app.get('/media',async(req,res) =>{
   try {
     const users = await Media.findAll()
     return res.json(users)
     
   } catch (err) {
     return res.status(500).json({error: 'Something went wrong'})
   }
 })

//  app.get('/posts',async(req,res) =>{
//   try{
//     const post = await Post.findAll({include:[Media]})
//     return res.json(post)
//   } catch(err){
//     console.log(err)
//     return res.status(500).json(err)

//   }
// })

 app.get('/media/:id', async (req,res)=>{
   const id = req.params.id
   try{
     const user = await Media.findOne({
       where: { id}
     })
     return res.json(user)
   }
   catch(err){
     console.log(err)
     return res.status(500).json({error: 'Something went wrong'})
   }
 })
// // app.get('/', (req, res) => {
// //   res.send('Hello World!')
// // })
// app.post('/media/v1',async(req,res) =>{
//   console.log(req.body);
//   req.send("Media post request")
// })


app.delete('/media/:id', async (req,res)=>{
  const id = req.params.id
  try{
    const user = await Media.findOne({where:{id}})
    await user.destroy()
    return res.json({message: 'media deleted'})
  }
  catch(err){
    console.log(err)
    return res.status(500).json({error: 'Something wrong'})
  }
})

app.put('/media/:id', async (req,res)=>{
  const id = req.params.id
  const {sitecode,subenvironment,statename,cityname,location,trafficmovement  ,postcode,latitude,longitude,mediavehicle,sizew,sizeh,position,mediatype,displaycost,additionalsizecomments,printingmaterial,onwerOfmedia} = req.body
  try{
    const user = await Media.findOne({where: { id},})
    user.sitecode = sitecode
    user.subenvironment =subenvironment
    user.statename=statename
    user.cityname=cityname
    user.location=location
    user.trafficmovement=trafficmovement
    user.postcode=postcode
    user.latitude =latitude
    user.longitude =longitude
    user.mediavehicle=mediavehicle
    user.sizew=sizew
    user.sizeh=sizeh
    user.position=position
    user.mediatype=mediatype
    user.displaycost=displaycost
    user.additionalsizecomments=additionalsizecomments
    user.printingmaterial=printingmaterial
    user.onwerOfmedia=onwerOfmedia
    await user.save()
    return res.json(user)
  }
  catch(err){
    console.log(err)
    return res.status(500).json({error: 'Something went wrong'})
  }
})

app.get('/search',(req,res,next)=>{
const searchField = req.query.location;
Media.find({name:{$regex: searchField,$options: '$i'}})
        .then(data=>{
          res.send(data);
        })

  // var regex = new RegExp(req.params.sitecode,'N');
  // Media.find({name:regex}).then((result) =>{
  //   res.status(500).json(result)
  // })
})

app.listen({port:3000},async()=>{
  console.log('Server up on httm://localhost:3000')
  await sequelize.authenticate()
  console.log('Database connected')
})

// async function main(){
//   await sequelize.authenticate()
// }

// main()