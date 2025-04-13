// /services/authService.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function signIn(username, password) {
    // Build URL-encoded form data
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
  
    // Call your backend login endpoint (adjust URL if necessary)
    const res = await fetch(`${BASE_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Login failed");
    }
  
    // Return the response data (e.g., an access token)
    return await res.json();
  }
  