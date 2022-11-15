//Fiets we hide the drop department
$('#the_drop_heads').hide();

let head_show = false;

//Get the drop head buttion
let the_selected = document.getElementById('the_selected');

the_selected.addEventListener('click', ()=> {

    if(head_show == false){

        $('#the_drop_heads').show(200);

        $("#the_drop_heads").empty();

        head_show = true;

        
        //The ajax call
        $.ajax({
            type:'GET',
            url:'/institute/getHeads/',
            success:function(response){
                console.log(response.heads)

                heads = response.heads

                for(let a = 0; a < heads.length; a++){
                    //console.log(response.allh[0])
                    //console.log(heads[a].lec_name)

                    let lecHead = `
                    <!--The drop one lect-->
                    <div class="one_drop_head">

                        <div class="d_head_img">

                            <img src="${heads[a].profile_url}" alt="drop_image">

                        </div>

                        <span class="drop_he_name" >${heads[a].lec_name}</span>

                        <span class="head_ids" >${heads[a].lec_id}</span>

                        <input class="allDepCheck" type="checkbox">

                    </div>
                    `

                    $('#the_drop_heads').append(lecHead);

                }

                let allDepHeads = document.getElementsByClassName('one_drop_head');
                let allDepCheck = document.getElementsByClassName('allDepCheck');
                let allDepHeadids = document.getElementsByClassName('head_ids');

                let head_id = document.getElementById('head_id');


                for(let a = 0; a < allDepHeads.length; a++){
                    

                    for (let a = 0; a < allDepHeads.length; a++) {

                        allDepHeads[a].addEventListener('click', function(a) {


                            //console.log('click')

                            for(let b = 0; b < allDepCheck.length; b++){

                                if(allDepCheck[b].checked == true){

                                    allDepCheck[b].checked = false;

                                    //$(allDepHeads[b]).css('background-color','#d9d9d9')

                                    allDepHeads[b].classList.remove('blue_act');
                                }

                            }


                            allDepCheck[a].checked = true;

                            //$(allDepHeads[a]).css('background-color','#4b39ef')

                            allDepHeads[a].classList.add('blue_act');

                            head_id.value = allDepHeadids[a].innerHTML

                            //console.log(allDepHeadids[a].innerHTML)

                        }.bind(null, a));
                    }
                }
                
            },
            error:function(error){

                console.log(error)
            
            }
        });

    }
    else if(head_show == true){

        $('#the_drop_heads').hide(200);

        head_show = false;

    }

})


//Now we craete and delete

//Set up the fuction here
//This are all the delete buttons

function deleteHead(){

    let del_head_btns = document.getElementsByClassName('del_head_btn');

    for(let b = 0; b < del_head_btns.length; b++){

        del_head_btns[b].addEventListener('click', ()=> {

            console.log('click')

            //Name of department to be deleted
            let del_head_name = document.getElementById('del_head_name');

            //The department name
            let parse_del_names = document.getElementsByClassName('parse_del_name');

            console.log('click')

            //Now we replaec
            del_head_name.innerHTML = parse_del_names[b].innerHTML;


            //Now we add the id to the input
            let dep_see_ids = document.getElementsByClassName('dep_see_id');

            let idValue = document.getElementById('head_id_del_form');

            idValue.value = dep_see_ids[b].innerHTML;

            let ind_dep_heads = document.getElementsByClassName('one_depart');


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
                    url:'/institute/deleteDepart/',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response){
                        console.log(response);

                        //Here i hide the 
                        $(ind_dep_heads[b]).remove();

                        document.getElementById('closeDelete').click();

                        document.getElementById('toastMessSucc').innerHTML = "Department Delete Successfull!"

                        const successToast = document.getElementById('successToast');
                
                        const toast = new bootstrap.Toast(successToast);

                        toast.show();

                    },
                    error: function(error){
                        console.log(error);

                        document.getElementById('toastMess').innerHTML = "Department Delete Unsuccesfull!"

                        const failedToast = document.getElementById('failedToast');
                
                        const toast = new bootstrap.Toast(failedToast);

                        toast.show();

                    }
                });


            });

        })

    }

    //Now we delete the user
    let clickDeleletTo = document.getElementById('clickDeleletTo');

    clickDeleletTo.addEventListener('click', ()=> {

        //Click the delete button in the form
        document.getElementById('deleteHeadBtnForm').click();

    });

}

deleteHead();




//Lets create a department

document.getElementById('createStart').addEventListener('click', ()=> {

    document.getElementById('createComptBtn').click();

});

//Create A Head
let createHeadForm = document.getElementById('createHeadForm');

let depart_name = document.getElementById('dep_name');

let depart_desc = document.getElementById('dep_desc');

let head_id = document.getElementById('head_id');

let csrf = document.getElementsByName('csrfmiddlewaretoken');

//The bigger div
let all_departments = document.getElementById('all_departments')


createHeadForm.addEventListener('submit', (e)=> {

    e.preventDefault();

    //console.log('submit');

    let formData = new FormData();

    //Company name
    formData.append('depart_name',depart_name.value);
    //Company bio
    formData.append('depart_desc',depart_desc.value);
    //company mission
    formData.append('head_id',head_id.value);

    formData.append('csrfmiddlewaretoken', csrf[0].value);

    $.ajax({
        type:'POST',
        url:'/institute/createDepart/',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response);

            document.getElementById('closeCreateHead').click();

            createHeadForm.reset();

            const successToast = document.getElementById('successToast');
    
            const toast = new bootstrap.Toast(successToast);

            toast.show();


            //Now we craete a new head section
            let headSec = `
                <div class="one_depart">

                    <!--Department name-->
                    <div class="dep_name">
                        <h4 class="parse_del_name" >${response.pass_head.name}</h4>
                    </div>
            
                    <span class="dep_see_id" >${response.pass_head.id}</span>
            
                    <!--Department description-->
                    <div class="dep_desc">
            
                        <span>${response.pass_head.desc}</span>
            
                    </div>
            
                    <!--Date dep created at-->
                    <div class="date_dep">
                        <span>${response.pass_head.date}</span>
                    </div>
            
                    <!--Department controls-->
                    <div class="dep_control">
            
                        <!--The individual controls-->
                        <div class="ind_dep_cont">
            
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.963 8.261c-.566-.585-.536-1.503.047-2.07l5.948-5.768c.291-.281.664-.423 1.035-.423.376 0 .75.146 1.035.44l-8.065 7.821zm-9.778 14.696c-.123.118-.185.277-.185.436 0 .333.271.607.607.607.152 0 .305-.057.423-.171l.999-.972-.845-.872-.999.972zm8.44-11.234l-3.419 3.314c-1.837 1.781-2.774 3.507-3.64 5.916l1.509 1.559c2.434-.79 4.187-1.673 6.024-3.455l3.418-3.315-3.892-4.019zm9.97-10.212l-8.806 8.54 4.436 4.579 8.806-8.538c.645-.626.969-1.458.969-2.291 0-2.784-3.373-4.261-5.405-2.29z"/></svg>
            
                        </div>
            
                        <!--The individual controls-->
                        <div class="ind_dep_cont del_head_btn " data-bs-toggle="modal" data-bs-target="#deleteHeadModal"">
            
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"/></svg>
                            
                        </div>
            
                        <!--The individual controls-->
                        <div class="ind_dep_cont">
            
                            <svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 16.495c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25z"/></svg>
                            
                        </div>
            
                    </div>
            
                </div>
    
            `;

            //Now we append to the bigger div
            $('#all_departments').append(headSec);

            /* Now we delete the eads */
            deleteHead();
            

        },
        error: function(error){
            console.log(error);
            
            const failedToast = document.getElementById('failedToast');
        
            const toast = new bootstrap.Toast(failedToast);

            toast.show();

        }
    });

});


