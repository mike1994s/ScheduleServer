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
Group.prototype.monday = new Array();
Group.prototype.tuesday = new Array();
Group.prototype.wednesday = new Array();
Group.prototype.thursday = new Array();
Group.prototype.friday = new Array();
Group.prototype.saturday = new Array();
function Lesson(lesson, number, color, teacher) {
    this.lesson = lesson;
    this.number = number;
    this.week = color || "RED";
    this.teacher = teacher || "";
}
var groups = new Array()


function populate(data, index, day, number) {
    function getNumDays(index, day) {
        switch (index) {
            case 6:
                return 1;
            case 20 :
                return 2;
            case 34 :
                return 3;
            case 48 :
                return 4;
            case 62:
                return 5;
            case 76:
                return 6;
            default :
                return day;
        }
    }

    function getNumber(str, number) {
        if (str.trim() == "с 8:00" || str.trim() == "до 9:35") {
            return 1;
        } else if (str.trim() == "с 9:45" || str.trim() == "до 11:20")
        {
            return 2;
        } else if (str.trim() == "с 11:30" || str.trim() == "до 13:05")
        {
            return 3;
        } else if (str.trim() == "с 13:30" || str.trim() == "до 15:05") {
            return 4;
        } else if (str.trim() == "с 15:15" || str.trim() == "до 16:50") {

            return 5;
        } else if (str.trim() == "с 17:00" || str.trim() == "до 18:35") {
            return 6;
        } else if (str.trim() == "с 18:45" || str.trim() == "до 20:20") {
            return 7;
        }
        return number;
    }
    
    day = getNumDays(index, day);
    var indexSchedule = 0;
    console.log("NUMBER LESSSON : " + number);
    for (var i = 0; i < data.length; ++i) {
        if (data[i].indexOf("SHEET") !== -1)
            index = 0;
        indexSchedule++;
        console.log(indexSchedule + "\t" + data[i]);
        if (indexSchedule === 2) {
            number = getNumber(data[i].trim(), number);
        }
        switch()
        if (data[i] != "")
        {
            if (index === GROUPS_NUM_STR) {
                var group = new Group(data[i]);
                groups.push(group)
            }
        }
    }
    return number;
}
function wrapper() {
    var index = 0;
    var day = -1;
    var number = 1;
    reader.addListener('data', function(data) {
        index++;
        console.log("Start new Data--------------------------- " + index);
        number = populate(data, index, day, number);
        console.log("END Data---------------------------")
    });
}
wrapper();
reader.addListener('end', function() {
    console.log('thats it');
    for (var i = 0; i < groups.length; ++i) {
        console.log("\t" + groups[i].name)
    }
});

