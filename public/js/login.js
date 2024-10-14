document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: document.getElementById("emailAddress").value,
          password: document.getElementById("password").value,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log(data);
      if (data) {
        document.getElementById("emailAddress").value = "";
        document.getElementById("password").value = "";
        window.localStorage.setItem("token", data.token);
        window.location.href = "/account";
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  });
