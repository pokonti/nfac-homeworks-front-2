import "./App.css";
import { Route, Routes } from "react-router";
import { Wrapper } from "./wrapper.tsx";
import { Chat } from "../modules/chat/chat.tsx";
import { DefaultChat } from "../modules/chat/default-chat.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route index element={<DefaultChat />} />
        <Route path="chat/:chatId" element={<Chat />} />
      </Route>
    </Routes>
  );
};
export default App;

