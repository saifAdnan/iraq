/*jslint browser: true*/
/*global window,$, jQuery*/
var pShow = function () {
	"use strict";
	var ads_link = $(".ads-img a"),
		ads_link_url = ads_link.attr("href"),
		pShow_close = ".pShow-close",
		pShow_fade = ".pShow-fade",
		pShow_thumbs = $(".pShow-thumbs"),
		thumbs,
		pShow_wrapper = $(".pShow-wrapper"),
		pShow_wrapper_width = pShow_wrapper.width(),
		preload,
		preload_gif = "images/loading.gif",
		pShow_img = $(".pShow-img"),
		pShow_img_length,
		pShow_pagination_next = $(".pShow-pagination-next"),
		pShow_pagination_prev = $(".pShow-pagination-prev"),
		changeImg,
		cache = [];
	/* functions */
	preload = function (arr) {
		var newimages=[], loadedimages=0
		var postaction=function(){}
		var arr=(typeof arr!="object")? [arr] : arr
		function imageloadpost(){
			loadedimages++
			if (loadedimages==arr.length){
				postaction(newimages) //call postaction and pass in newimages array as parameter
			}
		}
		for (var i=0; i<arr.length; i++){
			newimages[i]=new Image()
			newimages[i].src=arr[i]
			newimages[i].onload=function(){
				imageloadpost()
			}
			newimages[i].onerror=function(){
				imageloadpost()
			}
		}
		return { //return blank object with done() method
			done:function(f){
				postaction=f || postaction //remember user defined callback functions to be called when images load
			}
		}
	};
	changeImg = function (ele, check, next, firstChk, lastChk) {
		pShow_pagination_next.show();
		pShow_pagination_prev.show();
		if (check.attr("href") === undefined && next === true) {
			pShow_pagination_next.hide();
		}
		if (check.attr("href") === undefined && next === false) {
			pShow_pagination_prev.hide();
		}
		if (lastChk === true) {
			pShow_pagination_next.hide();   
		}
		if(firstChk === true) {
			pShow_pagination_prev.hide();
		}
		$(".pShow-loader").show();
		if (cache.indexOf(ele.attr("href")) > -1) {
			pShow_img.loadImage(ele.attr("href"), function () {
				pShow_img.css({
					display: "none",
					marginTop: -pShow_img.height() / 2,
					marginLeft: -pShow_img.width() / 2
				}).attr("data-index", ele.index()).fadeIn();
			});
		} else {
			pShow_img.loadImage(preload_gif, function () {
				pShow_img.css({
					marginTop: -pShow_img.height() / 2,
					marginLeft: -pShow_img.width() / 2,
					display: "block"
				});
				pShow_img.loadImage(ele.attr("href"), function () {
					pShow_img.css({
						display: "none",
						marginTop: -pShow_img.height() / 2,
						marginLeft: -pShow_img.width() / 2
					}).attr("data-index", ele.index()).fadeIn();
				});
			});
		}
		cache.push(ele.attr("href"));
	};
	thumbs = function () {
		var length = ads_link.length;
		var i = 1;
		for (i; i <= length; i = i + 1) {
			pShow_thumbs.append("<li class='pShow-thumbs-li'>" +  
				"<table border='0' cellspacing='0' cellpadding='0'>" +
				"<tr>" +
				"<td>" +
				"<img src='" + $(".ads-img a:nth-child(" + i + ")").children("img").attr("src") + "'> " +
				"</td>" +
				"</tr>" +
				"</table>" +
				"</li>");
        	var angle = Math.floor(Math.random() * 41) - 20;
	        $(".pShow-thumbs-li").each(function() {
		        $(this).css({
		            '-moz-transform'    : 'rotate(' + angle + 'deg)',
		            '-webkit-transform' : 'rotate(' + angle + 'deg)',
		            'transform'         : 'rotate(' + angle + 'deg)'
		        });
	        });
	        
		}
	}
	/* /functions */
	$(window).resize(function() {
		pShow_img.css({
			marginTop: -pShow_img.height() / 2,
			marginLeft: -pShow_img.width() / 2,
			display: "block"
		});
		$("#pShow-thumbs_container").tinyscrollbar({size: $("#pShow-thumbs_container").height()});
	}).resize();
	/* click on thumb */
	ads_link.on("click", function() {
		var firstChk = false,
			lastChk = false;
		pShow_img_length = $(this).parent().children("a").length;
		ads_link_url = $(this);
		/* load template */
		if ($(this).index() === 0) {
			firstChk = true;
		}
		if ($(this).index() === pShow_img_length - 1) {
			lastChk = true;
		}
		if (pShow_thumbs.children("li").length === 0) {
			thumbs();
		}
		changeImg(ads_link_url, ads_link_url, true, firstChk, lastChk);
		$("#pShow-thumbs_container").tinyscrollbar({size: $("#pShow-thumbs_container").height()});
		/* /load template */
		return false;
	});
	/* /click on thumb */
	/* next image */
	pShow_pagination_next.on("click", function () {
		var img = parseInt(pShow_img.attr("data-index")) + 1,
			aImg = $(".ads-img a:eq(" + img + ")"),
			imgSrc = aImg.next(),
			check = aImg.next().next(),
			next = true;
		//$(".pShow-h1").html('').html(imgSrc);
		changeImg(imgSrc, check, next);
	});
	/* /next image */
	/* prev image */
	pShow_pagination_prev.on("click", function () {
		var img = parseInt(pShow_img.attr("data-index")) + 1,
			aImg = $(".ads-img a:eq(" + img + ")"),
			imgSrc = aImg.prev(),
			check = aImg.prev().prev(),
			next = false;
		//$(".pShow-h1").html('').html(imgSrc);
		changeImg(imgSrc, check, next);
	});
	/* /prev image */
	/* click on close button */
	$(document).on("click", pShow_close, function () {
		$(".pShow-loader").fadeOut();
	});
	/* /click on close button */
	/* click on fade */
	$(document).on("click", pShow_fade, function () {
		$(".pShow-loader").fadeOut();
	});
	/* /click on fade */
};
window.onload = function () {
	"use strict";
	pShow();
};