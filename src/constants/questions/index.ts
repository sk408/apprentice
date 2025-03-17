// Import from categories
import { CATEGORIES, ExamQuestion } from './categories';

// Import question sets
import { otoscopyQuestions } from './otoscopyQuestions';
import { pathologyQuestions } from './pathologyQuestions';
import { hearingTestQuestions } from './hearingTestQuestions';
import { hearingAidQuestions } from './hearingAidQuestions';
import { troubleshootingQuestions } from './troubleshootingQuestions';
import { followUpQuestions } from './followUpQuestions';
import { earmoldQuestions } from './earmoldQuestions';

// Re-export categories and interfaces
export { CATEGORIES };
export type { ExamQuestion };

// Export each category directly
export { otoscopyQuestions };
export { pathologyQuestions };
export { hearingTestQuestions };
export { hearingAidQuestions };
export { troubleshootingQuestions };
export { followUpQuestions };
export { earmoldQuestions };

// Export all questions as a combined array
export const allQuestions: ExamQuestion[] = [
  ...otoscopyQuestions,
  ...pathologyQuestions,
  ...hearingTestQuestions,
  ...hearingAidQuestions,
  ...troubleshootingQuestions,
  ...followUpQuestions,
  ...earmoldQuestions
]; 