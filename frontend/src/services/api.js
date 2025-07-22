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


//  -------------------- ROOM PROVIDER PROFILE -------------------- //

const BASE_URL_ROOM = "http://localhost:5000/api/room";

export const fetchRoomProfile = async (token) => {
  const res = await fetch(`${BASE_URL_ROOM}/room-profilepage`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch room provider profile");
  return res.json();
};

export const sendMessMessage = async (token, message) => {
  const res = await fetch("http://localhost:5000/api/student/send-mess-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to send message");
  }

  return res.json(); // Will return { message: "Message sent to mess provider" }
};

export const sendRoomMessage = async (token, message) => {
  const res = await fetch("http://localhost:5000/api/student/send-room-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error("Failed to send room message");
  return res.json();
};
export const fetchMessRequests = async (token) => {
  const res = await fetch("http://localhost:5000/api/mess/requests", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch mess requests");
  return res.json();
};

export const acceptMessRequest = async (token, studentId) => {
  const res = await fetch("http://localhost:5000/api/mess/accept-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ studentId }),
  });

  if (!res.ok) throw new Error("Failed to accept request");
  return res.json();
};


export const fetchConnectedStudents = async (token) => {
  const res = await fetch("http://localhost:5000/api/mess/connected", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};


export const fetchRoomRequests = async (token) => {
  const res = await fetch("http://localhost:5000/api/room/requests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch room requests");
  return res.json();
};

export const acceptRoomRequest = async (token, studentId) => {
  const res = await fetch("http://localhost:5000/api/room/accept-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ studentId }),
  });

  if (!res.ok) throw new Error("Failed to accept room request");
  return res.json();
};

export const fetchConnectedMessStudents = async (token) => {
  const res = await fetch("http://localhost:5000/api/mess/connected-students", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch connected students");
  return res.json();
};
export const fetchConnectedRoomStudents = async (token) => {
  const res = await fetch("http://localhost:5000/api/room/connected-room-students", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Failed to fetch connected room students");
  return res.json();
};


