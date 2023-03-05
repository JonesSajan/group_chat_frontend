var itemList = document.getElementById("items")

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener("load", getGroups);

async function getGroups() {
    try {
    console.log("getGroup Called")
  
      const response = await axios.get("http://localhost:3000/group/groups", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      console.log(response.data);
      showOutput(response.data);
    } catch (error) {
      console.error(error);
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function showOutput(res) {
    try {
      itemList.innerHTML=""

      for (i in res) {
        var sp = document.createElement("span");
        sp.style.display = "none";
        sp.innerText = JSON.stringify(res[i].id);
  
        var li = document.createElement("li");
  
        
  
        
        li.className = "list";
        li.innerHTML = `  ${res[i].name}  `;
        li.appendChild(sp);
  
        itemList.appendChild(li);
      }
    } catch (error) {
      console.error(error);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  itemList.addEventListener("click", selectItem);

async function selectItem(e) {
  try {
    if (e.target.classList.contains("list")) {
      let btn =e.target
      var sp = e.target.querySelector("span")

      console.log(1);
      console.log(sp);
      console.log( sp.innerHTML);
      btn.removeChild(sp)
      console.log( btn.innerHTML);

      console.log(typeof sp.innerHTML);

      localStorage.setItem("group",parseInt(sp.innerHTML))
      localStorage.setItem("groupName",btn.innerHTML)
      localStorage.setItem("chats",null)
      location.href = 'home2.html';



     
    }
  } catch (error) {
    console.error(error);
  }
}

