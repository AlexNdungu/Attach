let createHeadForm = document.getElementById('createHeadForm');

let password = document.getElementById('headPass');

let password1 = document.getElementById('headPass1');

let emailval = document.getElementById('email');

let csrf = document.getElementsByName('csrfmiddlewaretoken');


createHeadForm.addEventListener('submit', (e)=> {

    e.preventDefault();

    //console.log('submit');

    let formData = new FormData();

    //Company name
    formData.append('email',emailval.value);
    //Company bio
    formData.append('pass1',password.value);
    //company mission
    formData.append('pass2',password1.value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);

    $.ajax({
        type:'POST',
        url:'/institute/createHead/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response);

            if(response.Message == 'Exist'){

                document.getElementById('toastMess').innerHTML = "User Already Exists!"

                const failedToast = document.getElementById('failedToast');
        
                const toast = new bootstrap.Toast(failedToast);

                toast.show();

            }
            else{

                document.getElementById('closeCreateHead').click();

                createHeadForm.reset();

                const successToast = document.getElementById('successToast');
        
                const toast = new bootstrap.Toast(successToast);

                toast.show();

            }


        },
        error: function(error){
            console.log(error);
            
            const failedToast = document.getElementById('failedToast');
        
            const toast = new bootstrap.Toast(failedToast);

            toast.show();

        }
    });

});