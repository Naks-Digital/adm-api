module.exports = {
  isNullOrEmpty: function (value) {
    if (value == null || value == "" || value == undefined) return false;
    return true;
  },
};
