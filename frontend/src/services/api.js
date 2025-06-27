const BASE_URL = "http://localhost:5000/api/student";

// -------------------- AUTH -------------------- //

export const sendOtp = async (email) => {
  const res = await fetch(`${BASE_URL}/generate-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return res.json();
};

export const signupStudent = async (data) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const loginStudent = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const sendForgotPasswordOtp = async (email) => {
  const res = await fetch(`${BASE_URL}/forgot-password/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return res.json();
};

export const resetPassword = async ({ email, otp, newPassword }) => {
  const res = await fetch(`${BASE_URL}/forgot-password/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp, newPassword })
  });
  return res.json();
};

// -------------------- STUDENT PROFILE -------------------- //

export const fetchStudentProfile = async (token) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch student profile");
  return res.json();
};
