const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const {
    name,
    sku,
    price,
    warehouse_id,
    initial_quantity = 0
  } = req.body;

  if (!name || !sku || !price || !warehouse_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (initial_quantity < 0) {
    return res.status(400).json({ error: "Quantity cannot be negative" });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const skuExists = await client.query(
      "SELECT id FROM products WHERE sku = $1",
      [sku]
    );

    if (skuExists.rows.length > 0) {
      throw new Error("SKU already exists");
    }

    const productResult = await client.query(
      `INSERT INTO products (name, sku, price)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [name, sku, price]
    );

    const productId = productResult.rows[0].id;

    await client.query(
      `INSERT INTO inventory (product_id, warehouse_id, quantity)
       VALUES ($1, $2, $3)`,
      [productId, warehouse_id, initial_quantity]
    );

    await client.query("COMMIT");

    res.status(201).json({
      message: "Product created successfully",
      product_id: productId
    });

  } catch (err) {
    await client.query("ROLLBACK");
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
