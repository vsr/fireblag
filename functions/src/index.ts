import * as functions from "firebase-functions";
import "./admin";
import * as b from "./blog";

export const blog = functions.https.onRequest(b.webapp);
