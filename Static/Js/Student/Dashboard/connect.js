//Select all the useful info
let connectBTN = document.getElementById('connect');
let csrf = document.getElementsByName('csrfmiddlewaretoken');

connectBTN.addEventListener('click', ()=> {

    //console.log('hello');
    //console.log(head_id);

    let formData = new FormData();


    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('head_id',head_id);

    $.ajax({
        type:'POST',
        url:'/lecturer/sendConnection/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            console.log(response);

            //allConnected
            connectBTN.classList.remove('connect');

            connectBTN.classList.add('allConnected')

            //Connect Success
            const successToast = document.getElementById('successToast');
        
            const toast = new bootstrap.Toast(successToast);

            toast.show();

        },
        error: function(error){

            console.log(error);

            const failedToast = document.getElementById('failedToast');
        
            const toast = new bootstrap.Toast(failedToast);

            toast.show();
            
        }
    });

})