import { getAuth } from "firebase/auth";

const auth = getAuth();
auth.useDeviceLanguage();