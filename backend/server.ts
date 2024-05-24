import dotenv from "dotenv";
import app from "./app";
dotenv.config();

const PORT = Number(process.env.PORT) || 8080;
app.use((err: any, res: any) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
