import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";
import "./auth.js";
import pgSession from "connect-pg-simple";
const PgSession = pgSession(session);

dotenv.config();
const app = express();

app.use(cors({ origin: "https://keeper-frontend-p4xl.onrender.com", credentials: true }));
app.use(bodyParser.json());

app.use(session({
  store: new PgSession({
    pool: db, // using the same PG client
    tableName: "session"
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "none",
    secure: true
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth with account chooser
app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account" // Forces Google to show account selector
}));

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("https://keeper-frontend-p4xl.onrender.com");
  }
);

// Get authenticated user
app.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).send("Unauthorized");
  }
});

// Logout route
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("https://keeper-frontend-p4xl.onrender.com");
    });
  });
});

// Notes routes




app.listen(3000, () => console.log("Server running on http://localhost:3000"));
