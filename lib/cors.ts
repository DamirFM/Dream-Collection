import { NextApiRequest, NextApiResponse } from 'next';

export function applyCors(req: NextApiRequest, res: NextApiResponse, next: () => void) {
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
