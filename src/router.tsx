import { createHashRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Understand from "@/pages/Understand";
import Needs from "@/pages/Needs";
import NeedDetail from "@/pages/NeedDetail";
import Practice from "@/pages/Practice";
import ToolPage from "@/pages/ToolPage";
import MySpace from "@/pages/MySpace";
import Calm from "@/pages/Calm";
import Therapist from "@/pages/Therapist";
import NotFound from "@/pages/NotFound";

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "understand", element: <Understand /> },
      { path: "needs", element: <Needs /> },
      { path: "needs/:needId", element: <NeedDetail /> },
      { path: "practice", element: <Practice /> },
      { path: "practice/:toolId", element: <ToolPage /> },
      { path: "my-space", element: <MySpace /> },
      { path: "calm", element: <Calm /> },
      { path: "therapist", element: <Therapist /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
