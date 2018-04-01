/* eslint-disable */
function getSuggestions(subString) {
  var url = '/suggestions&search=' + subString;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var resObj = JSON.parse(this.responseText);
      renderSuggestion(resObj);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

function getOverview(idString) {
  var url = '/forecast&ticker=' + idString;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var resObj = JSON.parse(this.responseText);
      renderOverview(resObj);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}
