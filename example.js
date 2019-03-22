var arr =
  localStorage["arra"] !== undefined ? JSON.parse(localStorage["arra"]) : [];
var Data = function(name, checked) {
  this.name = name;
  this.checked = checked;
};
//check toogle function
var checkfun = function(e) {
  var value = e.target;
  if (value.checked == true) {
    //console.log(localStorage[])
    var parsedArr = JSON.parse(localStorage["arra"]);
    var ind = parsedArr.findIndex(x => {
      return x.name === value.parentNode.childNodes[1].nodeValue;
    });
    parsedArr[ind].checked = true;
    localStorage.setItem("arra", JSON.stringify(parsedArr));
  } else {
    var parsedArr = JSON.parse(localStorage["arra"]);
    var ind = parsedArr.findIndex(x => {
      return x.name === value.parentNode.childNodes[1].nodeValue;
    });
    parsedArr[ind].checked = false;
    localStorage.setItem("arra", JSON.stringify(parsedArr));
  }
};
//loading list from localstorage
if (localStorage["arra"]) {
  var parsedArr =
    localStorage["arra"] !== undefined ? JSON.parse(localStorage["arra"]) : [];
  parsedArr.forEach(element => {
    buildUi(element.name, element.checked);
  });
}
//add delete event
document.getElementById("ol").addEventListener("click", function(e) {
  var t = e.target;
  if (t.classList.contains("dtbtn")) {
    t.parentNode.parentNode.parentNode.removeChild(t.parentNode.parentNode);
    var parsedArr = JSON.parse(localStorage["arra"]);
    var ind = parsedArr.findIndex(x => {
      return x.name === t.parentNode.parentNode.childNodes[1].nodeValue;
    });
    parsedArr.splice(ind, 1);
    localStorage.setItem("arra", JSON.stringify(parsedArr));
  }
});
function addToList() {
  var name = document.getElementById("name").value;
  var parsedArr =
    localStorage["arra"] !== undefined ? JSON.parse(localStorage["arra"]) : [];
  //check for the empty value
  if (!name) {
    alert("Enter Something");
  } else {
    var ind = parsedArr.findIndex(x => {
      return x.name === name;
    });
    if (!(ind > -1)) {
      buildUi(name);
      //	localStorage['list']=document.getElementById('ol').innerHTML;
      arr.push(new Data(name, false));
      //console.log(Array.isArray(arr));
      localStorage.setItem("arra", JSON.stringify(arr));
      document.getElementById("name").value = "";
    } else {
      alert("List already exist");
      document.getElementById("name").value = "";
    }
  }
}
function buildUi(name, check) {
  var chk = Boolean(check);
  //create list element
  var list = document.createElement("li");
  var textNode = document.createTextNode(name);
  var span = document.createElement("span");
  var checkbox = document.createElement("input");
  checkbox.onchange = checkfun;
  checkbox.type = "checkbox";
  checkbox.className = "checkbtn";
  checkbox.checked = chk;
  list.appendChild(checkbox);
  list.appendChild(textNode);
  list.appendChild(span);
  var delbutton = document.createElement("BUTTON");
  delbutton.appendChild(document.createTextNode("Delete"));
  span.appendChild(delbutton);
  delbutton.className = "dtbtn";
  document.getElementById("ol").appendChild(list);
}
