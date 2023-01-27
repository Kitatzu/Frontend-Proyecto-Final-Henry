import io from "socket.io-client";
import Global from "../Global";

export const socket = io(Global.URL);
