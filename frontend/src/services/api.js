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


export const fetchSuggestions = async (token) => {
  const res = await fetch("http://localhost:5000/api/student/suggestions", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const addStudentSuggestion = async (token, type, providerId) => {
  const res = await fetch("http://localhost:5000/api/student/suggestions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ type, providerId }),
  });
  return res.json();
};

export const sendStudentMessage = async (token, fullName, email, message) => {
  const res = await fetch("http://localhost:5000/api/student/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fullName, email, message }),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
};

export const rateSelectedMess = async (token, rating) => {
  const res = await fetch("http://localhost:5000/api/student/rate-mess", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rating }),
  });

  if (!res.ok) throw new Error("Failed to submit rating");
  return res.json();
};

export const rateSelectedRoom = async (token, rating) => {
  const res = await fetch("http://localhost:5000/api/student/rate-room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rating }),
  });

  if (!res.ok) throw new Error("Failed to submit rating");
  return res.json();
};


// Add this line near the top of your file
const BASE_URL_MESS = "http://localhost:5000/api/mess";

// -------------------- MESS PROVIDER PROFILE -------------------- //

export const fetchMessProfile = async (token) => {
  const res = await fetch(`${BASE_URL_MESS}/mess-profilepage`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch mess provider profile");
  return res.json();
};