import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Chip,
  alpha,
  useTheme,
  Container,
  LinearProgress,
  Grid,
  Alert,
  AlertTitle,
} from '@mui/material';
import { 
  Check as CheckIcon, 
  Close as CloseIcon,
  ArrowForward as NextIcon,
  ArrowBack as PrevIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

import { 
  otoscopyQuestions, 
  pathologyQuestions, 
  hearingTestQuestions, 
  hearingAidQuestions, 
  troubleshootingQuestions, 
  followUpQuestions,
  ExamQuestion,
  CATEGORIES
} from '../../constants/audiologyExamQuestions';

const NUM_QUESTIONS = 120;
const QUESTIONS_PER_CATEGORY = NUM_QUESTIONS / Object.keys(CATEGORIES).length; // 20 questions per category

interface AnswerState {
  selectedAnswer: string | null;
  isSubmitted: boolean;
}

const ComprehensiveExam: React.FC = () => {
  const theme = useTheme();
  const [examQuestions, setExamQuestions] = useState<ExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [examComplete, setExamComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Generate exam questions
  useEffect(() => {
    generateExam();
  }, []);

  const generateExam = () => {
    setIsLoading(true);
    
    // Helper function to shuffle array
    const shuffleArray = (array: ExamQuestion[]): ExamQuestion[] => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    
    // Shuffle each category and select QUESTIONS_PER_CATEGORY questions
    const selectedOtoscopy = shuffleArray(otoscopyQuestions).slice(0, QUESTIONS_PER_CATEGORY);
    const selectedPathology = shuffleArray(pathologyQuestions).slice(0, QUESTIONS_PER_CATEGORY);
    const selectedHearingTest = shuffleArray(hearingTestQuestions).slice(0, QUESTIONS_PER_CATEGORY);
    const selectedHearingAid = shuffleArray(hearingAidQuestions).slice(0, QUESTIONS_PER_CATEGORY);
    const selectedTroubleshooting = shuffleArray(troubleshootingQuestions).slice(0, QUESTIONS_PER_CATEGORY);
    const selectedFollowUp = shuffleArray(followUpQuestions).slice(0, QUESTIONS_PER_CATEGORY);
    
    // Combine and shuffle all selected questions
    const allQuestions = shuffleArray([
      ...selectedOtoscopy,
      ...selectedPathology,
      ...selectedHearingTest,
      ...selectedHearingAid,
      ...selectedTroubleshooting,
      ...selectedFollowUp
    ]);
    
    setExamQuestions(allQuestions);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setExamComplete(false);
    setShowResults(false);
    setScore(0);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading for smoother experience
  };

  const handleAnswerSelect = (answer: string) => {
    if (answers[currentQuestionIndex]?.isSubmitted) return;

    setAnswers({
      ...answers,
      [currentQuestionIndex]: {
        selectedAnswer: answer,
        isSubmitted: false
      }
    });
  };

  const handleSubmitAnswer = () => {
    if (!answers[currentQuestionIndex] || answers[currentQuestionIndex].isSubmitted) return;

    const updatedAnswers = {
      ...answers,
      [currentQuestionIndex]: {
        ...answers[currentQuestionIndex],
        isSubmitted: true
      }
    };
    
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (!examComplete) {
      setExamComplete(true);
      // Calculate score
      let correctCount = 0;
      Object.values(answers).forEach((answer, index) => {
        if (answer.selectedAnswer === examQuestions[index].correctOption) {
          correctCount++;
        }
      });
      setScore(correctCount);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestartExam = () => {
    generateExam();
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
        <CircularProgress color="primary" size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Preparing your exam...
        </Typography>
      </Box>
    );
  }

  if (examComplete && showResults) {
    // Calculate percentage and count per category
    const categoryCorrect: Record<string, { correct: number, total: number }> = {};
    Object.values(CATEGORIES).forEach(category => {
      categoryCorrect[category] = { correct: 0, total: 0 };
    });

    examQuestions.forEach((question, index) => {
      const category = question.category;
      const answerState = answers[index];
      
      if (!categoryCorrect[category]) {
        categoryCorrect[category] = { correct: 0, total: 0 };
      }
      
      categoryCorrect[category].total += 1;
      
      if (answerState?.selectedAnswer === question.correctOption) {
        categoryCorrect[category].correct += 1;
      }
    });

    const totalScore = score;
    const percentage = Math.round((totalScore / examQuestions.length) * 100);
    
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Exam Results
          </Typography>
          
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom color={
              percentage >= 80 ? 'success.main' : 
              percentage >= 70 ? 'warning.main' : 
              'error.main'
            }>
              {percentage}%
            </Typography>
            <Typography variant="h6" gutterBottom>
              {totalScore} correct out of {examQuestions.length} questions
            </Typography>
            
            <Alert severity={
              percentage >= 80 ? 'success' : 
              percentage >= 70 ? 'warning' : 
              'error'
            } sx={{ mt: 2 }}>
              <AlertTitle>
                {percentage >= 80 ? 'Excellent!' : 
                percentage >= 70 ? 'Good job!' : 
                'Keep studying!'}
              </AlertTitle>
              {percentage >= 80 ? 'You have demonstrated excellent knowledge of audiology concepts.' : 
              percentage >= 70 ? 'You have a good understanding of audiology concepts, but there\'s room for improvement.' : 
              'You might need to review the material again to improve your understanding of audiology concepts.'}
            </Alert>
          </Box>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Performance by Category:
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {Object.entries(categoryCorrect).map(([category, data]) => (
              <Grid item xs={12} md={6} key={category}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column',
                    bgcolor: alpha(theme.palette.primary.light, 0.05)
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {category}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={(data.correct / data.total) * 100} 
                      sx={{ flexGrow: 1, mr: 2, height: 10, borderRadius: 5 }}
                      color={
                        (data.correct / data.total) >= 0.8 ? 'success' : 
                        (data.correct / data.total) >= 0.7 ? 'warning' : 
                        'error'
                      }
                    />
                    <Typography variant="body2">
                      {data.correct}/{data.total}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<RefreshIcon />}
              onClick={handleRestartExam}
              size="large"
            >
              Take Another Exam
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  if (examComplete) {
    const answeredCount = Object.keys(answers).length;
    const unansweredCount = examQuestions.length - answeredCount;
    
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Exam Complete
          </Typography>
          
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              You have completed all {examQuestions.length} questions.
            </Typography>
            
            {unansweredCount > 0 && (
              <Alert severity="warning" sx={{ mt: 2, mb: 4 }}>
                <AlertTitle>You have {unansweredCount} unanswered questions</AlertTitle>
                You can go back and answer these questions before viewing your results.
              </Alert>
            )}
            
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setShowResults(true)}
              size="large"
              sx={{ mr: 2 }}
            >
              View Results
            </Button>
            
            {unansweredCount > 0 && (
              <Button 
                variant="outlined" 
                onClick={() => {
                  // Find the first unanswered question
                  for (let i = 0; i < examQuestions.length; i++) {
                    if (!answers[i] || !answers[i].selectedAnswer) {
                      setCurrentQuestionIndex(i);
                      setExamComplete(false);
                      break;
                    }
                  }
                }}
                size="large"
              >
                Answer Remaining Questions
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    );
  }

  const currentQuestion = examQuestions[currentQuestionIndex];
  const answerState = answers[currentQuestionIndex];
  const letterOptions = ['a', 'b', 'c', 'd'];
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 4 }}>
        {/* Progress bar and navigation */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Question {currentQuestionIndex + 1} of {examQuestions.length}
            </Typography>
            <Chip 
              label={currentQuestion.category} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={(currentQuestionIndex / examQuestions.length) * 100} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
        
        {/* Question */}
        <Typography variant="h6" gutterBottom>
          {currentQuestion.question}
        </Typography>
        
        {/* Answer options */}
        <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
          <RadioGroup value={answerState?.selectedAnswer || ''}>
            {currentQuestion.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={letterOptions[index]}
                control={
                  <Radio 
                    onClick={() => handleAnswerSelect(letterOptions[index])}
                    disabled={answerState?.isSubmitted}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 1,
                    borderRadius: 1,
                    bgcolor: answerState?.isSubmitted 
                      ? (
                          letterOptions[index] === currentQuestion.correctOption 
                            ? alpha(theme.palette.success.light, 0.1) 
                            : answerState.selectedAnswer === letterOptions[index] 
                              ? alpha(theme.palette.error.light, 0.1) 
                              : 'transparent'
                        ) 
                      : answerState?.selectedAnswer === letterOptions[index] 
                        ? alpha(theme.palette.primary.light, 0.1) 
                        : 'transparent',
                    width: '100%'
                  }}>
                    <Typography variant="body1">
                      {letterOptions[index]}) {option}
                    </Typography>
                    {answerState?.isSubmitted && letterOptions[index] === currentQuestion.correctOption && (
                      <CheckIcon sx={{ ml: 'auto', color: 'success.main' }} />
                    )}
                    {answerState?.isSubmitted && answerState.selectedAnswer === letterOptions[index] && letterOptions[index] !== currentQuestion.correctOption && (
                      <CloseIcon sx={{ ml: 'auto', color: 'error.main' }} />
                    )}
                  </Box>
                }
                sx={{ 
                  m: 1, 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  width: 'calc(100% - 16px)',
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
        
        {/* Explanation */}
        {answerState?.isSubmitted && (
          <Box sx={{ 
            mt: 3, 
            p: 2, 
            borderRadius: 1, 
            bgcolor: alpha(theme.palette.info.light, 0.1),
            border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`
          }}>
            <Typography variant="subtitle1" gutterBottom color="info.main">
              Explanation:
            </Typography>
            <Typography variant="body1">
              {currentQuestion.explanation}
            </Typography>
          </Box>
        )}
        
        {/* Navigation buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            startIcon={<PrevIcon />}
          >
            Previous
          </Button>
          
          <Box>
            {!answerState?.isSubmitted && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitAnswer}
                disabled={!answerState?.selectedAnswer}
                sx={{ mr: 2 }}
              >
                Check Answer
              </Button>
            )}
            
            <Button
              variant="contained"
              color={currentQuestionIndex < examQuestions.length - 1 ? "primary" : "success"}
              onClick={handleNextQuestion}
              disabled={!answerState?.isSubmitted && !examComplete}
              endIcon={currentQuestionIndex < examQuestions.length - 1 ? <NextIcon /> : undefined}
            >
              {currentQuestionIndex < examQuestions.length - 1 ? "Next" : "Finish Exam"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ComprehensiveExam; 