console.log('hello create institute');

let instituteForm = document.getElementById('companyForm');

//Lets hide the submit button

$('#createInstBtn').hide();

//Hide the modal

$('#memodal').hide();

$('#dotCust').hide();

//The modal message

let modalMessage = document.getElementById('modalMessage');


//This are the input values
let instituteEmail = document.getElementById('mail');

let institutePass1 = document.getElementById('pass1');

let institutePass2 = document.getElementById('pass2');

let csrf = document.getElementsByName('csrfmiddlewaretoken');


instituteForm.addEventListener('submit', (e)=> {

    e.preventDefault();

    //Here are the input values

    let instituteEmailValue = instituteEmail.value;
    let institutePass1Value = institutePass1.value;
    let institutePass2Value = institutePass2.value;

    
    let formData = new FormData();

    //Append this values to the formdata
    //Email
    formData.append('email',instituteEmailValue);
    //Pass1
    formData.append('pass1',institutePass1Value);
    //Pass2
    formData.append('pass2',institutePass2Value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);


    $.ajax({
        type:'POST',
        url:'/institute/createInstitute/',
        data: formData,
        processData: false,
        contentType: false,

        //The success
        success: function(response){

            console.log(response.Message)

            if(response.Message == 'Exist'){

                modalMessage.innerHTML = 'Institute Already Exist';

                $('#meinnerModal').css('background-color','#d14343');

                $('#memodal').show(200);

                setTimeout(function(){

                    $('#memodal').hide(200);
                    
                },2000);
                //d14343

            }
            else if(response.Message == 'New'){

                modalMessage.innerHTML = 'Institute Created Successfully';

                $('#meinnerModal').css('background-color','#369B2D');

                $('#memodal').show(200);

                $('#dotCust').show(200);


                setTimeout(function(){

                    $('#memodal').hide(200);

                    $('#dotCust').hide(200);

                    instituteForm.reset();

                    
                },2000);

            }

        },
        error: function(error){
            
            console.log(error);

            modalMessage.innerHTML = 'Institute Creation Failed';

            $('#meinnerModal').css('background-color','#d14343')

            $('#memodal').show(200);

            setTimeout(function(){

                $('#memodal').hide(200);
                
            },2000);
            //d14343

        }
    })

})