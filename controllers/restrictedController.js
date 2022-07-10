const restrictedController = {
  getRestrictedPage: (req, res) => {
    console.log("called");
    res.render("restricted");
  },
};

module.exports = restrictedController;
