import React from "react";
import Header from "./Header";
import CartOverview from '../features/cart/CartOverview'
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <header>
      <Header />

      <main>
        <h1>Content</h1>
        <Outlet />
      </main>

      <CartOverview />
    </header>
  );
}
