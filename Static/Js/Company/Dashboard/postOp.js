//Get the form 
let postJobNow = document.getElementById('postJobNow');

//the inputs
let jobName = document.getElementById('post_name');
let jobLevel = document.getElementById('level_put');
let jobLocation = document.getElementById('level_put1');
let jobBody = document.getElementById('richEdit');

//Get the buttons
let submitJobPost = document.getElementById('submitJobPost');
let nowSubmit = document.getElementById('clickPostJob');

let csrf = document.getElementsByName('csrfmiddlewaretoken');

//Now click event

submitJobPost.addEventListener('click', ()=> {

    nowSubmit.click();

});

//Now the form events
postJobNow.addEventListener('submit', (e)=> {

    e.preventDefault();

    let formData = new FormData();

    //name
    formData.append('name',jobName.value);
    //level
    formData.append('level',jobLevel.value);
    //location
    formData.append('location',jobLocation.value);
    //body
    formData.append('body',jobBody.innerHTML);
    //Token
    formData.append('csrfmiddlewaretoken', csrf[0].value);


    $.ajax({
        type:'POST',
        url:'/company/postNewJob/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            console.log(response);

            document.getElementById('goToChange').click();

            //postJobNow.reset();

            //Reset the form
            jobName.value = '';

            jobLevel.value = '';

            jobLocation.value = '';

            jobBody.innerHTML = '';

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


});