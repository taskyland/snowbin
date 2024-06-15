import { plugin } from "bun";
import { stylesPlugin } from "./styles";
import { clientPlugin } from "./client";

plugin(clientPlugin);
plugin(stylesPlugin);
