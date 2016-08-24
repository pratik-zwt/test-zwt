/*
window.WebFontConfig = {
	typekit:{
		'id' : 'fxv5erw'
	},
	/*
	google:{
		families: ['Ubuntu+Condensed'],
	},
	*//*
	listeners: [],
	active: function(){

		blockGray = $('.blockGray');
		boxItems = $('.blueBlocks > p');

		newHeight = 0;
		boxItems.each(function(i){
			if (blockGray.height() > newHeight) {
				newHeight += $(this).height();
			} else {
				$(this).hide();
			}
		});

		blockGray.height(newHeight);

		news = $('#front-news');
		iframeContainer = blockGray.siblings('div:not(.admin)');
		iframeContainer.css({ 'font-size' : '0' });

		if (news.height() > iframeContainer.height()) {
			iframeContainer.children('iframe').height(news.outerHeight());
		} else {
			news.height(iframeContainer.height());
		}
	}
}
*/
$(function(){


	//WebFont.load(WebFontConfig);




	/* Global vars */
	// var social_bottom_css = $("#social div").css('bottom');

	/* Functions */
	/*function stopSocials()
	{
		social_bottom 	= social_bottom_css;
		social_bottom 	= parseInt(social_bottom.replace('px',''));
		social_bottom 	= $(window).scrollTop()+$(window).height()-social_bottom-parseInt($("#social a").css('marginBottom'));

		footer_top	= $("#mainFooter").offset().top;

		var different = social_bottom-footer_top;
		if(different>0) {
			$("#social div").css('marginBottom',different+'px');
		} else {
			$("#social div").css('marginBottom','0px');
		}


	}*/

	/*complexNearby = $('#complexNearby');
	complexNearbyUl = complexNearby.parent();
	complexNearbyInput = complexNearby.children('input');
	requestInProgress = false;
	requestOld = '';
	requestOldSearch = '';
	complexNearby.keyup(function(){
		val = complexNearbyInput.val();
		failed = true;
		if(val.length > 0 && requestOld != val){
			requestOldSearch = '';
			complexNearby.siblings('.result').remove();
		}
		requestOld = val;
		if(!requestInProgress && val.length == 5 && requestOldSearch != val){
			requestInProgress = true;
			requestOldSearch = val;
			$.post("/index.php", { jsRequest: '1', cmd: 'complexNearby', 'zipCode' : val }, function( data ){
				if(data.status){
					$.each(data.result, function(i, item){
						failed = false;
						complexNearbyUl.append('<li class="result"><a href="'+item.url+'"><span class="bold">'+item.location_name+'</span> &nbsp;<span class="gray">'+item.description+'</span> - '+item.address+'<span class="floatRight">'+item.dist+'m &nbsp;</span></a></li>');
					});
					if(failed){
						complexNearbyUl.append('<li class="result noListStyle">Emme löydä mitään Kuntokeskukset lähelläsi.</li>');
					}
				}
				requestInProgress = false;
			}, "json");
		}
	});*/

	//complexNearby 		= $('#complexNearby');
	searchIcon			= $('.eventSearchIcon');
	complexNearbyUl 	= $('#complexNearby').parent();
	complexNearbyInput 	= $('#complexNearby').children('input');
	isComplexPt			= $("#complexNearby input.pt").length;
	requestInProgress 	= false;
	requestOld 			= '';
	requestOldSearch 	= '';
	$('#complexNearby').keyup(function(){
		val 			= complexNearbyInput.val();
		failed 			= true;
		if(val.length > 0 && requestOld != val){
			requestOldSearch	= '';
			$('#complexNearby').siblings('.result').remove();
		}
		requestOld = val;
		if(!requestInProgress && val.length == 5 && requestOldSearch != val){
			requestInProgress	= true;
			requestOldSearch	= val;
			isPt = (isComplexPt > 0) ? true : false;
			searchIcon.css({'display' : 'inline-block'});
			$.post("/index.php", { jsRequest: '1', cmd: 'complexNearby', 'zipCode' : val, 'isPt' : ( isComplexPt > 0 ? true : false ) }, function( data ){

				renderComplexResult(complexNearbyUl, data, isPt);

				/*
				if(data.status){
					$.each(data.result, function(i, item){
						failed = false;
						var ptListHtml = "";
						if( isComplexPt > 0 )
						{
							var ptListInnerHtml = "";
							$.each( data.pt[item.id], function( index, value ){
								var thisPt = value[0];
								ptListInnerHtml += "<li><a href='" + thisPt.url + "'>" + thisPt.name + "</a> - " + thisPt.email + "</li>"
							});
							ptListHtml = "<ul class='ptList'>" + ptListInnerHtml + "</ul>";
							isComplexPt = true;
						}
						complexNearbyUl.append('<li class="result"><a href="'+ ( isComplexPt === true ? item.id : item.url ) +'"><span class="bold'+( item.upcoming === true ? ' magenta' : '' )+'">'+item.location_name+'</span> <span class="gray">'+item.description+'</span> '+( item.plus === true ? '<span class="plus">PLUS</span>' : '' )+' - '+item.address+'<span class="floatRight">'+item.dist+' &nbsp;</span></a>' + ptListHtml + '</li>');
					});
					if(failed){
						complexNearbyUl.append('<li class="result noListStyle">Vi kan inte hitta någon anläggning nära dig</li>');
					}
				}
				*/
				requestInProgress = false;
				searchIcon.hide();
			}, "json");
		}
	});


	$( ".content.customListStart ul li" ).click(function() {
		window.location=$( this ).attr("rel");
	});

	$('.gallery').colorbox({rel:'gallery'});

	// stopSocials();

	// $(window).on("resize scroll", function(){
	// 	stopSocials();
	// });

	/*$(window).scroll(function() {
	 stopSocials();
	 });*/

	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $.browser.msie){
		$('body').addClass("IEStyle");
	}

	if(!getCookie('allowCookie')){
		$('body').prepend('<div id="cookieMessage">Tällä verkkosivulla käytetään evästeitä. Jatkamalla verkkosivun käyttöä hyväksyt evästeiden käytön. Halutessasi voit lukea lisää evästeiden käytöstä <a target="_blank" href="http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm" style="color:#D1D1E9;">tästä.</a> <a href="#" id="allowCookieClose" style="color:#D1D1E9;">Sulje</a></div>');

		//$('body').prepend('<div style="width:100%; padding:10px 0; background-color:#007fc6; text-align:center; color:#fff; font-size:14px;">Tällä verkkosivulla käytetään evästeitä. Jatkamalla verkkosivun käyttöä hyväksyt evästeiden käytön. Halutessasi voit lukea lisää evästeiden käytöstä <a target="_blank" href="http://fi.wikipedia.org/wiki/Ev%C3%A4ste" style="color:#D1D1E9;">tästä.</a></div>');

		/*$('#allowCookieClose').click(function(e){
			e.preventDefault();
			$(this).parent().remove();
		});*/
		setCookie('allowCookie', 'true', 365);
	};

	Date.prototype.today = function(){
		return this.getFullYear()+"-"+(((this.getMonth()+1) < 10) ? "0" : "")+(this.getMonth()+1)+"-"+((this.getDate() < 10) ? "0" : "") + this.getDate();
	}
	Date.prototype.timeNow = function (){
		return ((this.getHours() < 10) ? "0" : "")+this.getHours()+":"+((this.getMinutes() < 10) ? "0" : "")+this.getMinutes();
		//return ((this.getHours() < 10) ? "0" : "")+this.getHours()+":"+((this.getMinutes() < 10) ? "0" : "")+this.getMinutes()+":"+((this.getSeconds() < 10) ? "0" : "")+this.getSeconds();
	}

	$('.eventSaveOnTime').click(function(e){
		e.preventDefault();

		if($(this).siblings('.saveOnTimeContainer').length > 0)
		{
			$(this).siblings('.saveOnTimeContainer').remove();
			return false;
		}

		var style = 'style="'+$(this).attr('style')+'"';

		var now = new Date();
		var html = '<div class="saveOnTimeContainer" '+style+'>';
			html += 'Datum<br />';
			html += '<input class="datepicker" type="text" name="saveOnTimeDate" value="'+now.today()+' '+now.timeNow()+'" /><br />';
			html += 'Kommentar<br />';
			html += '<input type="text" name="saveOnTimeComment" />';
			//html += '<input class="saveOnTimeConfirm submit" type="submit" value="Spara schemaläggning" />';
		html += '</div>';

		$(this).after(html);

		$('.datepicker').datetimepicker({
			format: "Y-m-d H:i"
		});
		$('.saveOnTimeConfirm').click(function(e){
			if(!confirm('Är du säker')){
				e.preventDefault();
			}
		});
	});

	if ($('.datepicker').length > 0) {
		$('.datepicker').datetimepicker({
			format: "Y-m-d H:i"
		});
	}

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
