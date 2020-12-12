// dom is initialized at bottom of this script to new DOMClass();
// use dom.onLoad(function(){}); in place of jQuery ready function
var dom = null;

/********** ES6 CLASS FOR DOM EVENTS **********/

DOMClass = class
{
	// Public Members

	body;

	constructor ()
	{
		// Public Members

		this.body = document.getElementsByTagName("body")[0];

		this.addLoadEvents();
	}

	onLoad (callback) // This replaces jQuery ready function
	{
		if(this.isLoaded())
		{
			callback();
		}
		else
		{
			this.addCallback(callback);
		}
	}

	addLoadEvents ()
	{
		var callbacks = [];

		var isLoaded = false;

		var loaded = function()
		{
			isLoaded = true;
			callbacks.forEach(function(callback, idx)
			{
				callback();
			});
		}

		this.isLoaded = function()
		{
			return isLoaded;
		}

		this.addCallback = function(callback)
		{
			callbacks.push(callback);
		}

		// Execution Code

    	if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll))
		{
		  loaded();
		}
		else
		{
		  	document.addEventListener("DOMContentLoaded", function()
		  	{
		  		loaded();
		  	});
		}
	}

	getCollection (obj)
	{
		// if (obj == null) return false;
		// return typeof(obj[Symbol.iterator]) === 'function';

		// Makes sure elements are iterable

		return typeof(obj[Symbol.iterator]) === "function"
			? obj : [obj];
	}

	each (elements, callback)
	{
		elements = this.getCollection(elements);

		for(var i=0; i<elements.length; i++)
		{
			(callback.bind(elements[i]))();
		}
	}

	// bodyClickListener detects clicks on body element
	// elements passed in [excludes] array are ignored
	// body click event is added or removed when passed trigger element is clicked

	bodyClickListener (options)
	{
		var obj = this;

		var count = 0;

		var bodyClicked = function(e)
		{
			e.stopPropagation();

			obj.body.removeEventListener("click", bodyClicked);
			options.callback();
		}

		options.trigger.addEventListener("click", function(e)
		{
			e.preventDefault();
			e.stopPropagation();

			var listenOnBody = options.callback();

			if(listenOnBody)
			{
				obj.body.addEventListener("click", bodyClicked);
			}
			else
			{
				obj.body.removeEventListener("click", bodyClicked);
			}
		});

		if(options.hasOwnProperty("excludes"))
		{
			options.excludes.forEach(function(exclude, idx)
			{
				exclude.addEventListener("click", function(e)
				{
					e.stopPropagation();
				});
			});
		}
	}

	addEventListener (eventName, domObjects, callback)
	{
		domObjects = this.getCollection(domObjects);
		for(var i=0; i<domObjects.length; i++)
		{
			domObjects[i].addEventListener(eventName, function(e)
		  	{
		  		(callback.bind(this))(e);
		  	});
		}
	}

	closestParent (el, parentSelector)
	{
		for ( ; el && el !== document; el = el.parentNode )
		{
			if ( el.matches( parentSelector ) ) return el;
		}
		return null;
	}

	addClasses(elements, className)
	{
		elements = this.getCollection(elements);
		for(var i=0; i<elements.length; i++)
		{
			elements[i].classList.add(className);
		}
		return elements;
	}

	removeClasses(elements, className)
	{
		elements = this.getCollection(elements);
		for(var i=0; i<elements.length; i++)
		{
			elements[i].classList.remove(className);
		}
		return elements;
	}

	containsClasses(elements, className)
	{
		var containsIt = false;
		elements = this.getCollection(elements);
		for(var i=0; i<elements.length; i++)
		{
			if(elements[i].classList.contains(className))
			{
				containsIt = true;
			}
		}
		return containsIt;
	}

	get (url, callback)
	{
		var xhttp = new XMLHttpRequest();
	  	xhttp.onreadystatechange = function()
	  	{
		    if (this.readyState == 4 && this.status == 200)
		    {
				callback(this.responseText);
		    }
	  	};
	  	xhttp.open("GET", url, true);
	  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  	xhttp.send();
	}

	post (url, data, callbacks)
	{
		var xhttp = new XMLHttpRequest();
	  	xhttp.onreadystatechange = function()
	  	{
		    if (this.readyState == 4)
		    {
				if (this.status == 200)
			    {
					callbacks.success(this.responseText);
				}
				else
				{
					callbacks.error(this.responseText);
				}
			}
	  	};
	  	xhttp.open("POST", url, true);
	  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  	xhttp.send(data);
	}

	fadeIn (elements, callback = null, speed = 500, displayValue = "block")
	{
		// effect can be, fade or slide

		elements = this.getCollection(elements);

		for(var i=0; i<elements.length; i++)
		{

			elements[i].style.display = displayValue;
			elements[i].classList.remove("fade-out");
			elements[i].classList.add("fade-in");
			
			setTimeout(function()
			{
				this.el.style.display = displayValue;
				this.el.classList.remove("fade-in");
				if(this.islast && typeof(callback) == "function")
				{
					callback();
				}
			}.bind({el: elements[i], islast: (i == elements.length-1)}), speed);
		}
		return elements;
	}

	fadeOut (elements, callback = null, speed = 500)
	{
		// effect can be, fade or slide

		elements = this.getCollection(elements);

		for(var i=0; i<elements.length; i++)
		{
			elements[i].classList.remove("fade-in");
			elements[i].classList.add("fade-out");
			
			setTimeout(function()
			{
				this.el.style.display = "none";
				this.el.classList.remove("fade-out");
				if(this.islast && typeof(callback) == "function")
				{
					callback();
				}
			}.bind({el: elements[i], islast: (i == elements.length - 1)}), speed);
		}
		return elements;
	}

	// slideUp(elements)
	// {
	// 	elements = this.getCollection(elements);

 //  		for(var i=0; i<elements.length; i++)
	// 	{
	// 		var elem = elements[i];
	//   		elem.style.transition = "all 1s ease-in-out";
	//   		console.log("slideUp: " + elem.clientHeight + ", " + elem.style.height);
	//   		elem.originalHeight = elem.offsetHeight;
	//   		elem.style.height = "0px";
	//   	}
	// }

	// slideDown (elements)
	// {
	// 	elements = this.getCollection(elements);

 //  		for(var i=0; i<elements.length; i++)
	// 	{
	// 		var elem = elements[i];
	//   		elem.style.transition = "all 1s ease-in-out";
	//   		console.log("slideDown: " + elem.clientHeight + ", " + elem.style.height);
	//   		if(typeof(elem.originalHeight) == "undefined")
	//   		{
	//   			elem.originalHeight = elem.offsetHeight;
	//   		}
 //  			elem.style.height = elem.originalHeight + "px";
	//   	}
	// }

	
} // End DOMClass

dom = new DOMClass();
dom.onLoad(function()
{
	ux.init();

	// Hero Carousel Initialization

	var hc = document.getElementsByClassName("hero-carousel");
	if(hc.length > 0)
	{
		ux.carousel.init(parseInt(hc[0].dataset.delay));
	}

	// Animated Hero Text

	var heroText = document.getElementsByClassName("animated-hero-text");
	if(heroText.length > 0)
	{
		ux.hero.animateText(heroText[0]);
	}

	// Page Module Initialization

	ux.modules.init();

	// Search Initialization

	ux.search.init();

	// Hero Video Mobile Detect - Lazy Load

	// Define the video object this source is contained inside
	var video = document.querySelector('video#hero-vid');

	if(video != null)
	{
		var sources = video.querySelectorAll('video#hero-vid source');
		
		for(var i = 0; i<sources.length;i++)
		{
			sources[i].setAttribute('src', sources[i].getAttribute('data-src'));
		}
		if (!ux.breakpoint.isMobile())
		{
			video.load();
		}
	}

	// Map Module
	var maps = document.getElementsByClassName('embed-map');
	for(var i = 0; i < maps.length; i++)
	{
		console.log('map ' + i);
		var address = maps[i].dataset.address;
		console.log('address ' + address);
		maps[i].innerHTML = "<iframe width='100%' height='450' frameborder='0' scrolling='no' allowfullscreen='false' aria-hidden='true' tabindex='0' src='https://maps.google.com/maps?&amp;q="
			+ encodeURIComponent( address ) 
			+ "&amp;output=embed'></iframe>";  
	}

});

var ux = {

	/***** Initial function for global ux *****/

	init: function()
	{
		ux.header.init();
		ux.lists.init();
		ux.breakpoint.check();

		// Keep window resize scripts limited to this one event
		window.addEventListener("resize", function()
	    {
	    	ux.header.sticky();
	    	ux.breakpoint.check();
	    });
	},

	/***** Bootstrap Grid Breakpoint Functions *****/

	breakpoint: {
		size: "",
		callbacks: [],
		isMobile: function()
		{
			return (ux.breakpoint.size == "sm" || ux.breakpoint.size == "xs");
		},
		isTabletOrMobile: function()
		{
			return (ux.breakpoint.size == "md" || ux.breakpoint.size == "sm" || ux.breakpoint.size == "xs");
		},
		changed: function(callback)
		{
			ux.breakpoint.callbacks.push(callback);
		},
		check: function()
		{
			var windowWidth = window.innerWidth;
			var priorBreakpoint = ux.breakpoint.size;

			if (windowWidth >= 1300)
			{
			    ux.breakpoint.size = "xxl";
			}
			else if (windowWidth >= 1200)
			{
			    ux.breakpoint.size = "xl";
			}
			else if (windowWidth >= 992)
			{
			    ux.breakpoint.size = "lg";
			}
			else if (windowWidth >= 768)
			{
			    ux.breakpoint.size = "md";
			}
			else if (windowWidth >= 576)
			{
			    ux.breakpoint.size = "sm";
			}
			else
			{
				ux.breakpoint.size = "xs";
			}

			if(priorBreakpoint != ux.breakpoint.size)
			{
				for(var i = 0; i < ux.breakpoint.callbacks.length; i++)
				{
					ux.breakpoint.callbacks[i](ux.breakpoint.size);
				}
			}
		}
	},

	/***** Global UX header methods *****/

	header: {
		init: function()
		{
		    ux.header.sticky();
		    
			// MOBILE NAV
			dom.addEventListener("click", document.querySelectorAll('header .mobile-menu-trigger, header nav .menu-closed'), function(e)
			{
				dom.body.classList.toggle("overlay");
				var mainMenu = document.getElementById("main-menu");
				mainMenu.classList.toggle("mobile-nav");
				mainMenu.classList.toggle("open");
			});

			dom.addEventListener("click", document.querySelectorAll('nav li a .child-menu-trigger'), function(e)
			{
				e.preventDefault();
				dom.closestParent(this, "li").classList.toggle("active");
				dom.closestParent(this, "li").querySelector(".child-menu > ul").classList.toggle("active");
			});

			dom.addEventListener("click", document.querySelectorAll('nav li ul li a .grandchild-menu-trigger'), function(e)
			{
				e.preventDefault();
				dom.closestParent(this, "li").classList.toggle("active");
				dom.closestParent(this, "li").querySelector(".grandchild-menu > ul").classList.toggle("active");
			});
		},
		sticky: function()
		{
			var stickPos = ux.breakpoint.isTabletOrMobile() ? 120 : 177;
			var doc = document.documentElement;

			window.addEventListener("scroll", function()
			{
				if (dom.body.scrollTop > 0 || doc.scrollTop > 0)
				{
					dom.body.classList.add("scrolling");
				}
				else
				{
					dom.body.classList.remove("scrolling");
				}

				if (dom.body.scrollTop > stickPos || doc.scrollTop > stickPos)
				{
					dom.body.classList.add("sticky");
				}
				else
				{
					dom.body.classList.remove("sticky");
				}
			});
		}
	},

	hero: {
		animateText: function(textElement)
		{
			var intervalDuration = 12000;
			var arrayCount = 0;
			var textArray = textElement.dataset.array.replace(/[\[\]']+/g, '').split('~');
			var hero = document.getElementsByClassName('hero')[0];
			var heroTextInterval = 0;
			var video = hero.getElementsByTagName("video");

			if(video.length > 0)
			{
				video = video[0];				
			}
			else
			{
				video = null;
			}

			var changeText = function()
			{
				textElement.innerText = textArray[arrayCount++];
				textElement.classList.remove('hide');
				textElement.classList.add('show');
				setTimeout(function()
				{
					textElement.classList.remove('show');
					textElement.classList.add('hide');
				}, (intervalDuration / 2));
				if(arrayCount >= textArray.length)
				{
					arrayCount = 0;
				}
			}

			var observerFunction = function(entries)
			{
				if(entries[0].isIntersecting === true)
				{
					changeText();
					heroTextInterval = setInterval(changeText, intervalDuration);
					if(video != null)
					{
						video.play();
					}
				}
				else
				{
					textElement.classList.remove('show');
					textElement.classList.add('hide');
					if(video != null)
					{
						video.pause();
						video.currentTime = 0;
						arrayCount = 0;
					}
					clearInterval(heroTextInterval);
				}
			}

			var io = new IntersectionObserver(observerFunction, { threshold: [0] });

			if(video != null)
			{
				video.addEventListener("loadeddata", function()
				{
					intervalDuration = Math.round(video.duration / textArray.length) * 1000;
					if(intervalDuration < 8000)
					{
						intervalDuration = 10000;
					}
					io.observe(hero);
				});
			}
			else
			{
				io.observe(hero);
			}
		}
	},

	carousel: {
		delay: 1,
		timeout: 0,
		init: function(delay)
		{
			if(typeof(delay) == "number")
			{
				ux.carousel.delay = delay * 1000;
			}

			var carouselDots = document.querySelectorAll(".carousel-nav a");
			dom.addEventListener("click", carouselDots, function(e)
			{
				e.preventDefault();
				ux.carousel.change(this);
			});

			ux.carousel.timeout = setTimeout(function()
			{
				requestAnimationFrame(ux.carousel.next);
			}, ux.carousel.delay);
		},
		next: function()
		{
			var a = document.querySelectorAll(".carousel-nav a.selected")[0];
			var next = a.nextElementSibling;
			if(next == null)
			{
				next = a.parentElement.children[0];
			}
			ux.carousel.change(next);
		},
		change: function(a)
		{
			if(!a.classList.contains("selected"))
			{
				clearTimeout(ux.carousel.timeout);

				var parentCarousel = dom.closestParent(a, ".hero-carousel");
				var sel = parentCarousel.querySelector(".slide.selected");
				var dft = parentCarousel.querySelector(".slide.default");
				if(sel != null) sel.classList.remove("selected");
				if(dft != null) dft.classList.remove("default");

				document.getElementById(a.getAttribute("href")).classList.add("selected");

				dom.removeClasses(a.parentElement.children, "selected");
				a.classList.add("selected");

				ux.carousel.timeout = setTimeout(function()
				{
					//ux.carousel.next();
					requestAnimationFrame(ux.carousel.next);
				}, ux.carousel.delay);
			}
		}
	},

	/***** Global list methods *****/

	lists: {
		init: function()
		{
			ux.lists.accordion();

			var lazyLists = document.querySelectorAll("[data-lazyload]");
			for(var i=0; i<lazyLists.length; i++)
			{
				new ux.lists.lazyload(lazyLists[i]);
			}
		},
		accordion: function()
		{
			// ACCORDION
			var triggers = document.getElementsByClassName("accordion-trigger");
			var panes = document.getElementsByClassName("accordion-info");
			dom.addEventListener("click", triggers, function(e)
			{
				e.preventDefault();
				if(!this.classList.contains('active'))
				{
					dom.removeClasses(triggers, "active");
					this.classList.add("active");
		      	}
		      	else
		      	{
		        	dom.removeClasses(triggers, "active");
		      	}
			});
		},
		lazyload: function(list)
		{
			var pageCount = 0;
			var delay = 200;
			var loadTypes = {
				scroll: "infinite-scrolling",
				button: "load-more-button"
			}

			var contentUrl = list.dataset.content;
			var checkUrl = list.dataset.check;
			var section = list.dataset.section;
			var template = list.dataset.template;
			var relation = list.dataset.relation;

			var loadmore = list.nextElementSibling;
			var spinner = document.createElement("div");
			spinner.classList.add("spinner");

			var loadType = loadmore.classList.contains("lazyload-loadmore") ? loadTypes.button : loadTypes.scroll;

			// If no load more button exists, use infinite scrolling
			if(loadType == loadTypes.scroll)
			{
				var observer = new IntersectionObserver(function(entries)
				{
					if(entries[0].isIntersecting === true)
					{
						loadmore.innerHTML = spinner.outerHTML;
						observer.unobserve(loadmore);

						getMoreContent(function()
						{
							loadmore.innerHTML = '';
						});
					}
				}, { threshold: [1] });
			}
			else
			{
				var loadmorelink = loadmore.getElementsByTagName("a")[0];
				loadmorelink.addEventListener("click", function(e)
				{
					e.preventDefault();

					loadmorelink.style.display = "none";
					loadmore.append(spinner);

					getMoreContent(function()
					{
						loadmore.removeChild(spinner);
					});
				});
			}

			var getMoreContent = function(returnFunc)
			{
				setTimeout(function()
				{
					var getUrl = contentUrl + "?section=" + section + "&template=" + template + "&page=" + (++pageCount) + "&relation=" + relation;
					dom.get(getUrl, function(response)
				  	{
						returnFunc();
    					list.innerHTML = list.innerHTML + response;
    					checkForMoreContent();
				  	});

				}, delay);
			}

			var checkForMoreContent = function()
			{
				var getUrl = checkUrl + "?section=" + section + "&page=" + (pageCount + 1) + "&relation=" + relation;
				dom.get(getUrl, function(response)
			  	{
					if(response.trim() == "1")
					{
    					if(loadType == loadTypes.scroll)
    						observer.observe(loadmore);
    					else
    						loadmorelink.style.display = "inline-block";
    				}
			  	});
			}

			checkForMoreContent();
		}
	},

	/***** Predictive Search *****/

	search: {
		input: null,
		results: null,
		menu: null,
		form: null,
		predict: true,
		init: function()
		{
			ux.search.menu = document.getElementsByClassName('predictive-search')[0];
			ux.search.form = ux.search.menu.getElementsByTagName('form')[0];
			ux.search.input = ux.search.menu.getElementsByTagName('input')[0];
			ux.search.results = ux.search.menu.getElementsByClassName('predictive-results')[0];

			var searchBtn = ux.search.menu.getElementsByTagName('a')[0];

			dom.bodyClickListener({
				trigger: searchBtn, 
				excludes: [ux.search.input],
				callback: function()
				{
					if(!ux.search.menu.classList.toggle('open'))
					{
						ux.search.results.innerHTML = "";
						return false;
					}
					return true;
				}
			});

			ux.search.form.onsubmit = function()
			{
				// don't submit empty value
				if(ux.search.input.value.trim().length == 0) return false;

				// form is being submitted, so prevent predictive results
				ux.search.predict = false;
			}

			ux.search.input.onkeyup = function()
			{
				var query = this.value.trim();
				ux.search.predictive(query);
			}

			ux.search.input.onfocus = function()
			{
				var query = this.value.trim();
				ux.search.predictive(query);
			}
		},
		predictive: function(query)
		{
			if(!ux.search.predict) return false;

			if(query.length < 3)
			{
				ux.search.results.innerHTML = "";
				return false;
			}

			var loadResults = function(results)
			{
				// ux.search.results.innerHTML = results;
			}

			setTimeout(function()
			{
				// If search value hasn't changed, get results

				if(ux.search.input.value.trim() == this.q1)
				{
					var getUrl = "/search/predictive-results?q=" + this.q1;

					dom.get(getUrl, function(response)
					{
						if(!ux.search.predict) return false;

						if(ux.search.input.value.trim() == this.q2)
						{
							//this.loadResults(response);
							ux.search.results.innerHTML = response;
						}
					}.bind({ q2: this.q1, loadResults: loadResults }));
				}
			}.bind({ q1: query, loadResults: loadResults }), 0);
		}
	},

	/***** Page Modules *****/

	modules: {
		init: function(mods)
		{
			var videoMods = document.querySelectorAll(".module.videos");
			if(videoMods.length > 0)
			{
				ux.modules.videos.init(videoMods);
			}
		},
		videos: {
			init: function(videoModules)
			{
				var tag = document.createElement('script');
	    		tag.src = "https://www.youtube.com/iframe_api";

	    		var firstScriptTag = document.getElementsByTagName('script')[0];
	    		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	    		window.onYouTubeIframeAPIReady = function()
			    {
			    	dom.each(videoModules, function()
			    	{
						new ux.modules.videos.createPlayer(this);
			    	});
			    }
			},
			createPlayer: function(videoModule)
			{
				var thumbnails = videoModule.getElementsByClassName("video-thumbnail");
				var videoPlayer = videoModule.getElementsByClassName("video-player")[0];
				var cover = videoPlayer.getElementsByClassName("video-cover")[0];
				var videoTarget = null;
				var videoPlayerId = videoPlayer.dataset.id;
				var videoUrl = videoPlayer.dataset.url;
				var videoId = ux.modules.videos.getIdFromUrl(videoUrl);

				var video = new YT.Player("video-" + videoPlayerId, {
		          videoId: videoId,
		          playerVars: { 'rel' : 0 },
		          events: {
		            'onReady': function(e)
		            {
		                videoTarget = e.target;
		            },
		            'onStateChange': function(e)
		            {
		                if (e.data == YT.PlayerState.ENDED)
		                {
		                	//cover.fadeIn(300);
		                	dom.fadeIn(cover);
		                }
		            }
		          }
		        });

		        cover.addEventListener("click", function(e)
		        {
		        	e.preventDefault();

		        	if(videoTarget !== null)
		            {
		            	dom.fadeOut(cover, function()
			        	{
			        		videoTarget.playVideo();
			        	});
		            }
		        });

		        dom.addEventListener ("click", thumbnails, function(e)
		        {
		        	e.preventDefault();

		        	var thumbnail = this;
		        	var activeId = 0;

		        	for(var i=0; i<thumbnails.length; i++)
		        	{
		        		if(thumbnails[i].classList.contains("active"))
		        		{
		        			activeId = thumbnails[i].id;
		        		}
		        	}

		        	// Don't reload a video already loaded

		        	if(activeId == thumbnail.id)
		        	{
		        		return false;
		        	}

		        	// Switch active class on new and prior thumbnails

		        	dom.removeClasses(thumbnails, "active");
		        	thumbnail.classList.add("active");
		        	
		        	// Get video info

		        	var newVideoTitle = thumbnail.dataset.title;
		        	var newVideoImage = thumbnail.dataset.image;
		        	var newVideoUrl = thumbnail.dataset.url;
					var newVideoId = ux.modules.videos.getIdFromUrl(newVideoUrl);
					
					// Change video info, fade in cover and cue new video

					cover.getElementsByClassName("video-title")[0].innerText = newVideoTitle;
					cover.style.backgroundImage = newVideoImage == "" ? "" : "url('" + newVideoImage + "')";
					videoTarget.stopVideo();
		        	cover.style.display = "block";
		        	videoTarget.cueVideoById(newVideoId, 0);
		        });
			},
			getIdFromUrl: function(url)
			{
				var videoId = url.indexOf("v=") > -1 ? url.split("v=")[1] : url.split("youtu.be/")[1];

		        if(typeof(videoId) != "undefined" &&  videoId.indexOf("&") > -1)
		        {
		        	videoId = videoId.substring(0, ampersandPos);
				}

				return typeof(videoId) == "undefined" ? "" : videoId;
			}
		}
	},

	/***** Single Page App methods *****/

	spa: {
		template: "",
		container: "",
		url: "",
		changed: null,
		isAtRoot: true,
		init: function(obj)
		{
			ux.spa.template = obj.template;
			ux.spa.container = obj.container;
			ux.spa.url = obj.url;
			ux.spa.param = obj.param;
			ux.spa.changed = obj.changed;
			window.onpopstate = function(event)
			{
				if(ux.spa.hasHistory())
				{
					// var obj = JSON.parse('{"' + event.state.param + '":"' + event.state.val + '"}');
					var val = event.state.val;
					var getUrl = ux.spa.template + "?" + event.state.param + "=" + event.state.val;
				}
				else
				{
					// var obj = {};
					var val = "";
					var getUrl = ux.spa.template;
				}
		  		
	  			dom.get(getUrl, function(response)
				{
					document.querySelector(ux.spa.container).innerHTML = response;
					if(typeof(ux.spa.changed) == "function")
					{
						ux.spa.changed(val);
			  		}
				});

			}
		},
		hasHistory: function()
		{
			return !(event.state == null || event.state.param == null || event.state.val == null);
		},
		resetUrl: function()
		{
			if(!ux.spa.isAtRoot)
			{
				ux.spa.isAtRoot = true;

				window.history.pushState(null, null, ux.spa.url);
			}
		},
		clear: function()
		{
			document.querySelector(ux.spa.container).innerHTML = "";
		},
		update: function(param, val, returnFunc, skipHistory)
		{
			var obj = JSON.parse('{"' + param + '":"' + val + '"}');
			var getUrl = ux.spa.template + "?" + param + "=" + val;

			dom.get(getUrl, function(response)
			{
				if(typeof(skipHistory) == "undefined" || !skipHistory)
				{
					ux.spa.isAtRoot = false;
					var url = val == "" ? ux.spa.url : ux.spa.url + param + "/" + val;
					window.history.pushState({ param: param, val: val }, null, url);
				}

				document.querySelector(ux.spa.container).innerHTML = response;

				if(typeof(returnFunc) == "function")
				{
					returnFunc();
				}
			});
		}
	},

	/***** Image Viewer *****/

	imageviewer: {
		imageId: null,
		zoomId: null,
		zoomInited: false,
		zoomer: null,
		init: function()
		{
			if(ux.imageviewer.imageId != null && ux.imageviewer.zoomId != null)
			{
				ux.imageviewer.zoomInited = true;
				
				ux.imageviewer.zoomer = new ux.imageviewer.imagezoom(ux.imageviewer.imageId, ux.imageviewer.zoomId);

				ux.breakpoint.changed(function(size)
				{
					if(size != "xs" && size != "sm")
					{
						ux.imageviewer.zoomer.resize();
					}

				});
			}

			ux.imageviewer.thumbnails();
		},
		thumbnails: function()
		{
			var img = document.getElementById(ux.imageviewer.imageId);

			if(ux.imageviewer.zoomer != null)
			{
				if(img.complete)
				{
					ux.imageviewer.zoomer.resize();
				}

				img.onload = function()
				{
					ux.imageviewer.zoomer.resize();
				};
			}

			var thumbnails = document.querySelectorAll(".image-thumbnails li");
			dom.addEventListener("click", thumbnails, function(e)
			{
				e.preventDefault();

				var thumb = this;

				if(!thumb.classList.contains("active"))
				{
					dom.removeClasses(thumbnails, "active");
					thumb.classList.add("active");

					//img.style.display = "none";
					img.src = thumb.dataset.image;
					//dom.fadeIn(img);
				}
			});
		},
		imagezoom: function(imgId, zoomId)
		{
			var img, lens, zoom, cx, cy;

			this.resize = function()
			{
				/* Calculate the ratio between result DIV and lens: */
				cx = zoom.offsetWidth / lens.offsetWidth;
				cy = zoom.offsetHeight / lens.offsetHeight;

				/* Set background properties for the result DIV */
				zoom.style.backgroundImage = "url('" + img.src + "')";
				zoom.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
			}

			function getCursorPos(e)
			{
				var a, x = 0, y = 0;
				e = e || window.event;

				/* Get the x and y positions of the image: */
				a = img.getBoundingClientRect();

				/* Calculate the cursor's x and y coordinates, relative to the image: */
				x = e.pageX - a.left;
				y = e.pageY - a.top;

				/* Consider any page scrolling: */
				x = x - window.pageXOffset;
				y = y - window.pageYOffset;

				return {x : x, y : y};
			}

			function moveLens(e)
			{
				var pos, x, y;
				/* Prevent any other actions that may occur when moving over the image */
				e.preventDefault();

				/* Get the cursor's x and y positions: */
				pos = getCursorPos(e);

				/* Calculate the position of the lens: */
				x = pos.x - (lens.offsetWidth / 2);
				y = pos.y - (lens.offsetHeight / 2);

				/* Prevent the lens from being positioned outside the image: */
				if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
				if (x < 0) {x = 0;}
				if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
				if (y < 0) {y = 0;}

				/* Set the position of the lens: */
				lens.style.left = x + "px";
				lens.style.top = y + "px";

				/* Display what the lens "sees": */
				zoom.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
			}

			img = document.getElementById(imgId);
			zoom = document.getElementById(zoomId);

			/* Create lens: */
			lens = document.createElement("DIV");
			lens.setAttribute("class", "image-zoom-lens");

			/* Insert lens: */
			img.parentElement.append(lens);

			//this.resize(); // not needed because this is called in the image onload function

			/* Execute a function when someone moves the cursor over the image, or the lens: */
			lens.addEventListener("mousemove", moveLens);
			img.addEventListener("mousemove", moveLens);

			/* And also for touch screens: */
			lens.addEventListener("touchmove", moveLens);
			img.addEventListener("touchmove", moveLens);
		}
	},


	popup: function(myURL, title, myWidth, myHeight) {
        var left = (screen.width - myWidth) / 2;
        var top = (screen.height / 2) - (myHeight / 2);
        window.open(myURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + myWidth + ', height=' + myHeight + ', top=' + top + ', left=' + left);

	}
}








dom.onLoad(function()
{
	ux.forms.init();
});

if(typeof(ux) != "object")
{
	ux = {};
}

ux.forms = 
{
	formAry: [],

	init: function()
	{
		dom.each(document.getElementsByClassName("form"), function()
		{
			ux.forms.formAry.push(new ux.forms.Form(this));
		});
	},

	serialize: function(frm)
	{
		// Setup our serialized data
		var serialized = [];

		// Loop through each field in the form
		for (var i = 0; i < frm.elements.length; i++)
		{
			var field = frm.elements[i];

			// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
			if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

			// If a multi-select, get all selections
			if (field.type === 'select-multiple')
			{
				for (var n = 0; n < field.options.length; n++)
				{
					if (!field.options[n].selected) continue;
					serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
				}
			}
			// Convert field data to a query string
			else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked)
			{
				serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
			}
		}

		return serialized.join('&');
	},

	Form: class
	{
		constructor (frm)
		{
			var requiredInputs = frm.querySelectorAll('[data-validation="required"]');

			dom.each(requiredInputs, function()
			{
				var name = this.getAttribute("name");
				var label = frm.querySelector('label[for="' + name + '"]');
				label.setAttribute("title", "Required");
				label.innerText = label.innerText + " *";
			});

			dom.addEventListener("change", requiredInputs, function()
			{
				if(this.value.trim().length > 0)
				{
					this.classList.remove("error");
				}
			});

			if(frm.dataset.submit == "ajax")
			{
				this.addAjaxEvents();
			}
		}

		addAjaxEvents(frm)
		{
			frm.addEventListener("submit", function(e)
			{
				e.preventDefault();

				var isValid = true;

				// Advanced honeypot spam protection

				var honeypotVal = Math.floor(Math.random()*(9999-9)+9);
				var honeypot = frm.querySelector('input[name="h0n3yp0t"]');
				if(honeypot != null)
				{
					honeypot.value = honeypotVal;
				}
				else
				{
					var hp1 = document.createElement("input");
					hp1.setAttribute("name", "h0n3yp0t");
					hp1.setAttribute("type", "hidden");
					hp1.value = honeypotVal;
					frm.prepend(hp1);
				}

				var hp2 = document.createElement("input");
				hp2.setAttribute("name", "h0n3y" + honeypotVal);
				hp2.setAttribute("type", "hidden");
				hp2.value = honeypotVal;
				frm.prepend(hp2);

				// Validate required inputs

				dom.each(requiredInputs, function()
				{
					var inp = this;
					if(inp.value.trim().length == 0)
					{
						isValid = false;
						inp.classList.add("error");
					}
				});

				// Post form

				var serializedData = ux.forms.serialize(frm);

				if(isValid)
				{
					dom.post(frm.getAttribute("action"), serializedData, {
						success: function(response)
						{
							response = JSON.parse(response);
							if (response.status == 'success')
							{
								if (frm.hasAttribute("data-messageurl"))
								{
				    				window.location.href = frm.dataset.messageurl;
								}
								else
								{
									frm.style.display = "none";
									document.querySelector(frm.dataset.message).style.display = "block";
								}
							}
							else if (response.status == 'error' && data.errors)
							{
								console.log("Form Error");
							}
						},
						error: function(response)
						{
							console.log("Form Error");
						}
					});
				}

				return false;
			});
		}
	}
}