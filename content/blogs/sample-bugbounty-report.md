---
title: "IDOR in a Private Program's User API"
date: "2025-04-02"
category: "Bug Bounty"
summary: "A case study of an Insecure Direct Object Reference (IDOR) in a user-facing API endpoint, its impact, and how it was responsibly disclosed."
tags: ["bug-bounty", "idor", "api", "access-control", "disclosure"]
---

## Summary

While testing a private program on **Bugcrowd**, I identified an Insecure Direct Object Reference (IDOR) in the `/api/v1/users/{id}` endpoint. Any authenticated user could retrieve another user's profile data — including email address and phone number — by changing the numeric `id` in the request.

- **Severity:** High (P2)
- **Status:** Resolved
- **Bounty:** Awarded
- **Disclosure:** Coordinated with the program

## Discovery

The endpoint was used by the application to load the signed-in user's own profile:

```http
GET /api/v1/users/1042 HTTP/1.1
Host: redacted.example.com
Authorization: Bearer <my_token>
```