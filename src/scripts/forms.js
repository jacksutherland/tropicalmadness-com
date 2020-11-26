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