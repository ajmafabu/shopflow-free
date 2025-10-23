const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const redis = require('redis');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.connect();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ShopFlow Backend Running!' });
});

// Sample products
app.get('/api/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});