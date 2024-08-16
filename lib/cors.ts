// lib/cors.js

export function applyCors(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this as needed for security
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    next();
  }
  