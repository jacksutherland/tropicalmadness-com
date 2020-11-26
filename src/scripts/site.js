dom.onLoad(function()
{
	ux.init();

	// Hero Carousel Initialization

	var hc = document.getElementsByClassName("hero-carousel");
	if(hc.length > 0)
	{
		ux.carousel.init(parseInt(hc[0].dataset.delay));
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

				if (dom.body.scrollTop > 60 || doc.scrollTop > 60)
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







