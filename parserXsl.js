//var converter = require("xls-to-json");
//var res = {};
//converter({
//    input: "test.xls",
//    output: null
//}, function(err, result) {
//    if (err) {
//        console.error(err);
//    } else {
////        console.log(result);
//        for (var key = 1; key <= result.length; key++) {
//            console.log(result[key]);
//        }
//
//        for (var i in res) {
//            if (res.hasOwnProperty(i)) {
//                console.log("<option value=\"" + i + "\">" + res[i] + "</option>");
//            }
//        }
//    }
//});
//
////node_xj = require("xls-to-json");
////node_xj({
////    input: "test.xls", // input xls 
////    output: "output.json" // output json 
//////            sheet: "sheetname", // specific sheetname 
////}, function(err, result) {
////    if (err) {
////        console.error(err);
////    } else {
////        console.log(result);
////    }
////});columnsFromHeader: true,
var csv = require('ya-csv')
var reader = csv.createCsvFileReader('test.csv', {'separator': ','});
var writer = new csv.CsvWriter(process.stdout);
var GROUPS_NUM_STR = 5;
function Group(name) {
    this.name = name;
}
var groups = new Array();
function wrapper() {
    var index = 0;
    reader.addListener('data', function(data) {
        index++;

        console.log("Start new Data--------------------------- " + index);
        for (var i = 0; i < data.length; ++i) {
            if (data[i].indexOf("SHEET") != -1)
                index = 0;
            if (index == GROUPS_NUM_STR) {
                if (data[i] != "")
                {
                    var group = new Group(data[i]);
                    groups.push(group)

                }
            }
//        if (data[i] != "")
//                console.log(i + "\t" + data[i].length)
        }
        console.log("END Data---------------------------")
        for (var i = 0; i < groups.length; ++i) {
            console.log("\t" + groups[i].name)
        }
    });
}
wrapper();
reader.addListener('end', function() {
    console.log('thats it');
});