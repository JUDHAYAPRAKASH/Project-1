# AWS Contact Book — Serverless Project

This project is a serverless contact book application using AWS Lambda, API Gateway, DynamoDB, S3, and CloudFront.  
It allows users to submit contact details and view saved messages.

---

## Project Architecture

User → CloudFront → S3 (HTML/JS) → API Gateway → Lambda → DynamoDB

---

## Features

- Fully serverless design, no traditional backend server.
- Save contact details (Name, Email, Message) in DynamoDB.
- View all saved messages.
- IAM-based security.
- Deployed globally via CloudFront.

---

## Step-by-Step Setup

### Step 1: Prepare the Frontend
- Create an HTML page with a form containing fields for name, email, and message.
- Add JavaScript to send a POST request to save contact details.
- Add JavaScript to send a GET request to retrieve and display saved messages.

---

### Step 2: Create DynamoDB Table
- Go to AWS DynamoDB and create a new table.
- Table name: `ContactBook`.
- Primary key: `id` (String).
- Use on-demand capacity mode.

---

### Step 3: Create Lambda Functions
- Create two Lambda functions:
  1. **POST Lambda** — Receives form data and stores it in DynamoDB with a unique ID.
  2. **GET Lambda** — Fetches all saved contact entries from DynamoDB.
- Assign the Lambda execution role the necessary DynamoDB permissions.

---

### Step 4: Set Up API Gateway
- Create a new HTTP API.
- Create two routes:
  - POST `/contacts` linked to the POST Lambda.
  - GET `/contacts` linked to the GET Lambda.
- Enable CORS for all origins and methods.
- Deploy the API and copy the endpoint URLs.

---

### Step 5: Deploy Frontend to S3
- Create an S3 bucket with a globally unique name.
- Enable static website hosting in the bucket properties.
- Upload the HTML and JavaScript files.
- Configure the bucket policy to allow public read access.

---

### Step 6: Set Up CloudFront
- Create a CloudFront distribution with the S3 bucket as the origin.
- Set the default root object to `index.html`.
- Copy the CloudFront distribution domain name for global access.

---

### Step 7: (Optional) Configure a Custom Domain with Route 53
- Register or use an existing domain in Route 53.
- Create an Alias A record pointing to the CloudFront distribution.
- Wait for DNS propagation.

---

## Testing
- Open the CloudFront URL (or custom domain) in a browser.
- Submit the contact form and verify the data is saved in DynamoDB.
- Retrieve and view saved messages.

---

## License
MIT License
