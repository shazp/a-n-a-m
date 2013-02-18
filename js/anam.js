$(document).ready(function() { 

	$('.iconHolder').hover(function(){
		$(this).css('opacity',.9)
	});

	$('.iconHolder').click(function(){

		var $icon_holder = $('.iconHolder'),
		$reveal_items = $('.reveal'),
		move_icon = function(){
			return $.Deferred(
				function(dfd){

					if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
						$icon_holder.stop().animate({left:25,top:2},'fast',dfd.resolve);
					}
					else {$icon_holder.stop().transition({left:25,top:2},1200,dfd.resolve);
					}

				}
				).promise();
		},
		reveal_content = function(){
			return $.Deferred(function(dfd){
				$reveal_items.slideToggle(1500,dfd.resolve);
			}).promise();
		};
		$.when(move_icon()).done(function(){
			reveal_content();
		});
			$('.navi').animate({opacity:'fadeIn'},2000);	

		});
		
		$("img.a").hover(function() {
							$(this).stop().animate({"opacity": "0"}, "slow");
							}, function() {
								$(this).stop().animate({"opacity": "1"}, "slow");
							});

		$("#navi a").bind("click",function(event){ 
			event.preventDefault(); 
			var target = $(this).attr("href"); 		
			$.scrollTo({ top:$(target).offset().top, left: $(target).offset().left }, 1800); 

			if (target=="#cv"){
				
				$(function() {
					var $cv_background	= $('#cv_background'),
					$cv_bgimage		= $cv_background.find('.cv_bgimage'),				
					$cv_content		= $('#cv_content'),
					$title			= $cv_content.find('#title'),
					$menu			= $cv_content.find('.cv_menu'),
					$mainNav		= $menu.find('ul:first'),
					$menuItems		= $mainNav.children('div.cv_menu li'),
					totalItems		= $menuItems.length,
					$ItemImages		= new Array();				
					$ItemImages.push($cv_bgimage.attr('src'));
						  				
					var Menu = (function(){
						var init = function() {
							loadPage();
							initWindowEvent();
						},
						loadPage = function() {

									$.when(slideOutMenu()).done(function(){
											$.when(toggleMenuItems('up')).done(function(){
											initEventsSubMenu();
										});
									});
						},

						slideOutMenu = function() {
							var new_w	= $(window).width() -  200; 
							return $.Deferred(
							function(dfd) {
								$menu.stop().animate({
									width	: new_w + 'px'
								}, 700, dfd.resolve);
							}
						).promise();
						},
							toggleMenuItems = function(dir) {
							return $.Deferred(
							function(dfd) {
								
								$menuItems.each(function(i) {
											var $el_title	= $(this).children('a:first'),
												marginTop, opacity, easing;
											if(dir === 'up'){
												marginTop	= '0px';
												opacity		= 1;
												easing		= 'easeOutBack';
											}
											else if(dir === 'down'){
												marginTop	= '60px';
												opacity		= 0;
												easing		= 'easeInBack';
							}
									$el_title.stop()
									.animate({
														marginTop	: marginTop,
														opacity		: opacity
													 }, 200 + i * 200 , easing, function(){
										if(i === totalItems - 1)
											dfd.resolve();
									});
								});
							}
						).promise();
						},
						initEventsSubMenu = function() {
							$menuItems.each(function(i) {
								var $item = $(this), 
								$el_title	= $item.children('a:first'),
								el_image	= $el_title.attr('href'),
								$sub_menu	= $item.find('.cv_subitem'),
								$cv_close	= $sub_menu.find('.cv_close');
								
								$el_title.bind('click.Menu', function(e) {
										$.when(toggleMenuItems('down')).done(function(){
										openSubMenu($item, $sub_menu, el_image);
									});
									return false;
								});
								$cv_close.bind('click.Menu', function(e) {
									closeSubMenu($sub_menu);
									return false;
								});
							});
						},
						openSubMenu	= function($item, $sub_menu, el_image) {
							$sub_menu.stop()
							.animate({
								height		: '400px',
								marginTop	: '-200px'
							}, 400);
						},
			
						closeSubMenu = function($sub_menu) {
							$sub_menu.stop()
							.animate({
								height		: '0px',
								marginTop	: '0px'
							}, 400, function() {
											toggleMenuItems('up');
							});
						},
							
						initWindowEvent	= function() {
							$(window).bind('resize.Menu' , function(e) {
								
								var new_w	= $(window).width() - $title.outerWidth(true);
								$menu.css('width', new_w + 'px');
							});
						}				
						return {
							init : init
						};
					})();

					setTimeout(	Menu.init , 2000);
				});			
			}
	}); 
}); // close ducument.ready


