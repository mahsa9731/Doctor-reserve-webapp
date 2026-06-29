# 🩺 Doctor Reserve (دکتر رزرو) - Medical Appointment Booking System

A comprehensive, production-ready Full-Stack Medical Appointment Booking System built using modern web technologies. This platform bridges the gap between healthcare providers and patients by offering seamless browsing, real-time availability checking, and an instantaneous One-Time Password (OTP) authenticated booking pipeline, fully aligned with pixel-perfect Figma designs.

---

## 🚀 Features

### 👤 Patient Portal & Core Features
* **Physician Discovery:** Dynamic list and grid views showcasing registered doctors, specializations, ratings, and structural clinic details.
* **Advanced Search & Filtering:** Instant multi-criteria filtering by specialization, availability, geographical location, and medical expertise.
* **Comprehensive Profiles:** Detailed medical practitioner profiles, incorporating academic history, patient reviews, consulting fees, and dynamic schedules.
* **Intuitive Appointment Scheduler:** Interactive time-slot selection displaying immediate real-time availability to avoid double-booking.
* **Personal Dashboard:** Secured panel where patients can track upcoming appointments, review past medical visits, and manage personal profile metadata.

### 🛡️ Authentication & Security
* **Passwordless OTP Authentication:** Secure workflow utilizing mobile numbers and dynamic One-Time Passwords.
* **JWT Token Architecture:** Seamless token-based authorization via custom Next.js Middleware to safeguard private patient paths and API endpoints.

### 💻 Backend & Data Layer
* **RESTful API Infrastructure:** Built entirely via native Next.js API Routes (App Router) managing standard transactional operations.
* **Optimized NoSQL Layer:** Data persistence via MongoDB, using highly structured Mongoose schemas ensuring indexing efficiency and structural validation.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS

### Backend & Database
* **API Runtime:** Next.js Route Handlers (API Routes)
* **Database ODM:** Mongoose
* **Database Server:** MongoDB

### Authentication
* **Token Standard:** JSON Web Tokens (JWT)
* **Verification:** OTP (One-Time Password) Logic

---

## 📋 Prerequisites

Before initializing the development workspace, verify that your local environment contains the following utilities:

* **Node.js** (v18.x.x or higher recommended)
* **npm** or **yarn** / **pnpm**
* **MongoDB Instance** (Local Community Server or MongoDB Atlas cluster connection string)

---

## ⚙️ Installation & Setup Guide

Follow these sequential instructions to deploy a local instance of the application:

### 1. Clone the Repository
```bash
git clone 
cd doctor-reserve

npm install
# or
yarn install
# or
pnpm install

npm run dev
# or
yarn dev
# or
pnpm dev