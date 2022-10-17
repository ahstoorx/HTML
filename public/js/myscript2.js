var submit = document.getElementById('submit');
var formulaire = document.getElementById('formulaire');
var conteneurLoad = document.getElementById('conteneurLoad');
var chargement = document.getElementById('chargement');
var successe = document.getElementById('successe');


function send(event, classes, methode, action) {

    var action = action;
    var methode = methode

    conteneurLoad.classList.contains('d-none')?conteneurLoad.classList.remove('d-none'):'';


    // Cette fonction vous permet d'envoyer un formulaire en utilisant ajax.
    // Elle prend en paramètre 4 arguments dont:
    // event c'est l'vennement qui déclenche la soumission du formulaire
    // classes c'est l'élément clé de la fonction. Vous allez définir une valeur pour l'attribut class de tout les champs que
    // vous aimeriez soumettre . Donc tout les champs du formulaire doivent avoire une valeur unique
    // methode c'est la méthode de soumission
    // action : c'est le lien de page de traitement de la soumission du formulaire


    event.preventDefault();
    let classe = document.querySelectorAll('.' + classes);
    // conteneurLoad.classList.contains('d-none') ? conteneurLoad.classList.remove('d-none') : conteneurLoad.classList.add('d-none')


    //  création d'un objet formData qui va nous aidé dans la transmission des données 
    var data = new FormData();



//     <input type="button">
// <input type="checkbox">
// <input type="radio">

    let liste_texte = ['date','text','password','number','tel','day','color','datetime-local','email','hidden','month','range','search','time','url','week'];
    let liste_fichier = ['file','image'];


    // boucle permettant de parcourrir le tableau content nos champs de saisie
    for (let i = 0; i < classe.length; i++) {

        console.log(classe[i]['type']);
        if ( liste_fichier.indexOf(classe[i]['type']) !== -1  && classe[i]['files'].length >0 ) {

            // // console.log(`${classe[i]['name']} ${classe[i]['files'][0]} `)
            
            for(let b=0; b < classe[i]['files'].length; b++)
            {
                console.log(classe[i]['files'][b])
                data.append(classe[i]['name'], classe[i]['files'][b]);
            }
            
        }
        else if(classe[i]['value'] !== ''  && liste_texte.indexOf(classe[i]['type']) !== -1) {
            // console.log(`${classe[i]['name']} ${classe[i]['value']} `)
            data.append(classe[i]['name'], classe[i]['value']);
        }
        else {
            console.log(`Veillez remplir le champ ${classe[i]['value']}`)
        }
    }
    // console.log(data);

    setTimeout(() => {
        // soumission du formulaire
        $.ajax({
            url: action,
            type: methode,
            data: data,
            dataType:'json',
            contentType: false,
            processData: false,

            complete: (xhr, status) => {

                submit.textContent = 'Envoyer'

                // désactivé le button de soumission
                submit.removeAttribute('disabled');

                // cacher le lotti de chargement 
                chargement.classList.add('d-none')

                //  afficher le lotti de success
                successe.classList.remove('d-none')

                setTimeout(() => {
                    // afficher le lotti de chargement 
                    chargement.classList.remove('d-none')

                    //  cacher le lotti de success
                    successe.classList.add('d-none')

                    // cacher le conteneur des lotti de chargement 
                    conteneurLoad.classList.add('d-none')
                }, 500)
            },
            success: (result, status, xhr) => {
                submit.textContent = 'success'
            },
            error: (xhr, status, error) => {
                conteneurLoad.classList.add('d-none')
            }
        })
    }, 1000)

}
