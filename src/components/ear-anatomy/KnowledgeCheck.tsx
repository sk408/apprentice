import React from 'react';
import {
  Box,
  Typography,
  Button,
  alpha,
  useTheme,
  Paper,
} from '@mui/material';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: string;
  explanation: string;
}

interface KnowledgeCheckProps {
  questions: Question[];
  selectedAnswers: Record<string, string | null>;
  showAnswers: Record<string, boolean>;
  onAnswerSelect: (questionId: string, answer: string) => void;
  onRevealAnswer: (questionId: string) => void;
}

const KnowledgeCheck: React.FC<KnowledgeCheckProps> = ({
  questions,
  selectedAnswers,
  showAnswers,
  onAnswerSelect,
  onRevealAnswer
}) => {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: alpha(theme.palette.primary.light, 0.05), border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}` }}>
      <Typography variant="h6" gutterBottom fontWeight="bold" color="primary" align="center">
        Quick Knowledge Check
      </Typography>
      
      {questions.map((question, qIndex) => (
        <Box key={qIndex} sx={{ mb: 2 }}>
          <Box sx={{ p: 2, border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`, borderRadius: 2 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              {qIndex + 1}. {question.question}
            </Typography>
            <Box sx={{ pl: 2 }}>
              {['a', 'b', 'c', 'd'].map((option, index) => (
                <Box 
                  key={`q${qIndex+1}-option-${option}`}
                  onClick={() => onAnswerSelect(question.id, option)}
                  sx={{ 
                    mb: 1, 
                    p: 1, 
                    borderRadius: 1,
                    cursor: 'pointer',
                    bgcolor: selectedAnswers[question.id] === option ? alpha(theme.palette.primary.light, 0.3) : 'transparent',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.light, 0.1)
                    }
                  }}
                >
                  <Typography variant="body2">
                    {option}) {question.options[index]}
                  </Typography>
                </Box>
              ))}
              
              {selectedAnswers[question.id] !== null && !showAnswers[question.id] && (
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="small" 
                  onClick={() => onRevealAnswer(question.id)}
                  sx={{ mt: 1 }}
                >
                  Check Answer
                </Button>
              )}
              
              {showAnswers[question.id] && (
                <Box sx={{ mt: 2 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      bgcolor: selectedAnswers[question.id] === question.correctOption 
                        ? alpha(theme.palette.success.light, 0.2) 
                        : alpha(theme.palette.error.light, 0.2), 
                      p: 1, 
                      borderRadius: 1 
                    }}
                  >
                    <strong>Answer:</strong> {question.correctOption}) {question.options[['a', 'b', 'c', 'd'].indexOf(question.correctOption)]}. 
                    {question.explanation}
                    {selectedAnswers[question.id] !== question.correctOption && (
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                        You selected {selectedAnswers[question.id]}, which is incorrect. Try to remember this for future reference.
                      </Typography>
                    )}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default KnowledgeCheck; 