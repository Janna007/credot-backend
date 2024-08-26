
## Setup

1. **Navigate to the `backend` directory:**

    ```bash
    cd server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    - Create a `.env` file in the `backend` directory and add the following:

      ```env
     CORS_ORIGIN=*
    PORT=8000
    MONGODB_URI=mongodb+srv://databasename

    ACCESS_TOKEN_SECRET=0oiub
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=jd
    REFRESH_TOKEN_EXPIRY=10d

      ```

### Run

1. **Start the server:**

    ```bash
    npm run dev
    ```


### Test

1. **Run tests:**

    ```bash
    npm test
