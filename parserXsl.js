var converter = require("xls-to-json");
var res = {};
converter({
    input: "test.xls",
    output: null
}, function(err, result) {
    if (err) {
        console.error(err);
    } else {
//        console.log(result);
        for (var key = 1; key <= result.length; key++) {
            console.log(result[key]);
        }

        for (var i in res) {
            if (res.hasOwnProperty(i)) {
                console.log("<option value=\"" + i + "\">" + res[i] + "</option>");
            }
        }
    }
});

//node_xj = require("xls-to-json");
//node_xj({
//    input: "test.xls", // input xls 
//    output: "output.json" // output json 
////            sheet: "sheetname", // specific sheetname 
//}, function(err, result) {
//    if (err) {
//        console.error(err);
//    } else {
//        console.log(result);
//    }
//});