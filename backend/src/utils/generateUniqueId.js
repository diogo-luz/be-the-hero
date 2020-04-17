//vamos usar um método do crypto para gerar um id aleatório
const crypto = require('crypto');

module.exports = function generateUniqueId() {
    return crypto.randomBytes(4).toString('HEX');
}