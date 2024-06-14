import app from "./app/server";
import { Hono } from "hono";

const base = new Hono();
base.route("/", app);

// biome-ignore lint/style/noDefaultExport: <explanation>
export default base;
