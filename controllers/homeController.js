const homeContoller = {
  getHomePage: (req, res) => {
    res.render("home", { title: "Simple User Auth App" });
  },
};

module.exports = homeContoller;
