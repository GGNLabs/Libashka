 var mongoose = require('mongoose'),
     schema = mongoose.Schema,
     cartSchema = new schema({
         UserName: {
             type: String,
             required: true
         },
         Address: {
             type: String
         },
         Status: {
             type: String,
             required: true,
             default: 'Added'
         },
         currency: {
             type: String,
             required: true
         },
         TotalAmount: {
             type: Number,
             required: true
         },
         Products: {
             type: Array,
             required: true
         },
         IsActive: {
             type: Boolean,
             required: true,
             default: true
         },
         DeliveredDate: {
             type: Date
         },
         CreatedDate: {
             type: Date,
             default: Date.now
         },
         CreatedBy: {
             type: String,
             default: 'Admin'
         },
         ModifiedDate: {
             type: Date,
             default: Date.now
         },
         ModifiedBy: {
             type: String,
             default: 'Admin'
         }
     });
 module.exports = mongoose.model('cartModel', cartSchema, 'TblCart');