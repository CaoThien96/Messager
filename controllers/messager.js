var express = require('express');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();
var http = require('http').Server(express());
var User = new require('../model/users');
var Friend = require('../model/friends');
exports.index=(req,res)=>{
    let listPromise = [];
    Friend.find({
        userId: req.user._id
    }, 'friendId', (err, models) => {
        console.log(models);
        models.forEach(function (element) {
            listPromise.push(findUser(element.friendId));
        });
        Promise.all(listPromise).then(values => {
            User.find({},(err,docs)=>{
                res.render('main', {
                user: req.user,
                listUser: docs,
                listFriend:values
            });
            })
        });
    })
}
function findUser(userId) {
    return new Promise((resolve, reject) => {
        User.findOne({
            _id: userId
        }, (err, docs) => {
            if (err) reject('loi');
            resolve(docs);
        })
    });
}