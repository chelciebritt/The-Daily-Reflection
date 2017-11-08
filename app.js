$(document).ready(function () {

let baseURL = 'https://cors-anywhere.herokuapp.com/https://ecncw5rb2h.execute-api.us-east-1.amazonaws.com/dev/todos'

const getDate = () => {
  let date = moment().format("MMM Do YY");
  $('.date').append(date)
}

getDate()

const getWeather = () => {
  $.ajax({
    url: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0a465756c7389af01575f8393da25091/39.7392,-104.9903',
    type: 'GET',
    success: function(result) {
      addWeather(result)
    }
  })

}

const addWeather = (result) => {
  $('.current-weather').append(result.currently.temperature + ascii(176) + " F")
}

function ascii (a) { return String.fromCharCode(a); }

getWeather()

$('#current-time').append(moment().format('LT'))

  $.get(baseURL)
    .then(getToDoList)

function getToDoList(data) {
  $('#full-to-do-list').empty();

    let source = $("#to-do-list-item").html();
    let template = Handlebars.compile(source);
    let context = {data: data};
    let html = template(context)
    $('#full-to-do-list').append(html);
  };

  $('#full-to-do-list').on('click', '#delete-item', function() {
    let value = $(this).attr('data-id')
  $.ajax({
    url: baseURL + '/' + value,
    type: 'DELETE'
  })
    .then(()=> $.get(baseURL)
        .then(getToDoList))

  alert('To-do item deleted! Refreshing now!')
})

$('#add-item').on('click', function(info) {
  info.preventDefault()
  let value = $('#add-field').val()

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://ecncw5rb2h.execute-api.us-east-1.amazonaws.com/dev/todos",
    "method": "POST",
    "headers": {
      "cache-control": "no-cache",
    },
    "data": '{\n\t\"text\": \"'+value+'\"\n}'
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  })
  .then(()=> $.get(baseURL)
      .then(getToDoList))

alert('Item added! Refreshing now!')
$('.clearafter').val('')
})
})
