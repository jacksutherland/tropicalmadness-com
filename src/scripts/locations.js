/************************************************************************************/
/***** MAPS AND LOCATIONS ***********************************************************/
/************************************************************************************/
/***** This JS file is not included in the bundle ***********************************/
/***** To use it please add /js/locations.min in a scripts tag in your template *****/
/************************************************************************************/

var locationspage = function(apiKey, rootUrl)
{
	ux.spa.init({
		template: "/locations/location-list",
		container: "#locations-ul",
		url: rootUrl,
		param: "region",
		changed: function(region)
		{
			document.getElementById("location-regions").value = region;
			document.getElementById("locations-radius").style.display = "none";
			document.getElementById("locations-address").value = "";
			locations.reload();
		}
	});

	locations.init(apiKey);

	document.getElementById("location-regions").addEventListener("change", function()
	{
		document.getElementById("locations-radius").style.display = "none";
		document.getElementById("locations-address").value = "";
		
		ux.spa.update("region", document.getElementById("location-regions").value, function()
		{
			locations.reload();
		});
	});

	document.getElementById("locations-radius").addEventListener("change", function()
	{
    	locations.changeRadius(parseInt(this.value), function(slugs, ary)
    	{
    		changeAddressAndRadius(slugs, ary);
    	});
    });

    document.getElementById("locations-address").addEventListener("change", function()
	{
    	document.getElementById("location-regions").value = "";
    	
    	var cityorpostalcode = this.value;

    	if(cityorpostalcode.trim() == "")
    	{
    		document.getElementById("locations-radius").style.display = "none";
    	}
    	else
    	{
    		document.querySelector("#locations-radius option[data-default]").setAttribute("selected", "selected");

    		document.getElementById("locations-radius").style.display = "inline-block";

    		locations.changeAddress(cityorpostalcode, parseInt(document.getElementById("locations-radius").value), function(slugs, ary)
    		{
    			changeAddressAndRadius(slugs, ary)
    		});
	    }
    });

    function changeAddressAndRadius(slugs, ary)
    {
    	ux.spa.resetUrl();
    	if(ary.length == 0)
    	{
    		ux.spa.clear();
    		document.getElementById("locations-radius").style.display = "none";
    	}
    	else
    	{
			ux.spa.update("slugs", slugs, function()
			{
				ary.forEach(function(aryVal, idx)
				{
					var zoom = document.querySelector('#locations-ul li[data-slug="' + aryVal.slug + '"] [data-zoom]');
					zoom.addEventListener("click", function(e)
					{
						e.preventDefault();
		        		locations.zoomIn(this.marker);
					}.bind({marker: aryVal.marker}));
				});
			}, true);
		}
    }
}


var locations = {
	inited: false,
	apiKey: null,
	map: null,
	geocoder: null,
	infoWindow: null,
	bounds: null,
	data: null,
	markers: [],
	address: "",
	elements: {
		attrselector: "",
		map: null,
		results: null
	},
	init: function(apiKey)
	{
		// Modify element selectors here
		locations.elements.attrselector = "[data-json]";
		locations.elements.map = document.getElementById("locations-map");
		locations.elements.results = document.getElementById("location-results");

		locations.apiKey = apiKey;

		// Asynchronously Load the map API 
	    var script = document.createElement('script');
	    script.src = "//maps.googleapis.com/maps/api/js?key=" + locations.apiKey + "&callback=locations.initMap";
	    document.body.appendChild(script);
	},
	reload: function()
	{
		var ary = [];
		var locs = document.querySelectorAll(locations.elements.attrselector);
		if(locs.length == 0)
		{
			locations.clearMap();
		}
		else
		{
			dom.each(locs, function()
			{
				var ele = this;
				var obj = JSON.parse(ele.dataset.json);
				obj.element = ele;
				ary.push(obj);
			});

			if(!locations.inited)
			{
				locations.inited = true;
				locations.data = ary; // locations.data is the master collection
			}
			var retAry = locations.loadMap(ary);
			retAry.forEach(function(val, idx)
			{
				val.element.querySelector("[data-zoom]").addEventListener("click", function(e)
				{
					e.preventDefault();
	        		locations.zoomIn(val.marker);
				});
			});
		}
	},
	zoomIn: function(marker)
	{
		locations.map.setZoom(15);
		locations.map.panTo(marker.position);
	},
	initMap: function()
	{
		var mapOptions = {
		    mapTypeId: 'roadmap',
		    minZoom: 2,
		    maxZoom: 15
		};

		locations.map = new google.maps.Map(locations.elements.map, mapOptions);
		locations.map.setTilt(45);
		locations.infoWindow = new google.maps.InfoWindow();
		locations.geocoder = new google.maps.Geocoder();

		locations.reload();
	},
	changeRadius: function(radius, returnFunc)
	{
		locations.changeAddress(locations.address, radius, function(slugs, ary)
		{
			if(typeof(returnFunc) == "function")
	    	{
	    		returnFunc(slugs, ary);
	    	}
		});
	},
	changeAddress: function(cityorpostalcode, radius, returnFunc)
	{
		locations.address = cityorpostalcode;

		locations.geocoder.geocode({address: locations.address}, function(results, status)
		{
			if(status == 'ZERO_RESULTS')
			{
				locations.clearMap();
				if(typeof(returnFunc) == "function")
		    	{
		    		returnFunc([], []);
		    	}
			}
			else if (status == google.maps.GeocoderStatus.OK)
			{
				var center = results[0].geometry.location;
				var addressLocations = [];
		    	var locCount = locations.data.length;
		    	var slugs = [];
		    	var retAry = [];

		    	locations.data.forEach(function(val, idx)
		    	{
		    		if(typeof(val.geometry) == 'object')
		    		{
			    		var lat = locations.degrees_to_radians(val.geometry.lat()); // Suspicious val.geometry.lat was a number, now it's a function!?!?
			    		var lng = locations.degrees_to_radians(val.geometry.lng());
			    		var clat = locations.degrees_to_radians(center.lat());
			    		var clng = locations.degrees_to_radians(center.lng());
			    		var distance = (3959 * Math.acos( Math.cos(clat) * Math.cos(lat) * Math.cos(lng - clng) + Math.sin(clat) * Math.sin(lat)));

			    		if(distance < radius)
			    		{
			    			//console.log('Loc: ');
			    			//console.log(val);
			    			addressLocations.push(val);
			    			slugs.push(val.slug);
			    		}
			    	}
			    		
		    		if (!--locCount)
		    		{
		    			retAry = locations.loadMap(addressLocations);
		    		}
		    	});

		    	if(typeof(returnFunc) == "function")
		    	{
		    		returnFunc(slugs, retAry);
		    	}
			}
			else
			{
				console.log("Geocoder Error: " + status);
				locations.clearMap();
			}
		});
	},
	loadMap: function(locData)
	{
		location.bounds = new google.maps.LatLngBounds();

		var locationDescription = "";

		if(locData.length > 0)
		{
			for (var i = 0; i < locData.length; i++)
			{
				if(locData[i].geometry == null)
				{
					setTimeout(locations.geocodeLocation.bind(null, locData[i], locData.length, i, function(status, idx, geo)
					{
						if(status === 'OK')
						{
							locData[idx].geometry = geo;
							locData[idx].marker = locations.addLocation(locData[idx], locData.length);
						}
					}), ((0 * i))); // waiting 350ms gives time to prevent Google OVER_QUERY_LIMIT error
				}
				else
				{
					locData[i].marker = locations.addLocation(locData[i], locData.length);
				}
			}
		}

		return locData;
	},
	degrees_to_radians: function(degrees)
	{
	  var pi = Math.PI;
	  return degrees * (pi/180);
	},
	geocodeLocation: function(data, locCount, idx, returnFunc)
	{
		if(data.mappableAddress.trim().length > 0)
		{	
			locations.geocoder.geocode({ 'address': data.mappableAddress }, function (georesults, status)
	        {
	            if (status === 'OK')
	            {
	                returnFunc(status, idx, georesults[0].geometry.location);
	            }
	            else
	            {
	                console.log('Geocode was not successful for the following reason: ' + status);
	                returnFunc(status, idx);
	            }
	        });
		}
		else
		{
			returnFunc("NO-ADDRESS", idx);
		}
	},
	clearMap: function()
	{
		for(i=0; i<locations.markers.length; i++)
		{
			locations.markers[i].setMap(null);
		}
		locations.markers = [];
		locations.map.setZoom(2);
	},
	addLocation: function(data, locCount)
	{
		// Create marker and add to map

		var marker = new google.maps.Marker({
            map: locations.map,
            position: data.geometry
        });

        var markHtml = "<a style='font-weight:700;margin:0 0 2px 0;' href='" + data.url + "'>" + data.name + "</a>";
        if (data.displayAddress != "")
        {
            markHtml += ("<br/>" + data.displayAddress.replace(/[~]/g, '<br>'));
        }

        google.maps.event.addListener(marker, 'click', function ()
        {
            locations.infoWindow.setContent(markHtml);
            locations.infoWindow.open(locations.map, marker);
        });

        locations.markers.push(marker);

        // Extend bounds of map

        location.bounds.extend(data.geometry);
        locations.map.fitBounds(location.bounds);

       return marker;
	}
}