import { ExamQuestion, CATEGORIES } from './categories';

export const followUpQuestions: ExamQuestion[] = [
  {
    id: 'followup-1',
    question: 'What should be done first if a patient reports their hearing aid is not working properly during a follow-up appointment?',
    options: [
      'Reprogram the hearing aid',
      'Check for damage to the hearing aid',
      'Order a new hearing aid',
      'Conduct a new hearing test'
    ],
    correctOption: 'b',
    explanation: 'During a follow-up appointment, if a patient reports their hearing aid is not working properly, the first step should be to check for physical damage to the hearing aid. This is often the easiest and most cost-effective solution.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-2',
    question: 'What is the most important role of the audiologist in follow-up appointments for hearing aid users?',
    options: [
      'To check for any changes in the patient\'s hearing status',
      'To clean the hearing aid thoroughly',
      'To replace the batteries',
      'To sell additional accessories'
    ],
    correctOption: 'a',
    explanation: 'The most important role of the audiologist in follow-up appointments is to check for any changes in the patient\'s hearing status. This may involve re-testing hearing thresholds and evaluating the hearing aid\'s performance.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-3',
    question: 'How frequently should follow-up appointments be scheduled for new hearing aid users in the first year?',
    options: [
      'Every week',
      'Every 2-4 weeks initially, then every 3-6 months',
      'Once after 6 months of use',
      'Only if problems arise'
    ],
    correctOption: 'b',
    explanation: 'New hearing aid users should typically have follow-up appointments every 2-4 weeks initially (during the adaptation period), and then every 3-6 months during the first year as they adjust to their devices.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-4',
    question: 'How should an audiologist respond to a patient who reports not hearing a difference with their new hearing aids?',
    options: [
      'Suggest returning the hearing aids for a refund',
      'Tell them they need stronger hearing aids',
      'Verify the fit, programming, and conduct real-ear measurements',
      'Inform them that hearing aids rarely help immediately'
    ],
    correctOption: 'c',
    explanation: 'When a patient reports not hearing a difference with new hearing aids, the audiologist should verify the physical fit, check the programming, and conduct real-ear measurements to ensure the devices are providing appropriate amplification.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-5',
    question: 'What is the recommended schedule for gradually increasing gain for new hearing aid users?',
    options: [
      'Start at full gain immediately',
      'Start at 60-70% of target gain, then increase to full gain over several weeks',
      'Start at 25% and double the gain each week',
      'Use low gain until the patient complains, then increase it'
    ],
    correctOption: 'b',
    explanation: 'The recommended approach for new users is to start at about 60-70% of the target gain, then gradually increase to full gain over several weeks as the patient adapts. This approach improves comfort and acceptance.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-6',
    question: 'Which data should be collected during follow-up appointments to evaluate hearing aid benefit?',
    options: [
      'Only subjective reports from the patient',
      'Only objective measures like real-ear measurements',
      'Both subjective reports and objective measures',
      'Neither, as benefit can only be determined over time'
    ],
    correctOption: 'c',
    explanation: 'Both subjective reports from the patient and objective measures should be collected during follow-up appointments. This includes the patient\'s perceptions of benefit, real-ear measurements, speech recognition testing, and questionnaires.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-7',
    question: 'What should an audiologist do if a patient with hearing aids reports continued difficulties hearing in restaurants?',
    options: [
      'Suggest they avoid restaurants',
      'Create a program with directional microphones and appropriate noise reduction',
      'Increase the overall gain of the hearing aids',
      'Recommend they return the hearing aids'
    ],
    correctOption: 'b',
    explanation: 'If a patient reports difficulty in restaurants, the audiologist should create a specialized program with directional microphones and appropriate noise reduction settings to improve speech understanding in noisy environments.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-8',
    question: 'What is the primary purpose of conducting aided speech recognition testing at follow-up appointments?',
    options: [
      'To determine if hearing has changed',
      'To verify appropriate audibility and speech understanding with hearing aids',
      'To compare to other patients with similar hearing loss',
      'To meet insurance requirements'
    ],
    correctOption: 'b',
    explanation: 'The primary purpose of aided speech recognition testing at follow-up appointments is to verify that the hearing aids are providing appropriate audibility and improving speech understanding compared to unaided conditions.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-9',
    question: 'How should an audiologist verify telecoil functionality during a follow-up appointment?',
    options: [
      'Ask the patient if they use it',
      'Visually inspect the telecoil',
      'Use a telephone or telecoil test system to verify performance',
      'Check manufacturer specifications'
    ],
    correctOption: 'c',
    explanation: 'Telecoil functionality should be verified using a telephone or telecoil test system to ensure it performs properly with landline phones, loop systems, or other telecoil-compatible devices.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-10',
    question: 'Which finding would indicate a successful hearing aid fitting at a follow-up appointment?',
    options: [
      'Patient has not adjusted any settings since the initial fitting',
      'Patient reports wearing the hearing aids consistently throughout the day',
      'Real-ear measurements show maximum possible gain',
      'Patient has no questions about the hearing aids'
    ],
    correctOption: 'b',
    explanation: 'Consistent daily use is one of the strongest indicators of a successful hearing aid fitting, as it suggests the patient is receiving benefit and finds the devices comfortable enough to wear regularly.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-11',
    question: 'How should hearing aid datalogging information be used during follow-up appointments?',
    options: [
      'To verify that the patient is using the hearing aids as instructed',
      'As evidence to deny warranty claims',
      'To guide counseling and program adjustments based on actual usage patterns',
      'To determine if the patient qualifies for new technology'
    ],
    correctOption: 'c',
    explanation: 'Datalogging information should be used to guide counseling and program adjustments based on the patient\'s actual usage patterns, environments, and listening preferences.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-12',
    question: 'What is the best approach when a patient reports feedback issues at a follow-up appointment?',
    options: [
      'Simply turn on the feedback cancellation feature',
      'Systematically check the fit, acoustic parameters, and feedback management settings',
      'Decrease the overall gain',
      'Recommend a different style of hearing aid'
    ],
    correctOption: 'b',
    explanation: 'The best approach is to systematically check the physical fit, acoustic parameters (like venting), earwax issues, and feedback management settings to identify and address the specific cause of feedback.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-13',
    question: 'How often should hearing aid users have their hearing re-evaluated?',
    options: [
      'Only when they purchase new hearing aids',
      'Every month',
      'Annually or when significant changes in hearing or performance are noted',
      'Every five years'
    ],
    correctOption: 'c',
    explanation: 'Hearing aid users should have their hearing re-evaluated annually or when significant changes in hearing or device performance are noted, to ensure appropriate amplification for their current hearing status.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-14',
    question: 'What is the most appropriate approach when a patient complains about sound quality during a follow-up?',
    options: [
      'Immediately recommend new hearing aids',
      'Tell them they need more time to adapt',
      'Systematically assess specific aspects of sound quality and make targeted adjustments',
      'Reduce gain across all frequencies'
    ],
    correctOption: 'c',
    explanation: 'The most appropriate approach is to systematically assess specific aspects of sound quality (like clarity, naturalness, own voice issues, etc.) and make targeted adjustments to address those specific concerns.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-15',
    question: 'What is the primary purpose of using patient questionnaires at follow-up appointments?',
    options: [
      'To collect data for research',
      'To objectively measure benefit and satisfaction in real-world situations',
      'To fulfill insurance requirements',
      'To identify candidates for newer technology'
    ],
    correctOption: 'b',
    explanation: 'The primary purpose of patient questionnaires is to objectively measure benefit and satisfaction in real-world situations, providing standardized information about the patient\'s experiences with their hearing aids.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-16',
    question: 'During a follow-up appointment, a patient reports that their hearing aid is "too loud sometimes." What should be investigated first?',
    options: [
      'The need for a volume control',
      'Whether the compression settings are appropriate',
      'If the patient is inserting the device correctly',
      'If the ear canal has changed shape'
    ],
    correctOption: 'b',
    explanation: 'When a patient reports the hearing aid is "too loud sometimes," the audiologist should first investigate whether the compression settings (including compression ratio, kneepoints, and MPO) are appropriate for their hearing loss and comfort needs.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-17',
    question: 'What should be documented after each follow-up appointment?',
    options: [
      'Only programming changes made to the hearing aids',
      'Only the patient\'s subjective reports',
      'Both objective findings and subjective reports, adjustments made, and recommendations',
      'Only whether the patient is satisfied or not'
    ],
    correctOption: 'c',
    explanation: 'Comprehensive documentation should include both objective findings and subjective reports, any adjustments made to the hearing aids, counseling provided, and recommendations for future follow-up.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-18',
    question: 'A patient returns for a follow-up appointment reporting they "can\'t tell if the hearing aids are helping." What is the most appropriate next step?',
    options: [
      'Suggest a return or exchange',
      'Conduct objective benefit measures (e.g., aided vs. unaided speech testing)',
      'Increase the gain of the hearing aids',
      'Tell them they need more time to adapt'
    ],
    correctOption: 'b',
    explanation: 'When a patient can\'t tell if hearing aids are helping, conducting objective benefit measures (like aided vs. unaided speech recognition testing) can demonstrate and quantify improvement, guiding further adjustments if needed.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-19',
    question: 'What is an appropriate interval for follow-up appointments after the first year of hearing aid use?',
    options: [
      'Every month',
      'Every 6-12 months',
      'Only when problems arise',
      'Once every 5 years'
    ],
    correctOption: 'b',
    explanation: 'After the first year of hearing aid use, appropriate follow-up intervals are typically every 6-12 months for routine maintenance, adjustments, and to monitor hearing status.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-20',
    question: 'At a follow-up appointment, what is the most important factor to check regarding how a patient is caring for their hearing aids?',
    options: [
      'If they are storing the hearing aids in a safe place',
      'If they are performing appropriate daily cleaning',
      'If they are using the correct battery size',
      'If they have purchased insurance for the devices'
    ],
    correctOption: 'b',
    explanation: 'At follow-up appointments, checking if the patient is performing appropriate daily cleaning is crucial, as proper maintenance significantly affects device performance and longevity.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-21',
    question: 'What should be the focus of counseling during early follow-up appointments with new hearing aid users?',
    options: [
      'Advanced features of the hearing aids',
      'Realistic expectations, adaptation processes, and proper use/care',
      'Future technology upgrades',
      'Extended warranty options'
    ],
    correctOption: 'b',
    explanation: 'Early follow-up counseling should focus on setting realistic expectations, explaining adaptation processes, and reinforcing proper use and care techniques to improve success with amplification.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-22',
    question: 'During a follow-up appointment, how should an audiologist respond to a patient\'s concern that their hearing aid batteries don\'t last long enough?',
    options: [
      'Suggest they purchase premium batteries',
      'Investigate usage patterns and check for features that increase battery drain',
      'Recommend switching to rechargeable hearing aids',
      'Tell them this is normal for all hearing aids'
    ],
    correctOption: 'b',
    explanation: 'The audiologist should investigate usage patterns and check for features that increase battery drain (like streaming, advanced signal processing) and verify the patient is using proper battery management techniques.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-23',
    question: 'What is a key indicator that a hearing aid fitting may need to be reassessed during a follow-up appointment?',
    options: [
      'The patient reports they are only wearing the hearing aids occasionally',
      'The hearing aids are more than one year old',
      'The patient has misplaced the user manual',
      'The patient reports they never change programs'
    ],
    correctOption: 'a',
    explanation: 'Inconsistent or limited use (only wearing the hearing aids occasionally) is a key indicator that the fitting may need reassessment, as it often suggests discomfort, lack of perceived benefit, or other issues requiring attention.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-24',
    question: 'What factor should be assessed at follow-up appointments if a patient with hearing aids reports increased tinnitus awareness?',
    options: [
      'The ear canal for cerumen',
      'The need for a special tinnitus program and appropriate counseling',
      'The patient\'s stress level only',
      'The need for a different hearing aid'
    ],
    correctOption: 'b',
    explanation: 'If a patient reports increased tinnitus awareness, the audiologist should assess the need for a special tinnitus program (e.g., noise generator feature) and provide appropriate tinnitus counseling.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-25',
    question: 'At a follow-up appointment, how should the audiologist address a patient\'s report that they cannot hear the television well with their hearing aids?',
    options: [
      'Recommend they increase the TV volume',
      'Suggest they sit closer to the TV',
      'Discuss streaming accessories or TV programs on the hearing aids',
      'Tell them to remove their hearing aids when watching TV'
    ],
    correctOption: 'c',
    explanation: 'The audiologist should discuss streaming accessories (like TV streamers) or specialized TV programs on the hearing aids that can directly deliver the audio signal to the hearing aids for improved clarity.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-26',
    question: 'What is the best approach during a follow-up appointment when a patient reports having difficulty with telephone use despite having a telecoil?',
    options: [
      'Recommend they speak louder on the phone',
      'Verify telecoil function, demonstrate proper phone position, and practice with the patient',
      'Suggest they use speakerphone instead',
      'Tell them to remove the hearing aid when on the phone'
    ],
    correctOption: 'b',
    explanation: 'The best approach is to verify telecoil function, demonstrate the proper phone position relative to the hearing aid, and practice with the patient to ensure they can use it effectively.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-27',
    question: 'What should be verified during follow-up appointments for patients who use hearing aids with directional microphones?',
    options: [
      'That the patient always uses the directional setting',
      'That the patient understands when and how to use directionality',
      'That directionality is always activated automatically',
      'That directionality is disabled to save battery life'
    ],
    correctOption: 'b',
    explanation: 'During follow-up appointments, the audiologist should verify that the patient understands when and how to use directionality (or when it activates automatically), as this feature is most beneficial in specific listening environments.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-28',
    question: 'During a follow-up appointment, what should be the response if Real Ear Measurements show that the hearing aid is not meeting prescriptive targets?',
    options: [
      'Inform the patient they need different hearing aids',
      'Adjust the programming to better match targets while considering patient comfort',
      'Ignore the targets if the patient reports satisfaction',
      'Recommend a return for credit'
    ],
    correctOption: 'b',
    explanation: 'If REM shows the hearing aid is not meeting targets, the audiologist should adjust the programming to better match targets while considering patient comfort and subjective preferences.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-29',
    question: 'How should an audiologist respond during a follow-up appointment if a patient reports they removed their hearing aids in a noisy restaurant because "they made everything too loud"?',
    options: [
      'Suggest they avoid restaurants',
      'Tell them they need to persevere and get used to it',
      'Adjust the noise reduction features and create a restaurant program',
      'Reduce gain across all frequencies'
    ],
    correctOption: 'c',
    explanation: 'The audiologist should adjust the noise reduction features and create a specialized restaurant program with appropriate directional microphone settings and noise reduction to improve comfort in noisy environments.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-30',
    question: 'During a follow-up appointment, a patient reports being overwhelmed by environmental sounds with their new hearing aids. What is the most appropriate response?',
    options: [
      'Tell them this is normal and they\'ll adapt over time',
      'Suggest they return the hearing aids',
      'Assess the gain, implement acclimatization strategies, and provide counseling',
      'Increase gain to help them adapt faster'
    ],
    correctOption: 'c',
    explanation: 'The audiologist should assess the current gain settings, implement appropriate acclimatization strategies (like progressive adaptation settings), and provide counseling about the adaptation process to help the patient adjust gradually.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-31',
    question: 'What should be included in a follow-up plan for a patient who is struggling to adapt to their first hearing aids?',
    options: [
      'More frequent follow-up appointments and a structured adaptation plan',
      'A suggestion to use the hearing aids only when absolutely necessary',
      'A recommendation to return the hearing aids',
      'Referral to a different audiologist'
    ],
    correctOption: 'a',
    explanation: 'A patient struggling with adaptation should have more frequent follow-up appointments and a structured adaptation plan with gradual increases in usage time and listening environments, plus specific goals and expectations.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-32',
    question: 'How should an audiologist respond if, during a follow-up appointment, a patient reports they are not using their hearing aids because they can "hear fine without them"?',
    options: [
      'Accept their decision and discontinue follow-up',
      'Tell them they are wasting money not using the hearing aids',
      'Re-evaluate their hearing, demonstrate the benefit, and address misconceptions',
      'Suggest they return the hearing aids for a refund'
    ],
    correctOption: 'c',
    explanation: 'The audiologist should re-evaluate the patient\'s hearing, provide objective demonstrations of benefit (like speech testing with and without aids), address any misconceptions about hearing loss, and counsel regarding realistic expectations.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'followup-33',
    question: 'At a follow-up appointment, what is the main purpose of asking about specific listening situations where the patient still has difficulty?',
    options: [
      'To determine if they need a different audiologist',
      'To verify they are being honest about wearing their hearing aids',
      'To identify needs for program adjustments or additional technology',
      'To document limitations for insurance purposes'
    ],
    correctOption: 'c',
    explanation: 'The main purpose of asking about specific difficult listening situations is to identify needs for program adjustments, setting changes, or additional assistive technology to address those specific challenges.',
    category: CATEGORIES.FOLLOW_UP
  }
]; 