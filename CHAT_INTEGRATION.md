# Chat API Integration - Implementation Summary

## Changes Made

### 1. **Landing Page (`app/page.tsx`)**
- Added `isLoading` state to track API call progress
- Implemented `handleSendMessage` as an async function that:
  - Adds the user message immediately to the UI
  - Calls the backend API with `POST /api/call-agent`
  - Parses the JSON response containing `{ response: "..." }`
  - Adds the assistant's response to the message list
  - Handles errors gracefully with error messages
- Passes `isLoading` state to ChatPanel component

### 2. **Chat Panel Component (`components/landing/ChatPanel.tsx`)**
- Added `isLoading` optional prop to track loading state
- Added loading indicator (animated dots) that displays while waiting for response
- Disabled textarea and buttons during loading to prevent duplicate submissions
- Updated send button to also check `isLoading` state
- Added disabled state to suggestion chips to prevent clicking while loading
- Auto-scrolls to latest message including loading indicator

### 3. **Suggestion Chip Component (`components/landing/SuggestionChip.tsx`)**
- Added `disabled` prop support
- Added disabled styles for visual feedback

### 4. **API Route (`app/api/call-agent/route.ts`)** - NEW FILE
- Created Next.js API route to proxy requests to your backend
- Handles POST requests with `{ message: string }` payload
- Forwards requests to your Azure Function backend (or local development server)
- Returns JSON response: `{ response: string }`
- Includes proper error handling and status codes
- Uses `NEXT_PUBLIC_BACKEND_URL` environment variable for flexibility

### 5. **Environment Configuration (`env.local.example`)**
- Created template for environment variables
- `NEXT_PUBLIC_BACKEND_URL` - Points to your backend (default: `http://localhost:7071`)

## How It Works

1. User types a message in the chat panel
2. Click send or press Enter to submit
3. Message is added to the UI immediately
4. Loading indicator appears (animated dots)
5. Frontend calls `/api/call-agent` endpoint
6. API route forwards request to your Azure Function backend at `call-agent` endpoint
7. Backend processes the message and returns `{ response: "..." }`
8. Response is displayed in the chat panel
9. Loading indicator disappears

## Setup Instructions

1. **Create `.env.local` file** in the project root:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:7071
   ```
   - For local development: use `http://localhost:7071`
   - For Azure deployment: use your Azure Function URL

2. **Start your backend** (Azure Function or local emulator):
   - Ensure it's listening on the configured URL
   - The `/api/call-agent` endpoint should accept POST requests

3. **Run the Next.js dev server**:
   ```bash
   npm run dev
   ```

4. **Test the chat**:
   - Type a message like "What is price optimization?"
   - You should see the message appear, loading indicator, then the response

## Error Handling

- Network errors are caught and displayed in the chat as error messages
- Backend errors (non-200 status) are properly handled
- Invalid JSON responses trigger meaningful error messages
- TypeScript ensures type safety throughout the flow

## Data Flow

```
User Input
    ↓
ChatPanel sends message
    ↓
page.tsx handleSendMessage()
    ↓
POST /api/call-agent
    ↓
API route (route.ts)
    ↓
POST /api/call-agent (Azure Function backend)
    ↓
Response: { response: "..." }
    ↓
Display in ChatPanel
```
