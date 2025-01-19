const { configDotenv } = require("dotenv");
configDotenv();

async function handleUserInput(req, res) {
  const APPLICATION_TOKEN = process.env.APPLICATION_TOKEN;
  console.log(req.body);
  try {
    const response = await fetch(
      "https://api.langflow.astra.datastax.com/lf/bdbc0ac6-008b-4cfd-ba3c-563572f1746f/api/v1/run/517a2e9d-faf4-4e3a-a02d-4a010e9aacf6?stream=false",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${APPLICATION_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_value: req.body.input_value,
          output_type: "chat",
          input_type: "chat",
        }),
        timeout: 15000, // Set a timeout for the request (15 seconds)
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const message =
      data["outputs"][0]["outputs"][0]["results"]["message"]["text"];

    res.status(200).send({ message });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { handleUserInput };
