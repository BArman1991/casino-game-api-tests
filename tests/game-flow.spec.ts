import { test, expect } from '@playwright/test';
import { testUser } from '../test-data/user';
import { getBalance, placeBet, spinSlot, payout, notify } from '../helpers/api';

test('🎰 Full slot machine game flow', async () => {
  const { id: userId, betAmount } = testUser;

  // 1. Get Balance
  const balanceRes = await getBalance(userId);
  expect(balanceRes.status).toBe(200);

  // 2. Place Bet
  const betRes = await placeBet(userId, betAmount);
  expect(betRes.status).toBe(200);
  const transactionId = betRes.data.transactionId;
  expect(transactionId).toBeDefined();

  // 3. Spin Slot
  const spinRes = await spinSlot(userId, betAmount, transactionId);
  expect(spinRes.status).toBe(200);

  const data = spinRes.data.Win || spinRes.data.Lose;
  expect(data).toBeDefined();
  expect(data.userId).toBe(userId);

  // 4. If win — do payout
  if (data.outcome === 'WIN') {
    const payoutRes = await payout(userId, transactionId, data.winAmount);
    expect(payoutRes.status).toBe(200);
  }

  // 5. Send notification
  const notifyRes = await notify(userId, transactionId, data.message);
  expect(notifyRes.status).toBe(200);
});
