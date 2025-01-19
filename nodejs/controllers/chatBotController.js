const { configDotenv } = require("dotenv");
configDotenv();

async function handleUserInput(req, res) {
  const APPLICATION_TOKEN = process.env.APPLICATION_TOKEN;
  try {
    const response = await axios.post(
      "https://api.langflow.astra.datastax.com/lf/bdbc0ac6-008b-4cfd-ba3c-563572f1746f/api/v1/run/517a2e9d-faf4-4e3a-a02d-4a010e9aacf6?stream=false",
      {
        input_value: req.body.input_value,
        output_type: "chat",
        input_type: "chat",
      },
      {
        headers: {
          Authorization: `Bearer ${APPLICATION_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.send(
      response.data["outputs"][0]["outputs"][0]["results"]["message"]["text"]
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { handleUserInput };
