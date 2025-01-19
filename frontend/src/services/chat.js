const BASE_URL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem("jwtToken");

export async function postChatMessage(message) {
  try {
    const response = await fetch(`${BASE_URL}/chatbot`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_value: message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data, response);

    return data || null;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}

export async function getKundali() {
  try {
    const response = await fetch(`${BASE_URL}/kundali`, {
      method: "GET",
      Authorization: `Bearer ${token}`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
