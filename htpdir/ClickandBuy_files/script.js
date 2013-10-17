function pagescript() {
	showHideReportingAction();
}

function selectCheckBox() {
	var i = 0;
	var tableElement = document.getElementById('reportingForm:table:tu');
	var inputs = tableElement.getElementsByTagName('input');
	for ( var i = 0; i <= inputs.length; i++) {
		var input = inputs[i];
		if (typeof input !== 'undefined') {
			if (input.getAttribute('type') === 'checkbox') {
				input.checked = true;
			}
		}
	}
}


function unSelectCheckBox() {
	var i = 0;
	var tableElement = document.getElementById('reportingForm:table:tu');
	var inputs = tableElement.getElementsByTagName('input');
	for ( var i = 0; i <= inputs.length; i++) {
		var input = inputs[i];
		if (typeof input !== 'undefined') {
			if (input.getAttribute('type') === 'checkbox') {
				input.checked = false;
			}
		}
	}

}

// Eventually obsolete function!!!!!!!!!!!
function uncheckSelected(size) {
	document.getElementById("reportingForm:allId").innerHTML = "Select All";
	if (document.getElementById('reportingForm:exportAllDataCheckBox_ID').checked) {
		var i = 0;
		for (i = 0; i < size; i++) {
			document.getElementById('reportingForm:table:' + i + ':reporting_ID').checked = false;
		}
	}
}

// To support column resizing


// Show and hide input fields for particular reporting actions
function showHideReportingAction() {	
	// Hide all optional input fields and buttons
	document.getElementById('reportingForm:exportButtonBlock').style.display = 'none';
	document.getElementById('reportingForm:cancelButtonBlock').style.display = 'none';
	document.getElementById('reportingForm:refundButtonBlock').style.display = 'none';

	var selectedValue = document.getElementById('reportingForm:actionSelector').value; // get selected value
	var prefix = selectedValue.substring(6, 0); // Extract option prefix (could be only EXPORT, CANCEL, REFUND

	// Show input fields and buttons for selected option
	if (prefix == "EXPORT") {
		document.getElementById('reportingForm:exportButtonBlock').style.display = '';
	}
	if (prefix == "CANCEL") {
		document.getElementById('reportingForm:cancelButtonBlock').style.display = '';
	}
	if (prefix == "REFUND") {
		document.getElementById('reportingForm:refundButtonBlock').style.display = '';
	}
}

function selectAll(size)
{
	var value = document.getElementById('treeForm:events:checkAllField').checked;
	var i = 0; 
	for (i = 0; i <= size; i++) {
		document.getElementById('treeForm:events:' + i + ':eventing_ID').checked = value;
	}
}

function showUnSelectedCheckBox(size) {
	var i = 0;
	for (i = 0; i <= size; i++) {
		document.getElementById('eventForm:events:' + i + ':eventing_ID').checked = false;
	}
}// end of showUnSelectedCheckBox function

function showSelectedCheckBoxAll(size) {
	var i = 0;
	for (i = 0; i <= size; i++) {
		document.getElementById('eventForm:events:' + i + ':eventing_ID').checked = true;
	}
}// end of showUnSelectedCheckBox function

function toggleOverviewGroup(rowNumber) {
	var tableBody = document.getElementById('overviewForm:revenueOverview:tb');
	var subCellId = 'overviewForm:revenueOverview:' + rowNumber
			+ ':overviewdetal';
	var cells = tableBody.getElementsByTagName('td');
	var visible;
	for ( var i = 0; i <= cells.length; i++) {
		var cell = cells[i];
		if (typeof cell !== 'undefined') {
			if (cell.id.substr(0, subCellId.length) === subCellId) {
				if (cell.style.display === '') {
					cell.style.display = 'none';
					visible = false;
				} else {
					cell.style.display = '';
					visible = true;
				}
			}
		}
	}

	var toggleLink = document.getElementById('overviewForm:revenueOverview:'
			+ rowNumber + ':toggleDetails');
	if (visible) {
		toggleLink.innerHTML = "-";
	} else {
		toggleLink.innerHTML = "+";
	}
}

function registerFilterKeyUp() {
	var tableElement = document.getElementById('reportingForm:table:tu');
	var inputs = tableElement.getElementsByTagName('input');
	for ( var i = 0; i < inputs.length; i++) {
		var input = inputs[i];
		if (input.className === 'rich-filter-input') {

			if (input.onblur !== "") {
				input.onfilter = input.onblur;
				input.onblur = "";

				input.onkeyup = function(event) {
					if (event.keyCode == 13) {
						event.target.onfilter(event);
					}
				};
			}
		}
	}
}


function submitonkeypress(btnId, e){
	
	var btn = document.getElementById(btnId);
	if (btn) {
		var keycode;
		if (window.event)
			keycode = window.event.keyCode;
		else if (e)
			keycode = e.which;
		else
			return;

		if (keycode == 13) {
			btn.click();
		}
	}
	
}

function loginfocus()
{
	var inp= document.getElementById('loginForm:j_username');
	if(inp){ inp.focus();}
		
}

function clickLink(linkId)
{
  var fireOnThis = document.getElementById(linkId);
  if (document.createEvent)
  {
    var evObj = document.createEvent('MouseEvents');
    evObj.initEvent( 'click', true, false );
    fireOnThis.dispatchEvent(evObj);
  }
  else if (document.createEventObject)
  {
    fireOnThis.fireEvent('onclick');
  }
}

function info(message){
	jAlert(message, null, null); 
}


function confirmBox(commandId, confirmText, title, ok, cancel){
	if(confirmText != null && confirmText != ''){
		jConfirm(confirmText, null, ok, cancel, function(result) {
			if(result){
				clickLink(commandId);
			}
		});
	}
	return true;
}

function confirmBoxWithCheckbox(commandId, confirmText, title, ok, cancel, checkboxText, syncCheckboxId){
	if(confirmText != null && confirmText != ''){
		jConfirm(confirmText, null, ok, cancel, function(result) {
			if(result){
				clickLink(commandId);
			}
		});
		var msg = document.getElementById('popup_message');
		msg.innerHTML = msg.innerHTML + 
			'<div style="margin-top: 3px;">' +
			'<input id="srcCheckbox" type="checkbox" onchange="syncCheckboxes(\''+syncCheckboxId+'\', \'srcCheckbox\');"/>' +
			checkboxText +
			'</div>';
		document.getElementById(syncCheckboxId).checked = false; 
		document.getElementById('srcCheckbox').checked = false;
	}
	return true;
}

function syncCheckboxes(targetId, sourceId) {
	document.getElementById(targetId).checked = document.getElementById(sourceId).checked;
}