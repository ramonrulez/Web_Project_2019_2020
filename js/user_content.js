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

function userScore(json_file, databaseData){
    //+ var curDate = new Date();
    var curDate = new Date(2019 , 11, 15);
    var curY = curDate.getFullYear();
    var curM = curDate.getMonth() + 1;
    // console.log(curY, curM);

    for (i in json_file.locations){
        var timeStmp = parseInt(json_file.locations[i].timestampMs,10);
        var tmsDate = new Date(timeStmp);
        tmsY = tmsDate.getFullYear();
        tmsM = tmsDate.getMonth() + 1;
        if ( (tmsY ==curY) && (tmsM == curM) ) {
            var myJSON = JSON.stringify(json_file.locations[i]);
        }

        // console.log(timeStmp);
    }
    // console.log(myJSON);
    ecoCalc(myJSON);
    document.getElementById("user_score").innerHTML = "";
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

function ecoCalc (json_obj){
    var count = 0;
    var ecoCount = 0;

    for (i in json_obj.locations)  {
        if (typeof json_obj.locations[i].activity !== "undefined") {
            for (y in json_obj.locations[i].activity) {
                for (k in json_obj.locations[i].activity[y].activity) {
                    count++;
                    switch (json_obj.locations[i].activity[y].activity[k].type) {
                        case "RUNNING":
                            ecoCount++;
                            break;
                        case "WALKING":
                            ecoCount++;
                            break;
                        case "ON_BICYCLE":
                            ecoCount++;
                            break;
                        default:
                    }
                }
            }
        }
    }
    console.log(ecoCount/count + " %");
    // return ecoCount/count
}

getData(userScore);
getData(userEntry);
getData(lastUploadDate);
