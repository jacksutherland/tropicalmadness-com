/**
 * Craft CMS 3.x Plugin
 *
 * Crafted Agency's plugin for base website design properties.
 *
 * @link      craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

/********** SITE NAMESPACE **********/

// // All JS should reside in the site object namespace to enforce encapsulation

// var site = {

// 	dom: null,

// 	init: function()
// 	{
// 		site.dom = new site.DOMClass();
// 	}

// }


// /********** SITE ES6 CLASSES **********/

// site.DOMClass = class
// {
// 	// Public Members

// 	body;

// 	constructor ()
// 	{
// 		// Public Members

// 		this.body = document.getElementsByTagName("body")[0];

// 		this.addBodyEvents();

// 		this.addLoadEvents();
// 	}

// 	onLoad (callback)
// 	{
// 		if(this.isLoaded())
// 		{
// 			callback();
// 		}
// 		else
// 		{
// 			this.addCallback(callback);
// 		}
// 	}

// 	addLoadEvents ()
// 	{
// 		var callbacks = [];

// 		var isLoaded = false;

// 		var loaded = function()
// 		{
// 			isLoaded = true;
// 			callbacks.forEach(function(callback, idx)
// 			{
// 				callback();
// 			});
// 		}

// 		this.isLoaded = function()
// 		{
// 			return isLoaded;
// 		}

// 		this.addCallback = function(callback)
// 		{
// 			callbacks.push(callback);
// 		}

// 		// Execution Code

//     	if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll))
// 		{
// 		  loaded();
// 		}
// 		else
// 		{
// 		  	document.addEventListener("DOMContentLoaded", function()
// 		  	{
// 		  		loaded();
// 		  	});
// 		}
// 	}

// 	addBodyEvents ()
// 	{
// 		this.bodyClickListener = function(options)
// 		{
// 			var obj = this;

// 			var bodyClicked = function(e)
// 			{
// 				e.stopPropagation();

// 				obj.body.removeEventListener("click", bodyClicked);
// 				options.callback();
// 			}

// 			options.trigger.addEventListener("click", function(e)
// 			{
// 				e.stopPropagation();

// 				var listenOnBody = options.callback();
// 				if(listenOnBody)
// 				{
// 					obj.body.addEventListener("click", bodyClicked);
// 				}
// 				else
// 				{
// 					obj.body.removeEventListener("click", bodyClicked);
// 				}
// 			});

// 			if(options.hasOwnProperty("excludes"))
// 			{
// 				options.excludes.forEach(function(exclude, idx)
// 				{
// 					exclude.addEventListener("click", function(e)
// 					{
// 						e.stopPropagation();
// 					});
// 				});
// 			}
// 		}
// 	}
	
// } // End DOMClass


// /********** SITE INITIALIZATION **********/

// site.init();
