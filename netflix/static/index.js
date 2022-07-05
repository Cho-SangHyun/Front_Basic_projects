const profileList = document.querySelector(".choose-profile");
console.log(profileList);
profileList.addEventListener("click", e => {
    e.preventDefault();
    if(e.target.classList.contains("gotohome")){
        location.href = "./home.html";
    }
})