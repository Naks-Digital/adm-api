const express = require('express')
const {sequelize,Media,Post} = require('./models')
// const user = require('./models/user')

const app = express()

app.use(express.json())

app.post('/media',async(req,res) =>{
   const {siteCode,subEnvironment,stateName,cityName,Location,trafficMovement,postCode,Latitude,Longitude,mediaVehicle,sizeW,sizeH,Position,mediaType,displayCost,additionalSizeComments,printingMaterial,onwerOfMedia} = req.body
  try {
    const user = await Media.create({siteCode,subEnvironment,stateName,cityName,Location,trafficMovement,postCode,Latitude,Longitude,mediaVehicle,sizeW,sizeH,Position,mediaType,displayCost,additionalSizeComments,printingMaterial,onwerOfMedia})
    return res.json(user)
    
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
    
    
  }
 })
 app.post('/posts',async(req,res) =>{
   const {userid,body} = req.body
   try{
     const user = await Media.findOne({where : {id:userid}})
     const post = await Post.create({body,mediaId:user.id})
     return res.json(post)
   } catch(err){
     console.log(err)
     return res.status(500).json(err)

   }
 })

 app.get('/media',async(req,res) =>{
   try {
     const users = await Media.findAll()
     return res.json(users)
     
   } catch (err) {
     return res.status(500).json({error: 'Something went wrong'})
   }
 })

 app.get('/posts',async(req,res) =>{
  try{
    const post = await Post.findAll({include:[Media]})
    return res.json(post)
  } catch(err){
    console.log(err)
    return res.status(500).json(err)

  }
})

 app.get('/media/:id', async (req,res)=>{
   const id = req.params.id
   try{
     const user = await Media.findOne({
       where: { id},
       include: 'posts',
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
  const {siteCode,subEnvironment,stateName,cityName,Location,trafficMovement  ,postCode,Latitude,Longitude,mediaVehicle,sizeW,sizeH,Position,mediaType,displayCost,additionalSizeComments,printingMaterial,onwerOfMedia} = req.body
  try{
    const user = await Media.findOne({where: { id},})
    user.siteCode = siteCode
    user.subEnvironment =subEnvironment
    user.stateName=stateName
    user.cityName=cityName
    user.Location=Location
    user.trafficMovement=trafficMovement
    user.postCode=postCode
    user.Latitude =Latitude
    user.Longitude =Longitude
    user.mediaVehicle=mediaVehicle
    user.sizeW=sizeW
    user.sizeH=sizeH
    user.Position=Position
    user.mediaType=mediaType
    user.displayCost=displayCost
    user.additionalSizeComments=additionalSizeComments
    user.printingMaterial=printingMaterial
    user.onwerOfMedia=onwerOfMedia
    await user.save()
    return res.json(user)
  }
  catch(err){
    console.log(err)
    return res.status(500).json({error: 'Something went wrong'})
  }
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