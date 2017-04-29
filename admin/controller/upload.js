(function (upload) {
    var aws = require('aws-sdk'),
        express = require('express'),
        multer = require('multer'),
        multerS3 = require('multer-s3'),
        path = require('path'),
        fs = require('fs');

    upload.init = function (app) {
        aws.config.loadFromPath(path.join(__dirname, '../', 'aws_config.json'));
        var s3 = new aws.S3({
            apiVersion: '2006-03-01'
        });

        var upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: 'triptiscollection/Images',
                acl: 'public-read',
                metadata: function (req, file, cb) {
                    cb(null, {
                        fieldName: file.fieldname
                    });
                },
                key: function (req, file, cb) {
                    cb(null, file.originalname)
                }
            })
        });
        var uploadProfile = multer({
            storage: multerS3({
                s3: s3,
                bucket: 'triptiscollection/Profile',
                acl: 'public-read',
                metadata: function (req, file, cb) {
                    cb(null, {
                        fieldName: file.fieldname
                    });
                },
                key: function (req, file, cb) {
                    cb(null, file.originalname)
                }
            })
        });
        app.post('/uploads', upload.single('file'), function (req, res, next) {
            res.json({
                url: req.file.location,
                msg: 'Successfully uploaded files!'
            });
        })
        app.post('/upload/profile', uploadProfile.single('file'), function (req, res, next) {
            debugger;
            res.json({
                url: req.file.location,
                msg: 'Successfully uploaded files!'
            });
        })
    };
})(module.exports);