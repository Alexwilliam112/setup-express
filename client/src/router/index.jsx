import * as React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from 'toastify-js';
import BaseLayout from "../layouts/BaseLayout.jsx";
import Template from "../views/Template.jsx";

const url = 'http://localhost:3000'
const router = createBrowserRouter([
    {
        path: "/login",
        element: < Template url={url} />
    },
    {
        element: <BaseLayout />,
        loader: () => {
            if (!localStorage.access_token) {
                Toastify({
                    text: "Please log in first",
                    duration: 2000,
                    newWindow: true,
                    close: true,
                    gravity: "bottom",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#EF4C54",
                        color: "#17202A",
                        boxShadow: "0 5px 10px black",
                        fontWeight: "bold"
                    }
                }).showToast();
                return redirect('/login')
            }

            return null
        },
        children: [
            {
                path: "/path1",
                element: < Template url={url} />
            },
            {
                path: "/path2",
                element: < Template url={url} />
            }
        ]
    },
]);
export default router