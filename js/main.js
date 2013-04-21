/*jslint nomen: true*/
/*jslint browser: true*/
/*global document*/
var searchModule = function () {
    "use strict";
    var searchParam = {
        selector: document.getElementById("searchValue"),
        parentClass: document.getElementById("searchValue").parentNode.className,
        classFocused: "focused",
        startWidth: 140,
        endWidth: 190,
        counter: 1,
        interval: 0.1
    },
        resize = function (selector, appendStyle) {
            var width,
                resizeInterval = setInterval(function () {
                    if (appendStyle === "toStart") {
                        width = searchParam.endWidth - searchParam.counter;
                        if (width < searchParam.startWidth) {
                            clearInterval(resizeInterval);
                            width = searchParam.startWidth;
                            searchParam.counter = 0;
                            return false;
                        }
                    } else {
                        width = searchParam.startWidth + searchParam.counter;
                        if (width >= searchParam.endWidth) {
                            clearInterval(resizeInterval);
                            width = searchParam.endWidth;
                            return false;
                        }
                    }
                    searchParam.counter = searchParam.counter + 1;
                    selector.style.width = width + "px";
                }, searchParam.interval);
        };
    searchParam.selector.onclick = function () {
        var _this = this;
        if (searchParam.parentClass.split(searchParam.classFocused).length > 1) {
            return false;
        }
        _this.parentNode.className = searchParam.parentClass + " " + searchParam.classFocused;
        resize(this, "toEnd");
    };
    searchParam.selector.onblur = function () {
        this.parentNode.className = searchParam.parentClass;
        this.style.width = searchParam.startWidth;
        resize(this, "toStart");
    };
};
window.onload = function () {
    "use strict";
    searchModule();
};