 var mongoose = require('mongoose'),
     schema = mongoose.Schema,
     aboutSchema = new schema({
         _id: {
             type: Number,
             default: 1000
         },
         ImageUrl: {
             type: String,
             required: false
         },
         About: {
             type: String,
             required: true
         },
         IsActive: {
             type: Boolean,
             required: true,
             default: true
         },
         CreatedDate: {
             type: Date,
             default: Date.now
         },
         CreatedBy: {
             type: String,
             default: 'Tripti'
         },
         ModifiedDate: {
             type: Date,
             default: Date.now
         },
         ModifiedBy: {
             type: String,
             default: 'Tripti'
         }
     });
 module.exports = mongoose.model('AboutModel', aboutSchema, 'TblAboutAccount');