import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProgressBarVerticalService {
  calculateProgress(
    data: any,
    options?: { excludeKeys?: string[] }
  ): number {
    let filledFields = 0;
    let totalFields = 0;
    const excludeKeys = options?.excludeKeys || [];

    function isFilled(value: any): boolean {
      return value !== null && value !== undefined && value !== '';
    }

    function traverse(obj: any): void {
      if (obj && typeof obj === 'object') {
        Object.entries(obj).forEach(([key, value]) => {
          if (excludeKeys.includes(key)) return;

          if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
            traverse(value);
          } else {
            totalFields++;
            if (isFilled(value)) filledFields++;
          }
        });
      }
    }

    traverse(data);
    return totalFields === 0 ? 0 : (filledFields / totalFields) * 100;
  }
}


