/*jslint browser: true*/
/*global window,$, jQuery*/
var pShow = function () {
	"use strict";
	var ads_link = $(".ads-img a"),
		ads_link_url = ads_link.attr("href"),
		pShow_close = ".pShow-close",
		pShow_fade = ".pShow-fade",
		pShow_wrapper = $(".pShow-wrapper"),
		pShow_wrapper_width = pShow_wrapper.width(),
		preload,
		preload_gif = "images/loading.gif",
		pShow_img = $(".pShow-img"),
		pShow_img_length,
		pShow_pagination_next = $(".pShow-pagination-next"),
		pShow_pagination_prev = $(".pShow-pagination-prev"),
		changeImg;	
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
		if (ele === pShow_img.attr("src") || ele === undefined) {
			return false;
		}
		if (check === undefined && next === true) {
			pShow_pagination_next.hide();
		}
		if (check === undefined && next === false) {
			pShow_pagination_prev.hide();
		}
		if (lastChk === true) {
			pShow_pagination_next.hide();   
		}
		if(firstChk === true) {
			pShow_pagination_prev.hide();
		}
		$(".pShow-loader").show();
		preload([preload_gif]).done(function (image) {
			pShow_img.attr("src", image[0].src).css({
				marginTop: -pShow_img.height() / 2,
				marginLeft: -pShow_img.width() / 2,
				display: "block"
			});
		});
		preload([ele]).done(function (image) {
			pShow_img.attr("src", image[0].src).css({
				marginTop: -pShow_img.height() / 2,
				marginLeft: -pShow_img.width() / 2,
				display: "block"
			});
		});
	};
	/* /functions */

	$(window).resize(function() {
		pShow_img.css({
			marginTop: -pShow_img.height() / 2,
			marginLeft: -pShow_img.width() / 2,
			display: "block"
		});
	}).resize();
	/* click on thumb */
	ads_link.on("click", function() {
		var firstChk = false,
			lastChk = false;
		pShow_img_length = $(this).parent().children("a").length;
		ads_link_url = $(this).attr("href");
		/* load template */
		if ($(this).index() === 0) {
			firstChk = true;
		}
		if ($(this).index() === pShow_img_length - 1) {
			lastChk = true;
		}
		changeImg(ads_link_url, true, true, firstChk, lastChk);
		/* /load template */
		return false;
	});
	/* /click on thumb */

	/* next image */
	pShow_pagination_next.on("click", function () {
		var img = pShow_img.attr("src");
		img = "upload" + img.split("/upload")[1];
		var aImg = $(".ads-img a[href='" + img + "']"),
			ImgSrc = aImg.next().attr("href"),
			check = aImg.next().next().attr("href"),
			next = true;
			changeImg(ImgSrc, check, next);
	});
	/* /next image */

	/* prev image */
	pShow_pagination_prev.on("click", function () {
		var img = pShow_img.attr("src");
		img = "upload" + img.split("/upload")[1];
		var aImg = $(".ads-img a[href='" + img + "']"),
			ImgSrc = aImg.prev().attr("href"),
			check = aImg.prev().prev().attr("href"),
			next = false;
		changeImg(ImgSrc, check, next);
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