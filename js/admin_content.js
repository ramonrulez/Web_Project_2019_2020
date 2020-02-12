function deleteDbData(){
    var xhttp = new XMLHttpRequest();
    var phpResponse = "";
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            phpResponse = this.responseText;
            dataDelete(phpResponse);
        }
    }
    xhttp.open("GET","http://localhost/Web_Project_2019-2020/php/delete_db_data.php",true);
    xhttp.send();
}

function dataDelete(reply) {
    if (confirm("You are sure that you want to delete all the data from the database?")){
        document.getElementById("delete_data").innerHTML = reply;
    }
}
