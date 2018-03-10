
    $(document).ready(function () {
      //Connect
      var socket  = io();
      var idUser  = $('#idUser').val();
      socket.emit('join',$('#idUser').val());
      //Add friend
      socket.on('result-add-friend', (data) => {
        if (data.result) {
          $("#myModal").modal();
        }
      })
      //Click add friend
      $("#add-user").click(() => {
        var r = confirm("Bạn có chắc muốn kết bạn với ABC không?");
        if (r == true) {
          socket.emit('add-friend', {
            idFriend: $("#idFriend").val(),
            idUser: $('#idUser').val()
          });
        } else {
        }
      })
      //Accept add
      socket.on('accept-add-friend', (data) => {
        if (data.result) {
          $("#myModal").modal();
        }
      })
      //Openchat

      $(document).on('click', '.search .sideBar-body', function() {
        socket.emit('open-add-friend', {
          idFriend: $(this).attr('idFriend'),
          idUser: $('#idUser').val()
        });
      })
      $(".sideBar-body").click(function () {
        socket.emit('open-chat', {
          idFriend: $(this).attr('idFriend'),
          idUser: $('#idUser').val()
        });
      })
      //Listen result-open-add-friend
      socket.on('result-open-add-friend',(data)=>{
        $("#content-wellcome").hide();
        $("#content-chat").show();
        $("#add-user").show()
        $(".heading-name-meta").text(data.username);
        $("#idFriend").val(data._id);
        $("#conversation").empty();
      })
      //Listen result-open-chat
      socket.on('result-open-chat', (data) => {
        console.log(data)
        $("#content-wellcome").hide()
        $("#content-chat").show()
        $("#add-user").hide()
        $(".heading-name-meta").text(data.friend.username)
        $("#idFriend").val(data.friend._id)
        $("#conversation").empty()
        for(var key in data.history){
          let conversation=data.history[key]
          m='1'
          $("#conversation").append(function(m){
            console.log(conversation)
            if(conversation.senderId==idUser){
              return "<div class=\"row message-body\"><div class=\"col-sm-12 message-main-receiver\"><div class=\"receiver\"><div class=\"message-text\">" + conversation.body + "</div><span class=\"message-time pull-right\">"+ conversation.created +"</span></div></div></div></div>";
            }
            return "<div class=\"row message-body\"><div class=\"col-sm-12 message-main-sender\"><div class=\"sender\"><div class=\"message-text\">" + conversation.body + "</div><span class=\"message-time pull-right\">"+ conversation.created +"</span></div></div></div></div>";
          })
        }
        
      });
      //Comment
      $('#comment').keyup(function (event) {
        var key = event.which;
        if (key == 13) // the enter key code
        {
          if(event.shiftKey){
            event.stopPropagation();
        } else {
            socket.emit('send-msg', {
              receiverId:$("#idFriend").val(),
              senderId:$('#idUser').val(),
              msg: $(this).val()
            });
            $(this).val('');
          }
        }
      });
      socket.on('receiver-msg-to-friend',(data)=>{
        let msg=data;
        $("#conversation").append(function(msg){
          return "<div class=\"row message-body\"><div class=\"col-sm-12 message-main-sender\"><div class=\"sender\"><div class=\"message-text\">" + data + "</div><span class=\"message-time pull-right\"></span></div></div></div></div>";
        })
      })
      socket.on('receiver-msg-to-me',(data)=>{
        let msg=data;
        $("#conversation").append(function(msg){
          console.log(data);
          return "<div class=\"row message-body\"><div class=\"col-sm-12 message-main-receiver\"><div class=\"receiver\"><div class=\"message-text\">" + data + "</div><span class=\"message-time pull-right\"></span></div></div></div></div>";
        })
      })
    })