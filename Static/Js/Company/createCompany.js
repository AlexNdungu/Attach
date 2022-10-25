console.log('hello create');

let companyForm = document.getElementById('companyForm');

//Lets hide the submit button

$('#createComptBtn').hide();

//Hide the modal

$('#memodal').hide();

$('#dotCust').hide();

//The modal message

let modalMessage = document.getElementById('modalMessage');



//This are the input values
let companyEmail = document.getElementById('mail');

let companyPass1 = document.getElementById('pass1');

let companyPass2 = document.getElementById('pass2');

let csrf = document.getElementsByName('csrfmiddlewaretoken');


companyForm.addEventListener('submit', (e)=> {

    e.preventDefault();

    //Here are the input values

    let companyEmailValue = companyEmail.value;
    let companyPass1Value = companyPass1.value;
    let companyPass2Value = companyPass2.value;

    
    let formData = new FormData();

    //Append this values to the formdata
    //Email
    formData.append('email',companyEmailValue);
    //Pass1
    formData.append('pass1',companyPass1Value);
    //Pass2
    formData.append('pass2',companyPass2Value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);


    $.ajax({
        type:'POST',
        url:'/company/createCompany/',
        data: formData,
        processData: false,
        contentType: false,

        //The success
        success: function(response){

            console.log(response.Message)

            if(response.Message == 'Exist'){

                modalMessage.innerHTML = 'Company Already Exist';

                $('#meinnerModal').css('background-color','#d14343')

                $('#memodal').show(200);

                setTimeout(function(){

                    $('#memodal').hide(200);
                    
                },2000);
                //d14343

            }
            else if(response.Message == 'New'){

                modalMessage.innerHTML = 'Company Created Successfully';

                $('#meinnerModal').css('background-color','#369B2D')

                $('#memodal').show(200);

                $('#dotCust').show(200);


                setTimeout(function(){

                    $('#memodal').hide(200);

                    $('#dotCust').hide(200);

                    companyForm.reset();

                    
                },2000);

            }

        },
        error: function(error){
            
            console.log(error)

            modalMessage.innerHTML = 'Company Creation Failed';

            $('#meinnerModal').css('background-color','#d14343')

            $('#memodal').show(200);

            setTimeout(function(){

                $('#memodal').hide(200);
                
            },2000);

        }
    });

});
