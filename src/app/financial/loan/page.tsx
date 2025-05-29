'use client';

import { useState } from 'react';

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateLoan = () => {
    if (!principal || !rate || !term) return;

    const P = parseFloat(principal); // 원금
    const r = parseFloat(rate) / 100 / 12; // 월 이자율
    const n = parseFloat(term) * 12; // 총 납부 개월 수

    // 월 납입금 계산 (원리금균등상환방식)
    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    setResult({
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    });
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">대출 계산기</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            대출금액 (원)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="대출금액을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            연이자율 (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="연이자율을 입력하세요"
            step="0.1"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            대출기간 (년)
          </label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="대출기간을 입력하세요"
          />
        </div>

        <button
          onClick={calculateLoan}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          계산하기
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
            <p className="text-lg">
              월 납입금: <span className="font-semibold">{formatNumber(result.monthlyPayment)}원</span>
            </p>
            <p className="text-lg">
              총 상환금액: <span className="font-semibold">{formatNumber(result.totalPayment)}원</span>
            </p>
            <p className="text-lg">
              총 이자: <span className="font-semibold">{formatNumber(result.totalInterest)}원</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 