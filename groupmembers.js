var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var creategroup = document.getElementById("add-members");
var reset = document.getElementById("reset-members");
let users = []
var group 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener("load", addItem);

async function addItem(e) {
  try {
    e.preventDefault();

    group = localStorage.getItem("groupName");
   
   
    document.getElementById("form").innerHTML = `<h4>Members of ${group}- </h4>`;
    document.getElementById("add-members").style.display = "block";
    document.getElementById("reset-members").style.display = "block";
    showI()

    // document.getElementById("add-members").innerText = "Add Member -";
   
  } catch (error) {
    console.log(error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function showI() {
    try {
  
      const response = await axios.get(`http://localhost:3000/group/users/${localStorage.getItem('group')}`,{ headers: { Authorization: localStorage.getItem("token") } });
      console.log(response.data);
      showOutput(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function showOutput(res) {
    try {
      itemList.innerHTML=""

      for (i in res) {
        var sp = document.createElement("span");
        sp.style.display = "none";
        sp.innerText = JSON.stringify(res[i].id);
  
        var li = document.createElement("li");
  
        var selectBtn = document.createElement("button");
        selectBtn.className = "btn btn-danger btn-sm float-right select";
        selectBtn.appendChild(document.createTextNode("Select"));
  
        
        li.className = "list-group-item";
        li.innerHTML = ` User : ${res[i].name}   &nbsp&nbsp&nbsp   PhoneNo : ${res[i].phone} &nbsp&nbsp&nbsp Email : ${res[i].email} `;
        li.appendChild(selectBtn);
        li.appendChild(sp);
  
        itemList.appendChild(li);
      }
    } catch (error) {
      console.error(error);
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  itemList.addEventListener("click", selectItem);

async function selectItem(e) {
  try {
    if (e.target.classList.contains("select")) {
      let btn =e.target
      btn.className = "btn btn-danger btn-sm float-right ";

      btn.innerHTML="Selected"
      btn.style.color="#000"
      btn.style.background="#fff"
      var sp = e.target.nextSibling;
      users.push(parseInt(sp.innerHTML))
      console.log(users)
    }
  } catch (error) {
    console.error(error);
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
   reset.addEventListener("click", resetItem);

   async function resetItem(e) {
    try {

      users=[];

      showI()

      
      
    } catch (error) {
      console.error(error);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  creategroup.addEventListener("click", removeMembers);

  async function removeMembers() {
   try {

    const data = {
      groupid:localStorage.getItem("group"),
      users:users
    };


    const response = await axios.post(
      "http://localhost:3000/group/removeusers",
      data,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    console.log(response);

     
     
   } catch (error) {
     console.error(error);
   }
 }

