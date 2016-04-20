Array.prototype.create_inc = function( length )
	{
		for (var i = 0; i<length; i++)
		{
			this[i] = i+1;
		}
		return this;
	}
	
Array.prototype.shuffle = function( b )
	{
		var i = this.length, j, t;
		while( i ) 
		{
		    j = Math.floor( ( i-- ) * Math.random() );
		    t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
		    this[i] = this[j];
		    this[j] = t;
		}
		return this;
	};

$(document).ready(function () {
	
	var arr = new Array();
	var len = 9;	
	var numlen = 1;
	arr.create_inc(len);
	arr.shuffle();
	
	function randomize_puzzle()
	{
		for (var i = 0; i<arr.length; i++)
		{
			$('#puzzle').append('<div class="puzzle-part"><img src="images/'+(arr[i])+'.jpg" class="puzzle-part-img"></div>')
		}
	}
	
	function puzzlecompleted()
	{
		var pwid = $('#puzzle')[0].clientWidth;
		var phei = $('#puzzle')[0].clientHeight;
		var divs = $('#puzzle').children('div');
		for (var i = 0; i<len; i++)
		{
			var ch = divs[i].childNodes[0];
			var name = ch.attributes['src'].textContent;
			var num = name.split('/')[1].substr(0, numlen);
			var posleft = ch.offsetLeft;
			var postop = ch.offsetTop;
			var partleft = pwid / ch.width;
			var parttop = phei / ch.height;
			var nleft = (num-1)% partleft;
			var ntop = (num-1) / parttop >>0;
			var nesposleft = nleft * ch.width;
			var nespostop = ntop * ch.height;
			var b1 = posleft == nesposleft;
			var b2 = postop == postop;
			if (posleft!=nesposleft || postop != nespostop)
			{
				return false;
			}
		}
		return true;
		
	}
	
	randomize_puzzle();
	
	$('#puzzle img').draggable({containment:'#puzzle'}, 
		{snap:'.puzzle-part'}
		,{revent: "invalid"}
		,{stack: ".puzzle-part-img"}
		,{stop: function()
		{
			var isc = puzzlecompleted();
			if (isc == true)
			{
				$('.result').css('visibility', 'visible');
				$('#puzzle img').draggable({disabled: false});
			}
		}
		});
	
	$(".puzzle-part").droppable({accept:".puzzle-part-img"}
	);
});