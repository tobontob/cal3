'use client';

import { useState } from 'react';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export default function CalorieCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [result, setResult] = useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);

  const activityMultipliers = {
    sedentary: 1.2, // ���� ����� ����
    light: 1.375, // ������ � (�� 1-3ȸ)
    moderate: 1.55, // ���� ���� (�� 3-5ȸ)
    active: 1.725, // Ȱ���� (�� 6-7ȸ)
    very_active: 1.9, // �ſ� Ȱ���� (�Ϸ� 2ȸ �̻�)
  };

  const activityLabels = {
    sedentary: '���� ����� ����',
    light: '������ � (�� 1-3ȸ)',
    moderate: '���� ���� (�� 3-5ȸ)',
    active: 'Ȱ���� (�� 6-7ȸ)',
    very_active: '�ſ� Ȱ���� (�Ϸ� 2ȸ �̻�)',
  };

  const calculateCalories = () => {
    if (!age || !weight || !height) return;

    // Harris-Benedict ���� ���
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseFloat(age);

    // BMR (���ʴ�緮) ���
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageYears);
    } else {
      bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageYears);
    }

    // Ȱ������ ���� ���� �ʿ� Į�θ�
    const maintenance = bmr * activityMultipliers[activityLevel];

    setResult({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      weightLoss: Math.round(maintenance - 500), // �ִ� 0.5kg ����
      weightGain: Math.round(maintenance + 500), // �ִ� 0.5kg ����
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">Į�θ� ����</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ����
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                className="mr-2"
              />
              ����
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                className="mr-2"
              />
              ����
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ����
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="���̸� �Է��ϼ���"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ü�� (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="ü���� �Է��ϼ���"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ���� (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="������ �Է��ϼ���"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ȱ����
          </label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {Object.entries(activityLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={calculateCalories}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          ����ϱ�
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
            <p className="text-lg">
              ���ʴ�緮: <span className="font-semibold">{result.bmr} kcal</span>
            </p>
            <p className="text-lg">
              ���� Į�θ�: <span className="font-semibold">{result.maintenance} kcal</span>
            </p>
            <p className="text-lg">
              ���� Į�θ�: <span className="font-semibold">{result.weightLoss} kcal</span>
              <span className="text-sm text-gray-500 ml-2">(�ִ� 0.5kg ����)</span>
            </p>
            <p className="text-lg">
              ���� Į�θ�: <span className="font-semibold">{result.weightGain} kcal</span>
              <span className="text-sm text-gray-500 ml-2">(�ִ� 0.5kg ����)</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 