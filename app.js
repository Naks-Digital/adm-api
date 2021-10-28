const express = require('express')
const {sequelize,Media} = require('./models')
// const Media = require('./models/media')

const app = express()

app.use(express.json())

app.post('/media',async(req,res) =>{
   const {sitecode,subenvironment,statename,cityname,location,trafficmovement,postcode,latitude,longitude,mediavehicle,sizew,sizeh,position,mediatype,displaycost,additionalsizecomments,printingmaterial,onwerofmedia} = req.body
  try {
    const media = await Media.create({sitecode,subenvironment,statename,cityname,location,trafficmovement,postcode,latitude,longitude,mediavehicle,sizew,sizeh,position,mediatype,displaycost,additionalsizecomments,printingmaterial,onwerofmedia})
    return res.json(media)
    
  } catch (err) {
    console.log(err)
    return res.status(200).json(err)
    
    
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

 app.get('/medialist',async(req,res) =>{
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

 app.get('/media', async (req,res)=>{
  //media/?cityname=:cityname&location=:location&sitecode=:sitecode
  //  const cityname = req.query.Media
  //  const id = req.params.id;
  //  const data ={}
   console.log("city is:" + req.query.cityname);
  console.log("location is:" + req.query.location);
  console.log("sitecode is:" + req.query.sitecode);

    const data = {
      cityname : req.query.cityname,
       sitecode: req.query.sitecode,
       location: req.query.location
  };
  
   console.log(" city is:" + req.query.cityname+"location is:" + req.query.location+"sitecode is:" + req.query.sitecode);
   console.log(data);
   try{
     const media = await Media.findAndCountAll({
      //  "SELECT * FROM mediaDetails WHERE cityname || '' || location || sitecode $1"
       where: {
        cityname:data.cityname,
         location:data.location,
         sitecode:data.sitecode
       }
     })
     return res.json(media)

   }
   catch(err){
     console.log(err)
     return res.status(200).json({error: 'Data Not  Found'})
    }

 })

// // app.get('/', (req, res) => {
// //   res.send('Hello World!')
// // })
// app.post('/media/v1',async(req,res) =>{
//   console.log(req.body);
//   req.send("Media post request")
// })


app.get('/media/:id', async (req,res)=>{
  const id = req.params.id
  try{
    const media = await Media.findOne({
      where: {id}
    })
    return res.json(media)
  }
  catch(err){
    console.log(err)
    return res.status(200).json({error: 'Something went wrong'})
  }
})

app.delete('/media/:id', async (req,res)=>{
  const id = req.params.id
  try{
    const media = await Media.findOne({where:{id}})
    await media.destroy()
    return res.json({message: 'media deleted'})
  }
  catch(err){
    console.log(err)
    return res.status(200).json({error: 'Something wrong'})
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
    return res.status(200).json({error: 'Something went wrong'})
  }
})

// app.get('/search',(req,res,next)=>{
// const searchField = req.query.location;
// Media.find({name:{$regex: searchField,$options: '$i'}})
//         .then(data=>{
//           res.send(data);
//         })

//   // var regex = new RegExp(req.params.sitecode,'N');
//   // Media.find({name:regex}).then((result) =>{
//   //   res.status(500).json(result)
//   // })
// })

app.listen({port:3000},async()=>{
  console.log('Server up on httm://localhost:3000')
  await sequelize.authenticate()
  console.log('Database connected')
})

// async function main(){
//   await sequelize.authenticate()
// }

// main()