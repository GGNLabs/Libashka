 var mongoose = require('mongoose'),
     schema = mongoose.Schema,
     contactSchema = new schema({
         name: {
             type: String,
             required: true
         },
         email: {
             type: String,
             required: true
         },
         tel: {
             type: String,
             required: true,
         },
         query: {
             type: String,
             required: true
         },
         city: {
             type: String,
             required: false,
         },
         country: {
             type: String,
             required: false,
         },
         isRead: {
             type: Boolean,
             required: false,
         },
         zip: {
             type: String,
             default: false,
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
             default: 'user'
         },
         ModifiedDate: {
             type: Date,
             default: Date.now
         },
         ModifiedBy: {
             type: String,
             default: 'user'
         }
     });
 module.exports = mongoose.model('ContactModel', contactSchema, 'TblContact');