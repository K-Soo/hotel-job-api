import { regex } from './regex';

export function parseTimeToMs(time: string): number {
  const match = time.match(regex.TIME);
  if (!match) {
    throw new Error('Invalid time format. Use formats like "15m", "2h", "1d".');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const unitMultipliers = {
    s: 1000, // 초 -> 밀리초
    m: 1000 * 60, // 분 -> 밀리초
    h: 1000 * 60 * 60, // 시간 -> 밀리초
    d: 1000 * 60 * 60 * 24, // 일 -> 밀리초
  };

  return value * unitMultipliers[unit as keyof typeof unitMultipliers];
}
