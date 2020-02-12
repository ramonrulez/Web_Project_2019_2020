function dataDelete() {
    var reply = "";
    if (confirm("You are sure that you want to delete all the data from the database?")){
        reply = "The data deleted from the database!";
    }
    document.getElementById("delete_data").innerHTML = reply;
}
