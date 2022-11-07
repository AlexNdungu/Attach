console.log('update Profile');

//Lets get the form
let companyProfForm = document.getElementById('companyProfForm');

//Get the values
let companyName = document.getElementById('companyName');
let companyBio = document.getElementById('bio');
let companyMission = document.getElementById('mission');
let companyVisson = document.getElementById('vision')
let companyIcon = document.getElementById('companyIc');
let companyAct = document.getElementById('companyAct');

let iconName = document.getElementById('logoNameV');
let activeName = document.getElementById('actNameV');

let csrf = document.getElementsByName('csrfmiddlewaretoken');


companyProfForm.addEventListener('submit', (e)=> {

    e.preventDefault();

    console.log('submit')

    let formData = new FormData();

    //Company name
    formData.append('name',companyName.value);
    //Company bio
    formData.append('bio',companyBio.value);
    //company mission
    formData.append('mission',companyMission.value);
    //company vission
    formData.append('vision',companyVisson.value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);


    //Company logo
    if(companyIcon.value != ''){

        formData.append('logo',companyIcon.files[0]);

        formData.append('logoname',iconName.value);

    }
    else{
        console.log('no profile value');
    }


    if(companyAct.value != ''){

        formData.append('active',companyAct.files[0]);

        formData.append('activename',activeName.value);


    }
    else{
        console.log('no profile value');
    }

    $.ajax({
        type:'POST',
        url:'/institute/updateProfile/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response);

            //const toastTrigger = document.getElementById('liveToastBtn')

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

});
