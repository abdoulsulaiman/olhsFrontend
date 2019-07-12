//$(document).on('click','.delete_item',function () {
//    var path=$("#delete_path").val();
//     var row=$("#clicked_row").val();
//     console.log(path);
//     deleteItem(path,row);
//    $('#delete_modal').modal('hide')
//});

$(function() {
  $("body").tooltip({ selector: "[data-toggle=tooltip]" });
});

function deleteItem(path,listEntities) {
    var username=$.parseJSON(sessionStorage.getItem('a_user')).username;
    var loggedinrole=$.parseJSON(sessionStorage.getItem('a_user')).role;
    var objectId=$.parseJSON(sessionStorage.getItem('a_user')).objectId;
    var firstName=$("#e_fname").val();
    var role='Entity Manager';
   
    $.ajax({
        headers: {
            'bfw_token': 'BFW'+formatDate(new Date(), "dd-MM-yyyy"),
            'doneBy':username
        },
        url:path,
        type : "DELETE", // type of action POST || GET
        //dataType : 'json', // data type
        contentType: 'application/json',
        success : function(result, textStatus, jQxhr) {
            if(result.CODE==200){
            	
                // console.log(result)
                $.alert(result.DESCRIPTION,
                    {
                        type : "success",
                        position : [ 'top-right',
                            [ -0.42, 0 ] ],
                    });
                listEntities();

            }else{
                $.alert(result.DESCRIPTION,
                    {
                        type : "danger",
                        position : [ 'top-right',
                            [ -0.42, 0 ] ],
                    });
            }


        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
            $("#e_save").removeClass('disabled');
            $.alert('Error Occurred'+xhr.responseText,
                {
                    type : "danger",
                    position : [ 'top-right',
                        [ -0.42, 0 ] ],
                });

        }
    });
}