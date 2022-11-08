//Set up the fuction here
//This are all the delete buttons

function deleteHead(){

    let del_head_btns = document.getElementsByClassName('del_head_btn');

    for(let a = 0; a < del_head_btns.length; a++){

        del_head_btns[a].addEventListener('click', ()=> {

            //Get the heads profile images
            let del_profile_imgs = document.getElementsByClassName('del_profile_img');

            //This is the tag that will be replaced by the button
            let del_img = document.getElementById('del_dep_img_show');

            //The name of the deleted
            let headName = document.getElementById('del_head_name');

            let parse_del_names = document.getElementsByClassName('parse_del_name');


            //The input holding the id
            let idInput = document.getElementById('head_id_del_form');

            //The value of the id 
            let ids = document.getElementsByClassName('head_id');


            //The code logic

            idInput.value = ids[a].innerHTML;

            //The name of head
            headName.innerHTML = parse_del_names[a].innerHTML

            //The image in the modal
            del_img.src = del_profile_imgs[a].src;

            //Get all the divs
            let ind_dep_heads = document.getElementsByClassName('ind_dep_head');


            //The form

            let deleteHeadForm = document.getElementById('deleteHeadForm');

            let csrf1 = document.getElementsByName('csrfmiddlewaretoken');

            deleteHeadForm.addEventListener('submit', (e)=> {

                let idvalue = document.getElementById('head_id_del_form');

                e.preventDefault();

                console.log('submit');

                let formData = new FormData();

                //Company name
                formData.append('id',idvalue.value);

                formData.append('csrfmiddlewaretoken', csrf1[0].value);

                $.ajax({
                    type:'POST',
                    url:'/institute/deleteHead/',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response){
                        console.log(response);

                        //Here i hide the 
                        $(ind_dep_heads[a]).remove();

                        document.getElementById('closeDelete').click();

                        document.getElementById('toastMessSucc').innerHTML = "Head Delete Successfull!"

                        const successToast = document.getElementById('successToast');
                
                        const toast = new bootstrap.Toast(successToast);

                        toast.show();

                    },
                    error: function(error){
                        console.log(error);

                        document.getElementById('toastMess').innerHTML = "Head Delete Unsuccesfull!"

                        const failedToast = document.getElementById('failedToast');
                
                        const toast = new bootstrap.Toast(failedToast);

                        toast.show();

                    }
                });


            });

        });

    }


    //Now we delete the user
    let clickDeleletTo = document.getElementById('clickDeleletTo');

    clickDeleletTo.addEventListener('click', ()=> {

        //Click the delete button in the form
        document.getElementById('deleteHeadBtnForm').click();

    });

};

//call the fuctuon
deleteHead();



//Create A Head
let createHeadForm = document.getElementById('createHeadForm');

let password = document.getElementById('headPass');

let password1 = document.getElementById('headPass1');

let emailval = document.getElementById('email');

let csrf = document.getElementsByName('csrfmiddlewaretoken');

//The bigger div
let all_dep_heads = document.getElementById('all_dep_heads')


createHeadForm.addEventListener('submit', (e)=> {

    e.preventDefault();

    //console.log('submit');

    let formData = new FormData();

    //Company name
    formData.append('email',emailval.value);
    //Company bio
    formData.append('pass1',password.value);
    //company mission
    formData.append('pass2',password1.value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);

    $.ajax({
        type:'POST',
        url:'/institute/createHead/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response);

            if(response.Message == 'Exist'){

                document.getElementById('toastMess').innerHTML = "User Already Exists!"

                const failedToast = document.getElementById('failedToast');
        
                const toast = new bootstrap.Toast(failedToast);

                toast.show();

            }
            else{

                document.getElementById('closeCreateHead').click();

                createHeadForm.reset();

                const successToast = document.getElementById('successToast');
        
                const toast = new bootstrap.Toast(successToast);

                toast.show();


                //Now we craete a new head section
                let headSec = `
                        <div class="ind_dep_head">

                            <!--The department head image-->
                            <div class="dep_head_img_sect">

                                <span class="head_id" >${response.NewHead.id}</span>

                                <img class="del_profile_img" src="${response.NewHead.profile}" alt="">

                                <!--The head name section-->
                                <div class="dep_head_name_sec">

                                    <!--The actual name-->
                                    <div class="head_act_name">
                                        <span class="parse_del_name"  >${response.NewHead.name}</span>
                                    </div>

                                </div>

                            </div>

                            <!--Department heads controls-->
                            <div class="dep_heads_cont">

                                <!--The controls-->
                                <div class="ind_head_cont">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.963 8.261c-.566-.585-.536-1.503.047-2.07l5.948-5.768c.291-.281.664-.423 1.035-.423.376 0 .75.146 1.035.44l-8.065 7.821zm-9.778 14.696c-.123.118-.185.277-.185.436 0 .333.271.607.607.607.152 0 .305-.057.423-.171l.999-.972-.845-.872-.999.972zm8.44-11.234l-3.419 3.314c-1.837 1.781-2.774 3.507-3.64 5.916l1.509 1.559c2.434-.79 4.187-1.673 6.024-3.455l3.418-3.315-3.892-4.019zm9.97-10.212l-8.806 8.54 4.436 4.579 8.806-8.538c.645-.626.969-1.458.969-2.291 0-2.784-3.373-4.261-5.405-2.29z"/></svg>

                                </div>

                                <!--The controls-->
                                <div class="ind_head_cont del_head_btn " data-bs-toggle="modal" data-bs-target="#deleteHeadModal">

                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"/></svg>
                                    
                                </div>

                                <!--The controls-->
                                <div class="ind_head_cont">

                                    <svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 16.495c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25z"/></svg>
                                    
                                </div>
                                
                            </div>

                    </div>
                `;

                //Now we append to the bigger div
                $('#all_dep_heads').append(headSec);

                /* Now we delete the eads */
                deleteHead();
                
            }


        },
        error: function(error){
            console.log(error);
            
            const failedToast = document.getElementById('failedToast');
        
            const toast = new bootstrap.Toast(failedToast);

            toast.show();

        }
    });

});


