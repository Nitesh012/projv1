import { RequestHandler } from "express";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Query users table
    const { data: users, error: queryError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (queryError || !users) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // In production, use bcrypt to hash passwords
    if (users.password !== password) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const { password: _, ...userWithoutPassword } = users;
    res.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { email, password, first_name, last_name, role = "teacher" } =
      req.body;

    if (!email || !password || !first_name || !last_name) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        email,
        password,
        first_name,
        last_name,
        role,
      })
      .select()
      .single();

    if (insertError) {
      res.status(400).json({ error: insertError.message });
      return;
    }

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.query.id as string;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, first_name, last_name, role, phone, created_at")
      .eq("id", userId)
      .single();

    if (error || !user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
