var MultiRegion = {
	protocol: document.location.protocol,
	hostname: document.location.hostname,
	pathname: document.location.pathname,
	callback: '/multiregion/callback/',
	onSelect: function(el, item)
	{
		var data = {id: item.city_id};

		$.setMRCity(data);
	},
	getCookie: function(name)
	{
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
};

var mrAutocompleteConfig, autocomplete_val = 'off';

$(function(){

	var uagent = navigator.userAgent;

	if(uagent.match(/Chrome\//))
		autocomplete_val = 'none';

	mrAutocompleteConfig = {};
   	
   	// jquery.autocomplete
	if(typeof $.Autocomplete == 'function')
	{
		$.Autocomplete.prototype.select = function (i) {
            var that = this;
            that.onSelect(i);
            that.hide();
        };

		var mrAutocompleteDefaultConfig = {
            autoSelectFirst: true,
            triggerSelectOnValidInput: false,
            serviceUrl: MultiRegion.callback,
            type: 'POST',
            dataType: "json",
            paramName: 'term',
            params: {'_': Math.round(new Date().getTime()), action: 'getCity'},
            transformResult: function(response) {
                return {suggestions: response};
            },
            formatResult: function (item, currentValue) {
                return item.desc;
            },
            onSelect: function (item) {
				MultiRegion.onSelect(this, item);
            },
            minChars: 2,
            deferRequestBy: 300
		};

		mrAutocompleteConfig = $.extend({}, mrAutocompleteConfig, mrAutocompleteDefaultConfig);
	}
	// jquery-ui [autocomplete]
	else
	{
		var mrAutocompleteDefaultConfig = {
			autoFocus: true,
			source: function(request, response) {
				data = {};
				data['_'] = Math.round(new Date().getTime());
				data['action'] = 'getCity';
				data['term'] = request.term;

				$.ajax({
					type: "POST",
					url: MultiRegion.callback,
					data: data,
					dataType: "json",
					success: function(data) {
						response(data);
					}
				});
			},
			minLength: 2,
			delay: 300,
			create: function() {
				$(this).data('ui-autocomplete')._renderItem = function(ul, item) {
					return $('<li><a href="javascript:;">' + item.desc + '</a></li>').data('item.autocomplete', item).appendTo(ul);
				}
				$(this).prev('.ui-helper-hidden-accessible').remove();
			},
			select: function (event, ui) {
				MultiRegion.onSelect(this, ui.item);
			}
		}
		
		mrAutocompleteConfig = $.extend({}, mrAutocompleteConfig, mrAutocompleteDefaultConfig);
	}

	var currentCity = $('.mr_current-city:first');
	
	$(document).on('click', '.mr_modal', function (e) {
		if ($(e.target).parents(".mr_modal").length) return;
		$(this).remove();
	});
	$(document).on('click', '.mr_close', function (e) {
		$(this).closest('.mr_modal').remove();
	});

	if(typeof MultiRegion.getCookie('city_close') == "undefined" || currentCity.data('hint') == true)
	{
		$('.mr_tooltips').fadeIn();
	}

	$.extend({
		getMRModal: function()
		{
			$.mrTooltipsClose();

			data = {};
			data['_'] = Math.round(new Date().getTime());
			data['action'] = 'cityModal';

			$.ajax({
				context: $("body"),
				url: MultiRegion.callback,
				type: 'POST',
				data: data,
				dataType: 'json',
				success: function(data, status, jqXHR)
				{
					$(this).append(data.html);
				}
			});
		},
		setMRCity: function(settings)
		{
			data = {};
			data['_'] = Math.round(new Date().getTime());
			data['action'] = 'setCity';
			data['cityId'] = settings.id;

			$.ajax({
				type: "POST",
				url: MultiRegion.callback,
				data: data,
				dataType: "json",
				success: $.setMRCityCallback
			});
		},
		setMRCityCallback: function(data, status, jqXHR)
		{
			var currentPath = currentCity.data('path');

			if(typeof data.url != 'undefined' && MultiRegion.pathname != (data.url + currentPath))
			{
				location = data.url + currentPath;
				return false;
			}
			else if(typeof data.site != 'undefined' && data.site !='' && MultiRegion.hostname != data.site)
			{
				location = MultiRegion.protocol + '//' + data.site;
				return false;
			}
			else if(data.success/* && data.type == 'cookie'*/)
			{
				location.reload();
				return false;
			}

			/*if(data.current_city)
			{
				$('.mr_current-city').data('cityid',data.current_city.id).text(data.current_city.city);
				$('.mr_current-location').text(data.current_city.location);
				$('.mr_current-country').text(data.current_city.location);
			}*/

			$('.mr_modal').remove();
		},
		mrTooltipsClose: function()
		{
			var date = new Date();
			date.setDate(date.getDate() + 365);
			document.cookie = "city_close=1; domain=" + makeDomain() + "; path=/; expires=" + date.toUTCString();
			$('.mr_tooltips').remove();
		},
		getGeolocation: function()
		{
			if ("geolocation" in navigator)
			{
				navigator.geolocation.getCurrentPosition(position => {
					data = {};
					data['_'] = Math.round(new Date().getTime());
					data['action'] = 'getGeolocation';
					data['lat'] = position.coords.latitude;
					data['lng'] = position.coords.longitude;
					data['driver'] = 'yandex';

					$.ajax({
						type: "POST",
						url: MultiRegion.callback,
						data: data,
						dataType: "json",
						success: $.setMRCityCallback
					});

				}, error => {
					if(error.message)
					{
						alert(error.message);
					}
					else
					{
						alert("Error geolocation position");
					}
					
					console.error(error);
				});
			}
			else
			{
				alert("Error geolocation");
			}
		}
	});
});

function makeDomain() {

	var arr = MultiRegion.hostname.split('.');

	if(arr.length > 2)
	{
		arr.splice(0,1);
	}

	return '.' + arr.join('.');
}