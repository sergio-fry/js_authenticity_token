var auth_token = function(callback){
  var auth_token;
  var cookie_key = 'auth_token';

  if($.cookie(cookie_key)){
    auth_token = $.cookie(cookie_key);
  } else {
    $.get("/token/create", function(data){
      if($.isFunction(callback)){callback(data.token)}
      var mins = 10;
      var expires_at = (new Date()).valueOf() + mins * 60 * 1000;
      $.cookie(cookie_key, data.token, {expires: expires_at});
    }, "json");
  }
  if($.isFunction(callback)){callback(auth_token)}

  return auth_token;
}

jQuery.fn.auth_token = function(){
  return $(this).each(function(){
    var form = $(this);
    auth_token(function(){ // preload authenticity_token
      if(form.find("[name='authenticity_token']:input").length == 0){
        form.prepend("<input name='authenticity_token' value='"+auth_token()+"' type='hidden' />");
      } else {
        form.find("[name='authenticity_token']:input").val(auth_token());
      }
    });
  });
}
