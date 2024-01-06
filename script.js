const firebaseConfig = {
  apiKey: "AIzaSyAR_W4-Cuiq2IvI_IjhL7BzIeSkpQd8RZY",
  authDomain: "todoapp-4c9b4.firebaseapp.com",
  databaseURL: "https://todoapp-4c9b4-default-rtdb.firebaseio.com",
  projectId: "todoapp-4c9b4",
  storageBucket: "todoapp-4c9b4.appspot.com",
  messagingSenderId: "593912066648",
  appId: "1:593912066648:web:26f067637a23ea6ca2502d"
};

// Initialize Firebase
const frb =firebase.initializeApp(firebaseConfig);
console.log(frb.database);
 
// console.log(key);

firebase.database().ref("todos").on("child_added",(data)=>{
  
  // console.log(data.val());

  var liElement=document.createElement("li");
  var liText=document.createTextNode(data.val().value);
  liElement.appendChild(liText)
  console.log(liElement);


  var delbtn=document.createElement("button");
  var delbtnText=document.createTextNode("Delete");
  delbtn.appendChild(delbtnText);

   delbtn.setAttribute("id",data.val().key);

  delbtn.setAttribute("onclick","deleteItem(this)");

  var list=document.getElementById("list");
  liElement.appendChild(delbtn);
  list.appendChild(liElement);

  var editbtn=document.createElement("button");
  var editbtnText=document.createTextNode("Edit");
  editbtn.appendChild(editbtnText);
  editbtn.setAttribute("onclick","editItem(this)");

  editbtn.setAttribute("id",data.val().key);


  liElement.appendChild(editbtn);

})

function addtodo(){
  var input=document.getElementById("inputField");
   
  // console.log(input.value);
  
var key=firebase.database().ref("todos").push().key;


  let obj={
    value:input.value,
    key:key,
  };
  
  firebase.database().ref("todos").child(key).set(obj);
   input.value="";

}

function deleteAll(){
  var list=document.getElementById("list");
  firebase.database().ref("todos").remove();
  list.innerHTML="";

}

function deleteItem(a){
  console.log(a.id);
  firebase.database().ref("todos").child(a.id).remove();
  a.parentNode.remove();
}

function editItem(e){
  var val=e.parentNode.firstChild.nodeValue;
  var userInput=prompt("Enter updated Value");
  var editTodo={
    value:userInput,
    key:e.id,
  }
  firebase.database().ref("todos").child(e.id).set(editTodo);
  e.parentNode.firstChild.nodeValue=userInput;
}