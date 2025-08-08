# AWS Contact Book — Serverless Project

This is a **serverless contact book application** built using **AWS Lambda**, **API Gateway**, **DynamoDB**, **S3**, and **CloudFront**.  
It allows users to **submit contact details** and **view saved messages** via a web form.

---

## 📌 Project Architecture

User → CloudFront → S3 HTML/JS → API Gateway → Lambda → DynamoDB


---

## 🚀 Features

- Serverless — no traditional backend server.
- Save contact details (Name, Email, Message) in DynamoDB.
- View all saved messages.
- Secure with IAM permissions.
- Deployed globally via CloudFront.

---

## 🛠 Step-by-Step Setup

### **1️⃣ Frontend (HTML + JS)**

1. Create `index.html` with a contact form:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Contact Book</title>
   </head>
   <body>
       <h1>Contact Book</h1>
       <input id="name" placeholder="Name">
       <input id="email" placeholder="Email">
       <textarea id="message" placeholder="Message"></textarea>
       <button onclick="saveContact()">Save</button>
       <button onclick="viewContacts()">View Messages</button>
       <pre id="output"></pre>
       <script src="script.js"></script>
   </body>
   </html>
const POST_URL = "<API_GATEWAY_POST_URL>";
const GET_URL = "<API_GATEWAY_GET_URL>";

async function saveContact() {
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };
    const res = await fetch(POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    document.getElementById("output").innerText = await res.text();
}

async function viewContacts() {
    const res = await fetch(GET_URL);
    const data = await res.json();
    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}
2️⃣ DynamoDB Table
Open DynamoDB → Create table:

Name: ContactBook

Primary key: id (String)

Keep on-demand capacity.

Save the table name & region.

3️⃣ Lambda Functions
You’ll create two Lambda functions.

POST Lambda (Save Contact)

const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");
const db = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const params = {
        TableName: "ContactBook",
        Item: {
            id: { S: uuidv4() },
            name: { S: body.name },
            email: { S: body.email },
            message: { S: body.message }
        }
    };
    await db.send(new PutItemCommand(params));
    return { statusCode: 200, body: "Contact saved successfully!" };
};

GET Lambda (Fetch Contacts)

const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const db = new DynamoDBClient({ region: process.env.AWS_REGION });

exports.handler = async () => {
    const data = await db.send(new ScanCommand({ TableName: "ContactBook" }));
    return {
        statusCode: 200,
        body: JSON.stringify(data.Items)
    };
};

4️⃣ API Gateway
Create API → HTTP API.

Add routes:

POST /contacts → POST Lambda

GET /contacts → GET Lambda

Enable CORS (Origin: *, Methods: GET, POST).

Deploy API → Copy Invoke URLs → Paste into script.js.

5️⃣ S3 Frontend Hosting
Create S3 bucket (unique name).

Enable Static website hosting.

Upload index.html & script.js.

Make files public with a bucket policy.

6️⃣ CloudFront Distribution
Create CloudFront → Origin: S3 bucket.

Default root: index.html.

Copy CloudFront URL → Access app globally.

7️⃣ (Optional) Route 53 Custom Domain
Register or use existing domain.

Create Alias A record → Points to CloudFront.

Wait for DNS to propagate.
