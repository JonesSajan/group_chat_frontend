var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var body = document.getElementsByTagName("body");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



form.addEventListener("submit", addItem);

async function addItem(e) {
  e.preventDefault();
  
  try { 
    var newItem1 = e.target.name.value;
    var newItem2 = e.target.email.value;
    var newItem3 = e.target.phone.value;
    var newItem4 = e.target.password.value;
    const data = {
      name: newItem1,
      email: newItem2,
      email: newItem3,
      password: newItem4,
    };


    const response = await axios.post(
      "http://localhost:3000/user/adduser",
      data
    );
    console.log(response.data);
    if(response.data=="unique violation")
    {document.getElementById('message').innerHTML='<p style="color:red">Email Id already exist</p>'}
    else{
      document.getElementById('message').innerHTML='<p style="color:green">Account Created Successfully</p>'
    document.getElementById("item1").value = "";
    document.getElementById("item2").value = "";
    document.getElementById("item3").value = "";
    }
   
  } catch (error) {
    console.error(error);
  }
}

