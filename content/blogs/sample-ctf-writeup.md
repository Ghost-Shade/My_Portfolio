
title: "PicoCTF 2025: Web Exploitation Walkthrough"
date: "2025-03-18"
category: "CTF Writeup"
summary: "A beginner-friendly walkthrough of three web challenges from PicoCTF 2025 — source inspection, cookie tampering, and a boolean-based SQL injection."
tags: ["ctf", "picoctf", "web", "sql-injection", "beginner"]


## Introduction

This writeup covers three web exploitation challenges from **PicoCTF 2025**. All three are beginner-friendly and illustrate common mistakes in web applications.

> Disclaimer: These challenges were part of a public CTF event. Flags shown here are from the retired challenge set.

## Challenge 1 — Inspect Me

### Description

The page source hints that "the answer is closer than you think."

### Approach

Start by viewing the page source:

```bash
curl -s http://challenge.picoctf.local/ | grep -i "picoCTF"
```

This reveals a comment containing the first half of the flag. The second half is in robots.txt:

```http
GET /robots.txt HTTP/1.1
Host: challenge.picoctf.local
```
