import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

export async function getBalance(userId: number) {
  return axios.get(`${BASE_URL}/user/balance`, {
    params: { userId },
  });
}

export async function updateBalance(userId: number, newBalance: number) {
  return axios.post(`${BASE_URL}/user/update-balance`, {
    userId,
    newBalance,
  });
}

export async function placeBet(userId: number, betAmount: number) {
  return axios.post(`${BASE_URL}/payment/placeBet`, {
    userId,
    betAmount,
  });
}

export async function spinSlot(userId: number, betAmount: number, transactionId: string) {
  return axios.post(`${BASE_URL}/slot/spin`, {
    userId,
    betAmount,
    transactionId,
  });
}

export async function payout(userId: number, transactionId: string, winAmount: number) {
  return axios.post(`${BASE_URL}/payment/payout`, {
    userId,
    transactionId,
    winAmount,
  });
}

export async function notify(userId: number, transactionId: string, message: string) {
  return axios.post(`${BASE_URL}/notify`, {
    userId,
    transactionId,
    message,
  });
}
