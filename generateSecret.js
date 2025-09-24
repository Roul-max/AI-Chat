import crypto from 'crypto';

// Generate a 256-bit (32 bytes) secret
const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);
