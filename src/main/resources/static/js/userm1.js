


function myum_url() {
  var myum_url = "http://localhost:8002";
  return myum_url;
}


function olhs_url() {
  var olhs_url = "http://localhost:8003";

  return olhs_url;
}

function token(){
	var token="kkdkshbsbsnmsbbndzmasbvzskdsjnfkn";
	return token;
}
/*
 * Function for Login
 * */
$(document).on('submit','#l_form',function (e){
	e.preventDefault();
	if($("#l_form").valid()){
	
	var form_data = $("#l_form").serializeToJSON({
	    // options here  
	});
	
		$.ajax({ 
            url: myum_url()+'/users/login', 
            type : "POST", // type of action POST || GET
            dataType : 'json', // data type
            data : JSON.stringify(form_data), // post data || get data
            contentType: 'application/json',
            success : function(result, textStatus, jQxhr) {
                // you can see the result from the console
                // tab of the developer tools
            	
            	if(result.CODE==200){
            		//var user=$.parseJSON(result.OBJECT.user); 
            		//alert(result.OBJECT.user.active);
            		
            		
            // check if user is active
           if(result.OBJECT.user.active=='ACTIVE'){
        	// check if user is not locked
        	if(result.OBJECT.user.userLocked==false){
        	// check if it's not default password
        		
        		sessionStorage.removeItem('attemp');
        		login_user_in(result.OBJECT.user, result.OBJECT.permission);
        		
        	}else{
        		$.alert("The account is locked. Contact Administrator",
						{
							type : "danger",
							position : [ 'center',
									[ -0.42, 0 ] ],
						});
        	}   
           }else{
        	   $.alert("Your Account is not active. Contact Administrator",
						{
							type : "danger",
							position : [ 'center',
									[ -0.42, 0 ] ],
						}); 
           } 		

            // clear attempt
            		
            }else{
            	if(result.DESCRIPTION=='Username or password is incorrect'){
            		var attempt=sessionStorage.getItem('attemp');
            		if(sessionStorage.getItem('attemp')==null){
            			attempt=1
            		}else{
            			attempt=(parseFloat(sessionStorage.getItem('attemp'))+1);
            		}
            		sessionStorage.setItem('attemp', attempt);
            		//alert('attempt recorded'+attempt);
            	}
            	$.alert(result.DESCRIPTION,
						{
							type : "danger",
							position : [ 'center',
									[ -0.42, 0 ] ],
						});
            	
            	if(attempt>=3){
            		// lock the account
            		var username=$("#l_username").val();
            		
            		lock_user(username);
            		// deny the user to login again. Disable the button for login with message
            		$("#l_account_locked").text('After 3 unsuccessful attempt, the account is locked. Contact Administrator');
            		$("#l_button").prop('disabled',true);
            		
            		
            	}
            }
            	//alert(result.username+" "+result.password+" "+result.applicationName);
                console.log(result);
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
                $.alert('Error Occurred',
						{
							type : "danger",
							position : [ 'center',
									[ -0.42, 0 ] ],
						});
                
            }
        });
		
		
	}
});


// lock user
function lock_user(username){
	
	$.ajax({ 
        url: um_url()+'/users/lock/'+username, 
        type : "POST", // type of action POST || GET
        dataType : 'json', // data type
        data : {}, // post data || get data
        contentType: 'application/json',
        success : function(result, textStatus, jQxhr) {
            // you can see the result from the console
            // tab of the developer tools

        	//alert(result.username+" "+result.password+" "+result.applicationName);
            console.log(result);
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            $.alert('Error Occurred',
					{
						type : "danger",
						position : [ 'center',
								[ -0.42, 0 ] ],
					});
            
        }
    });
	
}

// change default password
$(document).on('click','#change_default_p_button',function (){
	if($("#change_default_p_form").valid()){
			
		var change_default_p_where=$("#change_default_p_where").val();
		var form_data = $("#change_default_p_form").serializeToJSON({
		    // options here  
		});
		
			$.ajax({ 
	            url: um_url()+'/users/change_password', 
	            type : "POST", // type of action POST || GET
	            dataType : 'json', // data type
	            data : JSON.stringify(form_data), // post data || get data
	            contentType: 'application/json',
	            success : function(result, textStatus, jQxhr) {
	            	if(result.CODE==200){
	            	if(change_default_p_where=='login'){	
	            	login_user_in(result.OBJECT.user, result.OBJECT.permission);
	            	}else{
	            		$("form").each(
								function() {
									this.reset();
								});
	            		$("#change_password").modal('hide');
	            		$.alert(result.DESCRIPTION,
								{
									type : "success",
									position : [ 'top-right',
											[ -0.42, 0 ] ],
								});
	            	}
	            	}else{
	            		$.alert(result.DESCRIPTION,
								{
									type : "danger",
									position : [ 'center',
											[ -0.42, 0 ] ],
								});
	            	}	                
	            },
	            error: function(xhr, resp, text) {
	                console.log(xhr, resp, text);
	                $.alert('Error Occurred',
							{
								type : "danger",
								position : [ 'center',
										[ -0.42, 0 ] ],
							});
	                
	            }
	        })
			
	}
});

// log the user in

function login_user_in(user, permission){
	sessionStorage.setItem('a_user', JSON.stringify(user));
	//sessionStorage.setItem('user_username', user.username);
	//sessionStorage.setItem('user_uuid', user.uuid);
	sessionStorage.setItem('permission', JSON.stringify(permission)); 	
	$.ajax({ 
        url: '/add_user/session', 
        type : "POST", // type of action POST || GET
        //dataType : 'json', // data type
        data : {username:user.username,names:user.names,role:user.role,email:user.emailAddress}, // post data || get data
       // contentType: 'application/json',
        asynch:false,
        success : function(result, textStatus, jQxhr) {
			
			//if (user.role != 'SuperAdmin') {

				//setTimeout(() => {

				$.ajax({

					headers: {
						'olhs_token': 'OLHS' + formatDate(new Date(), "dd-MM-yyyy"),
					},
					url: olhs_url() + '/registrants/byid/' + user.objectId,
					type: "GET", // type of action POST || GET
					// dataType : 'json', // data type
					data: {}, // post data || get data
					//contentType: 'application/json',
					async: false,
					success: function (result, textStatus, jQxhr) {

						if (result.CODE == 200) {
							console.log(result.OBJECT);
							add_registrant_in_session(result.OBJECT);
						}


					},
					error: function (xhr, resp, text) {
						console.log(xhr, resp, text);



					}
				});

				//}, 2000); 


//			}else{
//				location.href = "dashboard";
//			}
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            $.alert('Error Occurred',
					{
						type : "danger",
						position : [ 'center',
								[ -0.42, 0 ] ],
					});
            
        }
    });
	
	
			
}


/*
 * Function to add registrant in session
 * 
 * */


function add_registrant_in_session(reg){
	sessionStorage.setItem('a_registrant', JSON.stringify(reg));
		
	var user={
				names:reg.names,
				email:reg.email,
				phone:reg.phone,
				identity:reg.identity,
				uuid:reg.uuid,
				address:reg.address,
				gender:reg.gender,
				file:reg.file,
				registrantCategory:reg.registrantCategory,
				
			}
			
	$.ajax({ 
        
		headers: {
	        
           'olhs_token': 'OLHS'+formatDate(new Date(), "dd-MM-yyyy"),
	        
	    },
		url: 'add_registrant/session', 
        type : "POST", // type of action POST || GET
        dataType : 'json', // data type
        data : JSON.stringify(user), // post data || get data
		contentType: 'application/json',
        success : function(result, textStatus, jQxhr) {

			location.href="dashboard";
			// alert(result);
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
           
        }
    });
	
	
}








/*
 * Check current password
 * 
 * */


$(document).on('blur','#chang_p_currentpassword',function(){
	if($("#chang_p_currentpassword").valid()){
		//alert('hello');
		var current_password=$("#chang_p_currentpassword").val();
		var username=$.parseJSON(sessionStorage.getItem('a_user')).username;
		$.ajax({ 
	        url: um_url()+'/users/check_current_password/'+username+'/'+current_password, 
	        type : "GET", // type of action POST || GET
	        dataType : 'json', // data type
	        data : {}, // post data || get data 
	        contentType: 'application/json',
	      //  asynch:false,
	        success : function(result, textStatus, jQxhr) {
	           if(result.CODE==200){
	        	   $(".change_p_from_side_bar").removeClass('disabled');
	        	    
	           }else{
	        	   $(".change_p_from_side_bar").addClass('disabled');
	        	   $("#error_current_p").text('Incorrect current password');
	           }
	        },
	        error: function(xhr, resp, text) {
	            console.log(xhr, resp, text);
	            $.alert('Error Occurred'+xhr.responseText,
						{
							type : "danger",
							position : [ 'center',
									[ -0.42, 0 ] ],
						});
	            
	        }
	    });
		
		
	}else{
		$(".change_p_from_side_bar").addClass('disabled');
	}
});

// enable change password button when writing current password
$(document).on('keyup','#chang_p_currentpassword',function(){
	 $("#error_current_p").text(''); 
	$(".change_p_from_side_bar").removeClass('disabled');
});


// logout 

$(document).on('click','#logout_button',function (){
	
	
	$.ajax({ 
        url: '/logout', 
        type : "GET", // type of action POST || GET
        //dataType : 'json', // data type
        data : {}, // post data || get data 
        //contentType: 'application/json',
      //  asynch:false,
        success : function(result, textStatus, jQxhr) {
           if(result=='OK'){
        	   sessionStorage.removeItem('a_user');
        		sessionStorage.removeItem('permission');
        		sessionStorage.removeItem('a_registrant');
        		location.href="/";
        		
           }
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            $.alert('Error Occurred'+xhr.responseText,
					{
						type : "danger",
						position : [ 'center',
								[ -0.42, 0 ] ],
					});
            
        }
    });
	
});




//for formatting date

function formatDate(time, format) {
	var t = new Date(time);
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch (a) {
		case 'yyyy':
			return tf(t.getFullYear());
			break;
		case 'MM':
			return tf(t.getMonth() + 1);
			break;
		case 'mm':
			return tf(t.getMinutes());
			break;
		case 'dd':
			return tf(t.getDate());
			break;
		case 'HH':
			return tf(t.getHours());
			break;
		case 'ss':
			return tf(t.getSeconds());
			break;
		}
	})
}



