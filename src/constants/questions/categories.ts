// Categories
export const CATEGORIES = {
  OTOSCOPY: 'Otoscopy',
  PATHOLOGY: 'Pathology',
  HEARING_TEST: 'Hearing Test',
  HEARING_AID: 'Hearing Aid Fitting',
  TROUBLESHOOTING: 'Troubleshooting',
  FOLLOW_UP: 'Follow-up Appointments',
  EARMOLD: 'Earmolds & Impressions'
};

// Define question interface
export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctOption: string;
  explanation: string;
  category: string;
}; 