const Post = require('../models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

exports.getPosts = (req, res) => {
    const users = Post.find().select("username password")
        .then((users) => {
            res.json({ users });
        })
        .catch(err => console.log(err))
}

exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new Post({ username: req.body.username, password: hashedPassword })
        // console.log(req.body.username, hashedPassword);
        user.save().then(result => {
            res.json({
                user: result
            });
        });
        // res.status(201).send()
    } catch {
        res.status(500).send()
    }
};

exports.loginUser = async (req, res) => {
    // console.log(req.body.username, req.body.password);
    const user = await Post.findOne({username: req.body.username})
    if (user == null) {
        return res.status(400).send('Cannot find user with this username')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            let token = jwt.sign({username: user.username}, 'verySecretCode', {expiresIn: '1h'})
            // res.send('Successfully Logged in')
            res.json({
                message: "Successfully Loged in !!!",
                token
            })
        } else {
            res.send('Password not match')
        }
    } catch {
        res.status(500).send()
    }
}

exports.validate = (req, res) => {
    const users = Post.find().select("username password")
        .then((users) => {
            res.send('Success !!!');
        })
        .catch(err => console.log(err))
}