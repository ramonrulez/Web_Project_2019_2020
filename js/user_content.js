//"locations":[{"timestampMs":"1443114623503","latitudeE7":382315600,"longitudeE7":217555312,"accuracy":24,"activity":[{"timestampMs":"1443114448125","activity":[{"type":"TILTING","confidence":100}]},{"timestampMs":"1443114491401","activity":[{"type":"UNKNOWN","confidence":39},{"type":"STILL","confidence":33},{"type":"IN_VEHICLE","confidence":23},{"type":"ON_FOOT","confidence":6},{"type":"WALKING","confidence":6}]}]}

// Get data from Database
function getData(uFunction) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json_obj = JSON.parse(this.responseText);
            var json_file = json_obj.filename;
            loadJson(json_file, uFunction, json_obj);
        }
    }
    xhttp.open("GET","http://localhost/Web_Project_2019-2020/php/get_data.php",true);
    xhttp.send();
}

// Get user's JSON file (Google)
function loadJson(filename, uFunction, databaseData) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json_obj = JSON.parse(this.responseText);
            uFunction(json_obj, databaseData);
        }
    };
    xhttp.open("POST", "http://localhost/Web_Project_2019-2020/uploads/" + filename ,true);
    xhttp.overrideMimeType("application/json");
    xhttp.send();
}

function userScore(json_file){
    var dates = [];
    dates[11] = new Date();
    // dates[11] = new Date(2019 , 11, 15);

    var curY = dates[11].getFullYear();
    var curM = dates[11].getMonth() + 1;
    var ecoOut = [];
    var parJSON;
    var x
    let i = 0;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    for ( i= 0; i< 12; i++){
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

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [ months[dates[0].getMonth()], months[dates[1].getMonth()], months[dates[2].getMonth()], months[dates[3].getMonth()], months[dates[4].getMonth()], months[dates[5].getMonth()], months[dates[6].getMonth()], months[dates[7].getMonth()], months[dates[8].getMonth()], months[dates[9].getMonth()], months[dates[10].getMonth()], months[dates[11].getMonth()] ],
            datasets: [{
                label: '% of Eco Travel',
                data: [ecoOut[0], ecoOut[1], ecoOut[2], ecoOut[3], ecoOut[4], ecoOut[5], ecoOut[6], ecoOut[7], ecoOut[8], ecoOut[9], ecoOut[10], ecoOut[11]],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
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

function userEntry(json_file){
    var fNum = parseInt(json_file.locations[0].timestampMs,10);
    var fDate = new Date(fNum);
    var count = Object.keys(json_file.locations).length - 1;
    var lnum = parseInt(json_file.locations[count].timestampMs,10);
    var lDate = new Date(lnum);

    document.getElementById("user_entries_time").innerHTML = "The entries start at " + fDate.toDateString() + " and ends at " + lDate.toDateString() + ".";
}

function lastUploadDate(json_file, databaseData){
    document.getElementById("user_last_upload").innerHTML = "The last file uploaded at " + databaseData.upload_date + ".";
}

function monthJsonObj(date, json_file){
    var curY = date.getFullYear();
    var curM = date.getMonth() + 1;
    var timeStmp = 0;
    var tmsDate =0;
    var myJSON = "";
    var curJSON = "";
    var parJSON = "";
    var ecoOut = 0;
    let i = 0;

    for (i in json_file.locations){
        timeStmp = parseInt(json_file.locations[i].timestampMs,10);
        tmsDate = new Date(timeStmp);
        tmsY = tmsDate.getFullYear();
        tmsM = tmsDate.getMonth() + 1;
        if ( (tmsY ==curY) && (tmsM == curM) ) {
            var curJSON = JSON.stringify(json_file.locations[i]);
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

function ecoCalc (json_obj){
    var count = 0;
    var ecoCount = 0;
    var out = 0 ;

    for (i in json_obj.locations)  {
        if (typeof json_obj.locations[i].activity !== "undefined") {
            for (y in json_obj.locations[i].activity) {
                for (k in json_obj.locations[i].activity[y].activity) {
                    switch (json_obj.locations[i].activity[y].activity[k].type) {
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
                        case "IN_ROAD_VEHICLE":
                            count++;
                            break;
                        case "IN_VEHICLE":
                            count++;
                            break;
                        case "IN_RAIL_VEHICLE":
                            count++;
                            break;
                        default:
                    }
                }
            }
        }
    }
    out = ecoCount/count
    return out.toPrecision(3);
}

getData(userScore);
getData(userEntry);
getData(lastUploadDate);
