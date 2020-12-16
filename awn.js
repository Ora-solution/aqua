var waiting_icon;
var lastProgram;
var lastRowNum;
var lastScrollPos;
var appUser = '&APP_USER.';

function AWNsetPlaceholder ( p_itemname, p_value ) {
    $('#' + p_itemname ).attr("placeholder", p_value );
}

function AWNSetItemValue(p_itemname, p_value) {
    
    var v_targetItemJQ = '#' + p_itemname;
	
	// Assign Value to Item
    $( v_targetItemJQ ).val(p_value);

    // Save item session state and refresh Region
    apex.server.process("dummy", {
        pageItems: v_targetItemJQ
    }, {
        dataType: "text"
    });
}

function showMyDetail(p_this, p_data) {
    var tr = $(p_this).closest('tr');

    // Remove Highlights from previous row
    if (lastProgram) {
        lastProgram.children().toggleClass('ActionRow');
    }

    // Highlights row
    tr.children().toggleClass('ActionRow');
    lastProgram = tr;

    // Assign Value to Item
    $('#P1004_SELECTED_PROGRAM').val(p_data.val);
    $('#p1004_program_functions_heading').html(p_data.label + ': Allowed Functions');

    // Save item session state and refresh Region
    apex.server.process("dummy", {
        pageItems: "#P1004_SELECTED_PROGRAM"
    }, {
        dataType: "text"
    }).done(function(pData) {
        $('#p1004_program_functions').trigger('apexrefresh');
    });
}


function askRemoveRollProgram(p_this, p_roleid, p_programid) {
    $.confirm({
        theme: 'black',
        title: 'Confirm!',
        escapeKey: 'cancel',
        content: 'Are you sure to remove this program?',
        buttons: {
            confirm: function() {
                $.fn.RemoveRoleProgram(p_this, p_roleid, p_programid);
            },
            cancel: function() {
                //user changed his mind
            }
        }
    });
}

$.fn.RemoveRoleProgram = function(p_this, p_roleid, p_programid) {
    // get the table row on which the user clicked

    var tr = $(p_this).closest('tr');
    tr.children().toggleClass('ActionRow', 300);

    apex.server.process("RemoveRoleProgram", {
        x01: p_roleid,
        x02: p_programid
    }, {
        dataType: "text"
    }).done(function(pData) {
        if (pData === '') {
            // jQuery has difficulties animating inline elements
            // that's why we wrap them in a div, which is a block element
            tr.children().wrapInner('<div>').children().fadeOut(400, function() {
                tr.remove(); // visually remove the row from the report
            });
        } else {
            $.alert({
                theme: 'black',
                title: 'Error!',
                escapeKey: 'Ok',
                content: pData,
                onContentReady: function() {
                    // Change color of error dialog
                    $('.jconfirm-box').css("background-color", "#e74c3c");
                },
                buttons: {
                    Ok: function() {
                        tr.children().toggleClass('ActionRow', 300);
                    }
                }
            });
        }
    });
}

function askRemoveUserRole(p_this, p_roleid, p_programid) {
    $.confirm({
        theme: 'black',
        title: 'Confirm!',
        escapeKey: 'cancel',
        content: 'Are you sure to remove this user from selected role?',
        buttons: {
            confirm: function() {
                $.fn.RemoveUserRole(p_this, p_roleid, p_programid);
            },
            cancel: function() {
                //user changed his mind
            }
        }
    });
}

$.fn.RemoveUserRole = function(p_this, p_roleid, p_programid) {
    // get the table row on which the user clicked

    var tr = $(p_this).closest('tr');
    tr.children().toggleClass('ActionRow', 300);

    apex.server.process("RemoveUserRole", {
        x01: p_roleid,
        x02: p_programid
    }, {
        dataType: "text"
    }).done(function(pData) {
        if (pData === '') {
            // jQuery has difficulties animating inline elements
            // that's why we wrap them in a div, which is a block element
            tr.children().wrapInner('<div>').children().fadeOut(400, function() {
                tr.remove(); // visually remove the row from the report
            });
        } else {
            $.alert({
                theme: 'black',
                title: 'Error!',
                escapeKey: 'Ok',
                content: pData,
                onContentReady: function() {
                    // Change color of error dialog
                    $('.jconfirm-box').css("background-color", "#e74c3c");
                },
                buttons: {
                    Ok: function() {
                        tr.children().toggleClass('ActionRow', 300);
                    }
                }
            });
        }
    });
}

function askCopyApplicationRole(p_this, p_roleid) {
    $.confirm({
        theme: 'black',
        title: 'Confirm!',
        escapeKey: 'cancel',
        content: 'Do you want to make a copy of this role?',
        buttons: {
            confirm: function() {
                $.fn.CopyApplicationRole(p_this, p_roleid);
            },
            cancel: function() {
                //user changed his mind
            }
        }
    });
}

$.fn.CopyApplicationRole = function(p_this, p_roleid) {
    // get the table row on which the user clicked

    var tr = $(p_this).closest('tr');
    tr.children().toggleClass('ActionRow', 300);

    apex.server.process("CopyApplicationRole", {
        x01: p_roleid
    }, {
        dataType: "text"
    }).done(function(pData) {
        if (pData === '') {
            // jQuery has difficulties animating inline elements
            // that's why we wrap them in a div, which is a block element
            $.dialog({ theme: 'black', escapeKey: true, title: 'Copy Role', content: 'Role has been copied successfully.', onClose: function () { apex.event.trigger ( document,'RefreshRoles' ); } });
            setTimeout(function(){$('.jconfirm-box').css("background-color", "rgb(77, 101, 38)");}, 100);
        } else {
            $.alert({
                theme: 'black',
                title: 'Error!',
                escapeKey: 'Ok',
                content: pData,
                onContentReady: function() {
                    // Change color of error dialog
                    $('.jconfirm-box').css("background-color", "#e74c3c");
                },
                buttons: {
                    Ok: function() {
                        tr.children().toggleClass('ActionRow', 300);
                    }
                }
            });
        }
    });
}

function roundTo(n, digits) {
    if (digits === undefined) {
        digits = 0;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(20));
    return parseFloat((Math.round(n) / multiplicator).toFixed(digits));
}

function awn_number_format(n, d = 2) {
    return n.toFixed(d).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function igResetReport (IG_StaticName) {
	apex.region(IG_StaticName).widget().interactiveGrid("getActions").invoke('reset-report');
}

function igAddRecordFirst (IG_StaticName) {
	apex.region(IG_StaticName).widget().interactiveGrid("getActions").invoke('row-add-row');
	igSelectFirstRecord(IG_StaticName);
}

function igAddRecordLast (IG_StaticName) {
	var ig$ = apex.region(IG_StaticName).widget();
	var actions = ig$.interactiveGrid("getActions");
	var grid$ = ig$.interactiveGrid("getViews").grid.view$;
	grid$.grid("setSelection", grid$.find("tr").last());
	actions.invoke("selection-add-row");
	grid$.grid("setSelection", grid$.find("tr").last());
}

function igAddRecord (IG_StaticName) {
	apex.region(IG_StaticName).widget().interactiveGrid("getActions").invoke('selection-add-row');
	igSelectFirstRecord(IG_StaticName);
}

function igSetNewRecordEvent (jqTrigElem, IG_StaticName) {
	lastRowNum = 1000;
	$(jqTrigElem).keydown(function(e) {
    var e = e || window.event; // for IE to cover IEs window object
    var curRow = Number($('.a-GV-cell.igAllowNewRecord').closest("tr.is-selected").attr('data-id').substr(1, 4));
    if (!e.shiftKey && e.which == 9) {
        if (curRow >= lastRowNum) {
            igAddRecordLast(IG_StaticName);
            lastRowNum = curRow + 1;
            e.preventDefault();
        } 
    }
});
}

function awnInitiateIgNavigation(igRegionName) {
// Assign Focus Role here
$('#' + igRegionName + ' input[class*="igFocus"]').keydown(function(e) {
    var code = e.keyCode || e.which;

    if ((e.shiftKey && code === 9) || (!e.shiftKey && code === 9)) {
        var igFocusCounter;
        var classList = $(this).attr('class').split(/\s+/);

        // Find Class
        $.each(classList, function(index, item) {
            if (item.substring(0, 7) === 'igFocus') {
                //do something
                igFocusCounter = parseInt(item.substr(8).match(/\d+/));
            }
        });

        // Select Action
        if (e.shiftKey && code === 9) {
            --igFocusCounter;
        } else if (!e.shiftKey && code === 9) {
            ++igFocusCounter;
        }

        // Perform Action
        if ($('#' + igRegionName + ' input[class*="igFocus-' + igFocusCounter + '"]').length > 0) {
            e.preventDefault();
            igSetFocus(igRegionName, 'igFocus-' + igFocusCounter);
        }
    }

});
}

function igSetFocus(igRegionName, cssClass){
	
	var ig$ = apex.region(igRegionName).widget();
	var view = ig$.interactiveGrid("getCurrentView");
	var grid = ig$.interactiveGrid("getViews").grid.view$;

    if (view.supports.selection) { // view must support selection
        // only if something not already selected

        if (view.getSelectedRecords() && view.getSelectedRecords().length !== 0) {
			var selectedRecords = $(grid.grid("getSelection")[0][1]).find('td.' + cssClass).length;
	
			if (selectedRecords > 0) {
				$(grid.grid("getSelection")[0][1]).find('td.' + cssClass).focus();
			} else {
				selectedRecords = $(grid.grid("getSelection")[0][0]).find('td.' + cssClass).length;
				
				if (selectedRecords > 0) {
					$(grid.grid("getSelection")[0][0]).find('td.' + cssClass).focus();
				}
			}
		}
	}
}

function createNewSession(vPageID) {
	var p_flow_id = $('#pFlowId').val();
    var p_flow_step_id = $('#pFlowStepId').val();
    var p_instance = $('#pInstance').val();
	
	if (vPageID) {
		p_flow_step_id = vPageID;
	} else {
		p_flow_step_id = $('#pFlowStepId').val();
	}
	apex.navigation.openInNewWindow('f?p=' + p_flow_id + ':' + p_flow_step_id + ':' + p_instance + ':APEX_CLONE_SESSION');
	void(0);
}

function AWNcustomEvent(pEventName, options) {
	apex.event.trigger(document, pEventName, options); 
	void(0);
}

function AWNdisableEsc(event, ui){
  event.preventDefault();
  void(0);
}

function warnOnCloseOLD(event, ui){
  //var noOfFrames = $(".ui-dialog.ui-dialog--apex").length;
  var noOfFrames = $('.ui-dialog.ui-dialog--apex:not([aria-describedby$="_MODAL"])').length;
  //var hasChange = apex.page.isChanged();
  
  if (noOfFrames > 0) {
	  var apexiFrame = $("iframe").get(noOfFrames-1).contentWindow.apex;
	  var hasChange = apexiFrame.page.isChanged();
  } else {
	  var hasChange = false;
  }
 
  if (hasChange) {
    //var lMessage = apex.lang.getMessage( "APEX.WARN_ON_UNSAVED_CHANGES" );
    var lMessage = "There are unsaved changes. Do you want to continue? - ";
    var ok = confirm(lMessage);
    if ( !ok ) {
      event.preventDefault();
    }
  }
  return hasChange;
}

function warnOnClose(event, ui) {

    var apexiFrame = $(event.target).children().get(0).contentWindow.apex;
    var triggeringElement = $(event.target).children().get(0).contentWindow.document.activeElement;
    //var submitbutton = $(triggeringElement).attr("onclick").indexOf("apex.submit") > -1 ? true : false;
	var submitbutton = $(triggeringElement).hasClass("js-ignoreChange");
    var hasChange = apexiFrame.page.isChanged();

    if (hasChange && !submitbutton) {
        // var lMessage = apex.lang.getMessage( "APEX.WARN_ON_UNSAVED_CHANGES" );
        var lMessage = "There are unsaved changes. Do you want to continue?";
        var ok = confirm(lMessage);
        if (!ok) {
            event.preventDefault();
        }
    }
    return hasChange;
}

function CloseModalWithWarning(event, ui) {
    if (apex.page.isChanged()) {
        apex.message.confirm("There are unsaved changes. Do you want to continue?", function (okPressed) {
            if (okPressed) {
                apex.navigation.dialog.close(true);
            }
        });
    } else {
        apex.navigation.dialog.close(true);
    }
}

function removeIGbutton (button_name, regionID){
	if (button_name=="action"){
		$(regionID + ' .a-IG-header .a-Toolbar-group .a-Toolbar-item[id$="ig_toolbar_actions_button"]').parent().remove();
	}
	
	else if (button_name=="search"){
		$(regionID + ' .a-IG-header .a-Toolbar-group .a-Toolbar-item[data-action="search"]').parent().remove();
	}
	
	else if (button_name=="add"){
		$(regionID + ' .a-IG-header .a-Toolbar-group .a-Toolbar-item[data-action="selection-add-row"]').parent().remove();
	}
	
	else if (button_name=="edit"){
		$(regionID + ' .a-IG-header .a-Toolbar-group .a-Toolbar-item[data-action="edit"]').remove();
	}
	
	else if (button_name=="save"){
		$(regionID + ' .a-IG-header .a-Toolbar-group .a-Toolbar-item[data-action="save"]').remove();
	}
	
	else if (button_name=="editsave" || button_name=="saveedit"){
		$(regionID + ' .a-IG-header .a-Toolbar-group .a-Toolbar-item[data-action="save"]').parent().remove();
	}
	
	else {
		console.log('Button Name: "' + button_name + '" Region ID: "' + regionID + '"');
	}
}

function revalidateIG(igRegionID) {
    var i, records, record, qty, model,
        view = apex.region(igRegionID).widget().interactiveGrid("getCurrentView"),
        igLastStatus = apex.region(igRegionID).widget().interactiveGrid("getActions").get("edit");
    if ( view.supports.edit ) { // make sure this is the editable view
        model = view.model;
        apex.region(igRegionID).widget().interactiveGrid("getActions").set("edit", true);
        records = model._data;
        if ( records.length > 0 ) {
            for ( i = 0; i < records.length; i++ ) {
                record = records[i];
                    
                    // Set Value to Cell
                    if (model.allowEdit(record)) {
                        var a = parseFloat(model.getValue(record, "TEMP_COL"));
                        var lastNumber = a ? a : 0;
                        model.setValue(record, "TEMP_COL", lastNumber + 1);
                    }
                
            }
        }
        apex.region(igRegionID).widget().interactiveGrid("getActions").set("edit", igLastStatus);
    }
}

/*
function igSelectFirstRecord(RegionName) {
	var ig$ = apex.region(RegionName).widget();
	var el$, view = ig$.interactiveGrid("getCurrentView");

    if (view.supports.selection) { // view must support selection
        // only if something not already selected

        if (!view.getSelectedRecords() || view.getSelectedRecords().length === 0) {
            el$ = view.getDataElements(); // doesn't work for icon view
            if (el$ && el$.length > 0) {
                view.setSelection([el$.first()]); // doesn't work for icon view
            }
        }
    }
}
*/
function igSelectFirstRecord(RegionName) {
	var ig$ = apex.region(RegionName).widget();
	var el$, view = ig$.interactiveGrid("getCurrentView");

    if (view.supports.selection) { // view must support selection
        // only if something not already selected

        if (!view.getSelectedRecords() || view.getSelectedRecords().length === 0) {
            arr = [];
			arr.push(apex.region(RegionName).widget().interactiveGrid("getViews", "grid").model.getRecord(view.model._data[0][0]));
			view.setSelectedRecords(arr, true);
        }
    }
}


function IGremoveExtraLines(RegionName, colNmae, colType) {
    var ig$, model, skipped = [],
        skipCol, vCount = 0,
        val;
    ig$ = apex.region(RegionName).widget();
    model = ig$.interactiveGrid("getViews", "grid").model;
    skipCol = model.getFieldKey(colNmae);

    ig$.interactiveGrid("setSelectedRecords", []);

    model.forEach(function(r) {

        if (colType == "LIST") {
            val = r[skipCol].v;
        } else {
            val = r[skipCol];
        }

        if (val == "") {
            skipped[vCount] = r;
            vCount++;
        }
    });

    ig$.interactiveGrid("setSelectedRecords", skipped);
    model.deleteRecords(skipped);

    ig$.interactiveGrid("setSelectedRecords", []);

    igSelectFirstRecord(RegionName);
}

function CallReport(pRptName, pRptPath, pRptType, paraList){
    
    // Initilized Params Value
    //var pHostLoc = 'http://awnrps.awnbt.com:9002/reports/rwservlet?';
	//var url = pHostLoc + 'AwnErpRpts' + $v("P0_S0001_ID") + pRptType + '&report=' + pRptPath;
	var pHostLoc = 'http://reports.paktechsolutions.pk:7778/reports/rwservlet?';
    var url = pHostLoc + 'PakTechErpRpts' + $v("P0_S0001_ID") + pRptType + '&report=' + pRptPath;
    
    
    // Add Report Name Comp and Unit
    if ($('#P0_S0002_ID').val()) {
        url += '&P_S0002_ID=' + $('#P0_S0002_ID').val();
        url += '&P_S0002_DESC=' + $('#P0_S0002_ID :selected').text();
    }
    
    if ($('#P0_S0003_ID').val()) {
        url += '&P_S0003_ID=' + $('#P0_S0003_ID').val();
        url += '&P_S0003_DESC=' + $('#P0_S0003_ID :selected').text();
    }
    
    if (pRptName !== "") {
        url += '&P_REPORT_NAME=' + pRptName;
    }
    
    // Add List of Parameters
	$.each(paraList, function(paramName, paramValue) {
		if (paramValue !== "") {
			url += '&' + paramName + '=' + paramValue;
		}
	});
    
    //window.open(url,'_blank');
    apex.navigation.popup ({ url: url });
}

function reportRequest(p_a000301_id, p_rpt_type, paraList) {
    
    apex.server.process("Get_Report_Path", {
        x01: p_a000301_id
    }, {
        dataType: "text"
    }).done(function(pData) {
        if (pData === "") {
            $.alert({
                theme: 'black',
                title: 'Error!',
                escapeKey: 'Ok',
                content: 'Report not found.',
                onContentReady: function() {
                    // Change color of error dialog
                    $('.jconfirm-box').css("background-color", "#e74c3c");
                },
                buttons: {
                    Ok: function() {}
                }
            });
        } else {
			if (pData) {
				pData = jQuery.parseJSON(pData);
				}
            CallReport(pData.report_name, pData.report_path, p_rpt_type, paraList);
        }
    });
}

function awnIGBottomTotal(cssClass, pValue) {
    if ($('.' + cssClass).length > 0) {
        $('.' + cssClass).html(pValue);
    } else {
        $('.a-GV-footer .a-GV-status').last().after('<div class="a-GV-status ' + cssClass + ' awnIGBottomTotal">' + pValue + '</div>');
    }
}

function awnIGBottomTotal2(cssClass, pValue, igRegionName) {
    if ($(igRegionName + ' .' + cssClass).length > 0) {
        $(igRegionName + ' .' + cssClass).html(pValue);
    } else {
        $(igRegionName + ' .a-GV-footer .a-GV-status').last().after('<div class="a-GV-status ' + cssClass + ' awnIGBottomTotal">' + pValue + '</div>');
    }
}

function preventEscapeRunningProcess(event, ui) {
    var ok, cond_pass = true;
    var lMessage = "There are some background working in progress, it is recomanded to wait for completion of background process.";
    ok = confirm(lMessage);
}
