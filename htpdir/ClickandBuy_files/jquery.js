/*
 * jQuery selectbox plugin
 *
 * Copyright (c) 2007 Sadri Sahraoui (brainfault.com)
 * Licensed under the GPL license and MIT:
 *   http://www.opensource.org/licenses/GPL-license.php
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * The code is inspired from Autocomplete plugin (http://www.dyve.net/jquery/?autocomplete)
 *
 * Revision: $Id$
 * Version: 0.5
 * 
 * Changelog :
 *  Version 0.5 
 *  - separate css style for current selected element and hover element which solve the highlight issue 
 *  Version 0.4
 *  - Fix width when the select is in a hidden div   @Pawel Maziarz
 *  - Add a unique id for generated li to avoid conflict with other selects and empty values @Pawel Maziarz
 */
jQuery.fn.extend({
	selectbox: function(options) {
		return this.each(function() {
			new jQuery.SelectBox(this, options);
		});
	}
});


/* pawel maziarz: work around for ie logging */
if (!window.console) {
	var console = {
		log: function(msg) { 
	 }
	}
}
/* */

jQuery.SelectBox = function(selectobj, options) {
	
	jQuery.noConflict();
    var $j = jQuery;
    
	var opt = options || {};
	opt.inputClass = opt.inputClass || "selectbox";
	opt.containerClass = opt.containerClass || "selectbox-wrapper";
	opt.hoverClass = opt.hoverClass || "current";
	opt.currentClass = opt.selectedClass || "selected"
	opt.debug = opt.debug || false;
	
	var elm_id = selectobj.id;
	var active = -1;
	var inFocus = false;
	var hasfocus = 0;
	//jquery object for select element
	var $jselect = $j(selectobj);
	// jquery container object
	var $jcontainer = setupContainer(opt);
	//jquery input object 
	var $jinput = setupInput(opt);
	// hide select and append newly created elements
	$jselect.hide().before($jinput).before($jcontainer);
	
	init();
	
	$jinput
	.click(function(){
    if (!inFocus) {
		  $jcontainer.fadeIn("slow");  
		
		}
	})
	.focus(function(){
	   if ($jcontainer.not(':visible')) {
	       inFocus = true;
	       $jcontainer.fadeIn("slow");  
	   }
	})
	.keydown(function(event) {	   
		switch(event.keyCode) {
			case 38: // up
				event.preventDefault();
				moveSelect(-1);
				break;
			case 40: // down
				event.preventDefault();
				moveSelect(1);
				break;
			//case 9:  // tab 
			case 13: // return
				event.preventDefault(); // seems not working in mac !
				$j('li.'+opt.hoverClass).trigger('click');
				break;
			case 27: //escape
			  hideMe();
			  break;
		}
	})
	.blur(function() {
		if ($jcontainer.is(':visible') && hasfocus > 0 ) {
			if(opt.debug) console.log('container visible and has focus')
		} else {
			hideMe();	
		}
	});


	function hideMe() { 
		hasfocus = 0;
		$jcontainer.hide(); 
	}
	
	function init() {
		$jcontainer.append(getSelectOptions($jinput.attr('id'))).hide();
		var width = $jinput.css('width');
		$jcontainer.width(90);
    }
	
	function setupContainer(options) {
		var container = document.createElement("div");
		$jcontainer = $j(container);
		$jcontainer.attr('id', elm_id+'_container');
		$jcontainer.addClass(options.containerClass);
		
		return $jcontainer;
	}
	
	function setupInput(options) {
		var input = document.createElement("input");
		var $jinput = $j(input);
		$jinput.attr("id", elm_id+"_input");
		$jinput.attr("type", "text");
		$jinput.addClass(options.inputClass);
		$jinput.attr("autocomplete", "off");
		$jinput.attr("readonly", "readonly");
		$jinput.attr("tabIndex", $jselect.attr("tabindex")); // "I" capital is important for ie
		
		return $jinput;	
	}
	
	function moveSelect(step) {
		var lis = $j("li", $jcontainer);
		if (!lis) return;

		active += step;

		if (active < 0) {
			active = 0;
		} else if (active >= lis.size()) {
			active = lis.size() - 1;
		}

		lis.removeClass(opt.hoverClass);

		$j(lis[active]).addClass(opt.hoverClass);
	}
	
	function setCurrent() {	
		var li = $j("li."+opt.currentClass, $jcontainer).get(0);
		var ar = (''+li.id).split('_');
		var el = ar[ar.length-1];
		$jselect.val(el);
		$jinput.val($j(li).html());
		return true;
	}
	
	// select value
	function getCurrentSelected() {
		return $jselect.val();
	}
	
	// input value
	function getCurrentValue() {
		return $jinput.val();
	}
	
	function getSelectOptions(parentid) {
		var select_options = new Array();
		var ul = document.createElement('ul');
		$jselect.children('option').each(function() {
			var li = document.createElement('li');
			li.setAttribute('id', parentid + '_' + $j(this).val());
			li.innerHTML = $j(this).html();
			if ($j(this).is(':selected')) {
				$jinput.val($j(this).html());
				$j(li).addClass(opt.currentClass);
			}
			ul.appendChild(li);
			$j(li)
			.mouseover(function(event) {
				hasfocus = 1;
				if (opt.debug) console.log('over on : '+this.id);
				jQuery(event.target, $jcontainer).addClass(opt.hoverClass);
			})
			.mouseout(function(event) {
				hasfocus = -1;
				if (opt.debug) console.log('out on : '+this.id);
				jQuery(event.target, $jcontainer).removeClass(opt.hoverClass);
			})
			.click(function(event) {
			  var fl = $j('li.'+opt.hoverClass, $jcontainer).get(0);
				if (opt.debug) console.log('click on :'+this.id);
				$j('li.'+opt.currentClass).removeClass(opt.currentClass); 
				$j(this).addClass(opt.currentClass);
				setCurrent();
				hideMe();
			});
		});
		return ul;
	}
	
};
