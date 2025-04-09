# Runestone Assignment Spoof - Proof of Concept

This repository contains proof-of-concept scripts that demonstrate client-side vulnerabilities in Runestone Academy's assignment system.

These scripts allow users to spoof submissions for several self-graded activity types and receive full credit without submitting correct answers.

---

## Vulnerability Summary

Runestone accepts self-reported results from the browser via the `bookevent` endpoint. These submissions are not validated on the server, allowing forged results to be accepted as legitimate.

Activity types that can be spoofed:
- Multiple Choice
- Drag and Drop
- ActiveCode
- Parsons Problems

Most types use the same structure (`mChoice` event), except for Parsons which has its own format.

---

## Included Scripts

- `McqAnswerSpoof.js` – Spoofs correct multiple choice submissions.
- `ActiveCodeSpoof.js` – Fakes full test pass for ActiveCode.
- `ParsonsSpoof.js` – Submits forged correct Parsons results.
- `PerfectScorePoC.js` – Spoofs an entire assignment using all applicable scripts.

---

## How to Use

1. Log in to your Runestone account.
2. Open the assignment you want to spoof.
3. Open your browser’s developer console.
4. Paste in the contents of the script you want to use and press Enter.
5. Refresh the page to view updated scores.

---

## Disclosure

This issue has been submitted to Runestone's GitHub issue tracker so that it can be properly addressed.

**Issue link:** [https://github.com/RunestoneInteractive/rs/issues/686](https://github.com/RunestoneInteractive/rs/issues/686)

This repository is intended for educational purposes only and as part of a responsible disclosure process.

---

## Disclaimer

These scripts are for **educational and research purposes only**. Do not use them to gain unfair academic advantage. The goal is to demonstrate security flaws so they can be responsibly addressed.
