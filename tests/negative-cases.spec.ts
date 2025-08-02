import { test, expect } from '@playwright/test';
import { placeBet, getBalance, payout, spinSlot, notify } from '../helpers/api';

const invalidUserId = 999999; // Assume this user doesn't exist
const fakeTransactionId = 'txn_fake_123';

test('Get balance with invalid userId returns 404 or error', async () => {
  try {
    await getBalance(invalidUserId);
    throw new Error('Request should have failed');
  } catch (err: any) {
    expect(err.response.status).toBeGreaterThanOrEqual(400);
  }
});

test('Place bet with insufficient balance should fail', async () => {
  try {
    await placeBet(invalidUserId, 1_000_000); // Unrealistically high bet
    throw new Error('Request should have failed');
  } catch (err: any) {
    expect(err.response.status).toBeGreaterThanOrEqual(400);
  }
});

test('Spin slot with invalid transactionId should return error', async () => {
  try {
    await spinSlot(invalidUserId, 10, fakeTransactionId);
    throw new Error('Request should have failed');
  } catch (err: any) {
    expect(err.response.status).toBeGreaterThanOrEqual(400);
  }
});

test('Payout with invalid transactionId should return error', async () => {
  try {
    await payout(invalidUserId, fakeTransactionId, 100);
    throw new Error('Request should have failed');
  } catch (err: any) {
    expect(err.response.status).toBeGreaterThanOrEqual(400);
  }
});

test(' Notify with missing message field should fail', async () => {
  try {
    // @ts-expect-error: intentionally omitting `message`
    await notify(invalidUserId, fakeTransactionId);
    throw new Error('Request should have failed');
  } catch (err: any) {
    expect(err.response.status).toBeGreaterThanOrEqual(400);
  }
});
