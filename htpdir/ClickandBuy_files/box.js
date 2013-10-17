/**
 * 
 */

var $j = jQuery;
function showBox()
{
	$j('#j_showBtn').css("display", "none");
	$j('#j_hideBtn').css("display", "block");
	richShow();
}


function hideBox()
{
	$j('#j_showBtn').css("display", "block");
	$j('#j_hideBtn').css("display", "none");
	richHide();

}




