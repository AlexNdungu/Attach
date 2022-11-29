//Now lets apply for a job
let job_apply = document.getElementById('job_apply');
let applyJobForm = document.getElementById('applyJob');
let btnApply = document.getElementById('sendApply');
let csrf = document.getElementsByName('csrfmiddlewaretoken');
let applsCount = document.getElementById('applsCount');


job_apply.addEventListener('click', ()=> {
    
    //Click the apply btn
    btnApply.click();

})

//Deal with form
applyJobForm.addEventListener('submit', (e)=> {

    e.preventDefault();

    let formData = new FormData();

    formData.append('jobID',jobID);

    formData.append('csrfmiddlewaretoken', csrf[0].value);

    $.ajax({
        type:'POST',
        url:'/student/applyJob/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            //job_act Disable the button
            job_apply.classList.add('job_act');

            //Add the number of applicants
            let newAppCount = parseInt(applsCount.innerHTML) + 1;

            console.log(newAppCount);

            applsCount.innerHTML = newAppCount;

            //Success toast
            const isPDfToast = document.getElementById('isPDfToast');
            
            const toast = new bootstrap.Toast(isPDfToast);

            toast.show();

        },
        error: function(error){

            console.log(error)

            //Failed toast
            const notPDfToast = document.getElementById('notPDfToast');
        
            const toast = new bootstrap.Toast(notPDfToast);

            toast.show();
            
        }
    });

})

