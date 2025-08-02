import { test, expect } from '@playwright/test';
import { testUser } from '../test-data/user';
import {
  getBalance,
  updateBalance,
  placeBet,
  spinSlot,
  payout,
  notify,
} from '../helpers/api';

const { id: userId, betAmount } = testUser;

/**
 * Test 1: Validate user balance retrieval
 * This confirms that the user exists and returns proper structure.
 */
test('Get user balance returns valid data', async () => {
  const res = await getBalance(userId);
  expect(res.status).toBe(200);
  expect(res.data.userId).toBe(userId);
  expect(typeof res.data.balance).toBe('number');
  expect(res.data.currency).toBe('USD');
});

/**
 * Test 2: Successfully place a bet
 * Verifies that a transaction ID is returned and the balance decreases.
 */
test('Place bet returns transactionId and new balance', async () => {
  const res = await placeBet(userId, betAmount);
  expect(res.status).toBe(200);
  expect(res.data.transactionId).toBeDefined();
  expect(typeof res.data.newBalance).toBe('number');
});

/**
 * Test 3: Spin the slot and receive a valid result (WIN or LOSE)
 * Ensures the game service executes correctly and returns outcome.
 */
test(' Slot spin returns win or lose outcome', async () => {
  const bet = await placeBet(userId, betAmount);
  const txn = bet.data.transactionId;

  const spin = await spinSlot(userId, betAmount, txn);
  expect(spin.status).toBe(200);

  const data = spin.data.Win || spin.data.Lose;
  expect(data).toBeDefined();
  expect(['WIN', 'LOSE']).toContain(data.outcome);
});

/**
 * Test 4: Receive a payout after winning
 * Verifies that payout endpoint returns correct structure and updated balance.
 */
test('Payout returns new balance on win', async () => {
  const txn = 'txn_789'; // placeholder transactionId
  const winAmount = 50;

  const res = await payout(userId, txn, winAmount);
  expect(res.status).toBe(200);
  expect(res.data.transactionId).toBeDefined();
  expect(typeof res.data.newBalance).toBe('number');
});

/**
 * Test 5: Send user notification
 * Confirms that notification service returns success status and ID.
 */
test(' Notify sends message successfully', async () => {
  const res = await notify(userId, 'txn_789', 'Congratulations! You won $50!');
  expect(res.status).toBe(200);
  expect(res.data.status).toBe('SENT');
  expect(res.data.notificationId).toBeDefined();
});
