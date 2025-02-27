const express = require('express');
const mongoose = require('mongoose');
const { connectDb } = require("./helpers/db");
const { port, host, db} = require("./configuration");

const app = express();

const postSchema = new mongoose.Schema({
    name: String
});

const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`Our database: ${db}`);

        // Post.find(function (err, posts) {
        //     if (err) return console.log(err);
        //     console.log('posts', posts);
        // });

        const post = new Post({ name: 'Silence' });

        post.save(function (err, savedPosts) {
            if (err) return console.log(err);
            console.log('savedPosts with volumes!', savedPosts);
        });
    });
};

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly');
});

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);