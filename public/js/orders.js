



/*this is where the ajax code for the post request button goes*/
var loginform = document.getElementById("orderForm");
$(loginform).on("submit", function(ev){
  ev.preventDefault();

  $.ajax({
    type: "POST",
    url: "http://localhost:5000/post",
    data:{
    	
      Restaurant:document.getElementById("inputRestaurant").value,
      Food:document.getElementById("inputFood").value,
      TimeRange:document.getElementById("inputTimeRange").value,
      MyLocation:document.getElementById("inputMyLocation").value,
      DeliveryFee:document.getElementById("inputDeliveryPrice").value,
    },
    success:function(response1){
      window.location.reload();

       
    },
    xhrFields: {withCredentials: true},
    error:function(response2){
      console.log("ERROR")
    }
  });
});

function startNewsFeed(){
	$.ajax({
		type: "GET",
		url: "http://localhost:5000/newsfeed",
		data: {
		},
		success:function(data){
			console.log(data.length)
			for (var i = 0; i < data.length; i++){
			createTable(data[i].Restaurant, data[i].Food, data[i].TimeRange, data[i].MyLocation, data[i].DeliveryFee, data[i].TimeOfPost);
			}
			console.log(data[i].Restaurant);
		},
		xhrFields: {withCredentials: true},
      		error:function(response2){
       			console.log("ERROR")
       		}
	});
}


function createTable(restaurant, food, timeRange, myLocation, deliveryFee, timeOfPost){
	var buttonElement = document.createElement("button");
	var table = $('#appendTable');
	table.append("<tr><td>Chang Bhamidipati</td><td>" + restaurant + "</td><td>" + food + "</td><td>" + timeRange + "</td><td>" + myLocation + "</td><td>" 
		+ deliveryFee + "</td><td>" + timeOfPost + "</td><td>" + buttonElement + "</td></tr>");


}



/*function createRequest(restaurant, food, timeRange, myLocation, deliveryFee, timeOfPost){

	var ordersList = document.getElementById("ordersList")

	var nameElement = document.createElement("span");
	nameElement.innerHTML = "Requested by " + "Sridatt Bhamidipati" //name from facebook
	ordersList.appendChild(nameElement);

	ordersList.appendChild(document.createElement("br"));

	var restaurantElement = document.createElement("span");
	restaurantElement.innerHTML = "Restaurant: " + restaurant;
	ordersList.appendChild(restaurantElement);

	ordersList.appendChild(document.createElement("br"));

	var foodElement = document.createElement("span");
	foodElement.innerHTML = "Food: " + food;
	ordersList.appendChild(foodElement);

	ordersList.appendChild(document.createElement("br"));

	var timeRangeElement = document.createElement("span");
	timeRangeElement.innerHTML = "Time Range: " + timeRange;
	ordersList.appendChild(timeRangeElement);

	ordersList.appendChild(document.createElement("br"));

	var myLocationElement = document.createElement("span");
	myLocationElement.innerHTML = "Location: " + myLocation;
	ordersList.appendChild(myLocationElement);

	ordersList.appendChild(document.createElement("br"));

	var deliveryFeeElement = document.createElement("span");
	deliveryFeeElement.innerHTML = "Delivery Fee: $" + deliveryFee;
	ordersList.appendChild(deliveryFeeElement);

	ordersList.appendChild(document.createElement("br"));

	var timeOfPostElement = document.createElement("span");
	timeOfPostElement.innerHTML = "Posted on " + timeOfPost;
	ordersList.appendChild(timeOfPostElement);

	ordersList.appendChild(document.createElement("br"));

	var buttonElement = document.createElement("button");
	buttonElement.innerHTML = "Delivr";
	ordersList.appendChild(buttonElement);

	ordersList.appendChild(document.createElement("br"));
	ordersList.appendChild(document.createElement("br"));

} */


