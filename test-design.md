# 🎮 Casino Game – Test Design (Arman Belikov)

This document includes high-level test cases designed to cover the full flow of a slot machine microservices system.

---

## ✅ Positive Test Cases

1. **Get user balance**  
   Ensure the user receives a valid balance response with correct structure.

2. **Place bet with valid amount**  
   Ensure bet is accepted, transaction ID is returned, and balance is reduced.

3. **Spin slot with valid data**  
   Spin returns either WIN or LOSE with expected fields and outcome.

4. **Payout after win**  
   Ensures that a win payout correctly updates the user’s balance.

5. **Notification is sent**  
   Ensures a success status is returned from the notification service.

---

## ❌ Negative Test Cases

1. **Get balance with invalid userId**  
   Should return error or 404.

2. **Place bet with insufficient balance**  
   Should be rejected due to lack of funds.

3. **Spin with invalid transactionId**  
   Should return error or invalid outcome.

4. **Payout with fake transactionId**  
   System should reject payout attempt.

5. **Notify without message field**  
   API should reject malformed notification payload.

---

## 🟡 Edge Case

**Place bet with zero amount**

- A valid user tries to place a bet of `0`.
- Expected: system should reject this request (400 or similar).
- Reason: Zero-value transactions can be abused or expose bugs in logic.

---

## 🧪 Advanced Validation Scenarios

1. **Place bet with non-numeric `betAmount`**  
   Request with `"ten"` as value should be rejected due to incorrect type.

2. **Place bet with negative amount**  
   API should reject bets with values like `-50`.

3. **Payout with empty `transactionId`**  
   Should return an error for missing or blank transaction IDs.

4. **Notify with extra unexpected fields**  
   Tests how the system handles extra/unexpected fields in the request payload.

5. **Notify without required `message` field**  
   Checks validation when a required field is missing.

6. **Place bet without required `betAmount` field**  
   Ensures API validates presence of required fields.

7. **Payout without `winAmount` field**  
   Confirms that missing win amount is properly rejected.
---

## Notes

- All test cases are implemented as `.spec.ts` Playwright tests.
- API assumed to be available at `http://localhost:3000`.
- No login/authentication was required in this task.
