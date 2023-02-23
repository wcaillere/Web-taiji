import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import "./PageWrapper.css";

export default function PageWrapper() {
  return (
    <div className="pageWrapper">
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer>
        Puzzle's rules designed by{" "}
        <Link
          to="https://twitter.com/mvandevander"
          target="_blank"
          className="footerLink"
        >
          Matthew VanDevander
        </Link>{" "}
        for the game{" "}
        <Link
          to="https://store.steampowered.com/app/1141580/Taiji/"
          target="_blank"
          className="footerLink"
        >
          Taiji
        </Link>
      </footer>
    </div>
  );
}
