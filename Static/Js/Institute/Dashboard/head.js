console.log('hello');

//Here we hide the
$('#checkMail').hide();
//$('#checkPass').hide();
$('#checkPass1').hide();

//Here we hide
let pass1 = document.getElementById('headPass');

let pass2 = document.getElementById('headPass1');

let showPass = document.getElementById('showPs');

let checkPassShow = document.getElementById('checkPassShow');

//hide the check box
$('#checkSee').hide();

//Add event listen

showPass.addEventListener('click', ()=> {

    checkPassShow.click();

});


checkPassShow.addEventListener("change", ()=>{

    if(checkPassShow.checked){
        
        $('#checkSee').show(100);

        //$('#svgItShow').css("fill","#4b39ef");

        //$('#changeCheck').css("border","2px solid #4b39ef");

        //$('#showord').css("color","#4b39ef");

        pass1.setAttribute('type','text');

        pass2.setAttribute('type','text');

    }
    else{

        $('#checkSee').hide(100);

        //$('#changeCheck').css("border","2px solid #474747");

        //$('#showord').css("color","#474747");

        pass1.setAttribute('type','password');

        pass2.setAttribute('type','password');

    }

});

//Now we check the email

let createStart = document.getElementById('createStart')

let email = document.getElementById('email');

let messagePass = document.getElementById('messagePass');

let emMess = document.getElementById('emMess');

createStart.addEventListener('click', ()=>{

    let pass1Val = pass1.value;

    let pass2Val = pass2.value;

    let emailVal = email.value;

    let psRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(pass1Val == "" || pass2Val == ""){

        messagePass.innerHTML = "Password is Empty";

        $('#checkPass1').show(200)

        setTimeout(() => {

            $('#checkPass1').hide(200)
            
        }, 2000);

    }

    else if(pass1Val != pass2Val){

        messagePass.innerHTML = "Passwords Don't Match";

        $('#checkPass1').show(200)

        setTimeout(() => {

            $('#checkPass1').hide(200)
            
        }, 2000);


    }

    else if(pass1Val == pass2Val && pass1Val != ""  && pass2Val != "") {

        if(!pass1Val.match(psRegex)){

            messagePass.innerHTML = "Passwords is Weak";

            $('#checkPass1').show(200)

            setTimeout(() => {

                $('#checkPass1').hide(200)
                
            }, 2000);

        }
        

    }

    //Here we are checking emails

    if(emailVal != ""){

        console.log(emailVal)

        if (!emailVal.match(validRegex)) {

            //alert("Valid email address!");

            emMess.innerHTML = "Email is Invalid";


            $('#checkMail').show(200);

            setTimeout(() => {

                $('#checkMail').hide(200)
                
            }, 2000);
        
        }


    }
    else{

        emMess.innerHTML = "Email is Empty";

        
        $('#checkMail').show(200);

        setTimeout(() => {

            $('#checkMail').hide(200)
            
        }, 2000);

    }

    if(emailVal != "" && pass1Val != ""  && pass2Val != ""  && pass1Val == pass2Val && pass1Val.match(psRegex) && emailVal.match(validRegex)){
        console.log("create");

        setTimeout(function(){

            document.getElementById('createComptBtn').click();
            
        },1000);


    }

});
