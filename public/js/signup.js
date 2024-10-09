document
  .getElementById("signupForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/auth/signup", {
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
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error); 
      alert(error.message);  
    }
  });
