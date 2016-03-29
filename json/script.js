$(function () {
    
    var elems = [];
    var vsehorosho;
	
	$.getJSON( "price-tables.txt", function( data ) 
	{
		elems = data;
		createHTMLForElems(data);
	});
	
	function createHTMLForElems(data)
	{
		var templ = Handlebars.compile($("#sfeature_template").html());
		$('.pricing_table_area').append(templ(data));

		$('.pricing_table_area').find('li').on('click', function (e) {
			e.preventDefault();
			window.location.hash = 'pricing_table/' + $(this).data('index'); 
		})
		
		$(window).on('hashchange', function(){
			render(decodeURI(window.location.hash));
		});
		
	}

	$('.price-page button').on('click', function (e) 
	{
		window.location.hash = '#';;
	}); 

	function render(url) {

		var temp = url.split('/')[0];
		$('.price-page').removeClass('visible');

		var	map = 
		{
			'': function() 
			{
				priceArea(elems);
			},
            
			'#pricing_table': function() 
			{
				var index = url.split('#pricing_table/')[1].trim();
				singPageRender(index, elems);
			}
		};

		if(map[temp])
		{
			map[temp]();
		}
		else 
		{
			alert("Error occuring");
		}

	}
  
    function priceArea(data){

		var allProducts = $('.pricing_table_area > li');
		allProducts.addClass('hidden');

		allProducts.each(function () 
		{
			var that = $(this);
			data.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});

		
	}
  
    function singPageRender(index, data)
    {
		var page = $('.price-page'),
		container = $('.price_content');
		if(data.length){
			data.forEach(function (item) 
			{
				if(item.id == index)
				{
					container.find('h2').text(item.title);
					container.find('p').text('To buy the feature input feature name, your FIO and email');
					var rows = container.find('form').find('table').find('tr');
					rows[0].children[0].textContent = "FN";
					rows[1].children[0].textContent = "FIO";
					rows[2].children[0].textContent = "E-mail";
				}
			});
		}	
		page.addClass('visible');

	}

});