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
		pShow_close_fn,
		preload_gif = "images/loading.gif",
		pShow_img = $(".pShow-img"),
		pShow_img_index,
		pShow_img_length,
		pShow_pagination_next = $(".pShow-pagination-next"),
		pShow_pagination_prev = $(".pShow-pagination-prev"),
		changeImg,
		imgArray = [],
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

	changeImg = function (ele, next, firstChk, lastChk) {
		pShow_pagination_next.show();
		pShow_pagination_prev.show();

		$(".pShow-loader").show();
		if (cache.indexOf(ele.index) > -1) {
			pShow_img.loadImage(ele.url, function () {
				pShow_img.css({
					display: "none",
					marginTop: -pShow_img.height() / 2,
					marginLeft: -pShow_img.width() / 2
				}).attr("data-index", ele.index).fadeIn();
			});
			$(".pShow-h1").html(ele.index);
		} else {
			pShow_img.loadImage(preload_gif, function () {
				pShow_img.css({
					marginTop: -pShow_img.height() / 2,
					marginLeft: -pShow_img.width() / 2,
					display: "block"
				});
				pShow_img.loadImage(ele.url, function () {
					pShow_img.css({
						display: "none",
						marginTop: -pShow_img.height() / 2,
						marginLeft: -pShow_img.width() / 2
					}).attr("data-index", ele.index).fadeIn();
				});
				$(".pShow-h1").html(ele.index);
			});
		}
		cache.push(ele.index);
	};
	thumbs = function (current) {
		var length = pShow_img_length;
		var i = 0;
		var appendEnable = true;
		if (pShow_thumbs.children().length > 0) {
			appendEnable = false
		}
		for (i; i <= length - 1; i = i + 1) {
			var img = $("<img class='img' src='" + imgArray[i].thumb + "' />");
			if ( i === current) {
				$(".pShow-thumbs li img").css({opacity: 0.5});
				$(".pShow-thumbs li:eq(" + i + ") img").css({opacity: 1});
				img.css({opacity: 1});
			}
			if (appendEnable === true) {
				pShow_thumbs.append("<li class='pShow-thumbs-li'>" +  
					"<table border='0' cellspacing='0' cellpadding='0'>" +
					"<tr>" +
					"<td>" +
					"</td>" +
					"</tr>" +
					"</table>" +
					"</li>");
				$(img).appendTo($(".pShow-thumbs li:eq(" + i + ") table tr td"));
			}
			var angle = Math.floor(Math.random() * 41) - 20;
			$(".pShow-thumbs-li").each(function() {
				$(this).css({
					'-moz-transform'    : 'rotate(' + angle + 'deg)',
					'-webkit-transform' : 'rotate(' + angle + 'deg)',
					'transform'         : 'rotate(' + angle + 'deg)'
				});
			});
		}
		pShow_thumbs = $(".pShow-thumbs");

		/* click on pShow thumb */
		$(".pShow-thumbs-li").on("click", function() {
			changeImg(imgArray[$(this).index()]);
			$(".pShow-thumbs li img").css({opacity: 0.5});
			$(".pShow-thumbs li:eq(" + $(this).index() + ") img").css({opacity: 1});
		});
		/* /click on pShow thumb */
	};
	pShow_close_fn = function () {
		$(".pShow-loader").fadeOut();
		pShow_img.attr("src", "");
	};
	/* /functions */
	
	/* click on page thumb */
	ads_link.on("click", function() {
		var firstChk = false,
			lastChk = false;

		/* images length */
		pShow_img_length = $(this).parent().children("a").length;
		/* /images length */

		/* push to array */
		for (var i = 0; i < pShow_img_length; i = i +1) {
			var img = {};
			img.index = $(this).parent().children("a").eq(i).index();
			img.url =  $(this).parent().children("a").eq(i).attr("href");
			img.thumb = $(this).parent().children("a").eq(i).children("img").attr("src");
			imgArray.push(img);
		}
		/* /push to array */

		var this_index = $(this).index();
		
		thumbs(this_index);

		console.log(pShow_thumbs.children("li:eq(2)").children("table").children("img").attr("src"));
		/* load template */
		changeImg(imgArray[this_index], true, firstChk, lastChk);
		/* /load template */

		/* scroll */
		$("#pShow-thumbs_container").tinyscrollbar({size: $("#pShow-thumbs_container").height()});
		/* /scroll */

		return false;
	});
	/* /click on page thumb */

	
	/* next image */
	pShow_pagination_next.on("click", function () {
		pShow_img_index = pShow_img.attr("data-index");
		var nextIndex = parseInt(pShow_img_index) + 1;
		if (nextIndex > (pShow_img_length - 1)) {
			nextIndex = 0;
		}
		changeImg(imgArray[nextIndex]);
	});
	/* /next image */
	/* prev image */
	pShow_pagination_prev.on("click", function () {
		pShow_img_index = pShow_img.attr("data-index");
		var prevIndex = parseInt(pShow_img_index) - 1;

		if (prevIndex < 0) {
			prevIndex = pShow_img_length - 1;
		}
		changeImg(imgArray[prevIndex]);
	});
	/* /prev image */
	/* click on close button */
	$(document).on("click", pShow_close, function () {
		pShow_close_fn();
	});
	/* /click on close button */
	/* click on fade */
	$(document).on("click", pShow_fade, function () {
		pShow_close_fn();
	});
	/* /click on fade */

	/* window resize */
	$(window).resize(function() {
		pShow_img.css({
			marginTop: -pShow_img.height() / 2,
			marginLeft: -pShow_img.width() / 2,
			display: "block"
		});
		$("#pShow-thumbs_container").tinyscrollbar({size: $("#pShow-thumbs_container").height()});
	}).resize();
	/* /window resize */
};
window.onload = function () {
	"use strict";
	pShow();
};