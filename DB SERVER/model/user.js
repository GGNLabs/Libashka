 var mongoose = require('mongoose'),
     schema = mongoose.Schema,
     userSchema = new schema({
         _id: {
             type: Number,
             default: 1000
         },
         Name: {
             type: String,
             required: false
         },
         UserName: {
             type: String,
             required: true
         },
         ExternalId: {
             type: String,
             required: true
         },
         Password: {
             type: String,
             required: false
         },
         Gender: {
             type: String,
             required: false
         },
         Contact: {
             type: String,
             required: false
         },
         AlternateContact: {
             type: String
         },
         Email: {
             type: String,
             required: true
         },
         Roles: [{
             type: Number
         }],
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
 module.exports = mongoose.model('UserModel', userSchema, 'TblUserAccount');