import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { SearchProvider } from "./context/SearchContext";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/typography.css";
import "./styles/components.css";
import "./styles/utilities.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <AuthProvider>

            <UserProvider>

                <SearchProvider>

                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration:3000,
                            style:{
                                borderRadius:"12px",
                            },
                        }}
                    />

                    <App/>

                </SearchProvider>

            </UserProvider>

        </AuthProvider>

    </React.StrictMode>
);