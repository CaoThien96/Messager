module.exports = (io) => {
    let Friend = require('../model/friends');
    let User = require('../model/users');
    let Message = require('../model/messages');
    let list = [];
    function addFriend(model) {
        return new Promise((resolve, reject) => {
            let friend = new Friend(model);
            friend.save((err) => {
                if (err) return;
                resolve(true);
                return;
            })
        })
    }
    io.on('connection', function (socket) {
        console.log('co nguoi ket noi');
        
        socket.on('join', (data) => {
            list[data] = socket;
        })
        socket.on('add-friend', (data) => {
            console.log(data);
            let tmp = [
                {
                    userId: data.idUser,
                    friendId: data.idFriend,
                    status:true
                },
                {
                    userId: data.idFriend,
                    friendId: data.idUser,
                    status:false
                }
            ];
            
            Friend.collection.insert(tmp, onInsert);
            function onInsert(err, docs) {
                if (err) {
                    // TODO: handle error
                } else {
                    // io.to(list[data.idFriend].id).emit('accept-add-friend',data.idUser);
                    socket.emit('result-add-friend',{result:true});
                }
            }
        });
        socket.on('open-chat', (data) => {
            //Get infor friend and history chat
            Message.find({ $or:[{'senderId': data.idUser,'receiverId': data.idFriend},{'senderId': data.idFriend,'receiverId': data.idUser}]  }, function (err, history) {
                if (err) return handleError(err);
                User.findOne({
                    _id: data.idFriend
                }, (err, user) => {
                    socket.emit('result-open-chat', {
                        friend  :   user,
                        history :   history
                    });
                })
              })
            
            
        })
        //Comment-chat
        socket.on('send-msg', (data) => {
            if (undefined != list[data.receiverId]) {
                io.to(list[data.receiverId].id).emit('receiver-msg-to-friend', data.msg);
                socket.emit('receiver-msg-to-me', data.msg);
                addMessage(data,true);
                console.log('da nhan');
            }else{
                socket.emit('receiver-msg-to-me', data.msg);
                addMessage(data,false);
                console.log('chua  nhan');
            }
        })
        //Open add friend
        socket.on('open-add-friend',(data)=>{
            User.findOne({_id:data.idFriend},(err,docs)=>{
                socket.emit('result-open-add-friend',docs);
            })
        })
    });
    function addMessage(data,status){
        var currentdate = new Date(); 
        
        var datetime =currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " - "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
                    
        var msg=new Message({
            body       : data.msg,
            senderId   : data.senderId,
            receiverId : data.receiverId,
            created    : datetime,
            status     : status
          });
        msg.save((err)=>{
            if(err) throw err;
            return;
        })
    }
}