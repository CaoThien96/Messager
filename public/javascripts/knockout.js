$(document).ready(function(){
    function message(body,senderId,receiverId,created,status){
        var self = this;
        self.body = body;
        self.senderId = senderId;
        self.receiverId = receiverId;
        self.created = created;
        self.status = status;
        
    }
    function view_message_model(){
        var self = this;
        self.msg = ko.observableArray([
            new message("Hello",'123','124','1','1'),
            new message("Hi",'123','124','1','1')
        ]);
        self.openchatbox=(data)=>{
            console.log(data);
            // let x=new Promise((resolve,reject)=>{
            //     $.ajax({
            //         method: "POST",
            //         url: "http://localhost:3000/main/getmessage",
            //         dataType: "text",
            //         data: { userId: "John", friendId: "Boston" }
            //       })
            //         .done(function( msg ) {
            //           resolve(msg);
            //         });
            // })
            // x.then((data)=>{
            //     let tmp=JSON.parse(data);
            //     console.log(tmp);
            //     self.msg.removeAll();
            //     self.msg.push(new message(tmp[0],'123','124','1','1'));
            // })
        }
    }
    ko.applyBindings(new view_message_model());
})