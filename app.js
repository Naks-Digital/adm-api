const express = require("express");
const { sequelize, Media,campaign} = require("./models");
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
  try {
    const postMedia = await Media.create({
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
    });

    return res.json(postMedia);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err);
  }
});

// app.get("/media", async (req, res) => {
//   try {
//     const getAllMedia = await Media.findAll();
//     return res.json(getAllMedia);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// });
//--------------------------
app.get("/media", async (req, res) => {
  try {
    console.log("object "+Object.keys(req.query).length);
    var whereClause=''
if (Object.keys(req.query).length)
{
  const getMedia = await Media.findAll({
//  where: { [ Sequalize.literal (`searchableColumns @@to_tsquery( <<`,req.query.site_code +req.query.city_name+req.query.location`> )’`]}


 where:{ 
    site_code: req.query.site_code,
    city_name: req.query.city_name,
    location: req.query.location,
  }
  });
  console.log("getmedia "+getMedia)
  return res.json(getMedia);
}
else {
     const getAllMedia = await Media.findAll(); //pass a where clause if the string you got above is not ''
    return res.json(getAllMedia);
  }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/media/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const getOneMedia = await Media.findOne({
      where: { id },
    });
    return res.json(getOneMedia);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("server up on http://localhost:5000");
  await sequelize.authenticate();
  console.log("Database connected!");
});
