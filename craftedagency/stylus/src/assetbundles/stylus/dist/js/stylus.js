/**
 * Craft CMS 3.x Plugin
 *
 * Crafted Agencys Custom Zoom API plugin for video conferencing integration
 *
 * @link      craftedagency.com
 * @copyright Copyright (c) 2020 Crafted Agency
 */

var CraftedStylus = function()
{
	var LETTERSPACINGNORMAL = -17;
	var LINEHEIGHTNORMAL = 7;

	var elements = {
		sampleHeader: document.getElementById('sampleHeader'),
		sampleParagraph: document.getElementById('sampleParagraph'),
		baseFontSize: document.getElementById('baseFontSize'),
		sliders: document.getElementsByClassName('slider-input')
	};

	var baseFontSize = elements.baseFontSize.value;

	function init()
	{
		addListeners();
	}

	function addListeners()
	{
		// Peek-a-boo Accordion

		var peekaboosTriggers = document.querySelectorAll('[data-peekaboo]');
		for(var i = 0; i < peekaboosTriggers.length; i++)
		{
			peekaboosTriggers[i].peekaboo = document.getElementById(peekaboosTriggers[i].dataset.peekaboo);
			peekaboosTriggers[i].addEventListener('click', function()
			{
				var openMe = !this.peekaboo.classList.contains('iseeyou');
				var openPeekaboos = document.querySelectorAll('.peekaboo.iseeyou');
				for(var ii = 0; ii < openPeekaboos.length; ii++)
				{
					openPeekaboos[ii].classList.remove('iseeyou');
				}
				if(openMe)
				{
					this.peekaboo.classList.add('iseeyou');
				}
				else
				{
					this.peekaboo.classList.remove('iseeyou');
				}
			});
		}

		// Sample Text Change

		elements.sampleHeader.addEventListener("keyup", function()
		{
			var samples = document.getElementsByClassName('sample-header');
			for(var i = 0; i < samples.length; i++)
			{
				samples[i].innerText = elements.sampleHeader.value;
			}
		});

		elements.sampleParagraph.addEventListener("keyup", function()
		{
			var samples = document.getElementsByClassName('sample-paragraph');
			for(var i = 0; i < samples.length; i++)
			{
				samples[i].innerText = elements.sampleParagraph.value;
			}
		});

		// Base Font Size Change

		elements.baseFontSize.addEventListener("change", function()
		{
			var newFontSize = this.value;

			for(var i = 0; i < elements.sliders.length; i++)
			{
				var sliderInput = elements.sliders[i].getElementsByTagName('input')[0];
				var sliderType = sliderInput.dataset.slider;
				if(sliderType == 'font-size' || (sliderType == 'line-height' && sliderInput.value > LINEHEIGHTNORMAL) || (sliderType == 'letter-spacing' && sliderInput.value > LETTERSPACINGNORMAL))
				{
					var remVal = sliderInput.value / baseFontSize;
					sliderInput.value = newFontSize * remVal;
					sliderInput.oninput();
				}
			}

			baseFontSize = newFontSize;
		});

		// Font Size Sliders Change

		for(var i = 0; i < elements.sliders.length; i++)
		{
			var sliderInput = elements.sliders[i].getElementsByTagName('input')[0];
			sliderInput.displayElement = elements.sliders[i].getElementsByTagName('span')[0];
			sliderInput.sampleElement = document.getElementById(sliderInput.dataset.sample);
			updateSlider(sliderInput);
			sliderInput.oninput = function()
			{
				updateSlider(this);
			}
		}
	}

	function updateSlider(slider)
	{
		switch(slider.dataset.slider)
		{
			case 'font-size':
				slider.displayElement.innerText = getFontDisplaySize(slider.value);
				slider.sampleElement.style.fontSize = (slider.value + 'px');
				break;
			case 'font-weight':
				slider.displayElement.innerText = getFontDisplayWeight(slider.value);
				slider.sampleElement.style.fontWeight = slider.value;
				break;
			case 'line-height':
				if(slider.value == LINEHEIGHTNORMAL)
				{
					slider.displayElement.innerText = 'normal';
					slider.sampleElement.style.lineHeight = 'normal';
				}
				else
				{
					slider.displayElement.innerText = getFontDisplaySize(slider.value);
					slider.sampleElement.style.lineHeight = (slider.value + 'px');
				}
				break;
			case 'letter-spacing':
				if(slider.value == LETTERSPACINGNORMAL)
				{
					slider.displayElement.innerText = 'normal';
					slider.sampleElement.style.letterSpacing = 'normal';
				}
				else
				{
					slider.displayElement.innerText = getFontDisplaySize(slider.value);
					slider.sampleElement.style.letterSpacing = (slider.value + 'px');
				}
				break;
		}
	}

	function getFontDisplayWeight(weightVal)
	{
		if(weightVal < 400)
		{
			return weightVal + ' (light)';
		}
		else if(weightVal > 500)
		{
			return weightVal + ' (bold)';
		}
		else
		{
			return weightVal + ' (normal)';	
		}
	}

	function getFontDisplaySize(pxVal)
	{
		var remVal = (pxVal / baseFontSize);
		if ( remVal % 1 !== 0 )
		{
			remVal = remVal.toFixed(3);
			if(remVal.charAt(remVal.length - 1) == '0')
			{
				remVal = remVal.substr(0, remVal.length - 1);
				if(remVal.charAt(remVal.length - 1) == '0')
				{
					remVal = remVal.substr(0, remVal.length - 1);
				}
			}
		}
		return remVal + 'rem (' + pxVal + 'px)';
	}

	init();
}


var stylus = new CraftedStylus();



