import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Providers/AuthProvider";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { ThemeProvider } from "./Providers/ThemeProvider";
import {
  ChakraProvider,
  ColorModeProvider,
  ColorModeScript,
} from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="light" />
    <ChakraProvider>
      <ColorModeProvider
        options={{ useSystemColorMode: false, initialColorMode: "light" }}
      >
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
            <Toaster position="top-center" reverseOrder={false} />
              <RouterProvider router={router} />
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
