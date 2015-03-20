var csv = require('ya-csv')
var reader = csv.createCsvFileReader('test.csv', {'separator': ','});
var writer = new csv.CsvWriter(process.stdout);
var GROUPS_NUM_STR = 5;
function Group(name, lesson) {
    this.name = name;
    this.lesson = lesson;
}
function Lesson( ) {
    this.lesson;
    this.number;
    this.week;
    this.teacher;
    this.auditory;
    this.hull;
    this.day;
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
    function isEmpty(lessonT) {
        lessonT.lesson = lessonT.lesson || "";
        lessonT.week = lessonT.week || "";
        lessonT.teacher = lessonT.teacher || "";
        lessonT.auditory = lessonT.auditory || "";
        lessonT.hull = lessonT.hull || "";
        if (lessonT.lesson == "" && lessonT.number == "" && lessonT.week == "" && lessonT.teacher == "" &&
                lessonT.auditory == "" && lessonT.hull == "")
            return true;
        return false;
    }
    day = getNumDays(index, day);
    var indexSchedule = 0;
    var indexGroup = 0;

    var firstLesson = new Lesson();
    var secondLesson = new Lesson();
    var thirdLesson = new Lesson();
//    console.log("NUMBER LESSSON : " + number);
    for (var i = 0; i < data.length; ++i) {
        if (data[i].indexOf("SHEET") !== -1)
            index = 0;
        if (index >= GROUPS_NUM_STR) {
            if (i === 1) {
                number = getNumber(data[i].trim(), number);
            }
            firstLesson.number = number;
            secondLesson.number = number;
            thirdLesson.number = number;
            if (i === 3 || i === 9 || i === 15) {
                console.log("LESSON : ");
                console.log(i + "  " + data[i].trim());
                if (i === 3) {
                    firstLesson.lesson = data[i].trim();
                } else if (i === 9) {
                    secondLesson.lesson = data[i].trim();
                } else if (i === 15) {
                    thirdLesson.lesson = data[i].trim();
                }
            }
            if (i === 5 || i === 11 || i === 17) {
                console.log("Teacher : ");
                console.log(i + "  " + data[i].trim());
                if (i === 5) {
                    firstLesson.teacher = data[i].trim();
                } else if (i === 11) {
                    secondLesson.teacher = data[i].trim();
                } else if (i === 17) {
                    thirdLesson.teacher = data[i].trim();
                }
            }
            if (i === 6 || i === 12 || i === 18) {
                console.log("Auditory : ");
                console.log(i + "  " + data[i].trim());
                if (i === 6) {
                    firstLesson.auditory = data[i].trim();
                } else if (i === 12) {
                    secondLesson.auditory = data[i].trim();
                } else if (i === 18) {
                    thirdLesson.auditory = data[i].trim();
                }
            }
            if (i === 7 || i === 13 || i === 19) {
                console.log("hull : ");
                console.log(i + "  " + data[i].trim());
                if (i === 7) {
                    firstLesson.hull = data[i].trim();
                } else if (i === 13) {
                    secondLesson.hull = data[i].trim();
                } else if (i === 19) {
                    thirdLesson.hull = data[i].trim();
                }
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
//                if (searchInGroup(groups, data[i]) === -1) {
//                    var group = new Group(data[i]);
//                    groups.push(group);
//                }
            }
//            switch(day) {
//                case 1:
//            }
        }
    }
    firstLesson.day = day;
    secondLesson.day = day;
    thirdLesson.day = day;
    if (!isEmpty(firstLesson)) {
        var group = new Group(lastThree.first, firstLesson);
        groups.push(group);
    }
    if (!isEmpty(secondLesson)) {
        var group = new Group(lastThree.second, secondLesson);
        groups.push(group);
    }
    if (!isEmpty(thirdLesson)) {
        var group = new Group(lastThree.third, thirdLesson);
        groups.push(group);
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
        console.log("\t" + groups[i].lesson.lesson);
        console.log("\t" + groups[i].lesson.teacher);

    }
    afterEnd(groups);
}
);

function afterEnd(groups) {
    var uniqueGroups = new Array();
    function searchGroups(name) {
        for (var i = 0; i < uniqueGroups.length; ++i) {
//            console.log(uniqueGroups[i].name  + "\t" + name);
            if (uniqueGroups[i].name === name) {
                return i;
            }
        }
        return -1;
    }
    function UniqueGroups(name) {
        this.name = name;
    }
    for (var i = 0; i < groups.length; ++i) {
        var ind = searchGroups(groups[i].name);
        if (ind == -1) {
            var unGroup = new UniqueGroups(groups[i].name);
            uniqueGroups.push(unGroup);
        }
    }
    for (var i = 1; i < uniqueGroups.length; ++i) {
        console.log(uniqueGroups[i].name)
    }
}
