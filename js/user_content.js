//"locations":[{"timestampMs":"1443114623503","latitudeE7":382315600,"longitudeE7":217555312,"accuracy":24,"activity":[{"timestampMs":"1443114448125","activity":[{"type":"TILTING","confidence":100}]},{"timestampMs":"1443114491401","activity":[{"type":"UNKNOWN","confidence":39},{"type":"STILL","confidence":33},{"type":"IN_VEHICLE","confidence":23},{"type":"ON_FOOT","confidence":6},{"type":"WALKING","confidence":6}]}]}

// Get data from Database (for user)
function getData(uFunction) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json_obj = JSON.parse(this.responseText);
            let json_file = json_obj.filename;
            loadJson(json_file, uFunction, json_obj);
        }
    }
    xhttp.open("GET","http://localhost/Web_Project_2019-2020/php/get_data.php",true);
    xhttp.send();
}

// Get user's JSON file (Google) (for user)
function loadJson(filename, uFunction, databaseData) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json_obj = JSON.parse(this.responseText);
            uFunction(json_obj, databaseData);
        }
    };
    xhttp.open("POST", "http://localhost/Web_Project_2019-2020/uploads/" + filename ,true);
    xhttp.overrideMimeType("application/json");
    xhttp.send();
}

// Loop for all the users
function getUserData(uFunction, json_obj){
    // var i = 0;
    for (var i in json_obj){
        loadJsonObj(json_obj[i].filename, uFunction, json_obj[i].username, Object.keys(json_obj).length, i);
    }
    return 0;
}

// Get data from Database (for every other user)
function getJsonObj(uFunction) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json_obj = JSON.parse(this.responseText);
            getUserData(uFunction, json_obj);
        }
    }
    xhttp.open("GET","http://localhost/Web_Project_2019-2020/php/get_allusers_data.php",true);
    xhttp.send();
}

// Get user's JSON file (Google) (for every other user)
function loadJsonObj(filename, uFunction, username, times, i) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json_obj = JSON.parse(this.responseText);
            uFunction(username, json_obj, times, i);
        }
    };
    xhttp.open("POST", "http://localhost/Web_Project_2019-2020/uploads/" + filename ,true);
    xhttp.overrideMimeType("application/json");
    xhttp.send();
}

// Calculates the score of every user // Change date
function userScore(json_file, databaseData){
    let dates = [];
    dates[11] = new Date();
    // dates[11] = new Date(2019 , 11, 15);

    let curY = dates[11].getFullYear();
    let curM = dates[11].getMonth() + 1;
    let ecoOut = [];
    let parJSON;
    let x

    for ( var i= 0; i< 12; i++){
        x = 11 - i;
        curM--;
        dates[x]= new Date(curY, curM);
        parJSON = monthJsonObj(dates[x], json_file);
        if (parJSON !== 0){
            ecoOut[x] = ecoCalc(parJSON);
        }else {
            ecoOut[x] = 0;
        }
    }
    if (ecoOut !== 0){
        document.getElementById("user_score").innerHTML = "Eco Persentage for this month is: " + ecoOut[11] + " %.";
    }else {
        document.getElementById("user_score").innerHTML = "Not data for this month!";
    }
    userChart(dates, ecoOut);
    myUserRes = new userResults(databaseData.username, ecoOut[11]);
}

// Chart of 12 months
function userChart(dates, ecoOut){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [ months[dates[0].getMonth()], months[dates[1].getMonth()], months[dates[2].getMonth()], months[dates[3].getMonth()], months[dates[4].getMonth()], months[dates[5].getMonth()], months[dates[6].getMonth()], months[dates[7].getMonth()], months[dates[8].getMonth()], months[dates[9].getMonth()], months[dates[10].getMonth()], months[dates[11].getMonth()] ],
            datasets: [{
                label: '% of Eco Travel',
                data: [ecoOut[0], ecoOut[1], ecoOut[2], ecoOut[3], ecoOut[4], ecoOut[5], ecoOut[6], ecoOut[7], ecoOut[8], ecoOut[9], ecoOut[10], ecoOut[11]],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// The range of the users data
function userEntry(json_file){
    let fNum = parseInt(json_file.locations[0].timestampMs,10);
    let fDate = new Date(fNum);
    let count = Object.keys(json_file.locations).length - 1;
    let lnum = parseInt(json_file.locations[count].timestampMs,10);
    let lDate = new Date(lnum);

    document.getElementById("user_entries_time").innerHTML = "The entries start at " + fDate.toDateString() + " and ends at " + lDate.toDateString() + ".";
}

// Outputs the last time the user uploaded a file in the database
function lastUploadDate(json_file, databaseData){
    document.getElementById("user_last_upload").innerHTML = "The last file uploaded at " + databaseData.upload_date + ".";
}

// Leaderboard of the users eco habits // Change date
function ecoLeaderboard(username, json_obj, times, count){
    let dates = [];
    // cur_date = new Date();
    cur_date = new Date(2019 , 6, 15);

    let curY = cur_date.getFullYear();
    let curM = cur_date.getMonth() + 1;
    let ecoOut = 0;
    let parJSON;
    // var x;

    parJSON = monthJsonObj(cur_date, json_obj);
    if (parJSON !== 0){
        ecoOut = ecoCalc(parJSON);
    }else {
        ecoOut = 0;
    }

    let userRes = new userResults(username, ecoOut);
    let endThis=countFunc(times,count,userRes);
    if (endThis == 0){
        resultsArray.sort(compare);
        resultsArray.push(myUserRes)
        for ( var y = 0; y<resultsArray.length; y++ ){
            if (resultsArray[y].username == myUserRes.username ){
                var userPos = y + 1;
                break;
            }
        }
        for (var i = 0; i < 3; i++) {
            let lead = i + 1;
            if (i == 0){
                document.getElementById("user_leaderboard").innerHTML = " The Leaderboard is : ";
            }
            document.getElementById("user_leaderboard").innerHTML += "No" + lead + " = " + resultsArray[i].username + " : " + resultsArray[i].percent + "%  |  |  ";
        }
        document.getElementById("user_leaderboard").innerHTML += "The user has No" + userPos + " position in the Leaderboard";
    }
}

// Compare objects
function compare(a, b){
    const ecoA =  parseInt(a.percent);
    const ecoB =  parseInt(b.percent);

    let comparison = 0;
    if (a.percent < b.percent){
        comparison = 1;
    }else if (a.percent > b.percent) {
        comparison = -1
    }
    return comparison;
}

// Object user results
function userResults(user, ecoOut){
    this.username = user;
    this.percent = ecoOut;
}

// Count the users
function countFunc(times, count, userRes){
    resultsArray.push(userRes);
    if (countPush.push(count) == times){
        return 0;
    }
}

// Compare months to see if a timestamp is in the current month
function monthJsonObj(date, json_file){
    let curY = date.getFullYear();
    let curM = date.getMonth() + 1;
    let timeStmp = 0;
    let tmsDate =0;
    let myJSON = "";
    let curJSON = "";
    let parJSON = "";
    let ecoOut = 0;

    for (var i in json_file.locations){
        timeStmp = parseInt(json_file.locations[i].timestampMs,10);
        tmsDate = new Date(timeStmp);
        tmsY = tmsDate.getFullYear();
        tmsM = tmsDate.getMonth() + 1;
        if ( (tmsY ==curY) && (tmsM == curM) ) {
            let curJSON = JSON.stringify(json_file.locations[i]);
            if (myJSON !== ""){
                myJSON += "," + curJSON;
            }else {
                myJSON += curJSON;
            }
        }
    }
    if (myJSON !== "") {
        curJSON = "{ \"locations\" : [" + myJSON + "]}";
        parJSON = JSON.parse(curJSON);
        return parJSON;
    }else {
        return 0;
    }

}

// Calculate the eco transportation
function ecoCalc (json_obj){
    let count = 0;
    let ecoCount = 0;
    let out = 0 ;

    for (var i in json_obj.locations)  {
        if (typeof json_obj.locations[i].activity !== "undefined") {
            for (var y in json_obj.locations[i].activity) {
                for (var k in json_obj.locations[i].activity[y].activity) {
                    switch (json_obj.locations[i].activity[y].activity[k].type) {
                        case "ON_FOOT":
                            ecoCount++;
                            count++;
                            break;
                        case "RUNNING":
                            ecoCount++;
                            count++;
                            break;
                        case "WALKING":
                            ecoCount++;
                            count++;
                            break;
                        case "ON_BICYCLE":
                            ecoCount++;
                            count++;
                            break;
                        case "STILL":
                            ecoCount++;
                            count++;
                            break;
                        default:
                            count++;
                    }
                }
            }
        }
    }
    out = (ecoCount/count) * 100;
    return out.toPrecision(2);
}

// Date ranges from index.php
function dateRange(){
    let monfrom = document.forms["date_range"]["fromMonth"].value;
    let monuntil = document.forms["date_range"]["untilMonth"].value;
    let yearfrom = document.forms["date_range"]["fromYear"].value;
    let yearuntil = document.forms["date_range"]["untilYear"].value;
    let trampa = 0;
    monfrom = parseInt(monfrom);
    monuntil = parseInt(monuntil);
    yearfrom = parseInt(yearfrom);
    yearuntil = parseInt(yearuntil);

    if (monfrom > monuntil){
        trampa = monfrom;
        monfrom = monuntil;
        monuntil = trampa;
    }
    if (yearfrom > yearuntil){
        trampa = yearfrom;
        yearfrom = yearuntil;
        yearuntil = trampa;
    }
    dateValues = [monfrom, monuntil, yearfrom, yearuntil]
    console.log(dateValues);
    document.getElementById("record_percentage").innerHTML ="";
    getData(dataAnalysis);

}

// Outputs in HTML the values on transportation
function dataAnalysis(json_obj){
    let yearfrom = parseInt(dateValues[2]);
    let yearuntil = parseInt(dateValues[3]) + 1;
    let monthfrom = parseInt(dateValues[0]);
    let monthuntil = parseInt(dateValues[1]) + 1;
    let monthBegin = 0;
    let monthEnd = 0;
    let mB = 0;
    let mE = 0;
    let arrayLength = 0;
    let curJSON = "";
    let endJSON = "";
    let parJSON = "";

    for (var i = yearfrom; i < yearuntil; i++) {
        monthBegin = new Date(i, monthfrom);
        monthEnd = new Date(i, monthuntil);
        mB = monthBegin.valueOf();
        mE = monthEnd.valueOf() - 1; // the last milisecond of a month
        rangeValues.push(mB, mE);
    }

    arrayLength = rangeValues.length / 2;
    for (var i = 0; i < arrayLength; i++) {
        var l = i * 2;
        var k = l + 1;
        for (var y in json_obj.locations) {
            let timestampInt = parseInt(json_obj.locations[y].timestampMs);
            if ( rangeValues[l] <= timestampInt && rangeValues[k] >= timestampInt ){
                curJSON = JSON.stringify(json_obj.locations[y]);
                if (endJSON !== ""){
                    endJSON += "," + curJSON;
                }else {
                    endJSON += curJSON;
                }
            }
        }
    }

    if (endJSON !== "") {
        curJSON = "{ \"locations\" : [" + endJSON + "]}";
        parJSON = JSON.parse(curJSON);
        entryPercentage(parJSON);
        return parJSON;

    }else {
        document.getElementById("record_percentage").innerHTML ="No data this length of time!";
    }
}

// The percentage of every location entry of the user
function entryPercentage(json_obj){
    let count = 0;

    let still = 0;
    let inRoadVehicle = 0;
    let inVehicle = 0;
    let exitingVehicle = 0;
    let vehiclePersonalConfidence = 0;
    let walking = 0;
    let running = 0;
    let onFoot = 0;
    let tilting = 0;
    let onBicycle = 0;
    let inRailVehicle = 0;
    let inFourWheelerVehicle = 0;
    let inCar = 0;
    let inTwoWheelerVehicle = 0;
    let inBus = 0;
    let unknown = 0;
    let def = 0;

    let waysOfTransportation = [];
    let transport = [];

    for (var i in json_obj.locations) {
        if (typeof json_obj.locations[i].activity !== "undefined") {
            for (var y in json_obj.locations[i].activity) {
                for (var k in json_obj.locations[i].activity[y].activity) {
                    for (var l in json_obj.locations[i].activity[y].activity[k].type) {
                        switch (json_obj.locations[i].activity[y].activity[k].type) {
                        case "STILL":
                            still++;
                            count++;
                            break;
                        case "IN_ROAD_VEHICLE":
                            inRoadVehicle++;
                            count++;
                            break;
                        case "IN_VEHICLE":
                            inVehicle++;
                            count++;
                            break;
                        case "EXITING_VEHICLE":
                            exitingVehicle++;
                            count++;
                            break;
                        case "WALKING":
                            walking++;
                            count++;
                            break;
                        case "RUNNING":
                            running++;
                            count++;
                            break;
                        case "ON_FOOT":
                            onFoot++;
                            count++;
                            break;
                        case "TILTING":
                            tilting++;
                            count++;
                            break;
                        case "ON_BICYCLE":
                            onBicycle++;
                            count++;
                            break;
                        case "IN_RAIL_VEHICLE":
                            inRailVehicle++;
                            count++;
                            break;
                        case "IN_FOUR_WHEELER_VEHICLE":
                            inFourWheelerVehicle++;
                            count++
                            break;
                        case "IN_CAR":
                            inCar++;
                            count++
                            break;
                        case "IN_TWO_WHEELER_VEHICLE":
                            inTwoWheelerVehicle++;
                            count++
                            break;
                        case "IN_BUS":
                            inBus++;
                            count++;
                            break;
                        case "UNKNOWN":
                            unknown++;
                            count++;
                            break;
                        default:
                        def++;
                        }
                    }
                }
            }
        }
    }
    transport = new transWay("STILL", still.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("IN_ROAD_VEHICLE", inRoadVehicle.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("IN_VEHICLE", inVehicle.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("EXITING_VEHICLE", exitingVehicle.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("WALKING", walking.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("RUNNING", running.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("ON_FOOT", onFoot.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("TILTING", tilting.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("ON_BICYCLE", onBicycle.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("IN_RAIL_VEHICLE", inRailVehicle.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("IN_FOUR_WHEELER_VEHICLE", inFourWheelerVehicle.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("IN_CAR", inCar.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("IN_TWO_WHEELER_VEHICLE", inTwoWheelerVehicle.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("IN_BUS", inBus.toPrecision(2), count);
    waysOfTransportation.push(transport);
    transport = new transWay("UNKNOWN", unknown.toPrecision(2), count);
    waysOfTransportation.push(transport);
    waysOfTransportation.sort(compare)
    for (var out of waysOfTransportation) {
        document.getElementById("record_percentage").innerHTML += out.activity + " : " + out.percent + " % <br>";

    }

}

// Object transport ways
function transWay(act, actCount, count){
    let x
    this.activity = act;
    x = (actCount/count) * 100;
    this.percent = x.toPrecision(2);
}



var resultsArray= [];
var countPush= [];
var myUserRes;
var dateValues= [];
var rangeValues= [];
getData(userScore);
getData(userEntry);
getData(lastUploadDate);
getJsonObj(ecoLeaderboard);
