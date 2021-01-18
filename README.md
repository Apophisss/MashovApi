# mashov-api
The unofficial mashov-api, created by Ofiz.

## Description
Interact with the Mashov app via node.js!


## Installation
```js
npm i mashov-api
```

## Basic Examples

### Get Grades. 
```js
const mashov = require('mashov-api');
// login to the mashov 
// You can look up your school semel in the mashov app when loging in,
// and this year is         2021.
//                          ^^^^
mashov.loginToMashov(semel, year, username, password).then(async (logininfo) => {

//get all of the user's grades
grades = await mashov.get(loginInfo, "grades");

//and just print all of the grades
console.log(grades)
})
```
### Get Timetable. 
```js
const mashov = require('mashov-api');
// login to the mashov 
// You can look up your school semel in the mashov app when loging in,
// and this year is         2021.
//                          ^^^^
mashov.loginToMashov(semel, year, username, password).then(async (logininfo) => {

//get all of the user's timetable.
timetable = await mashov.get(loginInfo, "timetable");

//and just print the timetable.
console.log(timetable)
})

```
### Get 5 last mails. 
```js
const mashov = require('mashov-api');
// login to the mashov 
// You can look up your school semel in the mashov app when loging in,
// and this year is         2021.
//                          ^^^^
mashov.loginToMashov(semel, year, username, password).then(async (logininfo) => {

//get all of the user's mails.
mails = await mashov.getMail(loginInfo, 5); // "5" is the amount of the mails.

//and just print the mails.
console.log(mails)
})

```


## Advanced Examples
### Average grades.
```js
const mashov = require('mashov-api');
// login to the mashov 
// You can look up your school semel in the mashov app when loging in,
// and this year is         2021.
//                          ^^^^
mashov.loginToMashov(semel, year, username, password).then(async (loginInfo) => {

    //get all of the user's grades
    grades = await mashov.get(loginInfo, "grades");

    //creates a map that will fill up with grades 
    //and general average and per class average.
    let mapGrades = new Map()
    mapGrades["general"] = {}
    mapGrades["general"]["total"] = 0
    mapGrades["general"]["count"] = 0
    mapGrades["general"]["name"] = "general"
    grades.forEach(async element => {
        if (element["grade"] != undefined) {
            mapGrades["general"]["total"] = 
            mapGrades["general"]["total"] + element["grade"];
            mapGrades["general"]["count"] = 
            mapGrades["general"]["count"] + 1
            if (mapGrades[element["subjectName"]]) {
                mapGrades[element["subjectName"]]["total"] =
                 mapGrades[element["subjectName"]]["total"] +
                  element["grade"]
                mapGrades[element["subjectName"]]["count"] =
                 mapGrades[element["subjectName"]]["count"] + 1
                mapGrades[element["subjectName"]]["average"] =
                 mapGrades[element["subjectName"]]["total"] /
                  mapGrades[element["subjectName"]]["count"]
            }
            else {
                mapGrades[element["subjectName"]] = {}
                mapGrades[element["subjectName"]]["total"] =
                 element["grade"]
                mapGrades[element["subjectName"]]["count"] = 1
                mapGrades[element["subjectName"]]["name"] =
                 element["subjectName"]
                mapGrades[element["subjectName"]]["average"] =
                 element["grade"]
            }
        }

    })
    // then lets just print the map.
    console.log(mapGrades)
})

```
### Timetable of the day map.
```js
const mashov = require('mashov-api');
// login to the mashov 
// You can look up your school semel in the mashov app when loging in,
// and this year is         2021.
//                          ^^^^
mashov.loginToMashov(340216, 2021, 213646623, "oz231204").then(async (loginInfo) => {

    //get user's timetable.
    timetable = await mashov.get(loginInfo, "timetable");

    //creates a map that will fill up with timetable by lessons.
    var day = new Date().getDay() + 1
    timeTableArray = {}
    timetable.forEach(element => {
        if (element["timeTable"]["day"] == day) {
            if (timeTableArray[element["timeTable"]["lesson"]] == undefined) {
                timeTableArray[element["timeTable"]["lesson"]] = {}
                timeTableArray[element["timeTable"]["lesson"]]["lesson"] =
                    element["timeTable"]["lesson"]
                timeTableArray[element["timeTable"]["lesson"]]["name"] =
                    element["groupDetails"]["subjectName"]
                timeTableArray[element["timeTable"]["lesson"]]["teacher"] =
                    element["groupDetails"]["groupTeachers"]["teacherName"]

                if (element["timeTable"]["roomNum"] != '') {
                    timeTableArray[element["timeTable"]["lesson"]]["place"] =
                        element["timeTable"]["roomNum"]
                }
            } else {
                timeTableArray[element["timeTable"]["lesson"]]["lesson"] =
                    element["timeTable"]["lesson"]
                timeTableArray[element["timeTable"]["lesson"]]["name"] =
                    element["groupDetails"]["subjectName"]
                timeTableArray[element["timeTable"]["lesson"]]["teacher"] =
                    element["groupDetails"]["groupTeachers"][0]["teacherName"]
                if (element["timeTable"]["roomNum"] != '') {
                    timeTableArray[element["timeTable"]["lesson"]]["place"] =
                        element["timeTable"]["roomNum"]
                }
            }

        }
    })

    // then lets just print the map.
    console.log(timeTableArray)
})
```


## Usage
```js
const mashov = require('mashov-api');
mashov.loginToMashov(semel, year, username, password).then(async (loginInfo) => {

    school = await mashov.getSchools(loginInfo);
    //returns list of all schools with years and "semel".

    gradesRaw = await mashov.getRaw(loginInfo, "grades");
    //returns grades response raw.

    grades = await mashov.get(loginInfo, "grades");
    //returns grades json

    behavior = await mashov.get(loginInfo, "behave");
    //returns behavior json

    timeTable = await mashov.get(loginInfo, "timetable");
    //returns timetable json

    //This template can also work with 
    // "outBehave", "homework", "justificationrequests", "reportCards" and etc.


    mails = await mashov.getMail(loginInfo, 5);
    //returns 5 last mails in json

    notifications = await mashov.getNotifications(loginInfo, 5);
    //returns 5 last notifications in json

    picture = await mashov.getPicture(loginInfo);
    //returns student picture in buffer in json
});
```

## Credits
Created, developed and published by Ofiz. 
Requested by "Melech HaTichnot".

