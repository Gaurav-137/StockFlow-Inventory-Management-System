# StockFlow – Inventory Management Backend

A B2B SaaS inventory management system built with Node.js and Express.

## Features
- Product & inventory management
- Multi-warehouse support
- Supplier integration
- Low-stock alerts with sales intelligence

## Tech Stack
- Node.js
- Express.js
- PostgreSQL

## API Endpoints
- POST /api/products
- GET /api/companies/:companyId/alerts/low-stock

## Setup
1. npm install
2. Configure database
3. npm start

## Assumptions
- Recent sales = last 30 days
- Price stored as DECIMAL
- SKU globally unique

