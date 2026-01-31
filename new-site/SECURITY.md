# Security Policy

## Our Commitment
This application is built with a **Zero-Trust Security Model**. Every interaction between the client and the server is validated, sanitized, and masked to ensure the highest level of data integrity and protection.

## Security Controls

### 1. Data Validation
All inputs (Playlist IDs and Video IDs) are validated against strict whitelist Regex patterns (`/^[a-zA-Z0-9_-]+$/`) to prevent injection attacks and malformed request exploitation.

### 2. Secret Protection
Authentication credentials (YouTube API Key) are strictly confined to the Server-Side environment. They are never transmitted to the browser or stored in client-side state.

### 3. Error Obfuscation
System errors are intercepted and masked. While internal health logs are maintained for monitoring, external users only receive generic, non-informative error status messages to prevent stack-trace and architectural leakage.

### 4. Input Constraints
We enforce a hard limit of 250 videos per analysis on the server-side to prevent denial-of-service (DoS) attempts and API quota exhaustion.

## Reporting a Vulnerability
If you discover a security vulnerability, please contact the lead developer, Amar Tripathi.
