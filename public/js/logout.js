export async function logout() {
  try {
    const res = await fetch("api/auth/logout", {
      method: "POST",
      credentials: "include", // Ensure session cookie is sent
    });
    window.location.href = "/";
  } catch {
    console.log("failed to log out", err);
  }
}
