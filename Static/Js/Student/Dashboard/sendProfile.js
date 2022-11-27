//First we submit the form
let sendFormPr = document.getElementById('sendFormPr');

sendFormPr.addEventListener('click', ()=> {

    document.getElementById('sendProfileBTN').click();

});

//Get the form

//The data to be sent
let stuBackImg = document.getElementById('stuBackImg');
let stuProImg = document.getElementById('stuProImg');

let studentNameIn1 = document.getElementById('studentNameIn');
let studentPhoneIn1 = document.getElementById('studentPhoneIn');

let universityID = document.getElementById('uniGetID');
let departmentID = document.getElementById('depGetID');
let courseID = document.getElementById('setCourseID');

let studentCV = document.getElementById('cv');
let studentRecommendation = document.getElementById('recommend');

let csrf1 = document.getElementsByName('csrfmiddlewaretoken');

let upStudProfForm = document.getElementById('upStudProfForm');

upStudProfForm.addEventListener('submit', (e)=> {

    e.preventDefault();

    let formData = new FormData();

    formData.append('csrfmiddlewaretoken', csrf1[0].value);

    //Append data to the form data
    //The fullname
    formData.append('name',studentNameIn1.value);
    //The phone
    formData.append('phone',studentPhoneIn1.value);

    //Profile picture
    if(stuProImg.value != ''){

        formData.append('profileIMG',stuProImg.files[0]);

    }
    else{
        console.log('no profile value');
    }

    //The back image
    if(stuBackImg.value != ''){

        formData.append('backIMG',stuBackImg.files[0]);

    }
    else{
        console.log('no back value');
    }


    //The university id
    formData.append('uniID',universityID.value);
    //The department id
    formData.append('depID',departmentID.value);
    //The course id
    formData.append('courseID',courseID.value);


    //The cv
    if(studentCV.value != ''){

        formData.append('cv',studentCV.files[0]);

    }
    else{
        console.log('no cv value');
    }

    //The recommendation
    if(studentRecommendation.value != ''){

        formData.append('recommend',studentRecommendation.files[0]);

    }
    else{
        console.log('no recommend value');
    }


    //Send the data
    $.ajax({
        type:'POST',
        url:'/student/updateProfile/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response)

        },
        error: function(error){
            console.log(error)


        }
    });

})
