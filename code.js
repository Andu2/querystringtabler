var tableData = []; //2d array; column:row
var hideSame = false;
var comparisonURL = -1;

$(document).ready(function(){
	$("div#button_calculate").click(function(){
		var input = $("#input_urls").val();
		tableData = getTableData(input);
		//Append because error div will be on there first
		$("div#frame_output").append(outputTable(tableData,hideSame,comparisonURL));
	});

	$("input#input_hidesame").click(function(){
		if($(this).is(":checked")){
			hideSame = true;
			$("div#frame_output").html(outputTable(tableData,hideSame,comparisonURL));
		}
		else{
			hideSame = false;
			$("div#frame_output").html(outputTable(tableData,hideSame,comparisonURL));
		}
	})
});

function getTableData(input){
	var errorHTML = "<div id=\"output_errors\">";
	var allParams = [];//Strings: names of variables
	var urlData = [];//Objects: names and values associated with URL
	var resultTable = [];

	var urls = input.split(/\r?\n/);
	for(var url = 0; url < urls.length; url++){
		urlData[url] = {};
		var queryStringLocation = urls[url].indexOf("?");
		if(queryStringLocation >= 0){
			var queryString = urls[url].slice(queryStringLocation+1);
			var queryStringParameters = queryString.split("&");
			for(var param = 0; param < queryStringParameters.length; param++){
				var keyValue = queryStringParameters[param].split("=");
				if(keyValue.length == 1){
					errorHTML += "Error with URL " + url + ": Param \"" + queryStringParameters[param] + "\" has no equals sign<br/>";
				}
				else{
					if(!allParams.includes(keyValue[0])){
						allParams.push(keyValue[0]);
					}
					urlData[url][keyValue[0]] = keyValue[1];
				}
			}
		}
		else{
			errorHTML += "Error with URL " + url + ": No question mark<br/>";
		}
	}

	resultTable.push([undefined,"PARAM"]);
	for(var url = 0; url < urlData.length; url++){
		resultTable.push(["Compare","URL " + url]);
	}

	//Rows by param
	//first element: param
	for(var param = 0; param < allParams.length; param++){
		resultTable[0].push(allParams[param]);
		for(var url = 0; url < urlData.length; url++){
			if(typeof urlData[url][allParams[param]] != "undefined"){
				resultTable[url+1].push(decodeURIComponent(urlData[url][allParams[param]])); 
			}
			else{
				resultTable[url+1].push("");
			}
		}
	}

	errorHTML += "</div>";
	$("div#frame_output").html(errorHTML);

	return resultTable;
}

function outputTable(data,hideSame,comparisonURL){
	var tableHTML = "<table>";

	//http://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
	//Re-arrange the arrays. I should have organized it the other way...
	var dataTransposed = data[0].map(function(col, i) { 
		return data.map(function(row) { 
			return row[i] 
		})
	});

	for(var row = 0; row < dataTransposed.length; row++){
		var rowHTML = "<tr>";
		var allSame = true;
		for(var col = 0; col < dataTransposed[col].length; col++){
			if(row<=1){
				allSame = false;
			}

			if(row==0){
				if(comparisonURL + 1 == col){
					rowHTML += "<td class=\"button_compare compareon\" onclick=\"compareURL(" + (col-1) + ");\">" + dataTransposed[row][col] + "</td>";
				}
				else{
					rowHTML += "<td class=\"button_compare\" onclick=\"compareURL(" + (col-1) + ");\">" + dataTransposed[row][col] + "</td>";
				}
			}
			else if(col==0 || row==1){
				rowHTML += "<th>" + dataTransposed[row][col] + "</th>";
			}
			else{
				//This is the actual data
				if(comparisonURL >= 0){
					if(dataTransposed[row][col] != dataTransposed[row][comparisonURL + 1]){
						rowHTML += "<td class=\"data_different\">" + dataTransposed[row][col] + "</td>";	
					}
					else{
						rowHTML += "<td>" + dataTransposed[row][col] + "</td>";	
					}
				}
				else{
					rowHTML += "<td>" + dataTransposed[row][col] + "</td>";	
				}
			}

			if(col>=2){
				if(dataTransposed[row][col] != dataTransposed[row][col-1]){
					allSame = false;
				}
			}
		}
		rowHTML += "</tr>";

		if(!(allSame && hideSame)){
			tableHTML += rowHTML;
		}
	}

	tableHTML += "</table>";

	return tableHTML;
}

function compareURL(url){
	if(url==comparisonURL){
		comparisonURL = -1;
		$("div#frame_output").html(outputTable(tableData,hideSame,comparisonURL));
	}
	else{
		comparisonURL = url;
		$("div#frame_output").html(outputTable(tableData,hideSame,comparisonURL));
	}
}