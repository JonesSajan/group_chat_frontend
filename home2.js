const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const msgerHead = get(".msger-header-title");
const socket = io('http://localhost:3001')
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
socket.on('connect', () => {
console.log("conected with socket")
socket.emit("create-room",parseJwt(localStorage.getItem("group")).id)
socket.on("receive-message",(message,token)=>{
  user=parseJwt(token)
  appendMessage(user.name, PERSON_IMG, "left", message,new Date());

})
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const PERSON2_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function appendMessage(name, img, side, text,date) {
    // msgerChat.innerHTML="" 

  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(date)}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener("load", getMessages);
//  setInterval(() =>getMessages(), 10000)

async function getMessages() {
  try {
    // chats = localStorage.getItem("chats")
    chats = JSON.parse(localStorage.getItem("chats"))
    chats===null?id=-1:id=chats[chats.length-1].id
    groupid=parseJwt(localStorage.getItem("group")).id
    const response = await axios.get(`http://localhost:3000/chat/getmessage/{"id":${id},"groupid":${groupid}}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    msgerHead.innerText=`${parseJwt(localStorage.getItem("group")).name}`
    console.log(response.data.length!=0)
  if(response.data.length!=0){
    if(chats!=null){
     chats=chats.concat(response.data)
     
    }
    else{
        chats=response.data
    }
  }

    previousMessages=chats



    console.log(response.data,'///////////////////////////////////');
    const user = parseJwt(localStorage.getItem('token'))
    localStorage.setItem("chats",JSON.stringify(chats))
    console.log(user)
    msgerChat.innerHTML=" " 
    for(i in previousMessages){
         dateTime = new Date(previousMessages[i].createdAt)

        console.log(previousMessages[i])
        if(previousMessages[i].userId==user.id){
            appendMessage(previousMessages[i].name, PERSON_IMG, "right", previousMessages[i].message,dateTime);
        }
        else{
            appendMessage(previousMessages[i].name, PERSON_IMG, "left", previousMessages[i].message,dateTime);
        }
    }
  } catch (error) {
    console.error(error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  msgerForm.addEventListener("submit", event => {sendMessage()});

  async function sendMessage() {
  
    try { 
      console.log('sendMessage called')
      console.log("///////////////////////////////",msgerInput.value)
      event.preventDefault();
      if (!msgerInput.value) return;


      var newItem1 = msgerInput.value
      const user = parseJwt(localStorage.getItem('token'))


      parseJwt(localStorage.getItem("group"))
      socket.emit("send-message",newItem1,localStorage.getItem("token"))
      appendMessage(user.name, PERSON_IMG, "right", newItem1,new Date);


      
      // const data = {
      //   message: newItem1,
      //   groupid:parseJwt(localStorage.getItem("group")).id,
      // };

      // console.log("????????????????????????????????????????????",data)
  
  
      // const response = await axios.post(
      //   "http://localhost:3000/chat/sendmessage",
      //  data,
      //   { headers: { Authorization: localStorage.getItem("token") } }
      // );
      // console.log(response)
  
  
  
  
  
      msgerInput.value = "";
      // getMessages()
  
  
    } catch (error) {
      console.error("catch block called");    
      console.log(error);    
  
  
  
  
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  msgerHead.addEventListener("click",groupMembers)

  async function groupMembers(){
    location.href="./groupmembers.html"
  }
  