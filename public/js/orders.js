




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
				for (var i = 0; i < data.length; i++) {
					createTable( i, data[i].Restaurant, data[i].Food, data[i].TimeRange, data[i].MyLocation, data[i].DeliveryFee, data[i].TimeOfPost);
				}

				$( ".delivrButton" ).bind( "click", function() {
					var myId = this.id;
					alert(myId);
				});
			},
			xhrFields: {withCredentials: true},
	      		error:function(response2){
	       			console.log("ERROR")
	       		}
		});
	}

	function createTable( request_id, restaurant, food, timeRange, myLocation, deliveryFee, timeOfPost){
		var table = $('#appendTable');
		var name = "ChangMikeSridatt";
		var buttontext = "Delivr";

		table.append(
			"<tr><td>" + name + "</td><td>" + restaurant + "</td><td>" + food + "</td><td>" + timeRange + "</td><td>" + myLocation + "</td><td>" 
			+ deliveryFee + "</td><td>" + timeOfPost + "</td><td>" + "<button id=\"" + request_id + "\" type=\"button\" class=\"btn btn-success delivrButton\">" + buttontext + "</td></tr>");

	}


		ordersList.appendChild(document.createElement("br"));
		ordersList.appendChild(document.createElement("br"));

	
	

