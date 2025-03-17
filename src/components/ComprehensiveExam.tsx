import {
  CATEGORIES,
  otoscopyQuestions,
  pathologyQuestions,
  hearingTestQuestions,
  hearingAidQuestions,
  troubleshootingQuestions,
  followUpQuestions,
  earmoldQuestions,
  ExamQuestion as BaseExamQuestion,
  allQuestions
} from '../constants/questions'; 

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  Alert,
  AlertTitle
} from '@mui/material';
import { alpha } from '@mui/material/styles';

// Extend the ExamQuestion type to include user's answer
interface ExamQuestion extends BaseExamQuestion {
  userAnswer?: string | null;
}

const ComprehensiveExam: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | null>>({});
  const [showIncorrectOnly, setShowIncorrectOnly] = useState(false);
  
  // Number of questions for the exam
  const EXAM_LENGTH = 20;
  
  // Initialize exam with random questions
  const startExam = () => {
    // Shuffle and pick random questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, EXAM_LENGTH) as ExamQuestion[];
    setExamQuestions(selected);
    setExamStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setExamFinished(false);
    setUserAnswers({});
  };
  
  const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };
  
  const checkAnswer = () => {
    const currentQuestion = examQuestions[currentQuestionIndex];
    
    // Save the user's answer
    const updatedAnswers = { ...userAnswers, [currentQuestionIndex]: selectedAnswer };
    setUserAnswers(updatedAnswers);
    
    if (selectedAnswer === currentQuestion.correctOption) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };
  
  const moveToNextQuestion = () => {
    // Make sure we save the current answer before moving to the next question
    if (selectedAnswer) {
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: selectedAnswer
      }));
    }
    
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setExamFinished(true);
    }
  };
  
  const restartExam = () => {
    startExam();
  };
  
  // Calculate progress percentage
  const progressPercentage = examStarted 
    ? ((currentQuestionIndex + 1) / examQuestions.length) * 100 
    : 0;

  if (!examStarted) {
    return (
      <Container maxWidth="md">
        <Box my={4} textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Comprehensive Audiology Exam
          </Typography>
          <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Test your knowledge across all audiology topics
            </Typography>
            <Typography variant="body1" paragraph>
              This exam contains {EXAM_LENGTH} questions randomly selected from all categories:
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {Object.values(CATEGORIES).map((category) => (
                <Grid item key={category}>
                  <Chip label={category} color="primary" variant="outlined" />
                </Grid>
              ))}
            </Grid>
            
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={startExam}
            >
              Start Exam
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }
  
  if (examFinished) {
    const finalScore = (score / examQuestions.length) * 100;
    
    return (
      <Container maxWidth="md">
        <Box my={4} textAlign="center">
          <Typography variant="h4" component="h1" gutterBottom>
            Exam Results
          </Typography>
          <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              Your Score: {score} / {examQuestions.length} ({finalScore.toFixed(1)}%)
            </Typography>
            
            {finalScore >= 80 ? (
              <Alert severity="success" sx={{ mt: 2, mb: 3 }}>
                <AlertTitle>Excellent Work!</AlertTitle>
                You've demonstrated a strong understanding of audiology concepts.
              </Alert>
            ) : finalScore >= 60 ? (
              <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
                <AlertTitle>Good Job!</AlertTitle>
                You're making good progress, but there's still room for improvement.
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ mt: 2, mb: 3 }}>
                <AlertTitle>Keep Studying!</AlertTitle>
                Review the key concepts and try again to improve your score.
              </Alert>
            )}
            
            {/* Show questions review section */}
            <Box mt={4} textAlign="left">
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Questions Review:
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => setShowIncorrectOnly(!showIncorrectOnly)}
                >
                  {showIncorrectOnly ? "Show All Questions" : "Show Incorrect Only"}
                </Button>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              {examQuestions.map((question, index) => {
                const userAnswer = userAnswers[index] || '';
                const isCorrect = userAnswer === question.correctOption;
                
                // Skip correct answers if filter is active
                if (showIncorrectOnly && isCorrect) return null;
                
                // Calculate option indices for display
                const userOptionIndex = userAnswer ? userAnswer.charCodeAt(0) - 'a'.charCodeAt(0) : -1;
                const correctOptionIndex = question.correctOption.charCodeAt(0) - 'a'.charCodeAt(0);
                
                return (
                  <Paper 
                    key={index}
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      borderLeft: 4, 
                      borderColor: isCorrect ? 'success.main' : 'error.main',
                      bgcolor: alpha(isCorrect ? '#e6f4ea' : '#fce8e6', 0.5)
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Question {index + 1}: {isCorrect ? "✓" : "✗"}
                      </Typography>
                      <Chip label={question.category} size="small" />
                    </Box>
                    
                    <Typography variant="body1" mb={2}>
                      {question.question}
                    </Typography>
                    
                    <Box>
                      {userAnswer ? (
                        <Typography variant="body2" color={isCorrect ? "success.main" : "error.main"}>
                          Your answer: {userOptionIndex >= 0 ? question.options[userOptionIndex] : 'No answer'}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="error.main">
                          Your answer: Not answered
                        </Typography>
                      )}
                      
                      {!isCorrect && (
                        <Typography variant="body2" color="success.main" fontWeight="bold">
                          Correct answer: {question.options[correctOptionIndex]}
                        </Typography>
                      )}
                      
                      {/* Always show explanation for incorrect answers, optionally for correct ones */}
                      {(!isCorrect || !showIncorrectOnly) && (
                        <Typography variant="body2" mt={1} fontStyle="italic">
                          {question.explanation}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                );
              })}
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={restartExam}
              sx={{ mt: 4 }}
            >
              Take Another Exam
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }
  
  const currentQuestion = examQuestions[currentQuestionIndex];
  
  return (
    <Container maxWidth="md">
      <Box my={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="h1">
            Comprehensive Exam
          </Typography>
          <Chip 
            label={`Question ${currentQuestionIndex + 1} of ${examQuestions.length}`} 
            color="primary" 
            variant="outlined" 
          />
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={progressPercentage} 
          sx={{ mb: 3, height: 10, borderRadius: 5 }} 
        />
        
        <Card elevation={3}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Chip label={currentQuestion.category} color="secondary" />
              <Typography variant="body2" color="textSecondary">
                ID: {currentQuestion.id}
              </Typography>
            </Box>
            
            <Typography variant="h6" gutterBottom>
              {currentQuestion.question}
            </Typography>
            
            <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
              <RadioGroup value={selectedAnswer || ''} onChange={handleAnswerSelect}>
                {currentQuestion.options.map((option, index) => {
                  const optionLabel = String.fromCharCode(97 + index); // a, b, c, d...
                  return (
                    <FormControlLabel
                      key={index}
                      value={optionLabel}
                      control={<Radio />}
                      label={`${optionLabel}. ${option}`}
                      disabled={showExplanation}
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        ...(showExplanation && optionLabel === currentQuestion.correctOption && {
                          bgcolor: 'success.light',
                        }),
                        ...(showExplanation && selectedAnswer === optionLabel && 
                           selectedAnswer !== currentQuestion.correctOption && {
                          bgcolor: 'error.light',
                        }),
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
            
            {showExplanation && (
              <Box mt={3} p={2} bgcolor="info.light" borderRadius={1}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Explanation:
                </Typography>
                <Typography variant="body1">
                  {currentQuestion.explanation}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
        
        <Box display="flex" justifyContent="space-between" mt={3}>
          {!showExplanation ? (
            <Button
              variant="contained"
              color="primary"
              disabled={!selectedAnswer}
              onClick={checkAnswer}
              size="large"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={moveToNextQuestion}
              size="large"
            >
              {currentQuestionIndex < examQuestions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          )}
          
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={restartExam}
          >
            Restart Exam
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ComprehensiveExam; 