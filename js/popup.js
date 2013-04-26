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
		console.log(cache.indexOf(ele.index), ele.index);
		if (cache.indexOf(ele.index) > -1) {
			pShow_img.loadImage(ele.url, function () {
				pShow_img.css({
					display: "none",
					marginTop: -pShow_img.height() / 2,
					marginLeft: -pShow_img.width() / 2
				}).attr("data-index", ele.index).fadeIn();
			});
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
			});
		}
		cache.push(ele.index);
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
	};
	pShow_close_fn = function () {
		$(".pShow-loader").fadeOut();
		pShow_img.attr("src", "");
	};
	/* /functions */
	
	/* click on thumb */
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
			imgArray.push(img);
		}
		/* /push to array */

		var this_index = $(this).index();

		/* load template */
		changeImg(imgArray[this_index], true, firstChk, lastChk);
		/* /load template */

		/* scroll */
		$("#pShow-thumbs_container").tinyscrollbar({size: $("#pShow-thumbs_container").height()});
		/* /scroll */

		return false;
	});
	/* /click on thumb */
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