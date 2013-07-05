window.onload = function () {
	var btnAdd = document.getElementById("btn-add"),
		clear = document.getElementById("btn-clear"),
		container = document.getElementById("container"),
		isDrag = false,
		box,
		posX,
		posY;

	btnAdd.onclick = function () {
		var boxTemplate = document.createElement("div");
		boxTemplate.className = "box";
		boxTemplate.innerHTML = "<div class='box-resize topLeft'></div>" +
								"<div class='box-resize topRight'></div>" +	
								"<div class='box-resize bottomLeft'></div>" +	
								"<div class='box-resize bottomRight'></div>";
		container.appendChild(boxTemplate);
		box = document.getElementsByClassName("box");
		for (var i = 0; i < box.length; i = i +1) {
			box[i].onmousedown = function () {
				isDrag = true;
			}
			box[i].onmouseup = function () {
				isDrag = false;
			}
			box[i].onmousemove = function () {
				if (isDrag === true) {
					dragMe(this);
				}
			}
		}
	}
	
	document.body.onmousemove = function (e) {
		posX = e.pageX;
		posY = e.pageY;
	}

	document.body.onmouseup = function () {
		isDrag = false;
	}

	function dragMe(m) {
		m.style.top = posX + "px";
		m.style.marginTop = -(posX / 2) + "px";
		m.style.left = posY + "px";
		m.style.marginLeft = -(posY / 2) + "px";
	}

}