$(function(){
  function buildMessage(message){
    var image = message.image.url ? `<img src= ${ message.image.url }>` : "";

    var html = `<div class="messages-message" data-message-id="${message.id}">
                  <div class="messages-message__upper-info">
                    <div class="messages-message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="messages-message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="messages-message__text">
                    <p class="messages-message__text__content">
                      <div>
                      ${message.content}
                      </div>
                      ${image}
                    </p>
                  </div>
                 </div>`
    return html;
  }

  $('#new_message').submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('#new_message.new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(message){
      alert('エラー');
    })
    return false;
  })

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.messages-message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildMessage(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
