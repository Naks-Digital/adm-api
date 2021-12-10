const validateCSV = (row) => {
  if (row.site_code == "") {
    return "Invalid Site Code";
  }
  if (row.sub_environment == "") {
    return "Invalid Sub Enivironment";
  }
  if (row.state_name == "") {
    return "Invalid State Name";
  }
  if (row.city_name == "") {
    return "Invalid City Name";
  }
  if (row.location == "") {
    return "Invalid Location";
  }
  if (row.traffic_movement == "") {
    return "Invalid Traffic Movement";
  }
  if (row.post_code == "") {
    return "Invalid Post Code";
  }
  if (row.latitude == "") {
    return "Invalid Latitude";
  }
  if (row.longitude == "") {
    return "Invalid Longitude";
  }
  if (row.media_vehicle == "") {
    return "Invalid Media Vehicle";
  }
  if (row.size_w == "") {
    return "Invalid Width";
  }
  if (row.size_h == "") {
    return "Invalid Height";
  }
  if (row.position == "") {
    return "Invalid Position";
  }
  if (row.media_type == "") {
    return "Invalid Media Type";
  }
  if (row.display_cost == "") {
    return "Invalid Display Cost";
  }
  if (row.additional_size_comments == "") {
    return "Invalid Comment";
  }
  if (row.printing_material == "") {
    return "Invalid Printing Material";
  }
  if (row.owner_of_media == "") {
    return "Invalid Owner Of Media";
  }
};
module.exports = { validateCSV };
