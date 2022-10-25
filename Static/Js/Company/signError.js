//Where are we
let wherePage = document.getElementById('wherePage');

console.log(wherePage.innerHTML)


//Here we click the check box



if(wherePage.innerHTML == 'Institute' || wherePage.innerHTML == 'Company'){

    let changeShow = document.getElementById('changeCheck');

    //The checkbox itself
    let showPs = document.getElementById('showPass');

    
    changeShow.addEventListener('click', ()=> {

        showPs.click();

    })

    //setAttribute('type','text');


    //Get the password inputs
    let pass1 = document.getElementById('pass1');

    let pass2 = document.getElementById('pass2');

    let email = document.getElementById('mail');

    //Lets hide the tick

    $('#svgItShow').hide()

    //Now lets show the passwords here
    showPs.addEventListener("change", ()=>{

        if(showPs.checked){
            
            $('#svgItShow').show(100);

            $('#svgItShow').css("fill","#4b39ef");

            $('#changeCheck').css("border","2px solid #4b39ef");

            $('#showord').css("color","#4b39ef");

            pass1.setAttribute('type','text');

            pass2.setAttribute('type','text');

        }
        else{

            $('#svgItShow').hide(100);

            $('#changeCheck').css("border","2px solid #474747");

            $('#showord').css("color","#474747");

            pass1.setAttribute('type','password');

            pass2.setAttribute('type','password');

        }

    });



    //Here we check if the passwords are equal

    let createBtn = document.getElementById('createBtn');

    let messagePass = document.getElementById('messagePass');

    let emMess = document.getElementById('emMess');

    //Passwords Don't Match

    $('#dontMatch').hide();

    $('#companyEmailCheck').hide();

    let create = false;


    createBtn.addEventListener('click', ()=> {

        let pass1Val = pass1.value;

        let pass2Val = pass2.value;

        let emailVal = email.value;

        let psRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        //console.log(emailVal)

        //console.log(pass1Val);


        //We are chacking passwords
        if(pass1Val == "" || pass2Val == ""){

            messagePass.innerHTML = "Password is Empty";

            $('#dontMatch').show(200)

            setTimeout(() => {

                $('#dontMatch').hide(200)
                
            }, 2000);

        }

        else if(pass1Val != pass2Val){

            messagePass.innerHTML = "Passwords Don't Match";

            $('#dontMatch').show(200)

            setTimeout(() => {

                $('#dontMatch').hide(200)
                
            }, 2000);


        }

        else if(pass1Val == pass2Val && pass1Val != ""  && pass2Val != "") {

            if(!pass1Val.match(psRegex)){

                messagePass.innerHTML = "Passwords is Weak";

                $('#dontMatch').show(200)

                setTimeout(() => {

                    $('#dontMatch').hide(200)
                    
                }, 2000);

            }
            

        }

        //Here we are checking emails

        if(emailVal != ""){

            console.log(emailVal)

            if (!emailVal.match(validRegex)) {

                //alert("Valid email address!");

                emMess.innerHTML = "Email is Invalid";


                $('#companyEmailCheck').show(200);

                setTimeout(() => {

                    $('#companyEmailCheck').hide(200)
                    
                }, 2000);
            
            }


        }
        else{

            emMess.innerHTML = "Email is Empty";

            
            $('#companyEmailCheck').show(200);

            setTimeout(() => {

                $('#companyEmailCheck').hide(200)
                
            }, 2000);

        }


        //check all to click
        if(emailVal != "" && pass1Val != ""  && pass2Val != ""  && pass1Val == pass2Val && pass1Val.match(psRegex) && emailVal.match(validRegex)){
            console.log("create");

            if(wherePage.innerHTML == 'Institute'){

                setTimeout(function(){

                    document.getElementById('createInstBtn').click();
                    
                },1000);

            }
            else if(wherePage.innerHTML == 'Company'){

                setTimeout(function(){

                    document.getElementById('createComptBtn').click();
                    
                },1000);

            }

        }


    });

    //let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    //let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')


    
}

else if(wherePage.innerHTML == 'Login'){

    console.log('org')

    let changeShow = document.getElementById('changeCheck');

    //The checkbox itself
    let showPs = document.getElementById('showPass');

    
    changeShow.addEventListener('click', ()=> {

        showPs.click();

    })

    //Get the password inputs
    let pass1 = document.getElementById('pass1');

    let email = document.getElementById('mail');

    //Lets hide the tick

    $('#svgItShow').hide()

    
    //Now lets show the passwords here
    showPs.addEventListener("change", ()=>{

        if(showPs.checked){
            
            $('#svgItShow').show(100);

            $('#svgItShow').css("fill","#4b39ef");

            $('#changeCheck').css("border","2px solid #4b39ef");

            $('#showord').css("color","#4b39ef");

            pass1.setAttribute('type','text');

            //pass2.setAttribute('type','text');

        }
        else{

            $('#svgItShow').hide(100);

            $('#changeCheck').css("border","2px solid #474747");

            $('#showord').css("color","#474747");

            pass1.setAttribute('type','password');

           // pass2.setAttribute('type','password');

        }

    });

    let createBtn = document.getElementById('createBtn');

    //let messagePass = document.getElementById('messagePass');

    let emMess = document.getElementById('emMess');

    //Passwords Don't Match

    //$('#dontMatch').hide();

    $('#companyEmailCheck').hide();

    $('#dontMatch').hide(200)

    let create = false;


    createBtn.addEventListener('click', ()=> {

        
        let emailVal = email.value;

        let pass1Val = pass1.value;

        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        //console.log(emailVal)

        //console.log(pass1Val);


        //Here we are checking emails

        if(emailVal != ""){

            console.log(emailVal)

            if (!emailVal.match(validRegex)) {

                //alert("Valid email address!");

                emMess.innerHTML = "Email is Invalid";


                $('#companyEmailCheck').show(200);

                setTimeout(() => {

                    $('#companyEmailCheck').hide(200)
                    
                }, 2000);
            
            }


        }
        else{

            emMess.innerHTML = "Email is Empty";

            
            $('#companyEmailCheck').show(200);

            setTimeout(() => {

                $('#companyEmailCheck').hide(200)
                
            }, 2000);

        }

        if(pass1Val == "" ){

            messagePass.innerHTML = "Password is Empty";

            $('#dontMatch').show(200)

            setTimeout(() => {

                $('#dontMatch').hide(200)
                
            }, 2000);

        }


        //check all to click
        if(emailVal != "" && pass1Val != "" && emailVal.match(validRegex)){
            console.log("create");

            if(wherePage.innerHTML == 'Login'){

                setTimeout(function(){

                    document.getElementById('loginBtnNow').click();
                    
                },1000);

            }

        }


    });


}
