const express = require("express");
const { sequelize, Media } = require("./models");
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

app.get("/media", async (req, res) => {
  try {
    const getAllMedia = await Media.findAll();
    return res.json(getAllMedia);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
//--------------------------
app.get("/media", async (req, res) => {
  try {
    // params
    // if (req.query.params)
    // {
    // concatenate all the params and storer it in a string
    // findAll with parameters

    // }
    var paramsString = "";
    const searchParams = {
      site_code: req.query.site_code,
      city_name: req.query.city_name,
      location: req.query.location,
    };
    // paramsString =
    //   searchParams.site_code +
    //   " " +
    //   searchParams.city_name +
    //   " " +
    //   searchParams.location;
    // console.log(searchParams.site_code+"sp");
    if (paramsString != null) {
      // if (
      //   searchParams.site_code != "" ||
      //   searchParams.city_name != "" ||
      //   searchParams.location != ""
      // )  // I tried to check the params directly as I thought maybe the string is not being validated properly
      console.log("if");
      //   console.log(paramsString);
      console.log(
        "site_code:" +
          searchParams.site_code +
          "city_name:" +
          searchParams.city_name +
          "location:" +
          searchParams.location
      );
      const getFilteredMedia = await Media.findAll({
        // where: {
        //   params:{$or: [
        //     // { site_code: searchParams.site_code },
        //     { city_name: { $iLike: searchParams.city_name } },
        //     { location: { $iLike: searchParams.location } },
        //   ]}
        // },   //  here I was trying to get data even when user passes only any one of the three parameters(by using the "or" operator), but I guess this is not the right way to use or operator)

        where: {
          site_code: searchParams.site_code,
          city_name: searchParams.city_name,
          location: searchParams.location,
        }
      });
      return res.json(getFilteredMedia);
    } else {
      console.log("else");
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
