//Now we click the inputs

let studentActImage = document.getElementById('studentBackImage');
let studentProfileImage = document.getElementById('studentProfileImage');

//Add click event to this two buttons

studentActImage.addEventListener('click', ()=> {

    document.getElementById('stuBackImg').click();


});

studentProfileImage.addEventListener('click', ()=> {

    document.getElementById('stuProImg').click();


});



/* Here we select university */ //uniCheckAct

let indSelectUnis = document.getElementsByClassName('indSelectUni');

let selIniChecks = document.getElementsByClassName('selIniCheck');

let selUniIds = document.getElementsByClassName('selUniId');

//The images
let schoolImageSetClass = document.getElementsByClassName('schoolImageSetClass');

let schoolImageSetID = document.getElementById('schoolImageSetID');

//The university name
let changeUniNames = document.getElementsByClassName('changeUniName');

let changeUniNameID = document.getElementById('changeUniNameID');

for(let a = 0; a < indSelectUnis.length; a++){

    indSelectUnis[a].addEventListener('click', ()=> {

        for(let b = 0; b < selIniChecks.length; b++){

            if(selIniChecks[b].checked == true){

                selIniChecks[b].checked = false;

                indSelectUnis[b].classList.remove('uniCheckAct');

            }

        }

        if(selIniChecks[a].checked == false){

            selIniChecks[a].checked = true;

            indSelectUnis[a].classList.add('uniCheckAct');

            uniGetIdDep.value = selUniIds[a].innerHTML;

            //Change image
            schoolImageSetID.src = schoolImageSetClass[a].src;

            //Change Uni Name
            changeUniNameID.innerHTML = changeUniNames[a].innerHTML

            setTimeout(function(){

                document.getElementById('getDEpsBtn').click();

            },500);

        }
      
    })

};

//Now we get the departments
let getDepsForm = document.getElementById('getDeps');

let uniGetIdDep = document.getElementById('uniGetID');

let csrf = document.getElementsByName('csrfmiddlewaretoken');

getDepsForm.addEventListener('submit', (e)=> {

    e.preventDefault();

    //console.log('submit')

    let formData = new FormData();

    formData.append('id',uniGetIdDep.value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);

    $.ajax({
        type:'POST',
        url:'/student/getDeps/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            $("#selectDepartSee").empty();

            console.log(response.deps);

            let deps = response.deps;


            for(var littleDep in deps){
                
                let oneDEp = `
                <!--Inidvidual schol-->
                <div class="indSelectUni1">

                    <span class="changeDepartNameClass"  >${deps[littleDep].dep_name}</span>

                    <span class="selDepId" >${deps[littleDep].dep_id}</span>

                    <input type="checkbox" class="selDepCheck">

                </div>
                `

                $("#selectDepartSee").append(oneDEp);
            }

            //Call the fuction
            departAct();

        },
        error: function(error){

            console.log(error)
            
        }
    });


})


//Now we select the department

function departAct(){

    let indSelectUnis1 = document.getElementsByClassName('indSelectUni1');

    let selDepChecks = document.getElementsByClassName('selDepCheck');

    let selDepIds = document.getElementsByClassName('selDepId');

    let depGetIdDep = document.getElementById('depGetID');

    //The department name
    let changeDepartNameClass = document.getElementsByClassName('changeDepartNameClass');

    let changeDepartNameID = document.getElementById('changeDepartNameID');

    for(let a = 0; a < indSelectUnis1.length; a++){

        indSelectUnis1[a].addEventListener('click', ()=> {

            console.log('hello')

            for(let b = 0; b < selDepChecks.length; b++){

                if(selDepChecks[b].checked == true){

                    selDepChecks[b].checked = false;

                    indSelectUnis1[b].classList.remove('uniCheckAct');

                }

            }

            if(selDepChecks[a].checked == false){

                selDepChecks[a].checked = true;

                indSelectUnis1[a].classList.add('uniCheckAct');

                depGetIdDep.value = selDepIds[a].innerHTML;

                //Change the department name
                changeDepartNameID.innerHTML = changeDepartNameClass[a].innerHTML;

                setTimeout(function(){

                    document.getElementById('getCoursesBtn').click();

                },500);

            }
        
        })

    };

}


//Now lets get the courses
let getCoursesForm = document.getElementById('getCourses');

let depIdGet = document.getElementById('depGetID')

getCoursesForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    //console.log('submit')

    let formData = new FormData();

    formData.append('id',depIdGet.value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);

    $.ajax({
        type:'POST',
        url:'/student/getCourses/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){

            console.log(response)

            $("#selectCourseSee").empty();

            console.log(response.deps);

            let deps = response.deps;


            for(var littleDep in deps){
                
                let oneDEp = `
                <!--Inidvidual schol-->
                <div class="indSelectUni2">

                    <span class="changeCourseNameClass" >${deps[littleDep].Course_name}</span>

                    <span class="selCourseId" >${deps[littleDep].Course_id}</span>

                    <input type="checkbox" class="selCourseCheck">

                </div>
                `

                $("#selectCourseSee").append(oneDEp);
            }

            courseAct();

        },
        error: function(error){

            // console.log(error)
            
        }
    });

})


//The course cursor

function courseAct(){

    let indSelectUnis2 = document.getElementsByClassName('indSelectUni2');

    let selCourseChecks = document.getElementsByClassName('selCourseCheck');

    let selCourseIds = document.getElementsByClassName('selCourseId');

    let courseGetIdDep = document.getElementById('setCourseID');

    //We change the course name
    let changeCourseNameClass = document.getElementsByClassName('changeCourseNameClass');

    let changeCourseNameID = document.getElementById('changeCourseNameID');

    for(let a = 0; a < indSelectUnis2.length; a++){

        indSelectUnis2[a].addEventListener('click', ()=> {

            console.log('hello')

            for(let b = 0; b < selCourseChecks.length; b++){

                if(selCourseChecks[b].checked == true){

                    selCourseChecks[b].checked = false;

                    indSelectUnis2[b].classList.remove('uniCheckAct');

                }

            }

            if(selCourseChecks[a].checked == false){

                selCourseChecks[a].checked = true;

                indSelectUnis2[a].classList.add('uniCheckAct');

                courseGetIdDep.value = selCourseIds[a].innerHTML;

                //Change the course name
                changeCourseNameID.innerHTML = changeCourseNameClass[a].innerHTML;

                // setTimeout(function(){

                //     document.getElementById('getCoursesBtn').click();

                // },500);

            }
        
        })

    };

}



//Now we select the cv and recommendation
let selectCV = document.getElementById('selectCV');
let selectRec = document.getElementById('selectRec');

//Select cv
selectCV.addEventListener('click', ()=> {

    document.getElementById('cv').click();

});

//Select Recommendation
selectRec.addEventListener('click', ()=> {

    document.getElementById('recommend').click();

});

//now we look at the value
let cv = document.getElementById('cv');
let recommend = document.getElementById('recommend');


//The cv section
cv.addEventListener('change', ()=> {
    //console.log(cv.value.split('.').pop())

    let pdf = cv.value.split('.').pop();

    if(pdf != 'pdf'){

        console.log('not pdf!');

        cv.value = '';

        //DShow failed toast
        const notPDfToast = document.getElementById('notPDfToast');
        
        const toast = new bootstrap.Toast(notPDfToast);

        toast.show();

    }
    else {

        //DShow failed toast
        const isPDfToast = document.getElementById('isPDfToast');
        
        const toast = new bootstrap.Toast(isPDfToast);

        toast.show();

    }

})


//Recommendation selected
recommend.addEventListener('change', ()=> {
    //console.log(cv.value.split('.').pop())

    let pdf = recommend.value.split('.').pop();

    if(pdf != 'pdf'){

        console.log('not pdf!');

        recommend.value = '';

        //DShow failed toast
        const notPDfToast = document.getElementById('notPDfToast');
        
        const toast = new bootstrap.Toast(notPDfToast);

        toast.show();

    }
    else {

        //DShow failed toast
        const isPDfToast = document.getElementById('isPDfToast');
        
        const toast = new bootstrap.Toast(isPDfToast);

        toast.show();

    }

})