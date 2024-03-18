const app = require("./app");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("MetaBlog server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port, http://localhost:${port}`);
});
