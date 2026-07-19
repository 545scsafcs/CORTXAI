import dotenv from "dotenv";
dotenv.config();

import connectDB from "./database/db.js";
import HRAgent from "../agents/hr/HRAgent.js";

await connectDB();

const result = await HRAgent.execute({
  action: "GET_EMPLOYEES",
});

console.log(result);