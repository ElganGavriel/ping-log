import type { WageMode } from '../models/profile.model.js';

interface WageInputs {
  wageMode: WageMode | null;
  hourlyWage: number | null;
  monthlySalary: number | null;
  hoursPerWeek: number | null;
}

export function computeEffectiveHourlyRate(profile: WageInputs): number | null {
  if (profile.wageMode === 'HOURLY') {
    return profile.hourlyWage;
  }
  if (profile.wageMode === 'SALARY' && profile.monthlySalary != null) {
    const hoursPerWeek = profile.hoursPerWeek ?? 40;
    return (profile.monthlySalary * 12) / (hoursPerWeek * 52);
  }
  return null;
}
