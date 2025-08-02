# 🧪 Selenium Login Test – Code Review & Refactor

## ❌ Issues Identified:

1. **No waits (async instability):**  
   Elements are used immediately without waiting — may cause flaky test behavior.

2. **Hardcoded credentials:**  
   Using `'user'` and `'pass'` directly violates best security and reusability practices.

3. **Assertion is unclear:**  
   Compares a raw value to a string without validation or context.

4. **No structure/modularity:**  
   Entire test in a single function without reusable components.

5. **Missing screenshot/logging on failure:**  
   No visual or file-based trace if test fails.

---

## ✅ Suggested Improvements:

- Use `until.elementLocated` waits for stability.
- Move credentials to environment variables.
- Provide helpful error messages on assertion failures.
- Add a screenshot on failure for debugging.
- Refactor into clear blocks: setup, action, assertion.

---

## 🛠 Refactored Code:

See [`testLogin.refactored.js`](./testLogin.refactored.js)
