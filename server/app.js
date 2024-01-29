const express = require('express')
const axios = require('axios')
const app = express()
const customPort = 3000;

app.use(express.static("./client"))

app.get("/data", async (req, res) => {
  try {
    const api_Response = await axios.get("https://fakestoreapi.com/products")
    const json_Data = api_Response.data
    res.json(json_Data) 
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: "Server Error" })
  }
});

app.listen(customPort, () => {
  console.log(`Server listening on port on http://localhost:${customPort}`)
});
