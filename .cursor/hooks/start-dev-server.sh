#!/bin/bash
# Start dev server on first file edit (if not already running)

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
PID_FILE="$PROJECT_DIR/.cursor/hooks/.dev-server.pid"
LOG_FILE="$PROJECT_DIR/.cursor/hooks/dev-server.log"
PORT=5173

# Read stdin (hook input) but we don't need to process it
cat > /dev/null

# Check if server is already running on the expected port
is_server_running() {
    if [[ -f "$PID_FILE" ]]; then
        local pid
        pid=$(cat "$PID_FILE")
        if kill -0 "$pid" 2>/dev/null; then
            return 0
        fi
    fi
    # Also check if port is in use
    if lsof -i :"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
        return 0
    fi
    return 1
}

# Start the dev server
start_server() {
    cd "$PROJECT_DIR"
    
    # Check if node_modules exists
    if [[ ! -d "node_modules" ]]; then
        echo '{"additional_context": "Installing dependencies first (npm install)..."}'
        npm install >> "$LOG_FILE" 2>&1
    fi
    
    # Start dev server in background
    nohup npm run dev >> "$LOG_FILE" 2>&1 &
    local pid=$!
    echo "$pid" > "$PID_FILE"
    
    # Wait briefly for server to start
    sleep 2
    
    echo "{\"additional_context\": \"Dev server started on http://localhost:$PORT (PID: $pid)\"}"
}

# Main logic
if is_server_running; then
    echo '{"additional_context": "Dev server already running"}'
else
    start_server
fi

exit 0
