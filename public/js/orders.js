var ref 
function startFireBase(){
	ref = new Firebase("https://sbhacks2015.firebaseio.com/");
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value", function(snapshot) {
		  console.log(snapshot.val());
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

	ref.set("meow");


}
function start(){
	startFireBase()
	startNewsFeed()
}

/*this is where the ajax code for the post request button goes*/
var loginform = document.getElementById("orderForm");
$(loginform).on("submit", function(ev){
  ev.preventDefault();

  $.ajax({
    type: "POST",
    url: "/post",
    data:{
    	Name: document.getElementById("name").innerHTML,
    	Facebook_id: document.getElementById("facebookid").innerHTML,
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
					createTable( i, data[i].Name, data[i].Restaurant, data[i].Food, data[i].TimeRange, data[i].MyLocation, data[i].DeliveryFee, data[i].TimeOfPost);
				}

				$( ".delivrButton" ).bind( "click", function() {
					var myId = this.id;
					sendDeliverInfo(data, myId);		
				});
			},
			xhrFields: {withCredentials: true},
	      		error:function(response2){
	       			console.log("ERROR")
	       		}
		});
	}

	function createTable( request_id, name, restaurant, food, timeRange, myLocation, deliveryFee, timeOfPost){
		var table = $('#appendTable');
		var buttontext = "Delivr";

		table.append(
			"<tr><td>" + name + "</td><td>" + restaurant + "</td><td>" + food + "</td><td>" + timeRange + "</td><td>" + myLocation + "</td><td>" 
			+ deliveryFee + "</td><td><span data-livestamp=\"" + timeOfPost + "\"></span></td><td>" + "<button id=\"" + request_id + "\" type=\"button\" class=\"btn btn-success delivrButton\">" + buttontext + 
			"</td></tr>");

	}

	function sendDeliverInfo(data, myId){
		var myName = document.getElementById("name").innerHTML;
		var eta = 35;
		// console.log(myName)
		// console.log(data[id].Name)
		// console.log(eta)
		// console.log(document.getElementById("facebookid"))
		// button on click button for "submit"
		$.ajax({
			type: "POST",
			url: "http://localhost:5000/deliveryInfo",
			data:{
				NameOfDeliverer:myName,
				NameOfRequester:data[myId].Name,
				ETA: eta,
				Deliverer_id: document.getElementById("facebookid").value,
				Requester_id: data[myId]._id
			},
			success:function(data){
			},
			xhrFields: {withCredentials: true},
			error: function(){
				console.log("ERROR")
			}
		});

	}




	
	

