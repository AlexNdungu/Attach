console.log(student_id)

//Add event listener to accept button
let accept = document.getElementById('accept');
let csrf = document.getElementsByName('csrfmiddlewaretoken');
let appSeeSpan = document.getElementById('appSeeSpan');

accept.addEventListener('click', ()=> {
    console.log('click');

    let formData = new FormData();

    //Address
    formData.append('job_id',job_id);
    formData.append('stud_id',student_id);
    formData.append('csrfmiddlewaretoken', csrf[0].value);


    $.ajax({
        type:'POST',
        url:'/company/approveJob/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response)

            //Change btn class

            appSeeSpan.innerHTML = 'Approved';

            accept.classList.remove('accBtn');

            accept.classList.add('done');

            const successToast = document.getElementById('successToast');
        
            const toast = new bootstrap.Toast(successToast);

            toast.show();

        },
        error: function(error){
            console.log(error)

            const failedToast = document.getElementById('failedToast');
        
            const toast = new bootstrap.Toast(failedToast);

            toast.show();

        }
    });
})

