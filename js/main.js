var nameInput=document.getElementById('name');
var urlInput=document.getElementById('link');
var submitButton=document.getElementById('sumbitBtn');
var tbody=document.getElementById('tbody');
var closeBtn = document.getElementById("closeBtn");
var messageName=document.getElementById('messageContent')
var boxModal = document.querySelector(".box-info");
var index;

var bookMarks;
if (localStorage.getItem("bookMarks")==null){
bookMarks=[];
}
else{
    bookMarks= JSON.parse(localStorage.getItem("bookMarks"));
    displayBook();
}
function addNewBookMark(){
    if(isNvalid()&&isUvalid()==true){
    if(document.getElementById('sumbitBtn').innerHTML =="Submit"){
        var bookMark={
            name:nameInput.value,
            link:urlInput.value
        }
        bookMarks.push(bookMark);
        localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
        displayBook();
        clearData();
    }
    else{
        bookMarks[index].name =nameInput.value;
        bookMarks[index].link=urlInput.value;
        localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
        displayBook();
        clearData();
        document.getElementById("sumbitBtn").innerHTML="submit";
    }  
    }
    else{
        messageName.classList.remove('d-none')
    }
}
console.log(bookMarks)

function displayBook(){
    var marks=``;
    for(var i=0;i<bookMarks.length;i++){
        marks +=`
        <tr>
        <td>${i+1}</td>
        <td>${bookMarks[i].name}</td>
        <td><a href="${bookMarks[i].link}" target="_blank"><button class="btn btn-outline-primary">visit</button></a></td>
        <td>
        <button onclick="updateElements(${i})" class="btn btn-outline-success">update</button>
     </td>
     <td>
        <button onclick="deleteElements(${i})" class="btn btn-outline-success">delete</button>
     </td>
    
        
        </tr>
        `
    }
    tbody.innerHTML=marks;
}

function deleteElements(idx){
    bookMarks.splice(idx,1)
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
    displayBook();
}
function clearData(){
    nameInput.value="";
    urlInput.value="";
}


function isNvalid(){
    var nameRegex=/^([a-zA-Z]|[0-9]){3,}$/
    var text= nameInput.value
    if(nameRegex.test(text)){
        nameInput.classList.add("is-valid")
        nameInput.classList.remove("is-invalid")
        return true;
    }
    else{
        nameInput.classList.add("is-invalid")
        nameInput.classList.remove("is-valid")
        return false;
    }
}

function isUvalid(){
    var urlRegex=/^(https:\/\/)?(www\.)?[a-zA-Z0-9_\.]{1,}\.[a-z]{3}\/?$/
    var url=urlInput.value
    if(urlRegex.test(url)){
        urlInput.classList.add("is-valid")
        urlInput.classList.remove("is-invalid")
        return true;
    }
    else{
        urlInput.classList.add("is-invalid")
        urlInput.classList.remove("is-valid")
        return false;
    }
}
function updateElements(idx){
    index = idx;
    nameInput.value=  bookMarks[idx].name;
    urlInput.value= bookMarks[idx].link;
   

    document.getElementById("sumbitBtn").innerHTML="update";
}
