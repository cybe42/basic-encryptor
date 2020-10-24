const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

function encrypt(toEncrypt, publicKey) {
  const buffer = Buffer.from(toEncrypt, 'utf8')
  const encrypted = crypto.publicEncrypt(publicKey, buffer)
  return encrypted.toString('base64')
}

function decrypt(toDecrypt, privateKey) {
  const buffer = Buffer.from(toDecrypt, 'base64')
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      passphrase: '',
    },
    buffer,
  )
  return decrypted.toString('utf8')
}
function generate() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: '',
    },
  })
  return {
    publicKey: publicKey,
    privateKey: privateKey
  };
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    generate: generate
}
