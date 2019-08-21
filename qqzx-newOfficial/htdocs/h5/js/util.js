function priceFormat (value) {
  if (value < 100) {
    return `${value / 100}`
  } else {
    if (value % 100 === 0) {
      return `${value / 100}.00`
    } else if (value % 10 === 0) {
      return `${value / 100}0`
    } else {
      return `${value / 100}`
    }
  }
}
function ticketFormat (value) {
  return `${parseInt(value / 100)}`
}
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}
function setCookie(name,value)
{
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
