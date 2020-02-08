
var jsfile = "setA.json";

// Get data that is needed from Database
function getData(uFunction) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json_obj = JSON.parse(this.responseText);
            var json_file = json_obj.filename;
            loadJson(json_file, uFunction);
        }
    }
    xhttp.open("GET","http://localhost/Web_Project_2019-2020/php/get_data.php",true);
    xhttp.send();
}

// Load JSON file with Geo Data
function loadJson(filename, uFunction) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json_obj = JSON.parse(this.responseText);
            uFunction(json_obj);
        }
    };
    xhttp.open("POST", "http://localhost/Web_Project_2019-2020/uploads/" + filename ,true);
    xhttp.overrideMimeType("application/json");
    xhttp.send();
}


function userEntry(json_file){

    var fNum = parseInt(json_file.locations[0].timestampMs,10);
    var fDate = new Date(fNum);
    var count = Object.keys(json_file.locations).length - 1;
    var lnum = parseInt(json_file.locations[count].timestampMs,10);
    var lDate = new Date(lnum);

    document.getElementById("user_entries_time").innerHTML = "The entries start at " + fDate.toDateString() + " and ends at " + lDate.toDateString() + ".";

    // for (i in json_file.locations){
    //     num = parseInt(json_file.locations[i].timestampMs,10);
    //     if (seconds > 0) {
    //         seconds -= num;
    //     } else {
    //         seconds += num;
    //     }
    // }
    // console.log(date);
    // document.getElementById("demo").innerHTML = seconds;
}

function lastUploadDate(json_file){
    var count = Object.keys(json_file.locations).length - 1;
    var lud = parseInt(json_file.locations[count].timestampMs,10);
    var lDate = new Date(lud);

    document.getElementById("user_last_upload").innerHTML = "The last file uploaded at " + lDate.toDateString() + ".";
}

getData(userEntry);
getData(lastUploadDate);
// loadDoc();
// document.getElementById("user_data").innerHTML = jsonFile;
