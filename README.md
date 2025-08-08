# AWS Contact Book Project

An end-to-end **serverless contact book** built with **AWS Lambda**, **DynamoDB**, **API Gateway**, **S3**, and **CloudFront**.  
Users can submit contact details via a web form and view saved messages — all powered by AWS.

---

## 📌 Project Architecture

**Flow:**

User → CloudFront → S3 HTML/JS → API Gateway → Lambda → DynamoDB


---

## 🚀 Features

- **Frontend** hosted on **S3** and served via **CloudFront**.
- **Serverless backend** with **AWS Lambda** and **API Gateway**.
- **DynamoDB** for storing contact details.
- **CORS-enabled** API for smooth browser communication.
- Optional **custom domain** using **Route 53**.

---


---

## 🚀 Features

- **Serverless** — No servers to manage.
- **Secure & Scalable** — Uses AWS-managed services.
- **Two Lambda Functions**:
  - **POST**: Save contact details to DynamoDB.
  - **GET**: Retrieve all saved contacts.
- **Static Hosting** with S3 + CloudFront for global delivery.

---

## 🛠️ Step-by-Step Setup

### **1️⃣ Design the Contact Form (Frontend)**

1. Create `index.html` with:
   - Name
   - Email
   - Message
   - **Save** button → Adds data
   - **View Messages** button → Fetches all data
2. Create `script.js`:
   - Send **POST** request to API Gateway URL when saving data.
   - Send **GET** request to API Gateway URL when viewing messages.

Example:
```javascript
fetch('<API_GATEWAY_POST_URL>', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

fetch('<API_GATEWAY_GET_URL>')
  .then(res => res.json())
  .then(data => console.log(data));

