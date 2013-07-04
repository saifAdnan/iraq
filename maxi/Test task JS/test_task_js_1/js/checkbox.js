window.onload = (function () {
	var chk = document.getElementsByTagName("input"),
		e,
		i = 0,
		arrIndex,
		clicked = [
			{
				name: "oneStar",
				value: 0
			},
			{
				name: "twoStar",
				value: 0
			},
			{
				name: "threeStar",
				value: 0
			},
			{
				name: "fourStar",
				value: 0
			},
			{
				name: "fiveStar",
				value: 0
			}
		];
	//add onclick for every DOM element with tag input
	for(i; i < chk.length; i++ ) {
		chk[i].onclick = function(e){
			//For IE
			if (!e) e = window.event;
			e = e.target || e.srcElement;
			//Input type checkbox
			if (e.type == 'checkbox') {
				//increase counter if checkbox is not checked;
				arrIndex = e.value - 1;
				if (e.checked === true) {
					clicked[arrIndex].value = clicked[arrIndex].value + 1;
					var max = 0, x, maxName;
					for( x in clicked) {
					    if( clicked[x].value > max) {
					    	max = clicked[x].value;
					    	maxName = clicked[x].name;
					    }
					}
					console.log(max + " - " + maxName);
				}

			}
		};
	}
});