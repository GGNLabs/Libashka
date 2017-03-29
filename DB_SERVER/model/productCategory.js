 var mongoose = require('mongoose'),
     schema = mongoose.Schema,
     productCategorySchema = new schema({
         Name: {
             type: String,
             required: true
         },
         Category: {
             type: String,
             required: true
         },
         ParentCategory: {
             type: schema.Types.ObjectId,
             ref: 'ProductCategoryModel',
             required: false
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
 module.exports = mongoose.model('ProductCategoryModel', productCategorySchema, 'TblProductCategory');