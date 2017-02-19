google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


// Set the date we're counting down to
var countDownDate = new Date("Feb 9, 2017 15:53:25").getTime();
var now1 = new Date().getTime();
var now = 0;
var nums = [0,0,0,0];
		// Update the count every 1 second
			var x = setInterval(function() {
      // Get todays date and time
      now = new Date().getTime();
      now = now - now1;
 		 // Time calculations for days, hours, minutes and seconds
 			var days = Math.floor(now / (1000 * 60 * 60 * 24));
  			var hours = Math.floor((now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  			var minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60));
  			var seconds = Math.floor((now % (1000 * 60)) / 1000);

  		// Display the result in the element with id="demo"
  			document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  			+ minutes + "m " + seconds + "s ";
        if(now >= 1000){
          nums[Math.floor( Math.random() * 4)]++;
        }
        drawChart();
        updateData();
  		// If the count down is finished, write some text 
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
  now1 = new Date().getTime();
  for(var i = 0; i < nums.length; i++){
    nums[i]=0;
  }
}

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Facebook',     nums[0]],
    ['Twitter',      nums[1]],
    ['Youtube',  nums[2]],
    ['Reddit', nums[3]],
    ]);

  var options = {
    title: 'My Daily Activities'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}

function updateData(){
  var table = document.getElementById('table1');
  for (var r = 1, n = table.rows.length; r < n; r++) {
    for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
      if (c == 1){
        table.rows[r].cells[c].innerHTML = setTime(nums[r-1]);
      }
      else{
        if(now >= 1000)
          table.rows[r].cells[c].innerHTML = Math.round((nums[r-1])/Math.floor(now/1000) * 10000)/100 + "%";
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
