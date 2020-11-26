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