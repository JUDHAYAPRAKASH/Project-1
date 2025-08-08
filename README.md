Alright — you need a **complete `README.md`** file for your **AWS Serverless Contact Book project** that explains everything in one place — purpose, tech stack, architecture, setup steps, screenshots, and deployment.

Here’s the **full GitHub README code** you can directly copy into your repository:

---

```markdown
# 📒 AWS Serverless Contact Book

A fully **serverless contact management web application** built using:

- **AWS Lambda** – Backend logic for inserting and retrieving contacts
- **Amazon API Gateway** – REST API for frontend-backend communication
- **Amazon DynamoDB** – NoSQL database for storing contact information
- **Amazon S3** – Static website hosting for HTML, CSS, and JavaScript
- **Amazon CloudFront** – Global CDN for fast and secure delivery
- **Amazon Route 53** – (Optional) Custom domain setup

---

## 🚀 Project Overview

The **AWS Serverless Contact Book** allows users to:
- Submit their contact information via a web form.
- View previously stored contact entries.
- Store and retrieve data securely using AWS services.
- Host the frontend globally with CloudFront.

The project is **fully scalable, cost-efficient, and requires no dedicated servers**.

---

## 🛠 Tech Stack

| Layer       | Technology Used |
|-------------|----------------|
| Frontend    | HTML, CSS (Bootstrap), JavaScript |
| API Layer   | Amazon API Gateway |
| Backend     | AWS Lambda (Node.js or Python) |
| Database    | Amazon DynamoDB |
| Hosting     | Amazon S3 + CloudFront |
| Domain      | Amazon Route 53 (optional) |

---

## 🖼 Architecture Diagram

```

\[User Browser] → \[CloudFront] → \[S3 Static Website]
↓
\[API Gateway Endpoint]
↓
\[AWS Lambda Functions]
↓
\[DynamoDB Table]

```

---

## 📋 Step-by-Step Guide

### **Step 1 – Design the Contact Form**
- Create an HTML form with fields: **Name, Email, Message**.
- Use **Bootstrap** for responsive layout.
- Add a **Submit** button that triggers a JavaScript function.
- Store the **API Gateway Invoke URL** in your JavaScript file.
- Include validation for required fields.

---

### **Step 2 – Create API Gateway Endpoint**
- Open **Amazon API Gateway** in the AWS Console.
- Create a **new REST API**.
- Add **POST** method (for adding data) and **GET** method (for fetching data).
- Enable **CORS** for frontend communication.
- Deploy API to a **stage** (e.g., `prod`) and copy the Invoke URL.

---

### **Step 3 – Write AWS Lambda Functions**
- Create **two Lambda functions**:
  1. **POST Lambda** – inserts data into DynamoDB.
  2. **GET Lambda** – retrieves all data from DynamoDB.
- Attach an **IAM Role** with `AmazonDynamoDBFullAccess` permission.
- Use **AWS SDK** inside Lambda to interact with DynamoDB.
- Return appropriate HTTP responses for success/failure.

---

### **Step 4 – Create DynamoDB Table**
- Go to **Amazon DynamoDB**.
- Create a new table with:
  - **Primary Key**: `id` (String)
- Enable **on-demand capacity** for automatic scaling.
- Use the same **table name** in both Lambda functions.

---

### **Step 5 – Host Frontend in S3**
- Create an **S3 bucket** (name must be unique).
- Enable **Static Website Hosting** in S3 settings.
- Upload your `index.html`, CSS, and JS files.
- Update JavaScript with the **API Gateway URL**.
- Access your S3 public website endpoint to test.

---

### **Step 6 – Add CloudFront & Route 53**
- Create a **CloudFront distribution** pointing to your S3 bucket.
- Set **index.html** as the default root object.
- Copy the **CloudFront domain** to access the site globally.
- (Optional) Use **Route 53** to map a custom domain to your CloudFront distribution.

---

## 📂 Project Structure

```

aws-contact-book/
│── index.html        # Contact form UI
│── script.js         # JavaScript to call API Gateway
│── style.css         # Optional custom styles
│── lambda-post.js    # POST Lambda code
│── lambda-get.js     # GET Lambda code
│── README.md         # Project documentation

```

---

## 🧪 Testing the App
1. Open the website.
2. Fill in **Name, Email, Message**.
3. Click **Submit** – data should be stored in DynamoDB.
4. Click **View Messages** – retrieves and displays stored records.

---

## 📸 Screenshots

**Contact Form**
![Contact Form Screenshot](assets/img/step1.png)

**DynamoDB Table**
![DynamoDB Screenshot](assets/img/step4.png)

**CloudFront Hosted Site**
![CloudFront Screenshot](assets/img/step5.png)

---

## 🔒 Security Notes
- Never expose **AWS Access Keys** in frontend code.
- Use **IAM roles** for Lambda instead of hardcoding credentials.
- Enable **API Gateway throttling** to prevent abuse.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---

## 🌟 Author
**Udhayaprakash** – AWS DevOps Learner & Builder
```

---

If you want, I can also add **ready-to-use sample Lambda code** (`lambda-post.js` and `lambda-get.js`) inside this README so that anyone can just copy-paste and deploy without guessing. That way, your GitHub repo will be completely **self-contained** for others to follow and run.
