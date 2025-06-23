# 🐾 Pet Adoption Center API

This is a full-stack Pet Adoption Center application that allows users to add, view, update, and delete pets available for adoption.

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React.js
- **Database:** MongoDB (Cloud via MongoDB Atlas)
- **API Testing:** Postman

---

## 📌 Features

- Add new pets for adoption
- View all available pets
- Edit pet details
- Delete pets
- Fully connected React frontend
- Tested with Postman

---

## 📡 API Endpoints

All API routes are prefixed with: `http://localhost:5000/api/pets`

### ➕ `POST /api/pets`
Add a new pet.

**Request Body:**
```json
{
  "name": "Tommy",
  "age": 2,
  "breed": "Labrador",
  "description": "Friendly and playful",
  "image": "https://example.com/dog.jpg"
}
```

### 📥 `GET /api/pets`
Get all pets.

**Response:**
```json
[
  {
    "_id": "abcd1234",
    "name": "Tommy",
    "age": 2,
    "breed": "Labrador",
    "description": "Friendly and playful",
    "image": "https://example.com/dog.jpg"
  }
]
```

### ✏️ `PUT /api/pets/:id`
Update pet details.

**Request Body (same as POST):**  
Only include fields you want to update.

### ❌ `DELETE /api/pets/:id`
Delete a pet by its ID.

---

## 🛢️ Database Integration (MongoDB)

- MongoDB Atlas cloud database
- Connected using the official `mongoose` ODM
- Database URL stored in `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
```

- Connection in `backend/server.js`:
```js
mongoose.connect(process.env.MONGO_URI)
```

---

## ▶️ How to Run the Server

1. Clone the repository:
```bash
git clone https://github.com/your-username/pet-adoption-center.git
cd pet-adoption-center/backend
```

2. Install dependencies:
```bash
npm install
```

3. Add a `.env` file:
```env
PORT=5000
MONGO_URI=<your MongoDB URI>
```

4. Start the server:
```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

---

## 🌐 How to Run the Frontend

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

Frontend will run on: `http://localhost:3000`

---

## 🔁 How to Interact with the API (using Postman)

### 1. **Create Pet (POST)**  
- URL: `http://localhost:5000/api/pets`
- Method: POST  
- Body (JSON):
```json
{
  "name": "Leo",
  "age": 4,
  "breed": "Beagle",
  "description": "Loyal and energetic",
  "image": "https://example.com/beagle.jpg"
}
```

### 2. **Get Pets (GET)**  
- URL: `http://localhost:5000/api/pets`
- Method: GET

### 3. **Update Pet (PUT)**  
- URL: `http://localhost:5000/api/pets/<pet-id>`
- Method: PUT  
- Body: (any field you want to update)

### 4. **Delete Pet (DELETE)**  
- URL: `http://localhost:5000/api/pets/<pet-id>`
- Method: DELETE

---

## 📸 UI Preview

- 🐶 Add pet via form
- 📋 View all pets in card format
- 🗑️ Delete pet
- ✏️ Edit pet with pre-filled form

---

## 🙌 Contributing

PRs are welcome. Feel free to fork the repo and improve styling, validation, or features.

---

## 👨‍💻 Author

Nishant Kumar Chaubey

---

## 📄 License

[MIT](LICENSE)
