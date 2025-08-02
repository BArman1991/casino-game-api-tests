import { test, expect } from '@playwright/test';
import axios from 'axios';
import { placeBet, payout, notify } from '../helpers/api';
import { testUser } from '../test-data/user';

const { id: userId } = testUser;

//Validation: non-numeric betAmount
test('Place bet with non-numeric betAmount should fail', async () => {
  try {
    // @ts-expect-error: betAmount should be a number
    await placeBet(userId, "ten");
    throw new Error('Request with invalid betAmount type should fail');
  } catch (err: any) {
    expect(err.response.status).toBeGreaterThanOrEqual(400);
  }
});

//Validation: negative amount
test('Place bet with negative amount should fail', async () => {
  try {
    await placeBet(userId, -50);
    throw new Error('Negative bet should be rejected');
  } catch (err: any) {
    expect(err.response.status).toBeGreaterThanOrEqual(400);
  }
});

//Validation: empty transactionId
test('Payout with empty transactionId should fail', async () => {
  try {
    await payout(userId, '', 100);
    throw new Error('Empty transactionId should be rejected');
  } catch (err: any) {
    expect(err.response.status).toBeGreaterThanOrEqual(400);
  }
});

//Validation: notify with unexpected extra field
test('Notify with unexpected extra fields should still succeed or be ignored', async () => {
    const response = await axios.post('http://localhost:3000/notify', {
      userId: userId,
      transactionId: 'txn_123',
      message: 'Test message with extra field',
      extra: 'unexpected' // extra field
    });
  
    // Check how the API handles it
    expect([200, 400, 422]).toContain(response.status);
  });


test('Notify without message field should fail', async () => {
    try {
      await axios.post('http://localhost:3000/notify', {
        userId: 123,
        transactionId: 'txn_123'
        // message: missing!
      });
      throw new Error('Request without message should fail');
    } catch (err: any) {
      expect(err.response.status).toBeGreaterThanOrEqual(400);
    }
  });