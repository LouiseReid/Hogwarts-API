var app = function(){
  var url = "http://hp-api.herokuapp.com/api/characters"
  makeRequest(url, requestComplete);

  var mapCanvas = document.getElementById('map-canvas');
  var context = mapCanvas.getContext('2d')

  function drawFeet(x,y){
    context.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
    context.beginPath();
    context.arc(x, y, 3, 0, 2 * Math.PI, true);
    context.arc(x-5, y-5, 3, 0, 2 * Math.PI, true);
    context.fill();
  }

  mapCanvas.addEventListener("mousemove", function(){
    drawFeet(event.layerX, event.layerY)
  });

  var demCanvas = document.getElementById('dementor-canvas')
  var demContext = demCanvas.getContext('2d')

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
    houseLogo.addEventListener('mouseenter', function(){
      houseLogo.src = "gryfGhost.gif"
      houseLogo.addEventListener('mouseleave', function(){
        houseLogo.src = "gryffindor.png"
      })
    })
  }
  if(student.house === "Slytherin"){
    houseLogo.src = "slytherin.png"
    houseLogo.addEventListener('mouseenter', function(){
      houseLogo.src = "slythGhost.gif"
      houseLogo.addEventListener('mouseleave', function(){
        houseLogo.src = "slytherin.png"
      })
    })
  }
  if(student.house === "Ravenclaw"){
    houseLogo.src = "ravenclaw.png"
    houseLogo.addEventListener('mouseenter', function(){
      houseLogo.src = "raveGhost.gif"
      houseLogo.addEventListener('mouseleave', function(){
        houseLogo.src = "ravenclaw.png"
      })
    })
  }
  if(student.house === "Hufflepuff"){
    houseLogo.src = "hufflepuff.png"
    houseLogo.addEventListener('mouseenter', function(){
      houseLogo.src = "huffGhost.gif"
      houseLogo.addEventListener('mouseleave', function(){
        houseLogo.src = "hufflepuff.png"
      })
    })
  }

}






window.addEventListener('load', app);
