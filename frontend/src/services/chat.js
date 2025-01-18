import { BASE_URL } from "../constants";

const token = localStorage.getItem("jwtToken");

export async function postChatMessage(message) {
  try {
    const response = await fetch(`${BASE_URL}/chatbot`, {
      method: "POST",
      Authorization: `Bearer ${token}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
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
