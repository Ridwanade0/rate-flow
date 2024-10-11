// /account/api-keys-list

const getAPIKeys = async () => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await fetch("/account/api-keys-list", {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch API keys");
    }
    // Parse the response as JSON
    const data = await response.json();

    // Append the data to the tbody of the apikeys.ejs file
    const tableBody = document.getElementById("apikeys");
    data.keys.forEach((apiKey) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${apiKey.id}</td>
        <td>${apiKey.apiKey}</td>
        <td>${new Date(apiKey.createdAt).toISOString()}</td>
        <td>${new Date(apiKey.updatedAt).toISOString()}</td>
        <!-- Add more columns as needed -->
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error.message);
  }
};

getAPIKeys();
