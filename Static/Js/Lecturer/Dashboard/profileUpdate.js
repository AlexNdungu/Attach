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

                    <span>${deps[littleDep].dep_name}</span>

                    <span class="selDepId" >${deps[littleDep].dep_id}</span>

                    <input type="checkbox" class="selDepCheck">

                </div>
                `

                $("#selectDepartSee").append(oneDEp);
            }

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

                setTimeout(function(){

                    document.getElementById('getCoursesBtn').click();

                },500);

            }
        
        })

    };

}


//Now lets get the courses
let getCoursesForm = document.getElementById('getCourses');

getCoursesForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    console.log('submit')

})