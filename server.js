const express = require("express");
const app = express();

const productRoutes = require("./routes/products");
const alertRoutes = require("./routes/alerts");

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api", alertRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal server error" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`StockFlow backend running on port ${PORT}`);
});
