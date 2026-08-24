import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = Number(process.env.PORT) || 5000;
try { await connectDatabase(); app.listen(port, () => console.log(`API listening at http://localhost:${port}/api`)); } catch (error) { console.error(`Unable to start server: ${error.message}`); process.exit(1); }
