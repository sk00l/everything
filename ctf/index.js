const button = document.getElementById("buttona");

const username = document.getElementById("loginText");
const password = document.getElementById("passwordText");
const getcstf = document.getElementById("csrf");

// button.addEventListener('click', function() {
//     const usernameText = username.value;
//     const passwordText = password.value;

//     alert(usernameText+passwordText)
// });

button.onclick = () => {

    const usernameText = username.value;
    const passwordText = password.value;
    const csrfValue = getcstf.value;

    if(usernameText == "skool" && passwordText == "123456" && csrfValue === "mycsrftoken"){
        window.location.href = "dashboard.html"
    }else{
        const newText = document.createElement("div");
        newText.innerHTML = `Wrong Password for user ${usernameText}` ;
        document.body.appendChild(newText);
    }

    // const newText = document.createElement("p");

    // newText.textContent = `Username: ${usernameText}, Password: ${passwordText}`;
    // document.body.appendChild(newText);

    username.value = "";
    password.value = "";
};