/*
FreeCodeCamp Challenge: Timestamp. Author: Leo von Kleist
*/
var express = require("express");
var app = express();


app.get("/:date", function(req, res) {
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var date = req.params.date;
	//check if the user entered a valid unix timestamp
	if(!isNaN(date) && date>0) {
	var thisdate = naturalLanguageDate(date);
	res.send({"unix": date, "date": thisdate});
	}
	//Else, check if the user entered a natural language date, using regular expressions. 
	else if(date.search(/^\w{3,9} \d{1,2},? \d{2,4}$/)!=-1) {
		var month = date.match(/\w{3,9}/)[0];
		var day = date.match(/\d{1,2}/)[0];
		var year = date.match(/\d{4}/)[0];
		//Checks if month is contained in one of the month arrays, if the day is between 0 and 31, and the year after 1970, because unix timestamps start at 1970. 
		if((months.indexOf(month)!=-1 || shortMonths.indexOf(month)!=-1) && Number(day)>0 && Number(day)<=31 && Number(year)>=1970){
			var thisDate = month + " " + day + ", " + year;
			var unixDate = Date.parse(thisDate);
			res.send({"unix": unixDate, "date": thisDate});
			}
	}
	//If the user entered neither a unix timstamp nor a date, return null. 
	else res.send(JSON.stringify({"unix": null, "date": null}));
});
app.listen(3000);

//This function takes a unix timestamp and returns the corresponding date in natural language. 
function naturalLanguageDate(timestamp) {
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var date = new Date(Number(timestamp));
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var dateString = "";
	return dateString + months[month] + " " + day + ", " + year;
	
}
