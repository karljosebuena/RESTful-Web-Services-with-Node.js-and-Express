const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema({
    uri: { type: String },
    title: { type: String },
    title_without_series: { type: String },
    image_url: { type: String },
    small_image_url: { type: String },
    large_image_url: { type: String },
    link: { type: String },
    num_pages: { type: String },
    format: { type: String },
    edition_information: { type: String },
    publisher: { type: String },
    publication_day: { type: String },
    publication_year: { type: String },
    publication_month: { type: String },
    average_rating: { type: String },
    ratings_count: { type: String },
    description: { type: String },
    author: { type: String },
    published: { type: String },
    work: { type: Schema.Types.Mixed },
});

module.exports = mongoose.model('Book', bookModel);
