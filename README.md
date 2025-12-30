# StockFlow – Inventory Management Backend

StockFlow is a B2B SaaS backend system for managing inventory across multiple warehouses with supplier integration.

📄 **Case Study Document:**  
[StockFlow – Backend Engineering Case Study](https://docs.google.com/document/d/1WI7Znrj4EnkO_sTuJnaH1OBAaCkDALOBQzypsnRnBy0/edit?usp=sharing)

## Features
- Product creation with SKU uniqueness
- Multi-warehouse inventory management
- Inventory audit trail support
- Low stock alerting with supplier details

## Tech Stack
- Node.js
- Express.js
- PostgreSQL

## API Endpoints
- POST /api/products
- GET /api/companies/:companyId/alerts/low-stock

## Assumptions
- Recent sales are tracked externally (30 days)
- SKU is globally unique
- Inventory is tracked per warehouse
