
function mese(m) {

  var date = moment ("2018-" + m, "YYYY-M");

  var day_format = date.format('YYYY-MM');

  var days = date.daysInMonth();


  var month_to_insert = date.format("MMMM");

  var source_month = $("#month").html();

  var handlebars_2 = Handlebars.compile(source_month);

  var source_day = $("#day").html();

  var handlebars_1 = Handlebars.compile(source_day);

  var day_and_date;

  for (var i = 1; i <= days; i++) {

    date_day = day_format + '-' + i;

    day_and_date = moment(date_day) .format('YYYY-MM-DD')


    var part1 = {
      giorno: i,
      mese: month_to_insert,
      giorno_data: day_and_date
    };
    var position_1 = handlebars_1(part1);
    $('.inserted_days').append(position_1);
  }

  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    method: 'GET',
    data : {
      year : 2018,
      month : m - 1
    },
    success: function (data) {
      var comparation_day;
      var text;
      var holiday = data.response;
      $('li').each(function(){
        comparation_day = $(this).attr('date-day');
        for (var j = 0; j < holiday.length; j++) {

          if (comparation_day == holiday[j].date) {
            text = $(this).text();
            $(this).text(text + ' - ' + holiday[j].name).addClass('day_red');
          }
        }
      })
    },
    error : function (request,state,error) {
    alert(" errore. " + error);
    }
  })


  var part2 = {
    nome_mese: month_to_insert
  };
  var position_2 = handlebars_2(part2);
  $('.inserted_month').append(position_2);
}



$(document).ready(function() {
mese(1);
var months = 1;


$('.after').on("click", function() {

  if (months < 12) {
  months++;
  $(".inserted_month").children().remove();
  $(".inserted_days").children().remove();
  mese(months);

  }
})

$('.back').on("click", function() {

  if (months > 1) {
  months--;
  $(".inserted_month").children().remove();
  $(".inserted_days").children().remove();
  mese(months);

  }
})

})
