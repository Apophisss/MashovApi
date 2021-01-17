const fetch = require('node-fetch');


exports.loginToMashov = async function (semel, year, username, password) {
  return fetch("https://web.mashov.info/api/login", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "https://web.mashov.info/students/login",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"semel\":" + semel + ",\"year\":" + year + ",\"username\":\"" + username + "\",\"password\":\"" + password + "\",\"appName\":\"info.mashov.students\",\"apiVersion\":\"3.20200528\",\"appVersion\":\"3.20200528\",\"appBuild\":\"3.20200528\",\"deviceUuid\":\"chrome\",\"devicePlatform\":\"chrome\",\"deviceManufacturer\":\"win\",\"deviceModel\":\"desktop\",\"deviceVersion\":\"87.0.4280.88\"}",
    "method": "POST",
    "mode": "cors"
  })
    .then(res => { return [res.headers.get("set-cookie"), res.headers.get("x-csrf-token"), res] })
};

exports.getSchools = function (loginInfo) {
  return fetch("https://web.mashov.info/api/schools", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/covidSplash",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
};

exports.getGrades = function (loginInfo) {
  return fetch("https://web.mashov.info/api/students/" + loginInfo[1] + "/grades", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/students/" + loginInfo[2] + "/grades",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
};
exports.get = function (loginInfo, get) {
  return fetch("https://web.mashov.info/api/students/" + loginInfo[2] + "/" + get, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/students/" + loginInfo[2] + "/regularGrades",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
};
exports.getRaw = function (loginInfo, get) {
  return fetch("https://web.mashov.info/api/students/" + loginInfo[2] + "/" + get, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/students/" + loginInfo[2] + "/regularGrades",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => console.log(res))
    .then(body => { return body });
};
exports.getMail = function (loginInfo) {
  return fetch("https://web.mashov.info/api/mail/inbox/conversations?skip=0&take=1000000", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/mailbox/folder/inbox",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
};
exports.getNotf = function (loginInfo) {
  return fetch("https://web.mashov.info/api/user/notifications?skip=0&take=1", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/mailbox/folder/inbox",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
};
exports.getPic = function (loginInfo) {
  return fetch("https://web.mashov.info/api/user/" + loginInfo[2] + "/picture", {
    "headers": {
      "accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-site": "same-origin",
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/covidSplash",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.buffer()) // expecting a json response
    .then(json => { return json });
};

exports.loginToISCO = async function () {
  return fetch("http://beitbiram.iscool.co.il/", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "upgrade-insecure-requests": "1",
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => { return res })
};
exports.getISCO = async function (login, clas) {
  if (clas.split("-")[0] == "י") {
    myclas = Number(clas.split("-")[1]) + 127
  }
  if (clas.split("-")[1] == "14" && clas.split("-")[0] == "י") {
    myclas = 126
  }
  if (clas.split("-")[0] == "יא") {
    myclas = Number(clas.split("-")[1]) + 140
  }
  if (clas.split("-")[0] == "יב") {
    myclas = Number(clas.split("-")[1]) + 155
  }
  return fetch("http://beitbiram.iscool.co.il/default.aspx", {

    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "max-age=0",
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryTr7uYm1ESiDICB9S",
      "upgrade-insecure-requests": "1",
      "cookie": encodeURI(login)
    },
    "referrer": "http://beitbiram.iscool.co.il/default.aspx",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "------WebKitFormBoundaryTr7uYm1ESiDICB9S\r\nContent-Disposition: form-data; name=\"__EVENTTARGET\"\r\n\r\ndnn$ctr7126$TimeTableView$ClassesList\r\n------WebKitFormBoundaryTr7uYm1ESiDICB9S\r\nContent-Disposition: form-data; name=\"__EVENTARGUMENT\"\r\n\r\n\r\n------WebKitFormBoundaryTr7uYm1ESiDICB9S\r\nContent-Disposition: form-data; name=\"__LASTFOCUS\"\r\n\r\n\r\n------WebKitFormBoundaryTr7uYm1ESiDICB9S\r\nContent-Disposition: form-data; name=\"__VIEWSTATE\"\r\n\r\n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\r\n------WebKitFormBoundaryTr7uYm1ESiDICB9S\r\nContent-Disposition: form-data; name=\"__VIEWSTATEGENERATOR\"\r\n\r\nCA0B0334\r\n------WebKitFormBoundaryTr7uYm1ESiDICB9S\r\nContent-Disposition: form-data; name=\"dnn$ctr7126$TimeTableView$ClassesList\"\r\n\r\n" + myclas + "\r\n------WebKitFormBoundaryTr7uYm1ESiDICB9S\r\nContent-Disposition: form-data; name=\"dnn$ctr7126$TimeTableView$ControlId\"\r\n\r\n2\r\n------WebKitFormBoundaryTr7uYm1ESiDICB9S\r\nContent-Disposition: form-data; name=\"ScrollTop\"\r\n\r\n\r\n------WebKitFormBoundaryTr7uYm1ESiDICB9S\r\nContent-Disposition: form-data; name=\"__dnnVariable\"\r\n\r\n\r\n------WebKitFormBoundaryTr7uYm1ESiDICB9S--\r\n",
    "method": "POST",
    "mode": "cors"
  })
    .then(res => { return res })

}
exports.getTests = async function (login, clas) {
  if (clas.split("-")[0] == "י") {
    myclas = Number(clas.split("-")[1]) + 127
  }
  if (clas.split("-")[1] == "14" && clas.split("-")[0] == "י") {
    myclas = 126
  }
  if (clas.split("-")[0] == "יא") {
    myclas = Number(clas.split("-")[1]) + 140
  }
  if (clas.split("-")[0] == "יב") {
    myclas = Number(clas.split("-")[1]) + 155
  }
  return fetch("http://beitbiram.iscool.co.il/default.aspx", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "max-age=0",
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryAH0uoy1fQ5g0xJdC",
      "upgrade-insecure-requests": "1",
      "cookie": encodeURI(login)
    },
    "referrer": "http://beitbiram.iscool.co.il/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "------WebKitFormBoundaryAH0uoy1fQ5g0xJdC\r\nContent-Disposition: form-data; name=\"__EVENTTARGET\"\r\n\r\ndnn$ctr7126$TimeTableView$btnExams\r\n------WebKitFormBoundaryAH0uoy1fQ5g0xJdC\r\nContent-Disposition: form-data; name=\"__EVENTARGUMENT\"\r\n\r\n\r\n------WebKitFormBoundaryAH0uoy1fQ5g0xJdC\r\nContent-Disposition: form-data; name=\"__LASTFOCUS\"\r\n\r\n\r\n------WebKitFormBoundaryAH0uoy1fQ5g0xJdC\r\nContent-Disposition: form-data; name=\"__VIEWSTATE\"\r\n\r\n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\r\n------WebKitFormBoundaryAH0uoy1fQ5g0xJdC\r\nContent-Disposition: form-data; name=\"__VIEWSTATEGENERATOR\"\r\n\r\nCA0B0334\r\n------WebKitFormBoundaryAH0uoy1fQ5g0xJdC\r\nContent-Disposition: form-data; name=\"dnn$ctr7126$TimeTableView$ClassesList\"\r\n\r\n" + myclas + "\r\n------WebKitFormBoundaryAH0uoy1fQ5g0xJdC\r\nContent-Disposition: form-data; name=\"dnn$ctr7126$TimeTableView$ControlId\"\r\n\r\n\r\n------WebKitFormBoundaryAH0uoy1fQ5g0xJdC\r\nContent-Disposition: form-data; name=\"ScrollTop\"\r\n\r\n\r\n------WebKitFormBoundaryAH0uoy1fQ5g0xJdC\r\nContent-Disposition: form-data; name=\"__dnnVariable\"\r\n\r\n\r\n------WebKitFormBoundaryAH0uoy1fQ5g0xJdC--\r\n",
    "method": "POST",
    "mode": "cors"
  })
    .then(res => { return res })

}

exports.getMoodle = function (loginInfo) {
  return fetch("https://web.mashov.info/api/students/557d319d-090d-4eb1-b920-2364c3b160f2/moodle/assignments/grades", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "x-csrf-token": loginInfo[1]
    },
    "referrer": "https://web.mashov.info/students/main/students/557d319d-090d-4eb1-b920-2364c3b160f2/moodleAssignments",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => { return res })
};
exports.getTt = function (loginInfo) {
  return fetch("https://web.mashov.info/api/students/" + loginInfo[2] + "/timetable", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "cookie": loginInfo[0],
      "x-csrf-token": loginInfo[1]
    },
    "referrer": "https://web.mashov.info/students/main/students/" + loginInfo[2] + "/timetable",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => { return res })
};