const express = require('express')
const {sequelize,Media} = require('./models')
// const media = require('./models/media')

const app = express()

app.use(express.json())

app.post('/media',async(req,res) =>{
   const {sitecode,subenvironment,statename,cityname,location,trafficmovement,postcode,latitude,longitude,mediavehicle,sizew,sizeh,position,mediatype,displaycost,additionalsizecomments,printingmaterial,onwerofmedia} = req.body
  try {
    const media = await Media.create({sitecode,subenvironment,statename,cityname,location,trafficmovement,postcode,latitude,longitude,mediavehicle,sizew,sizeh,position,mediatype,displaycost,additionalsizecomments,printingmaterial,onwerofmedia})
    return res.json(media)
    
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
    
    
  }
  })
//  app.post('/posts',async(req,res) =>{
//    const {mediaid,body} = req.body
//    try{
//      const media = await Media.findOne({where : {id:mediaid}})
//      const post = await Post.create({body,mediaId:media.id})
//      return res.json(post)
//    } catch(err){
//      console.log(err)
//      return res.status(500).json(err)

//    }
//  })

 app.get('/media',async(req,res) =>{
   try {
     const media = await Media.findAll()
     return res.json(media)
     
   } catch (err) {
     return res.status(500).json({error: 'Something wrong'})
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
   const calls = {
    sitecode: req.params.sitecode,
    location: req.params.location,
    cityname: req.params.cityname
   }

   try{
     const media = await Media.findOne({
       where: {sitecode}
     })
     return res.json(media)
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
    const media = await Media.findOne({where:{id}})
    await media.destroy()
    return res.json({message: 'media deleted'})
  }
  catch(err){
    console.log(err)
    return res.status(500).json({error: 'Something wrong'})
  }
})

app.put('/media/:id', async (req,res)=>{
  const id = req.params.id
  const {sitecode,subenvironment,statename,cityname,location,trafficmovement  ,postcode,latitude,longitude,mediavehicle,sizew,sizeh,position,mediatype,displaycost,additionalsizecomments,printingmaterial,onwerofmedia} = req.body
  try{
    const media = await Media.findOne({where: { id},})
    media.sitecode = sitecode
    media.subenvironment =subenvironment
    media.statename=statename
    media.cityname=cityname
    media.location=location
    media.trafficmovement=trafficmovement
    media.postcode=postcode
    media.latitude =latitude
    media.longitude =longitude
    media.mediavehicle=mediavehicle
    media.sizew=sizew
    media.sizeh=sizeh
    media.position=position
    media.mediatype=mediatype
    media.displaycost=displaycost
    media.additionalsizecomments=additionalsizecomments
    media.printingmaterial=printingmaterial
    media.onwerofmedia=onwerofmedia
    await media.save()
    return res.json(media)
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