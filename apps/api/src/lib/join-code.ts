import { randomInt } from 'crypto';
import { Company } from '../models/company.model.js';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // excludes 0/O/1/I
const CODE_LENGTH = 6;
const MAX_ATTEMPTS = 10;

function generateCode(): string {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += ALPHABET[randomInt(ALPHABET.length)];
  }
  return code;
}

export async function generateUniqueJoinCode(): Promise<string> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const code = generateCode();
    const existing = await Company.findOne({ joinCode: code }).lean();
    if (!existing) return code;
  }
  throw new Error('Failed to generate a unique join code');
}
