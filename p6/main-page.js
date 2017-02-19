google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


var isEven = false;
var count = 0;
var lastSiteAddedIndex = 0;
var nums = [];
var names = [];
var values = [['Task', 'Hours per Day']];
var created = false;
var time = 0;
    //  Update the count every 1 second
    var x = setInterval(function() {
      if(created){
          time++;
 		     // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(time / (60 * 60 * 24));
          var hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
          var minutes = Math.floor((time % (60 * 60)) / (60));
          var seconds = Math.floor((time % (60)));

  		    // Display the result in the element with id="demo"
          document.getElementById("demo").innerHTML = days + "d " + hours + "h "
          + minutes + "m " + seconds + "s ";
        
          nums[Math.floor( Math.random() * (nums.length))]++;
        
          drawChart();
          updateData();
      }
  }, 1000);

function toggle(div_id) {
  var el = document.getElementById(div_id);
  if ( el.style.display == 'none' ) { el.style.display = 'block';}
  else {el.style.display = 'none';}
}
function blanket_size(popUpDivVar) {
  if (typeof window.innerWidth != 'undefined') {
    viewportheight = window.innerHeight;
  } else {
    viewportheight = document.documentElement.clientHeight;
  }
  if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
    blanket_height = viewportheight;
  } else {
    if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
      blanket_height = document.body.parentNode.clientHeight;
    } else {
      blanket_height = document.body.parentNode.scrollHeight;
    }
  }
  var blanket = document.getElementById('blanket');
  blanket.style.height = blanket_height + 'px';
  var popUpDiv = document.getElementById(popUpDivVar);
  popUpDiv_height=blanket_height/2-200;//200 is half popup's height
  popUpDiv.style.top = popUpDiv_height + 'px';
}
function window_pos(popUpDivVar) {
  if (typeof window.innerWidth != 'undefined') {
    viewportwidth = window.innerHeight;
  } else {
    viewportwidth = document.documentElement.clientHeight;
  }
  if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
    window_width = viewportwidth;
  } else {
    if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
      window_width = document.body.parentNode.clientWidth;
    } else {
      window_width = document.body.parentNode.scrollWidth;
    }
  }
  var popUpDiv = document.getElementById(popUpDivVar);
  //window_width=window_width/2-200;//200 is half popup's width
  //popUpDiv.style.left = window_width + 'px';

}
function popup(windowname) {
  blanket_size(windowname);
  window_pos(windowname);
  toggle('blanket');
  toggle(windowname);   
}

function reset(){
  time = 0;
  if(values.length > 1){
    for(var i = 0; i < nums.length; i++){
      nums[i]=0;
    }
  }
}

function drawChart() {
  updateValues();
  var data = google.visualization.arrayToDataTable(values);

  var options = {
    title: 'My Daily Activities'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}

function updateValues(){
  for(var i = 1; i < nums.length+1; i++){
    values[i] = [names[i-1], nums[i-1]];
  }
}

function updateData(){
  var table = document.getElementById('table1');
  for (var r = 0, n = table.rows.length; r < n; r++) {
    for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
      if (c == 1){
        table.rows[r].cells[c].innerHTML = setTime(nums[r]);
      }
      else{
        if(time >= 1){
          var total = numSum();
          table.rows[r].cells[c].innerHTML = parseFloat((100 * nums[r])/total).toFixed(2) + "%";
        }
        else
          table.rows[r].cells[c].innerHTML = 0 + "%";
      }
    }
  }

}

function setTime(num){
  var days = Math.floor(num / (60 * 60 * 24));
  var hours = Math.floor((num % (60 * 60 * 24)) / (60 * 60));
  var minutes = Math.floor((num % (60 * 60)) / 60);
  var seconds = Math.floor(num % 60);
  return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}

document.getElementById("btnAdd").onclick = function() {
  created = true;
  var temps = document.createElement("div");
  temps.id = "siteBar";
  temps.name = document.getElementById("websiteName").value;
  tempButton = document.createElement("button");
  tempButton.id = "websiteStats";
  tempButton.innerHTML = document.getElementById("websiteName").value;
  temps.appendChild(tempButton);
  tempSwitch1 = document.createElement("label");
  tempSwitch1.className = "switch";
  tempInput1 = document.createElement("input");
  tempInput1.type = "checkbox";
  tempInput1.id = "switch1";
  tempDiv1 = document.createElement("div");
  tempDiv1.className = "slider round";
  tempSwitch1.appendChild(tempInput1);
  tempSwitch1.appendChild(tempDiv1);
  temps.appendChild(tempSwitch1);
  tempSwitch2 = document.createElement("label");
  tempSwitch2.className = "switch";
  tempInput2 = document.createElement("input");
  tempInput2.type = "checkbox";
  tempDiv2 = document.createElement("div");
  tempDiv2.className = "slider round";
  tempSwitch2.appendChild(tempInput2);
  tempSwitch2.appendChild(tempDiv2);
  temps.appendChild(tempSwitch2);
  tempButtonDelete = document.createElement("div");
  tempButtonDelete.id = "deleteButton";
  tempButtonDelete.className = tempButton.innerHTML;
  tempButtonDelete.innerHTML = "<img id='xButton' src='xbutton2.png'>";
  tempButtonDelete.style.width = tempButtonDelete.height;
  console.log(tempButtonDelete.innerHeight);
  console.log(tempButtonDelete.clientHeight);
  temps.appendChild(tempButtonDelete);
  var par = document.getElementById("relevantSites"); 
  par.appendChild(temps);
  tempButtonDelete.onclick = function(){
    var ind = searchValuesByName(this.className);
    console.log(ind);
    document.getElementById("websiteURL").value = this.className;
    if (ind > -1){
      values.splice(ind, 1);
      nums.splice(ind-1,1);
      names.splice(ind-1,1);
      table.deleteRow(ind-1);
      console.log(table.rows.length);
    }
    par.removeChild(this.parentElement);
  };
  nums.push(0);
  names.push(document.getElementById("websiteName").value);
  document.getElementById("websiteName").value = "";
  document.getElementById("websiteURL").value = "";
  var table = document.getElementById('table1');
  var row = table.insertRow(table.rows.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  console.log(table.clientWidth);
  cell1.innerHTML = tempButton.innerHTML;
  cell1.style.width = table.clientWidth/4+'px';
  cell2.innerHTML = "..."; 
  cell2.style.width = table.clientWidth/2.7429+'px';
  cell3.innerHTML = "...%";
  cell3.style.width = table.clientWidth/3+'px';

  var bar = temps;
  bar.style.borderBottom = "1px solid";
  bar.style.backgroundColor = "#EAEAEA";
}

function searchValuesByName(nam){
  for(var i = 1; i < nums.length+1; i++){
     if(values[i][0] == nam)
      return i;
  }
  return 0;
}

function numSum(){
  var temp = 0;
  for(var i = 0; i < nums.length; i++){
     temp += nums[i];
  }
  return temp;
}
