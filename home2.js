const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const PERSON2_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
 setInterval(() =>getMessages(), 10000)

async function getMessages() {
  try {

    const response = await axios.get("http://localhost:3000/chat/getmessage", {
      headers: { Authorization: localStorage.getItem("token") },
    });

    console.log(response.data);
    console.log("////////////////////////",response.data[1]);
    previousMessages=response.data
    const user = parseJwt(localStorage.getItem('token'))
    console.log(user)
    msgerChat.innerHTML=" " 
    for(i in previousMessages){
         dateTime = new Date(response.data[i].createdAt)

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
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
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
      const data = {
        message: newItem1,
      };
  
  
      const response = await axios.post(
        "http://localhost:3000/chat/sendmessage",
        data,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      console.log(response)
  
  
  
  
  
      msgerInput.value = "";
      getMessages()
  
  
    } catch (error) {
      console.error("catch block called");    
      console.log(error);    
  
  
  
  
    }
  }
  