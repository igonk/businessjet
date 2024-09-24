var $ = jQuery.noConflict();
jQuery(function () {
	isElementExist(".product-slider", initProductSlider);
	isElementExist(".card-slider", initCardSlider);
	isElementExist(".visual-slider", initVisualSlider);
	jcfInit();
});

jQuery(window).on("load", () => {
	initAOS();
	initMenu();
	initSearchForm();
});

function initMenu(){
	$('.menu__item').each(function () {
		if ($(this).find('.sub-menu').length) {
			$(this).addClass('has-submenu');
		}
	});

	$('.menu__link').on('click', function (e) {
		if ($(this).siblings('.sub-menu').length && !$(this).closest('.menu__item').hasClass('submenu-open')) {
			e.preventDefault();
			$(this).closest('.menu__item').addClass('submenu-open');
			$(this).closest('.menu__item').siblings('li.submenu-open').find('.menu__item.submenu-open').removeClass('submenu-open');
			$(this).closest('.menu__item').siblings('li.submenu-open').removeClass('submenu-open');
		}
	});

	$('.nav-opener').on('click', function(e) {
		e.preventDefault();
		$('body').toggleClass('nav-active');
	});
};

function initSearchForm() {
	$('.header-search .btn-search').on('click', function () {
		if (!$(this).closest('.header-search').hasClass('open')) {
			$(this).closest('.header-search').addClass('open');
			return false;
		} else if (!$(this).closest('.header-search').find('input.form-control').val().length) {
			$(this).closest('.header-search').removeClass('open');
			return false;
		}
	});

	$('.btn-cancel').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.header-search').removeClass('open');
		$(this).closest('.header-search').find('.form-control').val('');
	});
}

function initProductSlider() {
	$(".product-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: 'auto',
			spaceBetween: 18,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			  },
			navigation: {
				nextEl: $(self).closest('.slider-wrap').find(".slider-nav__next").get(0),
				prevEl: $(self).closest('.slider-wrap').find(".slider-nav__prev").get(0),
			},
			breakpoints: {
			  1024: {
				spaceBetween: 32,
			  },
			},
		});
	});
}

function initCardSlider() {
	$(".card-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: '1',
			spaceBetween: 1,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			  },
			navigation: {
				nextEl: $(self).closest('.slider-wrap').find(".slider-nav__next").get(0),
				prevEl: $(self).closest('.slider-wrap').find(".slider-nav__prev").get(0),
			},
			breakpoints: {
			  1024: {
				slidesPerView: '2',
				spaceBetween: 15,
			  },
			},
		});
	});
}

function initVisualSlider() {
	$(".visual-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: '1',
			spaceBetween: 10,
			navigation: {
				nextEl: $(self).closest('.slider-wrap').find(".slider-nav__next").get(0),
				prevEl: $(self).closest('.slider-wrap').find(".slider-nav__prev").get(0),
			},
			breakpoints: {
			  1024: {
				spaceBetween: 15,
				slidesPerView: '1.4',
			  },
			},
		});
	});
}

//-------- -------- -------- --------
//-------- js custom start
//-------- -------- -------- --------

// Helper if element exist then call function
function isElementExist(_el, _cb) {
	var elem = document.querySelector(_el);

	if (document.body.contains(elem)) {
		try {
			_cb();
		} catch (e) {
			console.log(e);
		}
	}
}

function initAOS() {
	// Documentation here: https://github.com/michalsnik/aos/tree/v2
	const CONFIG = {
		easing: "linear",
		offset: 0,
		duration: 800,
		once: true,
		disable: 'mobile',
	};

	let delayCounter = 0;
	const DELAY_STEP = 600; // can be any number (milliseconds)

	const $aosBlocks = $("[data-aos]");

	if (!$aosBlocks) return;

	const inViewportBlocks = $aosBlocks.filter((_, el) => isElemVisible(el));

	if (inViewportBlocks.length) {
		// Apply sequenced animation delay for all blocks in viewport on load
		inViewportBlocks.each((_, el) => {
			const delayInSeconds = delayCounter ? delayCounter / 1000 : 0;

			$(el).css("transition-delay", `${delayInSeconds}s`);

			delayCounter += DELAY_STEP;
		});
	}

	AOS.init(CONFIG);

	function isElemVisible(el) {
		const { top, bottom } = el.getBoundingClientRect();
		const vHeight = window.innerHeight || document.documentElement.clientHeight;

		return (top > 0 || bottom > 0) && top < vHeight;
	}
}

// initialize custom form elements (checkbox, radio, select) https://github.com/w3co/jcf
function jcfInit() {
	var customSelect = jQuery("select");
	var customCheckbox = jQuery('input[type="checkbox"]');
	var customRadio = jQuery('input[type="radio"]');

	customSelect.each(function () {
		$(this).find('option').first().addClass("placeholder")
	})

	// all option see https://github.com/w3co/jcf
	jcf.setOptions("Select", {
		wrapNative: false,
		wrapNativeOnMobile: false,
		fakeDropInBody: false,
		maxVisibleItems: 6,
	});

	jcf.setOptions("Checkbox", {});

	jcf.setOptions("Radio", {});

	// init only after option
	jcf.replace(customSelect);
	jcf.replace(customCheckbox);
	jcf.replace(customRadio);
}


//-------- -------- -------- --------
//-------- js custom end
//-------- -------- -------- --------

//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------


//-------- -------- -------- --------
//-------- included js libs end
//-------- -------- -------- --------