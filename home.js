
// window.addEventListener("load", showUsers);

// async function showUsers() {
//   try {

//     const response = await axios.get("http://localhost:3000/home/users", {
//       headers: { Authorization: localStorage.getItem("token") },
//     });

//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var message = document.getElementById("message");
var send = document.getElementById("send");
send.addEventListener("click", sendMessage);

async function sendMessage() {
  
  try { 
    console.log('sendMessage called')
    console.log("///////////////////////////////",message.value)
    var newItem1 = message.value
    const data = {
      message: newItem1,
    };


    const response = await axios.post(
      "http://localhost:3000/chat/sendmessage",
      data,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    console.log(response)





    message.value = "";


  } catch (error) {
    console.error("catch block called");    
    console.log(error);    




  }
}



