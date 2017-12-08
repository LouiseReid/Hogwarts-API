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
  populateSelect(students);

}


var populateSelect = function(students){
  var select = document.getElementById('students-select');
  students.forEach(function(student){
    var option = document.createElement('option');
    option.innerText = student.name;
    select.appendChild(option)
  })
selectChanged(select.selectedIndex, students);
select.addEventListener('change', function(){
  selectChanged(select.selectedIndex, students);
}.bind(this));
}


var selectChanged = function(index, students){
  var studentName = document.getElementById('student-name')
  var student = students[index];
  studentName.innerText = student.name
}








window.addEventListener('load', app);
