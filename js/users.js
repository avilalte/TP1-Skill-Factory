const table = document.querySelector("table");
const URL = "https://jsonplaceholder.typicode.com/users";

const getUsers = async () => {
  try {
    return await axios.get(URL);
  } catch (err) {
    console.log(`%c Error.${err}`, "background-color: red; color: white");
  }
};

const showUsers = async () => {
  const users = await getUsers();
  users.data.forEach((user) => {
    const { name, id, email, phone } = user;
    const { city } = user.address;
    const { name: company } = user.company;
    const newRow = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdId = document.createElement("td");
    const tdEmail = document.createElement("td");
    const tdPhone = document.createElement("td");
    const tdCity = document.createElement("td");
    const tdCompany = document.createElement("td");

    tdName.innerHTML = name;
    tdId.innerHTML = id;
    tdEmail.innerHTML = email;
    tdPhone.innerHTML = phone;
    tdCity.innerHTML = city;
    tdCompany.innerHTML = company;

    newRow.append(tdName, tdId, tdEmail, tdPhone, tdCity, tdCompany);
    table.append(newRow);
  });
};

showUsers();
