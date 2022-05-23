const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://MohammadGhandour02:moh15528002004ammad@cluster0.wxjub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas !');
    })
    .catch((err) => {
        console.log('Unable to connect to MongoDB Atlas !');
        console.log(err);
    })

const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next) {
    Book.find({ author: this.id }, (err, books) => {
        if (err) {
            next(err)
        } else if ( books.length > 0 ) {
            next(new Error('This author still has books.'))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)