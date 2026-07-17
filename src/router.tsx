import { lazy } from "react";
import { createHashRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";

// Route-level code splitting: heavy pages (esp. the therapist protocol content) load on demand.
const Understand = lazy(() => import("@/pages/Understand"));
const Needs = lazy(() => import("@/pages/Needs"));
const NeedDetail = lazy(() => import("@/pages/NeedDetail"));
const Practice = lazy(() => import("@/pages/Practice"));
const ToolPage = lazy(() => import("@/pages/ToolPage"));
const MySpace = lazy(() => import("@/pages/MySpace"));
const Calm = lazy(() => import("@/pages/Calm"));
const Therapist = lazy(() => import("@/pages/Therapist"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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
