var form = document.getElementById("addForm");

window.addEventListener("load", showUsers);

async function showUsers() {
  try {

    const response = await axios.get("http://localhost:3000/home/users", {
      headers: { Authorization: localStorage.getItem("token") },
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


