const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/companies/:companyId/alerts/low-stock", async (req, res) => {
  const { companyId } = req.params;

  try {
    const alerts = await db.query(`
      SELECT 
        p.id AS product_id,
        p.name AS product_name,
        p.sku,
        w.id AS warehouse_id,
        w.name AS warehouse_name,
        i.quantity AS current_stock,
        t.threshold,
        s.id AS supplier_id,
        s.name AS supplier_name,
        s.contact_email,
        COALESCE(sa.avg_daily_sales, 0) AS avg_daily_sales
      FROM inventory i
      JOIN products p ON i.product_id = p.id
      JOIN warehouses w ON i.warehouse_id = w.id
      JOIN companies c ON w.company_id = c.id
      JOIN thresholds t ON p.product_type = t.product_type
      LEFT JOIN product_suppliers ps ON p.id = ps.product_id
      LEFT JOIN suppliers s ON ps.supplier_id = s.id
      LEFT JOIN sales_analytics sa ON p.id = sa.product_id
      WHERE c.id = $1
        AND i.quantity < t.threshold
        AND sa.avg_daily_sales > 0
    `, [companyId]);

    const response = alerts.rows.map(row => ({
      product_id: row.product_id,
      product_name: row.product_name,
      sku: row.sku,
      warehouse_id: row.warehouse_id,
      warehouse_name: row.warehouse_name,
      current_stock: row.current_stock,
      threshold: row.threshold,
      days_until_stockout: Math.floor(
        row.current_stock / row.avg_daily_sales
      ),
      supplier: row.supplier_id ? {
        id: row.supplier_id,
        name: row.supplier_name,
        contact_email: row.contact_email
      } : null
    }));

    res.json({
      alerts: response,
      total_alerts: response.length
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

module.exports = router;

