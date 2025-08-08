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

## 📂 Project Structure


## 🛠️ Step-by-Step Setup

### **1️⃣ Design the Contact Form (Frontend)**

1. Create `index.html` with fields:
   - Name
   - Email
   - Message
   - **"Save" button** → Sends POST request.
   - **"View Messages" button** → Sends GET request.

2. Create `script.js`:
   - Sends **POST** request to API Gateway URL on form submit.
   - Sends **GET** request to API Gateway URL on button click.
   - Example:

     ```javascript
    $.ajax({
      url: API_ENDPOINT,
      type: "POST",
      data: JSON.stringify(inputData),
      contentType: "application/json; charset=utf-8",
      success: function () {
        document.getElementById("messageSaved").innerHTML = "Message Saved!";
        $("#msg").val("");
        $("#fname").val("");
        $("#lname").val("");
      },
      error: function () {
        alert("Error saving message.");
      },
    });
  };
  document.getElementById("getmessages").onclick = function () {
    $.ajax({
      url: API_ENDPOINT,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        $("#showMessages").empty();
        $.each(response, function (i, data) {
          var messageCardHtml =
            '<div class="messageCard">' +
            '<div class="messageContent">' + data["msg"] + '</div>' +
            '<div class="messageDetail">From: ' + data["firstName"] + ' ' + data["lastName"] + ' on ' + data["date"] + '</div>' +
            '</div>';
          $("#showMessages").append(messageCardHtml);
        });
      },
      error: function () {
        alert("Error fetching messages.");
      },
    });
  };
     ```

---

### **2️⃣ Create DynamoDB Table**

1. Go to **AWS DynamoDB** → **Create table**.
2. **Table name:** `ContactBook`
3. **Primary key:** `id` (String)
4. **Capacity mode:** On-demand.
5. Note **Table name** and **Region**.

---

### **3️⃣ Create Lambda Functions**

You need **two** functions:

- **POST Lambda** → Save contact details.
- **GET Lambda** → Retrieve all contacts.

**Steps:**

1. Go to **AWS Lambda** → **Create function**.
2. Runtime: **Node.js** (or Python).
3. Assign IAM role with `AmazonDynamoDBFullAccess` (or minimal read/write permissions).
4. Example **POST Lambda** (Node.js):

   ```javascript
   const AWS = require('aws-sdk');
   const { v4: uuidv4 } = require('uuid');
   const dynamo = new AWS.DynamoDB.DocumentClient();
   const tableName = 'ContactBook';

   exports.handler = async (event) => {
     const body = JSON.parse(event.body);
     const item = {
       id: uuidv4(),
       name: body.name,
       email: body.email,
       message: body.message,
       createdAt: new Date().toISOString()
     };

     await dynamo.put({ TableName: tableName, Item: item }).promise();
     return {
       statusCode: 200,
       body: JSON.stringify({ message: 'Contact saved', item })
     };
   };
