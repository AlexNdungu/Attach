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

for(let a = 0; a < indSelectUnis.length; a++){

    for(let b = 0; b < selIniChecks.length; a++){

        selIniChecks[b].checked = false;

    }

    indSelectUnis[a].addEventListener('click', ()=> {

        if(selIniChecks[a].checked == false){

            //check the checkbox
            selIniChecks[a].checked = true;

            indSelectUnis[a].classList.add('uniCheckAct');

        }

        else if(selIniChecks[a].checked  == true){

            //check the checkbox
            selIniChecks[a].checked = false;

            indSelectUnis[a].classList.remove('uniCheckAct');

        }

    })

}