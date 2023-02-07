//Lets get all the important items
let catBtns = document.getElementsByClassName('change_map');
let cat_ids = document.getElementsByClassName('cat_ids');
let map_section = document.getElementById('map_section');
let cat_name = document.getElementById('cat_name');

let csrf = document.getElementsByName('csrfmiddlewaretoken');


for(let a = 0; a < catBtns.length; a++){

    catBtns[a].addEventListener('click', ()=> {

        //Empty the map
        map_section.innerHTML = ''

        let formData = new FormData();

        formData.append('cat_id',cat_ids[a].innerHTML);

        formData.append('csrfmiddlewaretoken', csrf[0].value);

        $.ajax({
            type:'POST',
            url:'/student/catFolium/',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response){
                
                //console.log(response.cat)

                map_section.innerHTML = response.data

                //Change name
                cat_name.innerHTML = response.cat
                
            },
            error: function(error){
                
            }
        });

    })

}

//Acttive status
for(let a = 0; a < catBtns.length; a++){

    catBtns[a].addEventListener('click', ()=> {

        for(let b = 0; b < catBtns.length; b++){

            if(catBtns[b].classList.contains('m_act')){

                catBtns[b].classList.remove('m_act')

            }

        }

        catBtns[a].classList.add('m_act');

    })

}