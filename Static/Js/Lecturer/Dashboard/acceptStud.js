//Collect Button and items
let acceptBTN = document.getElementById('acceptBTN');
let csrf = document.getElementsByName('csrfmiddlewaretoken');


acceptBTN.addEventListener('click', ()=> {
    //console.log('hello');
    //console.log(head_id);

    let formData = new FormData();


    formData.append('csrfmiddlewaretoken', csrf[0].value);
    formData.append('stud_id',studID);

    $.ajax({
        type:'POST',
        url:'/lecturer/approveStudNow/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            console.log(response);

            //allConnected
            acceptBTN.classList.remove('acceptBTN');

            acceptBTN.classList.add('btnAllready')

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