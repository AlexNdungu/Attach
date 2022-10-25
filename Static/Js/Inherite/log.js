let redirectUrl = window.location.protocol + "//" + window.location.host + "/institute/dashboard"

console.log(redirectUrl)


let logForm = document.getElementById('logForm');


//Hide the modal

$('#memodal').hide();

$('#dotCust').hide();

let modalMessage = document.getElementById('modalMessage');


//This are the input values
let instituteEmail = document.getElementById('mail');

let institutePass1 = document.getElementById('pass1');

let csrf = document.getElementsByName('csrfmiddlewaretoken');

logForm.addEventListener('submit', (e)=> {

    e.preventDefault();

    //Here are the input values

    let instituteEmailValue = instituteEmail.value;
    let institutePass1Value = institutePass1.value;

    
    let formData = new FormData();

    //Append this values to the formdata
    //Email
    formData.append('email',instituteEmailValue);
    //Pass1
    formData.append('pass1',institutePass1Value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);


    $.ajax({
        type:'POST',
        url:'/LoginSuccess/',
        data: formData,
        processData: false,
        contentType: false,

        //The success
        success: function(response){

            console.log(response.Message)

            if(response.Message == 'Not'){

                modalMessage.innerHTML = 'Institute Does not Exist';

                $('#meinnerModal').css('background-color','#d14343')

                $('#memodal').show(200);

                setTimeout(function(){

                    $('#memodal').hide(200);
                    
                },2000);
                //d14343

            }

            else if(response.Message == 'Incorrect'){

                modalMessage.innerHTML = 'Incorrect Email Or Password';

                $('#meinnerModal').css('background-color','#d14343')

                $('#memodal').show(200);

                setTimeout(function(){

                    $('#memodal').hide(200);
                    
                },2000);
                //d14343

            }
            else if(response.Message == 'Logged'){

                modalMessage.innerHTML = 'Login Success, Redirecting in 3s';

                $('#meinnerModal').css('background-color','#369B2D')

                $('#memodal').show(200);

                $('#dotCust').show(200);


                setTimeout(function(){

                    $('#memodal').hide(200);

                    $('#dotCust').hide(200);

                    window.location.href = redirectUrl;

                    logForm.reset();

                    
                },3000);

            }

        },
        error: function(error){
            
            console.log(error);

            modalMessage.innerHTML = 'Login Failed';

            $('#meinnerModal').css('background-color','#d14343')

            $('#memodal').show(200);

            setTimeout(function(){

                $('#memodal').hide(200);
                
            },2000);

        }
    })

})