 var mongoose = require('mongoose'),
     schema = mongoose.Schema,
     aboutSchema = new schema({
         url: {
             type: String,
             required: false
         },
         text: {
             type: String,
             required: false
         },
         type: {
             type: String,
             required: false,
             default: "text"
         },
         size: {
             type: Number,
             required: true
         },
         height: {
             type: Number,
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