(function(jQuery){
	// Р¤СѓРЅРєС†РёРё Р±РµР· СЃРѕР·РґР°РЅРёСЏ РєРѕР»Р»РµРєС†РёРё
	jQuery.extend({
		addIntoCart: function(path, shop_item_id, count){
			$.clientRequest({path: path + '?add=' + shop_item_id + '&count=' + count, 'callBack': $.addIntoCartCallback, context: $('#little_cart')});
			return false; 

		},
		deleteByCart: function(path, shop_item_id){
			$.clientRequest({path: path + '?delete_ajax=' + shop_item_id, 'callBack': $.addIntoCartCallbackFroDelete, context: $('#little_cart')});
			return false;
		},
		addIntoCartCallback: function(data, status, jqXHR)
		{
			$.loadingScreen('hide');
			jQuery(this).html(data);
			$("#addcartinfo").click();
		},
		addIntoCartCallbackFroDelete: function(data, status, jqXHR)
		{
			$.loadingScreen('hide');
			jQuery(this).html(data);
		},
		addCompare: function(path, shop_item_id, object){
			$(object).find(">i").toggleClass('fa-square-o fa-check-square-o');
			$.clientRequest({path: path + '?compare=' + shop_item_id, 'callBack': function(){
					$.loadingScreen('hide');
				}, context: $(object)});
			$('#compareButton').show();
			return false;
		},
		addFavorite: function(path, shop_item_id, object){
			$(object).find(">i").toggleClass('fa-heart-o fa-heart');
			$.clientRequest({path: path + '?favorite=' + shop_item_id, 'callBack': function(){
					$.loadingScreen('hide');
				}, context: $(object)});
			$('#favoriteButton').show();
			return false;
		},

		sendVote: function(id, vote, entity_type){
			$.clientRequest({path: '?id=' + id + '&vote=' + vote + '&entity_type=' + entity_type , 'callBack': $.sendVoteCallback});
			return false;
		},
		sendVoteCallback: function(data, status)
		{
			$.loadingScreen('hide');
			$('#' + data.entity_type + '_id_' + data.item).removeClass("up down");
			if (!data.delete_vote)
			{
				data.value == 1
				? $('#' + data.entity_type + '_id_' + data.item).addClass("up")
				: $('#' + data.entity_type + '_id_' + data.item).addClass("down");
			}			

			$('#' + data.entity_type + '_rate_' + data.item).text(data.rate);
			$('#' + data.entity_type + '_likes_' + data.item).text(data.likes);
			$('#' + data.entity_type + '_dislikes_' + data.item).text(data.dislikes);
		}
	});
})(jQuery);

/**
* РЎРєР»РѕРЅРµРЅРёРµ РїРѕСЃР»Рµ С‡РёСЃР»РёС‚РµР»СЊРЅС‹С…
* int number С‡РёСЃР»РёС‚РµР»СЊРЅРѕРµ
* int nominative РРјРµРЅРёС‚РµР»СЊРЅС‹Р№ РїР°РґРµР¶
* int genitive_singular Р РѕРґРёС‚РµР»СЊРЅС‹Р№ РїР°РґРµР¶, РµРґРёРЅСЃС‚РІРµРЅРЅРѕРµ С‡РёСЃР»Рѕ
* int genitive_plural Р РѕРґРёС‚РµР»СЊРЅС‹Р№ РїР°РґРµР¶, РјРЅРѕР¶РµСЃС‚РІРµРЅРЅРѕРµ С‡РёСЃР»Рѕ
*/
function declension(number, nominative, genitive_singular, genitive_plural)
{
	var last_digit = number % 10, last_two_digits = number % 100, result;

	if (last_digit == 1 && last_two_digits != 11)
	{
		result = nominative;
	}
	else
	{
		if ((last_digit == 2 && last_two_digits != 12) || (last_digit == 3 && last_two_digits != 13) || (last_digit == 4 && last_two_digits != 14))
		{
			result = genitive_singular;
		}
		else
		{
			result = genitive_plural;
		}
	}

	return result;
}

/*
 * jQuery Р›РёС‡РЅС‹Рµ СЃРѕРѕР±С‰РµРЅРёСЏ
 */
// Р›РёС‡РЅС‹Рµ СЃРѕРѕР±С‰РµРЅРёСЏ
(function($) {
	$.fn.messageTopicsHostCMS = function(settings) {
		// РќР°СЃС‚СЂРѕР№РєРё
		settings = $.extend({
			timeout :					10000, // РўР°Р№РјР°СѓС‚ РѕР±РЅРѕРІР»РµРЅРёР№
			data :						'#messages_data', // Р±Р»РѕРє СЃ РґР°РЅРЅС‹РјРё РїРµСЂРµРїРёСЃРєРё РґР»СЏ РѕР±РЅРѕРІР»РµРЅРёСЏ
			url :							'#url', // Р·РЅР°С‡РµРЅРёРµ URL
			page :						'#page', // Р·РЅР°С‡РµРЅРёРµ total
			message_field :		'textarea', // РїРѕР»Рµ РІРІРѕРґР° СЃРѕРѕР±С‰РµРЅРёСЏ
			page_link :				'.page_link', // СЃСЃС‹Р»РєРё РЅР° СЃС‚СЂР°РЅРёС†С‹
			keyToSend :				13 // РћС‚РїСЂР°РІРєР° СЃРѕРѕР±С‰РµРЅРёСЏ
		}, settings);

		var Obj = $.extend({
				_url :			this.find(settings.url).text(),
				_page :			parseInt(this.find(settings.page).text()) + 1,
				oData :			this.find(settings.data),
				oForm :			this.find('form'),
				oField :		this.find(settings.message_field),	// РїРѕР»Рµ РІРІРѕРґР° СЃРѕРѕР±С‰РµРЅРёСЏ
				oPage :			this.find(settings.page_link),	// СЃСЃС‹Р»РєРё РЅР° СЃС‚СЂР°РЅРёС†С‹
				oTemp :			{} // Р±Р»РѕРє РІСЂРµРјРµРЅРЅС‹С… РґР°РЅРЅС‹С…
			}, this);

		function _start() {
			if (Obj.length == 1) {
				// РѕР±РЅРѕРІР»РµРЅРёРµ РґР°РЅРЅС‹С… РїРѕ С‚Р°Р№РјР°СѓС‚Сѓ
				setInterval(_ajaxLoad, settings.timeout);

				Obj.oField.keydown(function(e) {
					if (e.ctrlKey && e.keyCode == settings.keyToSend) Obj.oForm.submit();
				});

				// РѕС‚РїСЂР°РІРєР° С„РѕСЂРјС‹ РїРѕ Ctrl+Enter
				Obj.oField.keydown(function(e) {
					if (e.ctrlKey && e.keyCode == settings.keyToSend) Obj.oForm.submit();
				});

				// РѕС‚РїСЂР°РІРєР° СЃРѕРѕР±С‰РµРЅРёСЏ РёР· С„РѕСЂРјС‹
				Obj.oForm.submit(function() {
					if (Obj.oField.val().trim().length) {
						_ajaxLoad({form : Obj.oForm.serialize()});
						Obj.oForm.find(':input:not([type=submit],[type=button])').each(function(){$(this).val('')});
					}
					return false;
				});
			}
			return false;
		}

		// Ajax Р·Р°РїСЂРѕСЃ
		function _ajaxLoad(data) {
			if (!data) data = {};
			form = data.form ? '&' + data.form : '';

			return $.ajax({
				url : Obj._url + 'page-' + Obj._page + '/',
				type : 'POST',
				data : 'ajaxLoad=1' + form,
				dataType : 'json',
				success :	function (ajaxData) {
					Obj.oData.html($(ajaxData.content).find(settings.data).html());
				},
				error : function (){return false}
			});
		}
		return this.ready(_start);
	};
})(jQuery);

// Р›РёС‡РЅС‹Рµ СЃРѕРѕР±С‰РµРЅРёСЏ
(function($) {
	$.fn.messagesHostCMS = function(settings) {
	//jQuery.extend({
		//messagesHostCMS: function(settings){
			// РќР°СЃС‚СЂРѕР№РєРё
			settings = $.extend({
				chat_height :					465, // Р’С‹СЃРѕС‚Р° С‡Р°С‚Р° РїРµСЂРµРїРёСЃРєРё
				timeout :							10000, // РўР°Р№РјР°СѓС‚ РѕР±РЅРѕРІР»РµРЅРёР№
				load_messages :				'#load_messages', // РєРЅРѕРїРєР° РїРѕРґРіСЂСѓР·РєРё СЃС‚Р°СЂС‹С… СЃРѕРѕР±С‰РµРЅРёР№
				chat_window :					'#chat_window', // РѕРєРЅРѕ С‡Р°С‚Р° РїРµСЂРµРїРёСЃРєРё
				messages :						'#messages', // СЃРїРёСЃРѕРє СЃРѕРѕР±С‰РµРЅРёР№ С‡Р°С‚Р°
				prefix_message_id :		'msg_', // РїСЂРµС„РёРєСЃ РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂР° СЃРѕРѕР±С‰РµРЅРёСЏ РІ DOM
				message_field :				'textarea', // РїРѕР»Рµ РІРІРѕРґР° СЃРѕРѕР±С‰РµРЅРёСЏ
				url :									'#url', // Р·РЅР°С‡РµРЅРёРµ URL
				limit :								'#limit', // Р·РЅР°С‡РµРЅРёРµ limit
				total :								'#total', // Р·РЅР°С‡РµРЅРёРµ total
				topic_id :						'#topic_id', // Р·РЅР°С‡РµРЅРёРµ message_topic id
				keyToSend :						13 // РћС‚РїСЂР°РІРєР° СЃРѕРѕР±С‰РµРЅРёСЏ
			}, settings);

		var Obj = $.extend({
				_activity :		1,
				_autoscroll :	1,
				_url :				this.find(settings.url).text(),
				_limit :			this.find(settings.limit).text(),
				_total :			this.find(settings.total).text(),
				_topic_id :		this.find(settings.topic_id).text(),
				_count_msg :	0, // РєРѕР»РёС‡РµСЃС‚РІРѕ СЃРѕРѕР±С‰РµРЅРёР№ РІ С‡Р°С‚Рµ
				oLoad :				this.find(settings.load_messages), // РєРЅРѕРїРєР° РїРѕРґРіСЂСѓР·РєРё СЃС‚Р°СЂС‹С… СЃРѕРѕР±С‰РµРЅРёР№
				oWindow :			this.find(settings.chat_window), // РѕРєРЅРѕ С‡Р°С‚Р° РїРµСЂРµРїРёСЃРєРё
				oMessages :		this.find(settings.messages), // СЃРїРёСЃРѕРє СЃРѕРѕР±С‰РµРЅРёР№ С‡Р°С‚Р°
				oField :			this.find(settings.message_field),	// РїРѕР»Рµ РІРІРѕРґР° СЃРѕРѕР±С‰РµРЅРёСЏ
				oForm :				this.find('form'),
				oTemp :				{} // Р±Р»РѕРє РІСЂРµРјРµРЅРЅС‹С… РґР°РЅРЅС‹С…
			}, this);

		function _start() {
			if (Obj.length == 1) {
				_recountChat();

				// РѕР±РЅРѕРІР»РµРЅРёРµ РґР°РЅРЅС‹С… РїРѕ С‚Р°Р№РјР°СѓС‚Сѓ
				setInterval(_ajaxLoad, settings.timeout);

				// РїСЂРѕРІРµСЂРєР° Р°РєС‚РёРІРЅРѕСЃС‚Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
				$("body").mousemove(function(){
					Obj._activity = Obj._autoscroll == 1 ? 1 : 0;
				});

				// РѕС‚РїСЂР°РІРєР° С„РѕСЂРјС‹ РїРѕ Ctrl+Enter
				Obj.oField.keydown(function(e) {
					if (e.ctrlKey && e.keyCode == settings.keyToSend) Obj.oForm.submit();
				});

				Obj.oWindow.scroll(function(){
					Obj._autoscroll = Obj.oMessages.height() == Obj.oWindow.scrollTop() + settings.chat_height ? 1 : 0;
				});

				// РѕС‚РїСЂР°РІРєР° СЃРѕРѕР±С‰РµРЅРёСЏ РёР· С„РѕСЂРјС‹
				Obj.oForm.submit(function() {
					if (Obj.oField.val().trim().length) {
						Obj._autoscroll = 1;
						Obj._activity = 1;
						_ajaxLoad({form : Obj.oForm.serialize()});
						Obj.oField.val('');
					}
					return false;
				});

				Obj.oLoad.click(function(){
					_ajaxLoad({
						preload : true,
						page : 'page-' + parseInt(Obj._count_msg / Obj._limit + 1)
					})
				});
			}
			return false;
		}

		// Ajax Р·Р°РїСЂРѕСЃ
		function _ajaxLoad(data) {
			if (!data) data = {};
			page = data.page ? data.page + '/' : '';
			form = data.form ? '&' + data.form : '';
			return $.ajax({
				url : Obj._url + Obj._topic_id + '/' + page,
				type : 'POST',
				data : 'ajaxLoad=1&activity=' + Obj._activity + form,
				dataType : 'json',
				success :	function (ajaxData) {
					Obj.oTemp = $(ajaxData.content);

					if (!data.preload && Obj._count_msg > Obj._limit)
					{
						Obj.oTemp.find(settings.messages + ' > :first[id^='+settings.prefix_message_id+']').remove();
					}

					// Р·Р°РјРµРЅР° СЃРѕРѕР±С‰РµРЅРёР№ С‡Р°С‚Р°
					Obj.oTemp.find(settings.messages + ' > [id^='+settings.prefix_message_id+']').each(function(){
						oMsg = Obj.oMessages.find('[id="' + $(this).attr('id') +'"]');
						if (oMsg.length == 1) oMsg.replaceWith($(this));
					});

					newMessages = Obj.oTemp.find(settings.messages + ' > [id^='+settings.prefix_message_id+']');
					if (newMessages.length) {
						if (data.preload){
							Obj.oMessages.prepend(newMessages);
							Obj._autoscroll = 0;
							Obj.oWindow.scrollTop(0);
						}
						else {
							Obj.oMessages.append(newMessages);
						}
						_recountChat();
					}
				},
				error : function (){return false}
			});
		}

		function _recountChat() {
			if (Obj.oWindow.height() > settings.chat_height) Obj.oWindow.height(settings.chat_height + 'px');
			if (Obj._autoscroll == 1) Obj.oWindow.scrollTop(Obj.oMessages.height() - settings.chat_height);
			if (Obj.oTemp.length) Obj._total = Obj.oTemp.find(settings.total).text();
			Obj._count_msg = Obj.oMessages.find('> *[id^='+settings.prefix_message_id+']').length;
			if (Obj._count_msg >= Obj._total && Obj.oLoad.is(':visible')) Obj.oLoad.toggle();
			Obj._activity = 0;
		}

		return this.ready(_start);
	};
})(jQuery);