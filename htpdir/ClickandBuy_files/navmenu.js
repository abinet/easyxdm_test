var navmenu={

  //Specify full URL to down and right arrow images (23 is padding-right added to top level LIs with drop downs):
  arrowimages: {down:['downarrowclass', '../../images/down.gif', 23], right:['rightarrowclass', '../../images/right.gif']},
  transition: {overtime:300, outtime:300}, //duration of slide in/ out animation, in milliseconds
  shadow: {enable:true, offsetx:5, offsety:5}, //enable shadow?
  showhidedelay: {showdelay: 100, hidedelay: 200}, //set delay in milliseconds before sub menus appear and disappear, respectively

  ////////Stop configuring beyond here///////////////////////////

detectwebkit: navigator.userAgent.toLowerCase().indexOf("applewebkit")!=-1, //detect WebKit browsers (Safari, Chrome etc)
detectie6: document.all && !window.XMLHttpRequest,

getajaxmenu:function($, setting){ //function to fetch external page containing the panel DIVs
	var $menucontainer=$('#'+setting.contentsource[0]); //reference empty div on page that will hold menu
	$menucontainer.html("Loading Menu...");
	$.ajax({
		url: setting.contentsource[1], //path to external menu file
		async: true,
		error:function(ajaxrequest){
			$menucontainer.html('Error fetching content. Server Response: '+ajaxrequest.responseText);
		},
		success:function(content){
			$menucontainer.html(content);
			navmenu.buildmenu($, setting);
		}
 	});
},

buildmenu:function($, setting){
	var smoothmenu=navmenu;
	var $mainmenu=$("#"+setting.mainmenuid+">ul"); //reference main menu UL
	
	$mainmenu.parent().get(0).className=setting.classname || "navmenu";
	var $headers=$mainmenu.find("ul").parent();
	$headers.hover(
		function(e){
			$(this).children('a:eq(0)').addClass('selected');
		},
		function(e){
			$(this).children('a:eq(0)').removeClass('selected');
		}
	);
	
	$headers.each(function(i){ //loop through each LI header
		var $curobj=$(this).css({zIndex: 100-i}); //reference current LI header
		var $subul=$(this).find('ul:eq(0)').css({display:'block'});
		$subul.data('timers', {});
		this._dimensions={w:this.offsetWidth, h:this.offsetHeight, subulw:$subul.outerWidth(), subulh:$subul.outerHeight()};
		this.istopheader=$curobj.parents("ul").length==1 ? true : false ; //is top level header?
		$subul.css({top:this.istopheader && setting.orientation!='v'? this._dimensions.h+"px" : 0});
		
	
		$curobj.hover(
			function(e){
				var $targetul=$subul; //reference UL to reveal
				var header=$curobj.get(0); //reference header LI as DOM object
				clearTimeout($targetul.data('timers').hidetimer);
				$targetul.data('timers').showtimer=setTimeout(function(){
					header._offsets={left:$curobj.offset().left, top:$curobj.offset().top};
					var menuleft=header.istopheader && setting.orientation!='v'? 0 : header._dimensions.w;
					menuleft=(header._offsets.left+menuleft+header._dimensions.subulw>$(window).width())? (header.istopheader && setting.orientation!='v'? -header._dimensions.subulw+header._dimensions.w : -header._dimensions.w) : menuleft; //calculate this sub menu's offsets from its parent
					if ($targetul.queue().length<=1){ //if 1 or less queued animations
						$targetul.css({left:menuleft+"px", width:header._dimensions.subulw+'px'}).animate({height:'show',opacity:'show'}, navmenu.transition.overtime);
						if (smoothmenu.shadow.enable){
							var shadowleft=header.istopheader? $targetul.offset().left+navmenu.shadow.offsetx : menuleft;
							var shadowtop=header.istopheader?$targetul.offset().top+smoothmenu.shadow.offsety : header._shadowoffset.y;
							if (!header.istopheader && navmenu.detectwebkit){ //in WebKit browsers, restore shadow's opacity to full
								header.$shadow.css({opacity:1});
							}
							header.$shadow.css({overflow:'', width:header._dimensions.subulw+'px', left:shadowleft+'px', top:shadowtop+'px'}).animate({height:header._dimensions.subulh+'px'}, navmenu.transition.overtime);
						}
					}
				}, navmenu.showhidedelay.showdelay);
			},
			function(e){
				var $targetul=$subul;
				var header=$curobj.get(0);
				clearTimeout($targetul.data('timers').showtimer);
				$targetul.data('timers').hidetimer=setTimeout(function(){
					$targetul.animate({height:'hide', opacity:'hide'}, navmenu.transition.outtime);
					if (smoothmenu.shadow.enable){
						if (navmenu.detectwebkit){ //in WebKit browsers, set first child shadow's opacity to 0, as "overflow:hidden" doesn't work in them
							header.$shadow.children('div:eq(0)').css({opacity:0});
						}
						header.$shadow.css({overflow:'hidden'}).animate({height:0}, navmenu.transition.outtime);
					}
				}, navmenu.showhidedelay.hidedelay);
			}
		); //end hover
	}); //end $headers.each()
	$mainmenu.find("ul").css({display:'none', visibility:'visible'});
},
init:function(setting){
	if (typeof setting.customtheme=="object" && setting.customtheme.length==2){ //override default menu colors (default/hover) with custom set?
		var mainmenuid='#'+setting.mainmenuid;
		var mainselector=(setting.orientation=="v")? mainmenuid : mainmenuid+', '+mainmenuid;
	document.write('<style type="text/css">\n'
			+mainselector+' ul li a {background:'+setting.customtheme[0]+';}\n'
			+mainmenuid+' ul li a:hover {background:'+setting.customtheme[1]+';}\n'
		+'</style>');
	}
	this.shadow.enable=(document.all && !window.XMLHttpRequest)? false : this.shadow.enable; //in IE6, always disable shadow
	jQuery(document).ready(function($){ //ajax menu?
		if (typeof setting.contentsource=="Object"){ //if external ajax menu
			navmenu.getajaxmenu($, setting);
		}
		else{ //else if markup menu
			navmenu.buildmenu($, setting);
		}
	});
}
};//end navmenu variable
function showhomemenu(mnu1,mnu2,mnu3,mnu4,mnu5,mnu6)
{
 document.getElementById(mnu1).style.display ="block";
 document.getElementById(mnu2).style.display ="none"; 
 document.getElementById(mnu3).style.display ="none";
 document.getElementById(mnu4).style.display ="none";
 document.getElementById(mnu5).style.display ="none";
 document.getElementById(mnu6).style.display ="none";
 var home = document.getElementById("hometab");
 var sett = document.getElementById("settingtab");
 var tool = document.getElementById("tooltab");
 var integration = document.getElementById("integrationtab");
 var invoice = document.getElementById("invoicetab");
 var report = document.getElementById("reporttab");
 var help = document.getElementById("helptab");

	//sett.className = "settings";
	sett.setAttribute("class","settings");	
// tool.className = "tools";
 tool.setAttribute("class","tools");
 integration.setAttribute("class","integration");
 invoice.setAttribute("class","invoicing");
 report.setAttribute("class","reporting");
 help.setAttribute("class","help");

 home.className = "home_active";
 home.setAttribute("class","home_active"); 
 var menubg = document.getElementById("menuleft"); 
 menubg.style.background="url(../../images/menuleft.gif) top no-repeat"   ;

}

function showsettingmenu(mnu1,mnu2,mnu3,mnu4,mnu5,mnu6)
{
	document.getElementById(mnu1).style.display ="none";
	document.getElementById(mnu2).style.display ="block"; 
	document.getElementById(mnu3).style.display ="none";
	document.getElementById(mnu4).style.display ="none";
	document.getElementById(mnu5).style.display ="none";
	document.getElementById(mnu6).style.display ="none";
	var home = document.getElementById("hometab");
	var tool = document.getElementById("tooltab");
	var integration = document.getElementById("integrationtab");
	var invoice = document.getElementById("invoicetab");
	var report = document.getElementById("reporttab");
	var help = document.getElementById("helptab");
	var sett = document.getElementById("settingtab");
	//sett.className = "settings";
	home.setAttribute("class","home");	
 // tool.className = "tools";
	tool.setAttribute("class","tools");
	integration.setAttribute("class","integration");
	invoice.setAttribute("class","invoicing");
	report.setAttribute("class","reporting");
	help.setAttribute("class","help");
	sett.className = "settings_active";
	sett.setAttribute("class","settings_active"); 

	   var menubg = document.getElementById("menuleft"); 			   
	   menubg.style.background="url(../../images/menuleft_inactive.gif) left top no-repeat"   ;  

		   home.onmouseover = function()
		 {
			  this.style.background="url(../../images/home.gif) 100% 100% no-repeat";	
			  var menubg = document.getElementById("menuleft"); 	
			  menubg.style.background="url(../../images/menuleft_hover.gif) left top no-repeat"   ;
		 };
		
		   home.onmouseout = function()
		 {
			   menubg.style.background="url(../../images/menuleft_inactive.gif) left top no-repeat"   ;  
		 };		  
}


function showintegmenu(mnu1,mnu2,mnu3,mnu4,mnu5,mnu6)
{
	document.getElementById(mnu1).style.display ="none";
document.getElementById(mnu2).style.display ="none"; 
document.getElementById(mnu3).style.display ="block";
document.getElementById(mnu4).style.display ="none";
document.getElementById(mnu5).style.display ="none";
document.getElementById(mnu6).style.display ="none";
var home = document.getElementById("hometab");
var tool = document.getElementById("tooltab");
var sett = document.getElementById("settingtab");
var invoice = document.getElementById("invoicetab");
var report = document.getElementById("reporttab");
var help = document.getElementById("helptab");
var integration = document.getElementById("integrationtab");
	//sett.className = "settings";
home.setAttribute("class","home"); 
	sett.setAttribute("class","settings");	
	// tool.className = "tools";
tool.setAttribute("class","tools"); 
invoice.setAttribute("class","invoicing");
report.setAttribute("class","reporting");
help.setAttribute("class","help");
integration.className = "integration_active";
integration.setAttribute("class","integration_active");  
		var menubg = document.getElementById("menuleft"); 
		menubg.style.background="url(../../images/menuleft_inactive.gif) top no-repeat"   ; 
		home.onmouseover = function()
		 {
			  this.style.background="url(../../images/home.gif) 100% 100% no-repeat";	
			   var menubg = document.getElementById("menuleft"); 	
			   menubg.style.background="url(../../images/menuleft_hover.gif) top no-repeat"   ;
		 };
		home.onmouseout = function()
		 {
			   menubg.style.background="url(../../images/menuleft_inactive.gif) top no-repeat"   ;  
		 };

}

function showtoolsmenu(mnu1,mnu2,mnu3,mnu4,mnu5,mnu6)
{
	document.getElementById(mnu1).style.display ="none";
document.getElementById(mnu2).style.display ="none"; 
document.getElementById(mnu3).style.display ="none";
document.getElementById(mnu4).style.display ="block";
document.getElementById(mnu5).style.display ="none";
document.getElementById(mnu6).style.display ="none";
	var home = document.getElementById("hometab");
	var integration = document.getElementById("integrationtab");
	var sett = document.getElementById("settingtab");
	var invoice = document.getElementById("invoicetab");
	var report = document.getElementById("reporttab");
	var help = document.getElementById("helptab");
	var tool = document.getElementById("tooltab");
		//sett.className = "settings";
	home.setAttribute("class","home");	
		sett.setAttribute("class","settings");	
	   // tool.className = "tools";
	integration.setAttribute("class","integration");
	invoice.setAttribute("class","invoicing");
	report.setAttribute("class","reporting");
	help.setAttribute("class","help");	  
	  tool.setAttribute("class","tools_active");  
	  var menubg = document.getElementById("menuleft"); 
		menubg.style.background="url(../../images/menuleft_inactive.gif) top no-repeat"   ; 
		home.onmouseover = function()
		 {
			  this.style.background="url(../../images/home.gif) 100% 100% no-repeat";	
			   var menubg = document.getElementById("menuleft"); 	
			   menubg.style.background="url(../../images/menuleft_hover.gif) top no-repeat"   ;
		 };
		home.onmouseout = function()
		 {
			   menubg.style.background="url(../../images/menuleft_inactive.gif) top no-repeat"   ;  
		 };
	}	
function showinvoicemenu(mnu1,mnu2,mnu3,mnu4,mnu5,mnu6)
{
	document.getElementById(mnu1).style.display ="none";
	document.getElementById(mnu2).style.display ="none"; 
	document.getElementById(mnu3).style.display ="none";
	document.getElementById(mnu4).style.display ="none";
	document.getElementById(mnu5).style.display ="block";
	document.getElementById(mnu6).style.display ="none";
	var home = document.getElementById("hometab");
	var integration = document.getElementById("integrationtab");
	var sett = document.getElementById("settingtab");
	var tool = document.getElementById("tooltab");
	var report = document.getElementById("reporttab");
	var help = document.getElementById("helptab");
	var invoice=document.getElementById("invoicetab");
		//sett.className = "settings";
		sett.setAttribute("class","settings");	
	   // tool.className = "tools";
		home.setAttribute("class","home");
	integration.setAttribute("class","integration");
	tool.setAttribute("class","tools");
	report.setAttribute("class","reporting");
	help.setAttribute("class","help");
	
	invoice.className = "invoicing_active";
	invoice.setAttribute("class","invoicing_active"); 
	
	var menubg = document.getElementById("menuleft"); 
		menubg.style.background="url(../../images/menuleft_inactive.gif) top no-repeat"   ; 
		home.onmouseover = function()
		 {
			  this.style.background="url(../../images/home.gif) 100% 100% no-repeat";	
			   var menubg = document.getElementById("menuleft"); 	
			   menubg.style.background="url(../../images/menuleft_hover.gif) top no-repeat"   ;
		 };
		home.onmouseout = function()
		 {
			   menubg.style.background="url(../../images/menuleft_inactive.gif) top no-repeat"   ;  
		 };
	
}


function showreportmenu(mnu1,mnu2,mnu3,mnu4,mnu5,mnu6)
{
	document.getElementById(mnu1).style.display ="none";
	document.getElementById(mnu2).style.display ="none"; 
	document.getElementById(mnu3).style.display ="none";
	document.getElementById(mnu4).style.display ="none";
	document.getElementById(mnu5).style.display ="none";
	document.getElementById(mnu6).style.display ="block";
	var home = document.getElementById("hometab");
	var integration = document.getElementById("integrationtab");
	var sett = document.getElementById("settingtab");
	var tool = document.getElementById("tooltab");
	var report = document.getElementById("reporttab");
	var help = document.getElementById("helptab");
	var invoice=document.getElementById("invoicetab");
		//sett.className = "settings";
		sett.setAttribute("class","settings");	
	   // tool.className = "tools";
		home.setAttribute("class","home");
	integration.setAttribute("class","integration");
	tool.setAttribute("class","tools");	
	help.setAttribute("class","help");
	invoice.setAttribute("class","invoicing");
	
	report.className = "reporting_active";
	report.setAttribute("class","reporting_active"); 
	
	var menubg = document.getElementById("menuleft"); 
		menubg.style.background="url(../../images/menuleft_inactive.gif) top no-repeat"   ; 
		home.onmouseover = function()
		 {
			  this.style.background="url(../../images/home.gif) 100% 100% no-repeat";	
			   var menubg = document.getElementById("menuleft"); 	
			   menubg.style.background="url(../../images/menuleft_hover.gif) top no-repeat"   ;
		 };
		home.onmouseout = function()
		 {
			   menubg.style.background="url(../../images/menuleft_inactive.gif) top no-repeat"   ;  
		 };
	
}

function lstitmroundedhover()
{
	var btn = document.getElementById('settlement_data');
	if(btn)
		btn.style.background="url(../../images/menubott_hover.png) top no-repeat";
}	

function lstitmrounded()
{
	var btn = document.getElementById('settlement_data');
	if(btn)
		btn.style.background="url(../../images/menubott.png) top no-repeat";
}	


function checkhometab()
{ 
	var home = document.getElementById("hometab");
	home.className = "home_active";
	home.setAttribute("class","home_active");  
}


function checksettingtab()
{ 
	var sett = document.getElementById("settingtab");
	sett.className = "settings_active";
	sett.setAttribute("class","settings_active");  
}

function checkintegtab()
{ 
	var integ = document.getElementById("integrationtab");
	integ.className = "integration_active";
	integ.setAttribute("class","integration_active");  
}

function checktooltab()
{ 
	var tool = document.getElementById("tooltab");
	tool.className = "tools_active";
	tool.setAttribute("class","tools_active");  
}

function checkinvoicetab()
{ 
	var invoice = document.getElementById("invoicetab");
	invoice.className = "invoice_active";
	invoice.setAttribute("class","invoicing_active");  
}

function checkreportingtab()
{ 
	var report = document.getElementById("reporttab");
	report.className = "reporting_active";
	report.setAttribute("class","reporting_active");  
}

function checkhelptab()
{ 
	var help = document.getElementById("helptab");
	help.className = "help_active";
	help.setAttribute("class","help_active");  
}

function hidebusinessmnu()
{
	var btn = document.getElementById("business_submenu");
	if(btn){	btn.style.display="none";}
}

function showbusinessmnu()
{
	var btn = document.getElementById("business_submenu");
	if(btn){	btn.style.display="block";}
}

function hidesandboxmnu()
{
	var btn = document.getElementById("sandbox_submenu");
	if(btn){	btn.style.display="none";}
}

function showsandboxmnu()
{
	var btn = document.getElementById("sandbox_submenu");
	if(btn){	btn.style.display="block";}
}

function hideinvoicesmnu()
{
	document.getElementById("invoices_submenu");
	if(btn){	btn.style.display="none";}
}

function showinvoicesmnu()
{
	var btn = document.getElementById("invoices_submenu");
	if(btn){	btn.style.display="block";}
}
  
function showmessagingmnu()
{
	var btn = document.getElementById("messaging_submenu");
	if(btn){	btn.style.display="block";}
}

function hidemessagingmnu()
{
	var btn = document.getElementById("messaging_submenu");
	if(btn){	btn.style.display="none";}
}

function loadmenu()
{
		if ((document.getElementById('smoothmenu2'))||(document.getElementById('smoothmenu3'))||(document.getElementById('smoothmenu4'))||(document.getElementById('smoothmenu5'))||(document.getElementById('smoothmenu6'))||(document.getElementById('smoothmenu7')))
		 {

				var menubg = document.getElementById("menuleft");
				menubg.style.background="url(../../images/servicearea/navbar/submenu/menuleft_inactive.gif) top no-repeat"   ;	   	
		 }


}

function hometabover()
{
	if((navigator.appName)!="Microsoft Internet Explorer")
	{
		var y;
		y=(document.getElementById('topmenulist').firstChild.nextSibling.firstChild.className);
		id=document.getElementById('topmenulist').firstChild.nextSibling.id;				 
		z=document.getElementById(id); 
		if(y=="home")
		{
			document.getElementById("menuleft").style.background="url(/frontend/images/servicearea/navbar/submenu/menuleft_inactive.gif) top no-repeat"   ;
			z.onmouseover=function()
			{
				var menubg = document.getElementById("menuleft"); 
					 menubg.style.background="url(/frontend/images/servicearea/navbar/submenu/menuleft_hover.gif) top no-repeat"   ;
			};
			z.onmouseout=function()
			{
				var menubg = document.getElementById("menuleft"); 
				menubg.style.background="url(/frontend/images/servicearea/navbar/submenu/menuleft_inactive.gif) top no-repeat"   ;
			};
		}	
	}
	else
	{
			var x;
			x=(document.getElementById('topmenulist').firstChild.firstChild.className);
			
			y=document.getElementById('topmenulist').firstChild.id;			
			z=document.getElementById(y); 
			if(x=="home")
			{		 	
				z.onmouseover=function()
				{				 
					var menubg = document.getElementById("menuleft"); 
					menubg.style.background="url(../../images/servicearea/navbar/submenu/menuleft_hover.gif) top no-repeat";
				};
				z.onmouseout=function()
				{				 
					var menubg = document.getElementById("menuleft"); 
					menubg.style.background="url(../../images/servicearea/navbar/submenu/menuleft_inactive.gif) top no-repeat";
				};	
					
			}
					 
			if(x=="home_active")
			{		 
					var menubg = document.getElementById("menuleft");	
					menubg.style.background="url(/frontend/images/servicearea/navbar/submenu/menuleft.gif) top no-repeat";  
					z.onmouseover=function()
					{			
						 menubg.style.background="url(/frontend/images/servicearea/navbar/submenu/menuleft.gif) top no-repeat";
					};
					z.onmouseout=function()
					{					
						 menubg.style.background="url(/frontend/images/servicearea/navbar/submenu/menuleft.gif) top no-repeat";
					};	
				 
			}
			
	}
}
function showtooltip(tooltip,quesmrk)
{	
 	document.getElementById(tooltip).style.display="block";	
 	if( typeof( quesmrk.offsetParent ) != 'undefined') 
 	{
 		for( var posX = 0, posY = 0; quesmrk; quesmrk = quesmrk.offsetParent ) {
 		 
 		  posX += quesmrk.offsetLeft;	 
 		  posY += quesmrk.offsetTop;   
 		  
 		}
 		document.getElementById(tooltip).style.position="absolute";		
 		document.getElementById(tooltip).style.left=posX;
 		document.getElementById(tooltip).style.top=posY;
 		alert(document.getElementById(tooltip).style.left);
 	
 	}
 }

