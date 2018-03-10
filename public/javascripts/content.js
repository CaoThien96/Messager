$(function(){
    $(".heading-compose").click(function() {
      $(".side-two").css({
        "left": "0"
      });
    });

    $(".newMessage-back").click(function() {
      $(".side-two").css({
        "left": "-100%"
      });
    });
    $(".heading-dot").click(function(){
      $(".logout").show();
    })
    $("#searchText").keyup(function(event){
      var key = event.which;
      var seft=$(this);
      if (key == 13){
          if(event.shiftKey){
            event.stopPropagation();
          }
          $.ajax({
            url: '/main/find',
            method: 'POST',
            data: {
              key:seft.val()
            },
            dataType: 'text',
            beforeSend: function(){
          
            },
            success: function(msg){
              $(".search").empty();
              msg=JSON.parse(msg);
              msg.forEach(function (element){
                console.log(element)
                $(".search").append("<div class=\"row sideBar-body\" idFriend='"+element._id+"'><div class=\"col-sm-3 col-xs-3 sideBar-avatar\"><div class=\"avatar-icon\"><img src=\"https://bootdey.com/img/Content/avatar/avatar1.png\"></div></div><div class=\"col-sm-9 col-xs-9 sideBar-main\"><div class=\"row\"><div class=\"col-sm-8 col-xs-8 sideBar-name\"><span class=\"name-meta\">"+element.username+"</span></div><div class=\"col-sm-4 col-xs-4 pull-right sideBar-time\"><span class=\"time-meta pull-right\">18:18</span></div></div></div></div>")
                $(".search").show()
              })
            },
            error: function(){
          
            }
          });
      }
    })
})