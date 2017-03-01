$(function(){

	var $w = $(window);
	var $d = $(document);
	var $body = $('body');
	var $p = $('p');

	$d.ready(function(){

		// Mobile Nav
		var nav = responsiveNav(".nav-collapse", {
			label: '<svg class="icon icon-menu"><use xlink:href="#icon-menu"></use></svg>'
				+ '<svg class="icon icon-close"><use xlink:href="#icon-close"></use></svg>',
		});

		// De-orphan
		$('.ultra, h2, h3, h4, h5, h6, p, .deorphan').deOrphan();

		switch ($body.data('layout')) {
			case "post":
				// Resize wide images
				_.delay(wideImageSetup, 300);
				$w.on('resize', _.debounce(wideImageResize, 300));
				// Carousel
				$('.unslider-instance').unslider({
					animation: 'fade',
					autoplay: true,
					nav: false,
					arrows: {
						//  Unslider default behaviour
						prev: '<a class="unslider-arrow prev"><span class="unslider-arrow-text">&larr;</span></a>',
						next: '<a class="unslider-arrow next"><span class="unslider-arrow-text">&rarr;</span></a>'
					}
				});
				// Graphiq Video Demo
				if ($('.demo-graphiq-video')) {
					var $slide = $('.slide');
					$('.btn').on('click', function(){
						var $this = $(this);
						if ($this.hasClass('selected')) return;
						$this.addClass('selected').siblings().removeClass('selected');
						$slide.removeClass().addClass('slide');
						var $selected = $('.selected').each(function(i, s){
							$slide.addClass($(s).data('class'));
						});
					});
				}
				break;
		}
	});

	function wideImageSetup() {

		var paddingTop = parseFloat($p.css('padding-top').slice(0, -2));

		$('table').each(function() {
			var $this = $(this).css('margin-top', paddingTop);
			$('<p></p>')
				.addClass('placeholder')
				.css('height', $this.outerHeight() + paddingTop)
				.insertAfter($this);
		});
	}

	function wideImageResize() {

		var paddingTop = parseFloat($p.css('padding-top').slice(0, -2));

		$('table').each(function() {
			var $this = $(this);
			$(this)
				.css('margin-top', paddingTop)
				.next()
				.css('height', $this.outerHeight() + paddingTop);
		});
	}

});