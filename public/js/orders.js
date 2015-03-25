var ref;
var reqCount;
var delCount;

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
	startFireBase();
	startNewsFeed();
	reqCount = 0;
	delCount = 0;
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
      PickedUp:false
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
			url: "/newsfeed",
			data: {
			},
			success:function(data){
				for (var i = 0; i < data.length; i++) {
					if (data[i].PickedUp == false) {
						createTable( data[i].Facebook_id, i, data[i].Name, data[i].Restaurant, data[i].Food, data[i].TimeRange, data[i].MyLocation, data[i].DeliveryFee, data[i].TimeOfPost, data[i]._id);
					}
				}

				$( ".delivrButton" ).bind( "click", function() {
					var myId = this.id;
					$('#foodModal').html(data[myId].Food);
					console.log("gime food");
					$( ".delivrConfirm" ).bind( "click", function() {
						sendDeliverInfo(data, myId);
						deleteInfo(data, myId);
					});							
				});
				$( ".delete-post" ).bind( "click", function() {
					var myId = this.id;
					deleteInfo(data, myId);		
				});
			},
			xhrFields: {withCredentials: true},
    		error:function(response2){
     			console.log("ERROR")
     		}
		});

		var myID = document.getElementById("facebookid").innerHTML; 

		$.ajax({
			type: "GET",
			url: "/newsfeed",
			data: {
			},
			success:function(data){
				button=""
				for (var i = 0; i < data.length; i++){
					if (myID == data[i].Facebook_id){
						reqCount++; 
						$('#requestsTable').append(

							"<tr id=\""+"table-"+data[i]._id+"\"><td>" + data[i].Restaurant + "</td><td>" + data[i].TimeRange + "</td><td>" + data[i].MyLocation + "</td><td>" + "$" 
			+ data[i].DeliveryFee + "</td><td><span data-livestamp=\"" + data[i].TimeOfPost + "\"></span></td><td>" + button+ "</td></tr>"
						);
					}
					$('#requestsCount').html(reqCount);
				}
			}
		});

		$.ajax({
			type: "GET", 
			url: "/getDeliveryInfo",
			data: {
			},
			success:function(data){

				for (var i = 0; i < data.length; i++) {

					if (myID == data[i].Requester_id) {

						$('#requestsTable').append(

							"<tr><td>" + data[i].NameOfRequester + "</td><td>" + data[i].Requester_id + "</td><td>" + data[i].NameOfDeliverer + "</td><td>" + data[i].Deliverer_id + "</td></tr>"
						);

					}

					if (myID == data[i].Deliverer_id) {
						delCount++; 

						$('#deliveriesTable').append(
							"<tr><td>" + data[i].NameOfRequester + "</td><td>" + data[i].Requester_id + "</td><td>" + data[i].NameOfDeliverer + "</td><td>" + data[i].Deliverer_id + "</td></tr>"
						);
					}
				}


				$('#requestsCount').html(reqCount);
				$('#deliveriesCount').html(delCount);
			}
		});

	}





	function createTable( facebook_id, request_id, name, restaurant, food, timeRange, myLocation, deliveryFee, timeOfPost, uni_id){
		var table = $('#appendTable');
		var buttontext = "Delivr";
		var buttontext2 = "Delete";
		//var first = name.substring(0, indexOf(' '));
		//name = first;
		var button = ""
		var id1 = document.getElementById("facebookid").innerHTML;
		if (id1 == facebook_id){

			button = "<button id=\"" + request_id + "\" type=\"button\" class=\"delete-post btn btn-danger changeSize\">" + buttontext2
			 
		}
		else{

			button = "<button id=\"" + request_id + "\" type=\"button\" class=\"changeSize btn btn-success delivrButton\" data-toggle=\"modal\" data-target=\"#delivrModal\">" + buttontext

		}

		table.append(
			"<tr id=\""+"table-"+uni_id+"\"><td>" + name + "</td><td>" + restaurant + "</td><td>" + timeRange + "</td><td>" + myLocation + "</td><td>" + "$" 
			+ deliveryFee + "</td><td><span data-livestamp=\"" + timeOfPost + "\"></span></td><td>" + button+ "</td></tr>"
		);

	}

	function sendDeliverInfo(data, myId){
		var myName = document.getElementById("name").innerHTML;


		//$( ".delivrConfirm" ).bind( "click", function() {
			// console.log("delivrConfirm called");

						
				$.ajax({
					type: "POST",
					url: "/deliveryInfo",
					data:{
						NameOfDeliverer: myName,
						ETA: document.getElementById("eta").value,
						NameOfRequester: data[myId].Name,
						Deliverer_id: document.getElementById("facebookid").innerHTML,
						PhoneNumber: document.getElementById("phone-number").value,
						Requester_id: data[myId].Facebook_id,
						Post_id: data[myId]._id
					},
					success:function(data){
						ref.set(data);
					},
					xhrFields: {withCredentials: true},
					error: function(){
						console.log("ERROR")
					}
				});

			
			
	}


	function deleteInfo(data, myId){
		var myName = document.getElementById("name").innerHTML;

		$.ajax({
			type: "DELETE",
			url: "/delete/post",
			data:{
				theid: data[myId]._id,
				index: myId
			},
			success:function(data){
				console.log(data._id)
				document.getElementById("table-"+data._id).html("")
			},
			xhrFields: {withCredentials: true},
			error: function(){
				console.log("ERROR")
			}
		});


	}





	
	

