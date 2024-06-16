import { app } from "../config";
import { getAuth } from "firebase/auth";
import { getDatabase, update, ref, child } from "firebase/database";

const auth = getAuth(app);
const db = getDatabase(app);

export default async function updateUser() {}
