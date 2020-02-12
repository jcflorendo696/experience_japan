
function getCityDetails(city){
	let desc = "";
	const cities = [
					{ "city" : "Tokyo", "desc": "Tokyo, Japans busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens. The city\'s many museums offer exhibits ranging from classical art (in the Tokyo National Museum) to a reconstructed kabuki theater (in the Edo-Tokyo Museum)."},
					{ "city" : "Yokohama", "desc": "Yokohama, a Japanese city south of Tokyo, was one of the first Japanese ports opened to foreign trade, in 1859. It contains a large Chinatown with hundreds of Chinese restaurants and shops. It\'s also known for Sankei-en Garden, a botanical park containing preserved Japanese residences from different eras, and the seaside Minato Mirai district, site of the 296m Landmark Tower."},
					{ "city" : "Sapporo", "desc": "Sapporo, capital of the mountainous northern Japanese island of Hokkaido, is famous for its beer, skiing and annual Sapporo Snow Festival featuring enormous ice sculptures. The Sapporo Beer Museum traces the city\'s brewing history and has tastings and a beer garden. Ski hills and jumps from the 1972 Winter Olympics are scattered within the city limits, and Niseko, a renowned ski resort, is nearby."},
					{ "city" : "Kyoto", "desc": "Kyoto, once the capital of Japan, is a city on the island of Honshu. Its famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It’s also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district."},
					{ "city" : "Osaka", "desc": "Osaka is a large port city and commercial center on the Japanese island of Honshu. Its known for its modern architecture, nightlife and hearty street food. The 16th-century shogunate Osaka Castle, which has undergone several restorations, is its main historical landmark. It\'s surrounded by a moat and park with plum, peach and cherry-blossom trees. Sumiyoshi-taisha is among Japan\'s oldest Shinto shrines."},
					{ "city" : "Nagoya", "desc": "Nagoya, capital of Japans Aichi Prefecture, is a manufacturing and shipping hub in central Honshu. The citys Naka ward is home to museums and pachinko (gambling machine) parlors. Naka also includes the Sakae entertainment district, with attractions like the Sky-Boat Ferris wheel, which is attached to a mall. In northern Naka is Nagoya Castle, a partly reconstructed 1612 royal home displaying Edo-era artifacts."}
				]

	cities.map( item => {
		if( city == item.city){
			desc = item.desc;
		}
	});

	return desc;
}

function getDate(unix){

/*
0 - Sunday
1 - Monday
2 - Tuesday
3 - Wednesday
4 - Thursday
5 - Friday
6 - Saturday
*/
	let days = [
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat"
			];

	let date = new Date(unix * 1000);

	return days[date.getDay()];
}

function isEmpty(prop){
	return (prop == undefined) ? "" : prop+".";
}

function getWeather(){
	const mykey = "169f803a8d0abf93031bbadf4a7ca418";
	const city 	= document.getElementById("city").value;
	const url 	= "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+mykey+"&units=metric";
	

	fetch(url)
		.then( response => response.json() )
		.then( data => {

			let iconCode = data.list[0].weather[0].icon;
			let iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
			
			//Build weather widget
			$(".card").removeClass("d-none");
			$("#cardHeader").text(city);
			$("#cardBody .summary").text( getCityDetails(city) );
			$("#details-table td:nth-child(2)").text( data.city.population );
			$("#details-table td:nth-child(4)").text( data.city.country );
			$(".weather .temp").text( data.list[0].main.temp + " C\u00B0");
			$(".weather .humidity").text( "Humidity: " + data.list[0].main.humidity + "%");
			$(".weather-icon img").attr("src", iconURL);
			$(".description").text( data.list[0].weather[0].description );

			//Forecast List
			$(".forecast-list ul li").remove();

			//Show past forcast in a list.
			data.list.map( (item, index, arr) => {

				if( index < 7 ){
					let listIcon = item.weather[0].icon;
					let listTemp = item.main.temp;
					let iconURL = "http://openweathermap.org/img/wn/" + listIcon + ".png";
					let listDate = item.dt;

					$(".forecast-list ul").append("<li><div class='text-center'>"+getDate(listDate)+"</div><img src='"+iconURL+"'><div class='list-temp'>"+listTemp+" C\u00B0</div></li>");
					
				}
			});

		});

		// Venues 
		$(".venues-header").text("Sights in "+city);
		showVenues(city);
}


function showVenues(city){
	const id 		= "ZATB4YZXJXKO1NPGXDEKBM03VOKQXRSTLHEYLARLNFB51X3S";
	const secret 	= "GBVICPZJQFHU2ETEQFES2XV3SNEYZEOAWWSNATVIFYQDFMEW";
	const url 		= `https://api.foursquare.com/v2/venues/search?near=${city},JP&limit=6&client_id=${id}&client_secret=${secret}&categoryId=4d4b7104d754a06370d81259&v=20200101`;
	let venues 		= "";

	fetch(url)
		.then( res => res.json())
		.then( data => {

			$(".venue-list").children().remove();
			venues = data.response.venues;
			//console.log(venues[0].id);
			//showVenuesTips(venues[0].id);
			venues.map( (item, index)=>{
				$(".venue-list").append(`<h5> - ${item.name} </h5>`);
				$(".venue-list").append(`<p class='v-address'>Address: ${ isEmpty(item.location.formattedAddress[2]) } ${ isEmpty(item.location.formattedAddress[1]) } ${ isEmpty(item.location.formattedAddress[3]) } </p>`);
			});
			
		})	
}