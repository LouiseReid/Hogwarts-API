var app = function(){
  var url = "http://hp-api.herokuapp.com/api/characters"
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send()
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var students = JSON.parse(jsonString);
  populateSelectGryffindor(students);
}



var populateSelectGryffindor = function(students){
  var select = document.getElementById('gryffindor-select');
  for(var i = 0; i < students.length; i++){
    var student = students[i];
    if(student.house === "Gryffindor"){
      var option = document.createElement('option');
      option.innerText = student.name;
      option.value = i;
      select.appendChild(option)
    }
  }
}


window.addEventListener('load', app);
