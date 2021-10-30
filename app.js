const express = require("express");
const { sequelize , Media } = require("./models");
const app = express();
app.use(express.json());

app.post("/media", async (req, res) => {
  const {
    site_code,
    sub_environment,
    state_name,
    city_name,
    location,
    traffic_movement,
    post_code,
    latitude,
    longitude,
    media_vehicle,
    size_w,
    size_h,
    position,
    media_type,
    display_cost,
    additional_size_comments,
    printing_material,
    owner_of_media,
  } = req.body;
  try{
      const postMedia = await Media.create({site_code, sub_environment, state_name, city_name, location, traffic_movement, post_code, latitude, longitude, media_vehicle, size_w, size_h, position, media_type, display_cost, additional_size_comments, printing_material, owner_of_media});

      return res.json(postMedia);
  } catch(err){
      console.log(err)

      return res.status(500).json(err)
  }
});

app.get('/media', async(req, res) => {
    try {
       // params
        // if (req.query.params)
    // {
        // concatenate all the params and storer it in a string
        // findAll with parameters



// }
        const getAllMedia = await Media.findAll(); //pass a where clause if the string you got above is not ''
        return res.json(getAllMedia);
    } catch(err){
        console.log(err);
        return res.status(500).json( {error: 'Something went wrong'});
    }
})

app.get('/media/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const getOneMedia = await Media.findOne({
            where: {id}
        });
        return res.json(getOneMedia);
    } catch(err){
        console.log(err);
        return res.status(500).json( {error: 'Something went wrong'});
    }
})


app.listen({ port:5000 }, async () => {
    console.log('server up on http://localhost:5000');
    await sequelize.authenticate()
    console.log('Database connected!');
})
  