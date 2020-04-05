$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html =
        `<div class="chat-main__message-list__block">
          <div class="chat-main__message-list__block__member">
            <div class="chat-main__message-list__block__member__name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__block__member__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__block__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
        return html;
      } else {
        var html =
        `<div class="chat-main__message-list__block">
          <div class="chat-main__message-list__block__member">
            <div class="chat-main__message-list__block__member__name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__block__member__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__block__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
      };
    }

  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-main__message-list').append(html);
        $('form')[0].reset();
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        // $().attr("disabled", false) or prop("disabled", false) 
        $('.send-btn').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  })
});




