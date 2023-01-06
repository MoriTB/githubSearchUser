
const API_URL = "https://api.github.com/users/";
const search = document.getElementById("login-id");
const form = document.getElementsByClassName("input-form");
const btn = document.querySelector("#search");
const container = document.getElementsByClassName("full-container")
const actionResult = document.querySelector('info-container');
var respData;

console.log(container)
function getInputValue1() {  // A method is used to get input value
    let search1 = search.value;
    console.log(search1);  
    search.value = '';
    return search1
}
// sending and recieving github api without using local storage.
async function getUser() {
    try { // remember to add image when null should actually return to default?????
        let username = search.value;
        console.log(username);
        const resp = await fetch(API_URL + username);
        console.log("we are here to try this out");
        console.log(resp);
        if (resp.status !=200){
            console.log("we are in not 200")
            console.log(resp.status);
            console.log(resp.statusText);
            console.log(resp.headers);
            console.log(resp.url);
            console.log(resp.body);
            document.querySelector('#name-id').innerHTML="user not found.";
            document.querySelector('#bio-info').innerHTML="please try again."
            document.querySelector('#avatar-img').src = "no-exist.png"

        }
        else{
            respData = await resp.JSON();
            console.log("wewewe");
            console.log(respData);
            if (respData.followers) {
                console.log(respData.followers);
                let followers = respData.followers;
                document.querySelector("#followers").innerHTML = "Followers : "+followers;
            }
            if (respData.followers == null){
                document.querySelector("#followers").innerHTML = "Followers :";
            }
            
            if (respData.following) {
                console.log(respData.following);
                let following = respData.following;
                document.querySelector("#following").innerHTML = "Following : "+following;
            }
            if (respData.following == null){
                document.querySelector("#following").innerHTML = "Following : "; 
            }
            
            if (respData.location){
                console.log(respData.location);
                let location = respData.location;
                document.querySelector("#location").innerHTML = "Location : "+location;
            }
            if (respData.location == null ){
                document.querySelector("#location").innerHTML = "Location : unkown";
            }
            if (respData.company ){
                document.querySelector("#company").innerHTML = "Company : "+respData.company;
            }
            if (respData.company == null) {
                document.querySelector("#company").innerHTML = "Company : unkown";
            }
            if (respData.avatar_url !=null){
                document.getElementById('avatar-img').src = respData.avatar_url;
            }
            if (respData.avatar_url==null){
                document.getElementById('avatar-img').src = "avatar-img.png";    
            }
            if (respData.public_repos != null){
                document.getElementById('total-repo').innerHTML = "total repo : "+respData.public_repos;
            }
            if(respData.public_repos==null){
                document.getElementById('total-repo').innerHTML = "total repo : unkown";
            }
            if(respData.name!=null){
                document.getElementById('name-id').innerHTML =respData.name;
            }
            if(respData.name==null){
                document.getElementById('name-id').innerHTML = "name";
            }
            if(respData.bio){
                document.getElementById('bio-info').innerHTML =respData.bio;
            }
            if(respData.bio == null){
                document.getElementById('bio-info').innerHTML = "unkown";
            }
        }
        
    }
    catch (error) {
        console.log(error);
    }
    
    //console.log(respData)
    search.value = '';
    
}

// defining enter key action for clicking enter to search the name given in the input field.
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log("we")
        localStorage1()
    }
  });
  
// it will get us the info we need by searching it.
btn.addEventListener('click',localStorage1);
// sending api request and receiving based on if its not in local storage saving and loading from local storage is implemented within.
async function localStorage1(){
        try {
            let username = search.value;
            console.log(username);

            const resp = await fetch(API_URL + username);
            console.log("we are here to try this out1");
            console.log(resp);
            // check if the request is actually went through.
            if (resp.status !=200){
                document.querySelector('#name-id').innerHTML="user not found.";
                document.querySelector('#bio-info').innerHTML="please try again."
                document.querySelector('#avatar-img').src = "no-exist.png"
    
            }
            else{
                // getting the reponse.
                respData = await resp.json();
                console.log("wewewe1");
                console.log(respData);
                console.log("we are here to try this out2");
                 // another request is send for bonus point / getting the last repo.
                let lastrepo = await fetch('https://api.github.com/users/'+username+'/repos?sort=updated');
            
                responserepo = await lastrepo.json();
                console.log(responserepo);
                // because it has been sent as updated we would get the first detail info 
                let lastRepo_name = responserepo[0];
                // save it to localstorage if it wasnt saved before
                if (window.localStorage.getItem(username)== null){
                    // saving the main request to the local storage if it wasnt searched before.
                    window.localStorage.setItem(username, JSON.stringify(respData));
                    // setting the lastrepo with username as seperated key in the local storage
                    window.localStorage.setItem(username+"lastRepo",lastRepo_name.name);
                    console.log(username+"lastRepo")
                }
                
                let respdata_local ;
                if (window.localStorage.getItem(username)!=null){
                    respdata_local = window.localStorage.getItem(username,JSON.stringify(respData));// it will load it from local storage.
                    // getting  the lastrepo with username as seperated key in the local storage
                    last_repo_local = window.localStorage.getItem(username+"lastRepo",lastRepo_name.name);
                    console.log("we are in local storage.");
                    
                }
                if (JSON.parse(respdata_local).followers) {
                    console.log(respData.followers);
                    let followers = JSON.parse(respdata_local).followers
                    document.querySelector("#followers").innerHTML = "Followers : "+followers;
                }
                if (JSON.parse(respdata_local).followers==null){
                    document.querySelector("#followers").innerHTML = "Followers :";
                }
                
                if (JSON.parse(respdata_local).following) {
                    console.log(respData.following);
                    let following = JSON.parse(respdata_local).following
                    document.querySelector("#following").innerHTML = "Following : "+following;
                }
                if (JSON.parse(respdata_local).following == null){
                    document.querySelector("#following").innerHTML = "Following : "; 
                }
                
                if (JSON.parse(respdata_local).location){
                    console.log(respData.location);
                    let location = JSON.parse(respdata_local).location;
                    document.querySelector("#location").innerHTML = "Location : "+location;
                }
                if (JSON.parse(respdata_local).location == null ){
                    document.querySelector("#location").innerHTML = "Location : unkown";
                }
                if (JSON.parse(respdata_local).company){
                    document.querySelector("#company").innerHTML = "Company : "+JSON.parse(respdata_local).company;
                }
                if (JSON.parse(respdata_local).company == null) {
                    document.querySelector("#company").innerHTML = "Company : unkown";
                }
                if (JSON.parse(respdata_local).avatar_url !=null){
                    document.getElementById('avatar-img').src = JSON.parse(respdata_local).avatar_url;
                }
                if (JSON.parse(respdata_local).avatar_url==null){
                    document.getElementById('avatar-img').src ="./image/no-exist.png";    
                }
                if (JSON.parse(respdata_local).public_repos != null){
                    document.getElementById('total-repo').innerHTML = "total repo : "+JSON.parse(respdata_local).public_repos;
                }
                if(JSON.parse(respdata_local).public_repos==null){
                    document.getElementById('total-repo').innerHTML = "total repo : unkown";
                }
                if(JSON.parse(respdata_local).name!=null){
                    document.getElementById('name-id').innerHTML =JSON.parse(respdata_local).name;
                }
                if(JSON.parse(respdata_local).name==null){
                    document.getElementById('name-id').innerHTML = "name";
                }
                if(JSON.parse(respdata_local).bio){
                    document.getElementById('bio-info').innerHTML =JSON.parse(respdata_local).bio;
                }
                if(JSON.parse(respdata_local).bio == null){
                    document.getElementById('bio-info').innerHTML = "unkown";
                }
                if(JSON.parse(respdata_local).blog!= null){
                    document.getElementById('blog').innerHTML ="blog: "+JSON.parse(respdata_local).blog;
                    document.getElementById('blog').innerHTML =JSON.parse(respdata_local).blog;
                }
                if(last_repo_local !=null){
                    console.log(last_repo_local);
                    console.log("we we we we");
                    document.getElementById('last-repo').innerHTML = "popular repo: "+last_repo_local;
                }
                if(last_repo_local==null){
                    console.log(last_repo_local);
                    console.log("gggg")
                    document.getElementById('last-repo').innerHTML = "no repo";
                }
            }
            
        }
        catch (error) {
            console.log(error);
        }
        
        // to make it look more realistic we should clear the input after the search.
        search.value = '';

}





