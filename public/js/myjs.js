var submit = document.getElementById('submit');
var formulaire = document.getElementById('formulaire');
var conteneurLoad = document.getElementById('conteneurLoad');
var chargement = document.getElementById('chargement');
var success = document.getElementById('successe');



submit.addEventListener('click', async (e) => {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    conteneurLoad.classList.contains('d-none')?conteneurLoad.classList.remove('d-none'):'';
    
    e.preventDefault();

    let data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('action', "save");
    submit.textContent='disabled'
    submit.setAttribute('disabled','disabled');
    

    $.ajax({
        url: './api/save.php',
        type: 'post',
        processData: false,
        dataType: "json",
        ifModified:true,
        complete: (xhr, status) => {
            console.log(xhr)
           
            submit.textContent='terminé'
            submit.removeAttribute('disabled');
            // chargement.classList.add('d-none');
            // success.classList.remove('d-none');

            // setTimeout(() => {
            //     conteneurLoad.classList.add('d-none')
            // }, 100);
        },
        success: (result, status, xhr) => {
            submit.textContent='success'
            chargement.classList.add('d-none');
            success.classList.remove('d-none');

            setTimeout(() => {
                success.classList.add('d-none');
                chargement.classList.remove('d-none');
                conteneurLoad.classList.add('d-none')
            }, 800);
            
           
        },
        error: (xhr, status, error) => {
            console.log(xhr)
            console.log(status);
            console.log(error)
            conteneurLoad.classList.add('d-none')

        }
    })


})