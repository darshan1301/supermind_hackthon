export const BASE_URL = "https://supermind-hackthon-4a9r.onrender.com";

export async function login(data) {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function signUp(data) {
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        dob: data.dob,
        city: data.city,
        gender: data.gender,
        state: data.state,
      }),
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
