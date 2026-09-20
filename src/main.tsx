import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { initAquaGlass } from "./utils/aquaGlass";

// Sıvı cam malzemesi tüm rotalarda geçerli: dört dil düzeni de aynı
// başlığı kullanıyor, bu yüzden bağlama noktası uygulama girişi.
initAquaGlass();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
