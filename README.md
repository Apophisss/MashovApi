# mashov-api
The unofficial mashov-api, created by Ofiz.\
Interact with the Mashov app freely and easly via node.js!


## Installation
```js
npm i mashov-api
```


## Basic Examples
### Login
#### Syntax
```js
const mashov = require('mashov-api');
mashov.loginToMashov(semel, year, username, password).then(async (loginInfo) => {})
```
#### How to use?
semel - get it in [HERE](https://web.mashov.info/api/schools),\
year - Current year is 2021,\
username - ID \ other mashov username,\
password - mashov password.

#### Returns
The "mashov.loginToMashov()" method returns an array with login information.
### Get Grades. 
#### Code
```js
const mashov = require('mashov-api');
// login to the mashov 
mashov.loginToMashov(semel, year, username, password).then(async (loginInfo) => {

//get all of the user's grades
grades = await mashov.get(loginInfo, "grades");

//and just print all of the grades
console.log(grades)
})
```
### Output Head Example (With my user connected)
```js
{
    studentGuid: '###',
    gradingEventId: Number,
    grade: Number,
    rangeGrade: '###',
    rate: 0,
    timestamp: '###',
    teacherName: '###',
    groupId: Number,
    groupName: '###',
    subjectName: '###',
    eventDate: '###',
    id: Number,
    gradingPeriod: Number,
    gradingEvent: '###',
    gradeRate: Number,
    gradeTypeId: Number,
    gradeType: '###',
  }
```

### Get Timetable. 
#### Code

```js
const mashov = require('mashov-api');
// login to the mashov 
mashov.loginToMashov(semel, year, username, password).then(async (loginInfo) => {

//get all of the user's timetable.
timetable = await mashov.get(loginInfo, "timetable");

//and just print the timetable.
console.log(timetable)
})
```
### Output Head Example (With my user connected)
```js
{
    timeTable: {
      groupId: Number,
      day: Number,
      lesson: Number,
      roomNum: '###',
      weeks: Number
    },
    groupDetails: {
      groupId: Number,
      groupName: '###',
      subjectName: '###',
      groupTeachers: [Array],
      groupInactiveTeachers: []
    }
  },
```



### Get 5 last mails. 
#### Code

```js
const mashov = require('mashov-api');
// login to the mashov 
mashov.loginToMashov(semel, year, username, password).then(async (loginInfo) => {

//get all of the user's mails.
mails = await mashov.getMail(loginInfo, 5); // "5" is the amount of the mails.

//and just print the mails.
console.log(mails)
})

```
### Output Head Example (With my user connected)
```js
  {
    conversationId: '###',
    subject: '###',
    sendTime: '###',
    isNew: false,
    hasDrafts: false,
    hasAttachments: true,
    messages: [ [Object] ],
    labels: [],
    preventReply: true
  }
```

## Advanced Examples
### Average grades.
#### Code 
```js
const mashov = require('mashov-api');
// login to the mashov 
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
    mapGrades["general"]["average"] = 0
    grades.forEach(async element => {
        if (element["grade"] != undefined) {
            mapGrades["general"]["total"] = 
            mapGrades["general"]["total"] + element["grade"];
            mapGrades["general"]["count"] = 
            mapGrades["general"]["count"] + 1
            mapGrades["general"]["average"] =
                 mapGrades["general"]["total"] /
                  mapGrades["general"]["count"]

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
### Output (With my user connected)
```js
Map {
  general: {total: Number, count: Number, name: '###', average: Number},
  '###': {total: Number, count: Number, name: '###', average: Number},
  '###': { total: Number, count: Number, name: '###', average: Number},
  '###': { total: Number, count: Number, name: '###', average: Number },
  '###': { total: Number, count: Number, name: '###', average: Number },
  '###': { total: Number, count: Number, name: '###', average: Number }      
}
```


### Timetable of the day map.
#### Code 
```js
const mashov = require('mashov-api');
// login to the mashov 
mashov.loginToMashov(semel, year, username, password).then(async (loginInfo) => {

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
#### Output (With my user connected)
```js
{
  '1': {
    lesson: 1, name: '###', teacher: '###', place: '###'
  },
  '2': {
    lesson: 2, name: '###', teacher: '###', place: '###'
  },
  '3': {
    lesson: 3, name: '###', teacher: '###', place: '###'
  },
  '4': {
    lesson: 4, name: '###', teacher: '###', place: '###'
  },
  '5': {
    lesson: 5, name: '###', teacher: '###', place: '###'
  },
  '7': {
    lesson: 7, name: '###', teacher: '###', place: '###'
  }
}
```



## Basic docs (Under construction)
### Login
#### Syntax
```js
const mashov = require('mashov-api');
mashov.loginToMashov(semel, year, username, password).then(async (loginInfo) => {})
```
#### How to use?
semel - get it in [HERE](https://web.mashov.info/api/schools),\
year - Current year is 2021,\
username - ID \ other mashov username,\
password - mashov password.

#### Returns
The "mashov.loginToMashov()" method returns an array with login information.

### Methods Syntax
```js
const mashov = require('mashov-api');
// login to the mashov 
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
    //returns student picture in buffer
});
```
## Roadmap
1. Expand the docs, the api can do way more then what is showing in the docs.
2. Add more methods.
3. More error handling.

## Support or contact.
You can contact me via discord - "Ofiz#6414"


## License
[MIT](https://choosealicense.com/licenses/mit/)

## Credits
Created, developed and published by Ofiz. \
Requested by "Melech HaTichnot".

