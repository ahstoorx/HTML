

function check(){
let nom  = document.getElementById('nom').value;


let data = new FormData();

data.append	('nom',nom);
data.append	('action','action');
$.ajax({
    url:'./api/select.php' ,
    type: 'post',
    data: data,
    contentType: false,
    processData: false,
    success: (res,data)=>{
       let resultat = JSON.parse(res);
       console.log('nom',resultat.nom);
       console.log('prenom',resultat.prenom);
       console.log('ecole',resultat.ecole);

       document.getElementById('prenom').value=resultat.prenom
       document.getElementById('ecole').value=resultat.ecole
        
    }
})

}