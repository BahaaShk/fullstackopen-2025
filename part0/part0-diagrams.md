# 0.4: New note diagram (non-SPA)

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Type note and click Save
    Browser->>Server: POST /new_note { user's input }
    activate Server
    Server->>Server: Add note to notes array
    Server-->>Browser: 302 Redirect to /notes
    deactivate Server

    Browser->>Server: GET /notes
    activate Server
    Server-->>Browser: HTML document
    deactivate Server

    Browser->>Server: GET /main.css
    activate Server
    Server-->>Browser: CSS file
    deactivate Server

    Browser->>Server: GET /main.js
    activate Server
    Server-->>Browser: JS file
    deactivate Server

    Note right of Browser: Browser executes JS to fetch notes

    Browser->>Server: GET /data.json
    activate Server
    Server-->>Browser: Updated notes array
    deactivate Server

    Note right of Browser: Browser renders updated notes

```

# 0.5:  Single page app diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Open SPA page
    Browser->>Server: GET /spa
    activate Server
    Server-->>Browser: HTML, JS, CSS
    deactivate Server

    Note right of Browser: Browser renders SPA page

    Browser->>Server: GET /api/notes
    activate Server
    Server-->>Browser: Return existing notes array
    deactivate Server

    Note right of Browser: Browser renders notes

```

# 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Type note and click Save
    Browser->>Server: POST /api/notes { user's input }
    activate Server
    Server->>Server: Add note to notes array
    Server-->>Browser: Return saved note
    deactivate Server

    Note right of Browser: Browser updates notes list without page reload

```