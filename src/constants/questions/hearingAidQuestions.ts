import { ExamQuestion, CATEGORIES } from './categories';

export const hearingAidQuestions: ExamQuestion[] = [
  {
    id: 'hearingaid-1',
    question: 'What is the primary purpose of real ear measurement (REM) in hearing aid fitting?',
    options: [
      'To determine if the patient needs hearing aids',
      'To verify that hearing aid output meets prescriptive targets for the patient\'s hearing loss',
      'To measure the patient\'s ability to understand speech',
      'To establish insurance coverage for hearing aids'
    ],
    correctOption: 'b',
    explanation: 'Real ear measurement (REM) is used to verify that the hearing aid output is meeting prescriptive targets specific to the patient\'s hearing loss, ensuring appropriate amplification across frequencies.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-2',
    question: 'What is the occlusion effect in hearing aid fittings?',
    options: [
      'The inability to localize sounds due to unilateral amplification',
      'The enhancement of low-frequency sounds when the ear canal is blocked',
      'The feedback that occurs when a hearing aid is not fitted properly',
      'The distortion of high-frequency sounds in digital hearing aids'
    ],
    correctOption: 'b',
    explanation: 'The occlusion effect is the enhancement of low-frequency sounds (particularly the patient\'s own voice) that occurs when the ear canal is blocked by a hearing aid or earmold, causing bone-conducted sound to be trapped in the ear canal.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-3',
    question: 'What is the primary purpose of compression in hearing aids?',
    options: [
      'To reduce battery consumption',
      'To make soft sounds audible while keeping loud sounds comfortable',
      'To reduce the physical size of the hearing aid',
      'To eliminate background noise completely'
    ],
    correctOption: 'b',
    explanation: 'Compression in hearing aids is designed to make soft sounds audible while keeping loud sounds comfortable, effectively reducing the range of sound levels (the input dynamic range) to fit within the patient\'s residual dynamic range.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-4',
    question: 'Which hearing aid style typically has the most powerful amplification capabilities?',
    options: [
      'Completely-in-the-canal (CIC)',
      'In-the-canal (ITC)',
      'In-the-ear (ITE)',
      'Behind-the-ear (BTE)'
    ],
    correctOption: 'd',
    explanation: 'Behind-the-ear (BTE) hearing aids typically have the most powerful amplification capabilities due to their larger size, which allows for bigger batteries, more powerful receivers, and greater distance between microphone and receiver (reducing feedback).',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-5',
    question: 'What is the primary advantage of directional microphones in hearing aids?',
    options: [
      'Extended battery life',
      'Improved appearance and cosmetic appeal',
      'Improved speech understanding in noisy environments',
      'Reduced occlusion effect'
    ],
    correctOption: 'c',
    explanation: 'The primary advantage of directional microphones is improved speech understanding in noisy environments, as they enhance sounds coming from the front (typically the desired speech signal) while reducing sounds from other directions (typically background noise).',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-6',
    question: 'What is the main benefit of an open-fit hearing aid?',
    options: [
      'Better retention in the ear',
      'More powerful amplification',
      'Reduced occlusion effect',
      'Improved durability and water resistance'
    ],
    correctOption: 'c',
    explanation: 'The main benefit of an open-fit hearing aid is the reduced occlusion effect, as the open design allows natural low-frequency sound to enter the ear canal, reducing the "plugged up" feeling and improving sound quality for the user\'s own voice.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-7',
    question: 'What is the primary purpose of the probe microphone in real ear measurement?',
    options: [
      'To generate test signals for the hearing aid',
      'To measure the sound pressure level in the ear canal with and without the hearing aid',
      'To calibrate the hearing aid\'s microphone',
      'To analyze the hearing aid\'s battery consumption'
    ],
    correctOption: 'b',
    explanation: 'In real ear measurement, the probe microphone is placed in the ear canal to measure the actual sound pressure level with and without the hearing aid in place, allowing verification of the hearing aid\'s performance in the individual\'s ear.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-8',
    question: 'What is the maximum power output (MPO) of a hearing aid?',
    options: [
      'The highest gain setting possible for the hearing aid',
      'The maximum battery life of the hearing aid',
      'The maximum sound pressure level that the hearing aid can produce regardless of input level',
      'The maximum distance from which the hearing aid can pick up sound'
    ],
    correctOption: 'c',
    explanation: 'The maximum power output (MPO) is the maximum sound pressure level that the hearing aid can produce regardless of input level, essentially setting a ceiling on amplification to protect the user from uncomfortably loud sounds.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-9',
    question: 'Which of the following is a main advantage of digital signal processing in hearing aids compared to analog technology?',
    options: [
      'Longer battery life',
      'More precise and flexible sound processing capabilities',
      'Greater physical durability',
      'Lower cost to the consumer'
    ],
    correctOption: 'b',
    explanation: 'A main advantage of digital signal processing in hearing aids is the more precise and flexible sound processing capabilities, allowing for complex features like adaptive noise reduction, feedback cancellation, and multiple programs for different listening environments.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-10',
    question: 'What is telecoil technology in hearing aids used for?',
    options: [
      'Reducing wind noise',
      'Connecting to telephones and loop systems without acoustic input',
      'Extending battery life',
      'Adjusting the hearing aid remotely'
    ],
    correctOption: 'b',
    explanation: 'Telecoil technology in hearing aids allows users to connect directly to compatible telephones and loop systems without acoustic input, receiving the signal electromagnetically for improved signal-to-noise ratio and clarity.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-11',
    question: 'What is the primary benefit of frequency lowering technology in hearing aids?',
    options: [
      'To make high-frequency sounds accessible to those with severe high-frequency hearing loss',
      'To reduce the occlusion effect',
      'To extend battery life',
      'To eliminate the need for directional microphones'
    ],
    correctOption: 'a',
    explanation: 'The primary benefit of frequency lowering technology is to make high-frequency sounds accessible to those with severe high-frequency hearing loss by shifting or compressing these sounds to lower frequencies where the user has better hearing.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-12',
    question: 'What is the main purpose of a hearing aid vent?',
    options: [
      'To release battery gases',
      'To reduce the occlusion effect and improve sound quality',
      'To increase the maximum power output',
      'To accommodate the directional microphone'
    ],
    correctOption: 'b',
    explanation: 'The main purpose of a hearing aid vent is to reduce the occlusion effect and improve sound quality by allowing some sound (typically low frequencies) to pass naturally through the ear canal rather than through the hearing aid\'s amplifier.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-13',
    question: 'What is the primary advantage of bilateral hearing aid fittings compared to unilateral fittings?',
    options: [
      'Lower cost to the patient',
      'Improved battery life',
      'Better sound localization and improved speech understanding in noise',
      'Reduced risk of feedback'
    ],
    correctOption: 'c',
    explanation: 'The primary advantage of bilateral hearing aid fittings is better sound localization and improved speech understanding in noise, as binaural hearing allows for spatial processing and binaural summation benefits.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-14',
    question: 'What is the primary purpose of noise reduction technology in hearing aids?',
    options: [
      'To eliminate all background noise completely',
      'To improve comfort in noisy environments while preserving speech',
      'To increase the battery life of the hearing aid',
      'To allow the user to hear conversations from far distances'
    ],
    correctOption: 'b',
    explanation: 'The primary purpose of noise reduction technology is to improve comfort in noisy environments while preserving speech, not to eliminate all background noise (which is technically impossible without also affecting speech).',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-15',
    question: 'What prescription formula would typically be used for a patient with a severe sensorineural hearing loss?',
    options: [
      'NAL-NL2',
      'DSL v5.0',
      'NAL-RP',
      'The half-gain rule'
    ],
    correctOption: 'b',
    explanation: 'DSL v5.0 (Desired Sensation Level) would typically be used for patients with severe sensorineural hearing loss, as it prescribes more gain than NAL formulas and aims to make speech sounds audible across the entire frequency range, especially important for those with limited residual hearing.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-16',
    question: 'What is the primary function of a feedback cancellation system in a hearing aid?',
    options: [
      'To eliminate occlusion effect',
      'To extend battery life',
      'To prevent or reduce acoustic feedback (whistling)',
      'To improve directional microphone performance'
    ],
    correctOption: 'c',
    explanation: 'The primary function of a feedback cancellation system is to prevent or reduce acoustic feedback (whistling) by detecting feedback signals and introducing a phase-inverted signal to cancel them out, allowing for higher gain without feedback.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-17',
    question: 'What is the main advantage of Receiver-in-the-Canal (RIC) hearing aids compared to traditional BTE aids?',
    options: [
      'Better water resistance',
      'More cosmetically appealing with a smaller BTE portion',
      'Wider fitting range for severe to profound losses',
      'Lower cost'
    ],
    correctOption: 'b',
    explanation: 'The main advantage of RIC aids is their cosmetic appeal with a smaller BTE portion, as the receiver is placed in the ear canal rather than in the case behind the ear, allowing for a smaller, less visible device.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-18',
    question: 'What is the primary benefit of wireless connectivity in hearing aids?',
    options: [
      'Eliminating the need for batteries',
      'Improving directional microphone performance',
      'Direct connection to external audio sources and communication between hearing aids',
      'Reducing the size of the hearing aid'
    ],
    correctOption: 'c',
    explanation: 'The primary benefit of wireless connectivity is direct connection to external audio sources (like phones, TVs) and communication between a pair of hearing aids, allowing for features like ear-to-ear coordination and streaming.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-19',
    question: 'What is the primary consideration when selecting compression characteristics for a hearing aid?',
    options: [
      'The patient\'s cosmetic preferences',
      'The patient\'s hearing loss, dynamic range, and listening needs',
      'The cost of the hearing aid',
      'The battery size available in the selected style'
    ],
    correctOption: 'b',
    explanation: 'The primary consideration when selecting compression characteristics should be the patient\'s hearing loss, dynamic range, and listening needs, as these determine the appropriate compression ratio, kneepoints, and time constants.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-20',
    question: 'What is most likely to happen if real ear measurement shows that a hearing aid is providing significantly more gain than prescribed?',
    options: [
      'The patient will have improved speech understanding',
      'The patient will likely report that sounds are too loud or that they hear their own voice too loudly',
      'The battery will drain too quickly',
      'The hearing aid will frequently shut down'
    ],
    correctOption: 'b',
    explanation: 'If real ear measurement shows significantly more gain than prescribed, the patient will likely report that sounds are too loud or that they hear their own voice too loudly (occlusion effect), potentially leading to rejection of the hearing aids.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-21',
    question: 'What is the primary purpose of datalogging in hearing aids?',
    options: [
      'To record conversations for later playback',
      'To track the user\'s listening environments and hearing aid usage patterns',
      'To detect when the battery needs changing',
      'To automatically adjust volume based on sound input'
    ],
    correctOption: 'b',
    explanation: 'The primary purpose of datalogging is to track the user\'s listening environments and hearing aid usage patterns, providing valuable information to the audiologist for counseling and fine-tuning adjustments.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-22',
    question: 'What does CROS/BiCROS technology provide for patients?',
    options: [
      'Extended battery life',
      'Wireless streaming from smartphones',
      'A solution for unaidable hearing loss in one ear',
      'Water resistance for active lifestyles'
    ],
    correctOption: 'c',
    explanation: 'CROS (Contralateral Routing of Signals) and BiCROS technology provides a solution for patients with unaidable hearing loss in one ear by routing sounds from the unaidable side to the better ear, improving awareness of sounds from the affected side.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-23',
    question: 'What is the primary difference between linear and non-linear (compression) amplification?',
    options: [
      'Linear amplification uses digital technology while compression uses analog',
      'Linear provides the same gain regardless of input level, while compression varies gain based on input level',
      'Linear amplification is only available in BTE models, while compression is available in all models',
      'Linear amplification has a longer processing delay than compression'
    ],
    correctOption: 'b',
    explanation: 'The primary difference is that linear amplification provides the same gain regardless of input level, while non-linear (compression) amplification varies gain based on input level, typically providing more gain for soft sounds and less for loud sounds.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-24',
    question: 'Which verification method is considered the gold standard for hearing aid fittings?',
    options: [
      'Functional gain testing',
      'Real ear measurement',
      'Sound field testing',
      'Coupler measurement'
    ],
    correctOption: 'b',
    explanation: 'Real ear measurement is considered the gold standard for verifying hearing aid fittings because it directly measures the actual output of the hearing aid in the individual patient\'s ear, accounting for their unique ear canal acoustics.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-25',
    question: 'What is the primary advantage of a slim tube BTE hearing aid compared to a standard BTE with earmold?',
    options: [
      'More powerful amplification',
      'Reduced occlusion effect due to the open fitting',
      'Better moisture resistance',
      'Lower cost'
    ],
    correctOption: 'b',
    explanation: 'The primary advantage of a slim tube BTE is the reduced occlusion effect due to the open fitting, as these aids typically use a thin tube and dome rather than a custom earmold, allowing natural low-frequency sound to enter the ear canal.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-26',
    question: 'What is the primary purpose of acclimatization features in hearing aids?',
    options: [
      'To extend battery life during the initial fitting period',
      'To gradually increase gain over time as the user adapts to amplification',
      'To automatically adjust to different listening environments',
      'To prevent feedback during the first few weeks of use'
    ],
    correctOption: 'b',
    explanation: 'The primary purpose of acclimatization features is to gradually increase gain over time as the user adapts to amplification, starting with less gain than the target prescription and slowly approaching target levels over several weeks.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-27',
    question: 'What is the recommended approach when there is a significant difference between NAL and DSL targets during hearing aid programming?',
    options: [
      'Always use NAL targets as they are more accurate',
      'Always use DSL targets as they provide more gain',
      'Split the difference between the two prescriptions',
      'Consider the patient\'s specific hearing loss, age, and preferences'
    ],
    correctOption: 'd',
    explanation: 'When there is a significant difference between NAL and DSL targets, the recommended approach is to consider the patient\'s specific hearing loss, age, and preferences, as different prescriptions may be more appropriate for different patients and hearing losses.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-28',
    question: 'What feature in hearing aids helps to improve listening comfort during quick changes in environmental noise?',
    options: [
      'Digital noise reduction',
      'Feedback cancellation',
      'Transient noise reduction',
      'Frequency lowering'
    ],
    correctOption: 'c',
    explanation: 'Transient noise reduction specifically targets sudden, brief sounds like dishes clattering or paper rustling, helping to improve listening comfort during quick changes in environmental noise without affecting speech perception.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-29',
    question: 'What is the primary issue with using functional gain as the sole verification method for hearing aid fittings?',
    options: [
      'It takes too much time to perform properly',
      'It doesn\'t account for the specific acoustic properties of the individual\'s ear canal',
      'It can only be used with specific hearing aid models',
      'It requires too much patient participation'
    ],
    correctOption: 'b',
    explanation: 'The primary issue with functional gain is that it doesn\'t account for the specific acoustic properties of the individual\'s ear canal, potentially leading to under or over amplification despite seemingly appropriate aided thresholds.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-30',
    question: 'What is the primary purpose of frequency compression or frequency transposition in hearing aids?',
    options: [
      'To reduce battery consumption',
      'To improve speech understanding by moving high-frequency sounds to regions where the user has better hearing',
      'To eliminate the need for telecoil',
      'To reduce the physical size of the hearing aid'
    ],
    correctOption: 'b',
    explanation: 'The primary purpose of frequency compression or transposition is to improve speech understanding by moving high-frequency sounds to frequency regions where the user has better hearing, particularly beneficial for those with severe high-frequency loss.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-31',
    question: 'What is the most likely consequence of a poorly fitted earmold or dome?',
    options: [
      'Reduced battery life',
      'Acoustic feedback and discomfort',
      'Reduced high-frequency response',
      'Damage to the hearing aid'
    ],
    correctOption: 'b',
    explanation: 'A poorly fitted earmold or dome is most likely to cause acoustic feedback (whistling) due to amplified sound leaking out of the ear canal, as well as physical discomfort due to pressure points or inadequate retention.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-32',
    question: 'What is the main advantage of a deep canal hearing aid fitting?',
    options: [
      'It allows for more powerful amplification',
      'It improves high-frequency response and reduces occlusion',
      'It is easier to insert and remove',
      'It extends battery life'
    ],
    correctOption: 'b',
    explanation: 'The main advantage of a deep canal fitting is improved high-frequency response (due to proximity to the eardrum) and reduced occlusion effect (as less of the ear canal wall is set into vibration), resulting in more natural sound quality.',
    category: CATEGORIES.HEARING_AID
  },
  {
    id: 'hearingaid-33',
    question: 'What would be the appropriate verification approach for a patient fitted with frequency-lowering technology?',
    options: [
      'Standard real ear measurement only',
      'Aided soundfield thresholds only',
      'Speech testing only',
      'Modified real ear protocols with specific attention to the input frequencies being transposed/compressed'
    ],
    correctOption: 'd',
    explanation: 'For frequency-lowering technology, verification should include modified real ear protocols with specific attention to the input frequencies being transposed/compressed, often using specialized stimuli like the University of Western Ontario Plurals Test or Ling 6/7 sounds.',
    category: CATEGORIES.HEARING_AID
  }
]; 