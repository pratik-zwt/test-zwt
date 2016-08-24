$(function(){

if(!getCookie('allowCookie')){
		$('body').prepend('<div id="cookieMessage">Denne websiden benytter cookies. Ved fortsatt bruk av websiden godkjenner du benyttelsen av cookies. For ytterligere informasjon se <a target="_blank" href="http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm" style="color:#D1D1E9;">her</a>. <a href="#" id="allowCookieClose" style="color:#D1D1E9;">Lukk</a></div>');

		$('#allowCookieClose').click(function(e){
			e.preventDefault();
			$(this).parent().remove();
		});

		//setCookie('allowCookie', 'true', 365);
	};
});

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
