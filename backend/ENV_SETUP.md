# Environment Variables Setup

## Quick Fix for BLACKBOX_API_KEY Issues

If you're getting an error that says "BLACKBOX_API_KEY is not configured", follow these steps:

### 1. Check Your .env File Format

Your `backend/.env` file should look like this:

```env
BLACKBOX_API_KEY=sk-Bqqe-JMxrVsbw3pvSpTytg
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 2. Common Mistakes to Avoid

❌ **WRONG** - Don't use quotes:
```env
BLACKBOX_API_KEY="sk-Bqqe-JMxrVsbw3pvSpTytg"
```

❌ **WRONG** - Don't add spaces around the equals sign:
```env
BLACKBOX_API_KEY = sk-Bqqe-JMxrVsbw3pvSpTytg
```

✅ **CORRECT** - No quotes, no spaces:
```env
BLACKBOX_API_KEY=sk-Bqqe-JMxrVsbw3pvSpTytg
```

### 3. Verify Your Configuration

Run the diagnostic script to check if your .env file is configured correctly:

```bash
node backend/check-env.js
```

You should see:
```
✅ SUCCESS: BLACKBOX_API_KEY is properly configured!
```

### 4. Restart the Server

After making changes to the `.env` file, always restart your backend server:

```bash
# Stop the current server (Ctrl+C)
# Then start it again
npm start
```

Or if using the start scripts:
```bash
# Windows
start.bat

# Linux/Mac
./start.sh
```

### 5. Check Server Logs

When the server starts, you should see:
```
✅ BLACKBOX_API_KEY is configured
🔑 API Key (first 10 chars): sk-Bqqe-J...
🚀 Server running on http://localhost:3001
```

If you see:
```
❌ ERROR: BLACKBOX_API_KEY is not configured in .env file
```

Then the .env file is not being loaded correctly. Double-check the file location and format.

## File Location

Make sure your `.env` file is located at:
```
buttcheeks/
  └── backend/
      └── .env  ← Should be here
```

NOT at:
```
buttcheeks/
  └── .env  ← Wrong location
```

## Getting Your API Key

If you need a new BLACKBOX API key:
1. Visit https://www.blackbox.ai
2. Sign up or log in
3. Navigate to API settings
4. Generate a new API key
5. Copy it to your `.env` file (without quotes!)

## Troubleshooting

### Issue: "BLACKBOX_API_KEY is not configured"

**Solution:**
1. Remove quotes from the API key value in `.env`
2. Ensure no spaces around the `=` sign
3. Save the file
4. Restart the server

### Issue: API key is loaded but API calls fail

**Solution:**
1. Verify your API key is valid and active
2. Check if you have API credits/quota remaining
3. Ensure your API key has the correct permissions

### Issue: .env file changes not taking effect

**Solution:**
1. Make sure you saved the `.env` file
2. Completely stop the server (Ctrl+C)
3. Start the server again
4. Check the console logs for the API key confirmation message
