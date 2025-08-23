
---

# University Attendance System (QR-Based)

A **secure, high-performance attendance system** for universities that uses **AES-256-GCM encrypted QR codes** to record student attendance in real time. Designed to handle large crowds efficiently while protecting sensitive student data.

## Key Features

* **QR-Based Attendance** – Each student receives a QR code containing encrypted matric number.
* **Real-Time Verification** – Scans are instantly sent to backend, decrypted, verified, and recorded.
* **Secure Data Handling** – AES key stored in backend/KMS; optional hashing for DB storage.
* **Audit & Logging** – Immutable logs for every scan, including success/failure and timestamps.
* **Dashboard & Analytics** – Admins can view reports, charts, and attendance summaries.
* **Offline Mode Support** – Scanners can temporarily cache scans if network drops, syncing later.
* **Scalable & Fast** – Optimized for thousands of scans per minute.

## Tech Stack

* **Frontend:** React.js (dashboard, scanner UI)
* **Backend:** Node.js (API, decryption, verification, recording)
* **Database:** MongoDB (student info, attendance logs)
* **Encryption:** AES-256-GCM (QR code data)
* **Optional Desktop App:** Java/JavaFX (scanner interface)
* **Algorithms:** Python (additional attendance analytics if needed)

## Flow

```
Student presents QR → Scanner reads → Sends ciphertext to backend → Backend decrypts → Verifies student → Records attendance → Updates dashboard/logs
```

---

