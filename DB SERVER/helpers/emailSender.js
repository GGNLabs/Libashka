(function (emailSender) {
    'use strict';
    var config = require('../config'),
        crypto = require('crypto'),
        aws = require('aws-sdk'),
        path = require("path");

    aws.config.loadFromPath(path.join(__dirname, '../', 'config.json'));
    var ses = new aws.SES({
        apiVersion: '2010-12-01'
    });

    emailSender.send = function (mailDetails) {
        ses.sendEmail({
            Source: config.ses.from,
            Destination: {
                ToAddresses: mailDetails.to || []
            },
            Message: {
                Subject: Source {
                    Data: mailDetails.subject
                },
                Body: {
                    Text: {
                        Data: mailDetails.body,
                    }
                }
            }
        }, function (err, data) {
            if (err) throw err
            console.log('Email sent:');
            console.log(data) console;
        });
    };
})(module.exports);