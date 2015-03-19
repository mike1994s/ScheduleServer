var csv = require('ya-csv')
var reader = csv.createCsvFileReader('test.csv', {'separator': ','});
var writer = new csv.CsvWriter(process.stdout);
var GROUPS_NUM_STR = 5;
function Group(name) {
    this.name = name;
    this.monday = new Array();
    this.tuesday = new Array();
    this.wednesday = new Array();
    this.thursday = new Array();
    this.friday = new Array();
    this.saturday = new Array();
}
function Lesson( ) {
    this.lesson;
    this.number;
    this.week;
    this.teacher;
    this.auditory;
    this.hull;
}




function LastThreeGroup() {
    this.first = null;
    this.second = null;
    this.third = null;
}

function Res(number, index) {
    this.number = number;
    this.index = index;
}

function searchInGroup(groups, nameGroup) {
    for (var i = 0; i < groups.length; ++i) {
        if (groups[i] == null)
            return -1;
        if (groups[i].name === nameGroup) {
            return i;
        }
    }
    return -1;
}
function populate(data, index, day, number, lastThree, groups) {
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

    function enterInGroup(groups, lesson, itFirst, day) {
        console.log("ERROR " + groups[itFirst]);
        switch (day) {
            case 1:
                {
                    groups[itFirst].monday.push(lesson);
                    break;
                }
            case 2:
                {
                    groups[itFirst].tuesday.push(lesson);
                    break;
                }
            case 3:
                {
                    groups[itFirst].wednesday.push(lesson);
                    break;
                }
            case 4:
                {
                    groups[itFirst].thursday.push(lesson);
                    break;
                }
            case 5:
                {
                    groups[itFirst].friday.push(lesson);
                    break;
                }
            case 6:
                {
                    groups[itFirst].saturday.push(lesson);
                    break;
                }
        }
        return groups;

    }
    day = getNumDays(index, day);
    var indexSchedule = 0;
    var indexGroup = 0;

    var firstLesson = new Lesson();
    var secondLesson = new Lesson();
    var thirdLesson = new Lesson();
    console.log("NUMBER LESSSON : " + number);
//    console.log("LAST THREE : \t\t" + lastThree.first + "  " + lastThree.second + " " + lastThree.third);
    for (var i = 0; i < data.length; ++i) {
        if (data[i].indexOf("SHEET") !== -1)
            index = 0;
        indexSchedule++;
        if (indexSchedule === 2) {
            number = getNumber(data[i].trim(), number);
        }
        if (indexSchedule === 4 || indexSchedule === 10 || indexSchedule === 15) {
            if (indexSchedule === 4) {
                firstLesson.lesson = data[i].trim();
            } else if (indexSchedule === 10) {
                secondLesson.lesson = data[i].trim();
            } else if (indexSchedule === 15) {
                thirdLesson.lesson = data[i].trim();
            }
        }
        if (indexSchedule === 6 || indexSchedule === 12 || indexSchedule === 17) {
            if (indexSchedule === 6) {
                firstLesson.teacher = data[i].trim();
            } else if (indexSchedule === 12) {
                secondLesson.teacher = data[i].trim();
            } else if (indexSchedule === 17) {
                thirdLesson.teacher = data[i].trim();
            }
        }
        if (indexSchedule === 7 || indexSchedule === 13 || indexSchedule === 18) {
            if (indexSchedule === 7) {
                firstLesson.auditory = data[i].trim();
            } else if (indexSchedule === 13) {
                secondLesson.auditory = data[i].trim();
            } else if (indexSchedule === 18) {
                thirdLesson.auditory = data[i].trim();
            }
        }
        if (indexSchedule === 8 || indexSchedule === 14 || indexSchedule === 19) {
            if (indexSchedule === 8) {
                firstLesson.hull = data[i].trim();
            } else if (indexSchedule === 14) {
                secondLesson.hull = data[i].trim();
            } else if (indexSchedule === 19) {
                thirdLesson.hull = data[i].trim();
            }
        }
        if (data[i] != "")
        {
            if (index === GROUPS_NUM_STR) {
                indexGroup++;
                if (indexGroup === 1) {
                    lastThree.first = data[i];
                } else if (indexGroup === 2) {
                    lastThree.second = data[i];
                } else if (indexGroup === 3) {
                    lastThree.third = data[i];
                }
                if (searchInGroup(groups, data[i]) === -1) {
                    var group = new Group(data[i]);
                    groups.push(group);
                }
            }
        }
        var itFirst = searchInGroup(groups, lastThree.first);
        if (itFirst !== -1) {
            groups = enterInGroup(groups, firstLesson, itFirst, day);
        } else {
////            groups.push(lastThree.first);
//            groups = enterInGroup(groups, firstLesson, groups.length - 1, day);
        }
        var itSec = searchInGroup(groups, lastThree.second);
        if (itSec !== -1) {
            groups = enterInGroup(groups, secondLesson, itSec, day);
        } else {
//            groups.push(lastThree.second);
//            groups = enterInGroup(groups, secondLesson, groups.length - 1, day);
        }

        var itTh = searchInGroup(groups, lastThree.third);
        if (itTh !== -1) {
            groups = enterInGroup(groups, thirdLesson, itTh, day);
        } else {
//            groups.push(lastThree.third);
//            groups = enterInGroup(groups, thirdLesson, groups.length - 1, day);
        }
    }
    return new Res(number, index);
}
function wrapper() {
    var index = 0;
    var day = -1;
    var number = 1;
    var groups = new Array()
    var lastThree = new LastThreeGroup();
    reader.addListener('data', function(data) {
        index++;
        console.log("Start new Data--------------------------- " + index);
        var obj = populate(data, index, day, number, lastThree, groups);
        index = obj.index;
        number = obj.number;
        console.log("END Data---------------------------")
    });
    return groups;
}
var groups = wrapper();
reader.addListener('end', function() {
    console.log('thats it');
    for (var i = 0; i < groups.length; ++i) {
        console.log("\t" + groups[i].name);
        console.log("Monaday");
        for (var i = 0; i < groups[i].monday.length; ++i) {
            console.log(i);
            console.log("lesson: " + groups[i].monday[i].lesson + "  number  : " + groups[i].monday[i].number );
        }
//        console.log("\t" + );
        console.log("\t" + groups[i].tuesday.length);
        console.log("\t" + groups[i].wednesday.length);
        console.log("\t" + groups[i].thursday.length);
        console.log("\t" + groups[i].friday.length);
        console.log("\t" + groups[i].saturday.length);

    }
});

