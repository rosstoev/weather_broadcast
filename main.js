$(document).ready(function () {
 let body = $('body');
 let date = new Date();
 let hour = date.getHours();
 let tempDiv = $('#temp');
 let skycons = new Skycons({"color": "#e2da4e"});
 let geoLocation = 'http://api.ipapi.com/api/check?access_key=94abcfcb7dc5a223af6c626c96aac000';

 function changePic(data) {
     switch (data){
         case  'clear-day':
             body.addClass('clear-day');
             break;
         case 'cloudy':
             body.addClass('clear-day');
             break;
         case 'partly-cloudy-day':
             body.addClass('clear-day');
             break;
         case 'clear-night':
             body.addClass('night-cond');
             break;
         case 'partly-cloudy-night':
             body.addClass('night-cond');
             break;
         case 'snow':
             body.addClass('winter');
             break;
         case 'sleet':
             body.addClass('winter');
             break;
         case 'rain':
             body.addClass('rain');
             break;
         case 'wind':
             body.addClass('rain');
             break;
         case 'fog':
             body.addClass('rain');
             break;
         case 'Drizzle':
             body.addClass('rain');
             break;
         case 'Thunderstorm':
             body.addClass('rain');
             break;
     }
 }
 function nightPic(data) {
     if (data>=20 || data<6){
         body.attr('id', 'night');
     }
     else {
         body.removeAttr('id','night');
     }
 }
    $.ajax({
         url: geoLocation,
         dataType: "jsonp",
         method: 'get',
         success: function (data) {

            let latitude = data.latitude;
            let longitude = data.longitude;
            let city = data.region_name;
            $('#city-name').html(city);

             let apiKey = 'f18ccd18c32442c474e03e6237d9f1c1';
             let urlWeather = 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude + '?units=si';

             $.ajax({
                 url: urlWeather,
                 dataType: "jsonp",
                 method: 'get',

                 success: function (data) {
                     let currTemp = Math.floor(data.currently.temperature);
                     let condWeather = data.currently.summary;
                     let icon = data.currently.icon;
                     skycons.set('icon-sky', icon);
                     skycons.play();

                     let farenheitTemp = Math.floor((currTemp * 1.8) + 32);


                     $('#condition-weather').html(condWeather);
                     tempDiv.html(currTemp + '&#176;' + 'C');
                     changePic(icon);

                     $('#btn-temp-f').click(function () {
                         tempDiv.html(farenheitTemp + '&#176;' + 'F' );

                     });
                     $('#btn-temp-c').click(function () {
                         tempDiv.html(currTemp + '&#176;' + 'C');
                     });


                 }

             });
         }
     });
    nightPic(hour);
});