import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const PageProvider = lazy(() => import("../../components/Provider/PageProvider"));
const PageRoot = lazy(() => import("../../components/Page/PageRoot"));
const GettingStart = lazy(() => import('../GettingStart/GettingStart'));
const Story = lazy(() => import('../Story/Story.tsx'));

const router = createBrowserRouter([
  {
    path: "/",
    Component: PageRoot,
    children: [
      { index: true, Component: GettingStart },
      {
        path: 'story/:storyId',
        Component: PageProvider,
        children: [
          { index: true, Component: Story },
        ],
      },
    ],
  },
]);

export default function Pages () {
  return <>
    <RouterProvider router={router} />
  </>
}
