var app = function(){
  var url = "http://hp-api.herokuapp.com/api/characters"
  makeRequest(url, requestComplete);

  var canvas = document.getElementById('main-canvas');
  var context = canvas.getContext('2d')



function drawFeet(x, y) {
  context.beginPath();
  context.arc(x, y, 2, 0, Math.PI * 2, true);
  context.stroke();
}



canvas.addEventListener("mousemove", function(){
  // drawFeet(event.layerX, event.layerY)
  // var img = new Image();
  // img.src = "footprints.png";
  // img.classList.add("footprint")
  // // context.drawImage(img, 0, 2, event.layerX, event.layerY)
  // context.drawImage(img, 0, 2, event.x, event.y)

  drawFeet(event.layerX, event.layerY)
});

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
  var studentDOB = document.getElementById('student-dob')
  var studentAncestry = document.getElementById('student-ancestry')
  var studentStatus = document.getElementById('student-status')
  var studentWand = document.getElementById('student-wand')
  var wandWood = document.getElementById('wand-wood')
  var wandCore = document.getElementById('wand-core')
  var wandLength = document.getElementById('wand-length')
  var studentPatronus = document.getElementById('student-patronus')
  var studentImage = document.getElementById('student-picture')
  var houseLogo = document.getElementById('house-logo')
  var student = students[index];

  studentName.innerText = student.name
  studentDOB.innerText = "DOB: " + student.dateOfBirth
  studentAncestry.innerText = student.ancestry
  studentStatus.innerText = "Current student: " + student.hogwartsStudent
  studentWand.innerText = "Wand:"
  wandWood.innerText = "Wood: " + student.wand.wood
  wandCore.innerText = "Core: " + student.wand.core
  wandLength.innerText = "Length: " + student.wand.length
  studentWand.appendChild(wandWood)
  studentWand.appendChild(wandCore)
  studentWand.appendChild(wandLength)
  studentPatronus.innerText = "Patronus: " + student.patronus
  studentImage.src = student.image

  if(student.house === "Gryffindor"){
    houseLogo.src = "gryffindor.png"
  }
  if(student.house === "Slytherin"){
    houseLogo.src = "slytherin.png"
  }
  if(student.house === "Ravenclaw"){
    houseLogo.src = "ravenclaw.png"
  }
  if(student.house === "Hufflepuff"){
    houseLogo.src = "hufflepuff.png"
  }

}






window.addEventListener('load', app);
