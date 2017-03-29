(function (cipher) {
    'use strict';
    var config = require('../configuration'),
        crypto = require('crypto');

    cipher.toBase64 = function (plainText) {
        return new Buffer(plainText).toString('base64');
    };

    cipher.fromBase64 = function (cipherText) {
        if (cipherText) {
            return new Buffer(cipherText, 'base64').toString('ascii');
        } else {
            return cipherText;
        }
    };

    cipher.sha512 = function (plaintext) {
        if (plaintext) {
            var hash = crypto.createHmac('sha512', config.security.hashkey);
            hash.update(plaintext);
            return hash.digest('hex');
        } else {
            return plaintext;
        }
    };

    cipher.securePassword = function (encryptedPassword) {
        var decryptedPassword = cipher.fromBase64(encryptedPassword);
        return cipher.sha512(decryptedPassword);
    };

    cipher.encryptPassword = function (password) {
        var cipher = crypto.createCipher('aes-256-cbc', config.security.secretkey)
        var crypted = cipher.update(password, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }

    cipher.decryptPassword = function (password) {
        var decipher = crypto.createDecipher('aes-256-cbc', config.security.secretkey)
        var dec = decipher.update(password, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }



})(module.exports);