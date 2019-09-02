$(function(){
  function buildMessage(message){
    var content = message.content ? `${ message.content}` : "";
    var img = message.image ? `<img sec= ${ message.image }>` : "";
    var html = `<div class="messages-message">
                  <div class="messages-message__upper-info">
                    <div class="messages-message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="messages-message__upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="messages-message__text">
                    <p class="messages-message__text__content">
                      <div>
                      ${content}
                      </div>
                      ${img}
                    </p>
                  </div>
                 </div>`
    return html;
  }

  $('#new_message'). submit(function(e){
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
      $('#message_content.form__message').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(message){
      alert('エラー');
    })
    return false;
  })
})