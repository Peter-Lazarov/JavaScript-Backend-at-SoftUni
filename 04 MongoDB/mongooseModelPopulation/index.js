const mongoose = require('mongoose');
const connectionString = 'mongodb://0.0.0.0:27017/Book';

const Article = require('./models/Article');
const Comment = require('./models/Comment');

async function start() {
    await mongoose.connect(connectionString);
    console.log('connected');
    
    // Create collection in database
    // await Article.create({
    //     author: 'Peter',
    //     title: 'First Article',
    //     content: 'Some text in first article'
    // });
    

    // //Create object comment and add it to article
    // await Comment.create({
    //     author: 'Gosho',
    //     content: 'the first article was good'
    // });
    
    // const article = await Article.findOne({});
    // const comment = await Comment.findOne({});
    
    // article.comments.push(comment._id);
    
    // await article.save();

    // //Get article and comments for it
    // const article = await Article.findOne({}).populate('comments');
    // console.log(article);

    const articleWithPartOfParameters = await Article.findOne({}).populate('comments', 'content');
    console.log(articleWithPartOfParameters);
    
    await mongoose.disconnect();
    console.log('disconnected');
}

start()
