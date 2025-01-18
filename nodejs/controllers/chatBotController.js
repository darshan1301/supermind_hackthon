const { configDotenv } = require("dotenv");
configDotenv();

async function extractMessage(responseText) {
  try {
    const data = JSON.parse(responseText);
    return (
      data.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
      "Message not found"
    );
  } catch (error) {
    console.error("Error parsing response text:", error);
    return "Invalid response format";
  }
}

const handleUserInput = async (req, res) => {
  try {
    const { input_value } = req.body;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${process.env.ASTRA_API}`);

    const raw = JSON.stringify({
      input_value: `${input_value}`,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.langflow.astra.datastax.com/lf/bdbc0ac6-008b-4cfd-ba3c-563572f1746f/api/v1/run/be31b372-8d3f-4412-8a14-b7f75a7804a4?stream=false",
      requestOptions
    );

    const result = await response.text();

    const message = await extractMessage(result);

    res.status(200).json({ data: message });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = { handleUserInput };
