
## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/leandrofiadone/Blog-MERN---Oauth2.git
    ```

2. **Backend Setup:**

    ```bash
    cd Blog-MERN---Oauth2/backend
    npm install
    ```

3. **Update the Environment Variables:**

    - Create a `.env` file based on the `config.env.example`:

      ```bash
      cp config/config.env.example config/config.env
      ```

    - Open the `config.env` file in a text editor and update the following variables with your own values:

      ```plaintext
      PORT=8080
      MONGO_URI=your_mongodb_uri
      GOOGLE_CLIENT_ID=your_google_client_id
      GOOGLE_CLIENT_SECRET=your_google_client_secret
      GITHUB_CLIENT_ID=your_github_client_id
      GITHUB_CLIENT_SECRET=your_github_client_secret
      SESSION_SECRET=your_session_secret
      ```

4. **Run the Backend Server:**

    ```bash
    npm run dev
    ```

5. **Frontend Setup:**

    ```bash
    cd ../frontend
    npm install
    npm start
    ```

6. **Access the Application:**

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Scripts

### Backend

- `npm run dev`: Runs the backend server in development mode.
- `npm run start`: Runs the backend server in production mode.

### Frontend

- `npm start`:  Runs the frontend development server.


