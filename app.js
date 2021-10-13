const express = require('express')
const {sequelize,Media} = require('./models')
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

 app.get('/media',async(req,res) =>{
   try {
     const users = await Media.findAll()
     return res.json(users)
     
   } catch (err) {
     return res.status(500).json({error: 'Something went wrong'})
   }
 })


// // app.get('/', (req, res) => {
// //   res.send('Hello World!')
// // })

app.listen({port:3000},async()=>{
  console.log('Server up on httm://localhost:3000')
  await sequelize.authenticate()
  console.log('Database connected')
})

// async function main(){
//   await sequelize.authenticate()
// }

// main()