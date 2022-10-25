
//Let take the two maeg buttons

let originalIcBtn = document.getElementById('choose_ic_sec');
let originalActBtn = document.getElementById('the_ic_self');

//Add click event to this two buttons

originalIcBtn.addEventListener('click', ()=> {

    document.getElementById('companyIc').click();


});

originalActBtn.addEventListener('click', ()=> {

    document.getElementById('companyAct').click();


});


//Now let use take the file inputs


//This are the 2 input buttons
let iconInput = document.getElementById('companyIc');
let actInput = document.getElementById('companyAct');

//This are the two name spans
let iconSelectName = document.getElementById('iconSelectName');
let actSelectName = document.getElementById('actSelectName');


iconInput.addEventListener('change', ()=> {
    //console.log(iconInput.files[0].name)

    iconSelectName.innerHTML = iconInput.files[0].name;

    //Here we give name to input
    document.getElementById('logoNameV').value = iconInput.files[0].name;

});

actInput.addEventListener('change', ()=> {
    //console.log(actInput.files[0].name)

    actSelectName.innerHTML = actInput.files[0].name;

    //Here we give name to input
    document.getElementById('actNameV').value = actInput.files[0].name;

});


//Now we deal with the inputs and textareas
let companyNewName = document.getElementById('companyNewName');

companyNewName.addEventListener('input', ()=> {
    //console.log('input')

    document.getElementById('companyName').value = companyNewName.value;

});

let companyNewBio = document.getElementById('companyNewBio');

companyNewBio.addEventListener('input', ()=> {
    //console.log('input')

    document.getElementById('bio').value = companyNewBio.value;

});

let companyNewMission = document.getElementById('companyNewMission');

companyNewMission.addEventListener('input', ()=> {
    //console.log('input')

    document.getElementById('mission').value = companyNewMission.value;

});

let companyNewVisson = document.getElementById('companyNewVisson');

companyNewVisson.addEventListener('input', ()=> {
    //console.log('input')

    document.getElementById('vision').value = companyNewVisson.value;

});


//Here we submit the form

let Update = document.getElementById('Update');

Update.addEventListener('click', ()=> {

    document.getElementById('updatePNow').click();

});



//Now we assign the value of the current profile to the form

//Company name
document.getElementById('companyName').value = companyNewName.value;
//Comapny Bio
document.getElementById('bio').value = companyNewBio.value;
//Company Mission
document.getElementById('mission').value = companyNewMission.value;
//Company Vission
document.getElementById('vision').value = companyNewVisson.value;
//The logo name input
document.getElementById('logoNameV').value = iconSelectName.innerHTML
//The act name input
document.getElementById('actNameV').value = actSelectName.innerHTML