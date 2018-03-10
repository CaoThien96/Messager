var express = require('express');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var router = express.Router();
var http = require('http').Server(express());
var User = new require('../model/users');
var Friend = require('../model/friends');
exports.getUser=(req,res)=>{
    if (!req.body) return res.sendStatus(400)
    var regex = new RegExp(req.body.key, "i")
    ,   query = { username: regex };
    User.find(query,(err,docs)=>{
        console.log(docs)
        Friend.find({
            userId: req.user._id
        },async (err, models) => {
            var array1=await filterUser(docs,models,req.user._id)
            await  sendjson(req,res,array1)
            
        })
    });
}
function filterUser(docs,models,id){
    for(var x in docs){
        models.forEach(element2 => {
            if(docs[x]._id==element2.friendId||docs[x]._id==element2.userId){
                docs.splice(x, 1);
            }
        });
    }
    return docs
}
function sendjson(req,res,array1){
    console.log('test array1')
            console.log(array1)
            res.json(array1)
}
