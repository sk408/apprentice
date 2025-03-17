import { ExamQuestion, CATEGORIES } from './categories';

export const earmoldQuestions: ExamQuestion[] = [
  {
    id: 'earmold-1',
    question: 'What is the primary purpose of taking an ear impression?',
    options: [
      'To diagnose ear canal abnormalities',
      'To create a custom earmold or hearing aid shell that fits the individual ear',
      'To remove excess cerumen from the ear canal',
      'To measure the ear canal\'s acoustic properties'
    ],
    correctOption: 'b',
    explanation: 'The primary purpose of taking an ear impression is to create a custom earmold or hearing aid shell that precisely fits the unique contours of an individual\'s ear, ensuring comfort, proper retention, and appropriate acoustic performance.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-2',
    question: 'Which of the following materials is most commonly used for ear impressions?',
    options: [
      'Silicone impression material',
      'Dental alginate',
      'Wax',
      'Clay'
    ],
    correctOption: 'a',
    explanation: 'Silicone impression material is most commonly used for ear impressions due to its ability to capture fine details, its dimensional stability after setting, and its comfortable setting process that doesn\'t create excessive heat or pressure.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-3',
    question: 'What is the purpose of an otoblock when taking an ear impression?',
    options: [
      'To check for ear infections before the impression',
      'To prevent impression material from touching the tympanic membrane',
      'To test hearing before taking the impression',
      'To clean the ear canal before the impression'
    ],
    correctOption: 'b',
    explanation: 'The purpose of an otoblock is to prevent impression material from flowing too deeply into the ear canal and potentially contacting the tympanic membrane, which could cause discomfort or damage.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-4',
    question: 'When is a canal lock feature indicated in an earmold design?',
    options: [
      'For patients with excessive cerumen production',
      'For patients with very small ear canals',
      'For patients who have difficulty retaining the earmold due to ear canal shape',
      'For patients with tympanic membrane perforations'
    ],
    correctOption: 'c',
    explanation: 'A canal lock feature is indicated for patients who have difficulty retaining the earmold due to the shape of their ear canal. The lock creates a small bulge in the canal portion that sits in the second bend of the ear canal, improving retention.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-5',
    question: 'Which earmold style is typically recommended for severe to profound hearing losses?',
    options: [
      'Skeleton earmold',
      'Shell earmold',
      'Full concha earmold',
      'Canal earmold'
    ],
    correctOption: 'c',
    explanation: 'A full concha earmold is typically recommended for severe to profound hearing losses as it provides maximum retention, minimal venting, and helps prevent feedback when high levels of amplification are needed.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-6',
    question: 'What safety precaution is most important before taking an ear impression?',
    options: [
      'Having the patient sign a consent form',
      'Performing an otoscopic examination',
      'Testing the patient\'s hearing',
      'Taking the patient\'s temperature'
    ],
    correctOption: 'b',
    explanation: 'Performing an otoscopic examination is the most important safety precaution before taking an ear impression, as it allows the clinician to check for contraindications such as perforations, infections, or excessive cerumen that could lead to complications during the impression process.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-7',
    question: 'What is the primary benefit of a vented earmold?',
    options: [
      'Improved high-frequency amplification',
      'Reduction of the occlusion effect',
      'Better retention in the ear',
      'Improved appearance'
    ],
    correctOption: 'b',
    explanation: 'The primary benefit of a vented earmold is the reduction of the occlusion effect, which is the amplification of a person\'s own voice and low-frequency sounds when the ear canal is occluded. Venting allows these sounds to escape, creating a more natural sound quality.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-8',
    question: 'What type of earmold material would be most appropriate for a patient with known skin allergies?',
    options: [
      'Acrylic',
      'Silicone',
      'Vinyl',
      'Polyethylene'
    ],
    correctOption: 'b',
    explanation: 'Silicone would be most appropriate for a patient with known skin allergies as it is typically hypoallergenic, less likely to cause skin reactions, and is one of the most biocompatible earmold materials available.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-9',
    question: 'What is the purpose of a helix lock on an earmold?',
    options: [
      'To improve sound quality',
      'To reduce feedback',
      'To improve retention of the earmold',
      'To reduce the occlusion effect'
    ],
    correctOption: 'c',
    explanation: 'The purpose of a helix lock on an earmold is to improve retention by extending the earmold to engage the helix (outer rim) of the ear, preventing the earmold from working loose, especially important for active individuals or those with challenging ear anatomy.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-10',
    question: 'What is the acoustic effect of increasing the vent diameter in an earmold?',
    options: [
      'Increased high-frequency response',
      'Increased low-frequency amplification',
      'Decreased low-frequency response',
      'Decreased high-frequency response'
    ],
    correctOption: 'c',
    explanation: 'Increasing the vent diameter in an earmold decreases the low-frequency response because more low-frequency sound escapes through the larger vent rather than being amplified. This can be desirable for patients with normal low-frequency hearing but high-frequency loss.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-11',
    question: 'What action should be taken if a patient reports discomfort with a new earmold after the first few days of use?',
    options: [
      'Tell them to continue wearing it as the ear will adapt',
      'Recommend over-the-counter pain medication',
      'Examine the earmold and the patient\'s ear to identify and correct pressure points',
      'Immediately remake the earmold without questioning'
    ],
    correctOption: 'c',
    explanation: 'The appropriate action is to examine the earmold and the patient\'s ear to identify and correct pressure points. Minor modifications can often be made to the earmold to relieve discomfort without needing to remake the entire earmold.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-12',
    question: 'What is the primary advantage of a shell earmold compared to a full concha earmold?',
    options: [
      'Better sound quality',
      'Improved cosmetic appearance',
      'Better retention in the ear',
      'Reduced feedback'
    ],
    correctOption: 'b',
    explanation: 'The primary advantage of a shell earmold compared to a full concha earmold is improved cosmetic appearance, as it is less visible and occupies less space in the outer ear, which many patients prefer aesthetically.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-13',
    question: 'What is the proper technique for inserting and removing an earmold from the patient\'s ear?',
    options: [
      'Pull the ear up and back, insert earmold; pull down and forward, remove earmold',
      'Pull the ear down and forward, insert earmold; pull up and back, remove earmold',
      'Pull the ear up and back for both insertion and removal',
      'Pull the ear down and forward for both insertion and removal'
    ],
    correctOption: 'a',
    explanation: 'The proper technique is to pull the ear up and back during insertion to straighten the ear canal, allowing easier placement of the earmold, and pull down and forward during removal to help break the seal and allow easier removal without causing discomfort.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-14',
    question: 'What contraindication would most likely prohibit taking an ear impression?',
    options: [
      'Mild hearing loss',
      'Perforated tympanic membrane',
      'Excessive ear hair',
      'Previous hearing aid use'
    ],
    correctOption: 'b',
    explanation: 'A perforated tympanic membrane is a major contraindication for taking an ear impression because impression material could enter the middle ear through the perforation, potentially causing serious complications and requiring surgical removal.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-15',
    question: 'What is the primary purpose of a CROS or BiCROS earmold system?',
    options: [
      'To amplify sounds for bilateral hearing loss',
      'To reduce feedback in high-power hearing aids',
      'To route sounds from the unaidable ear to the better ear',
      'To improve directional hearing abilities'
    ],
    correctOption: 'c',
    explanation: 'The primary purpose of a CROS or BiCROS earmold system is to route sounds from the unaidable ear (in CROS) or poorer hearing ear (in BiCROS) to the better ear, allowing the patient to be aware of sounds from both sides despite having one ear that cannot benefit from traditional amplification.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-16',
    question: 'What is the most likely cause of acoustic feedback when using a custom earmold?',
    options: [
      'Too large a vent',
      'Poor fit allowing sound to leak between the earmold and ear canal',
      'Use of incorrect tubing size',
      'Earmold material is too soft'
    ],
    correctOption: 'b',
    explanation: 'The most likely cause of acoustic feedback when using a custom earmold is a poor fit that allows amplified sound to leak between the earmold and ear canal, creating a pathway for sound to travel back to the microphone and cause feedback.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-17',
    question: 'What is the primary benefit of a soft material for an earmold?',
    options: [
      'Better retention',
      'Improved frequency response',
      'Enhanced comfort for the wearer',
      'Reduced manufacturing cost'
    ],
    correctOption: 'c',
    explanation: 'The primary benefit of a soft material for an earmold is enhanced comfort for the wearer, as soft materials conform better to the ear, create less pressure points, and feel more comfortable during extended wear, particularly important for new users or those with sensitive ears.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-18',
    question: 'What earmold modification would most effectively reduce the occlusion effect while maintaining appropriate gain?',
    options: [
      'Adding a helix lock',
      'Using a longer canal portion',
      'Adding an appropriate vent',
      'Making the earmold out of harder material'
    ],
    correctOption: 'c',
    explanation: 'Adding an appropriate vent would most effectively reduce the occlusion effect while maintaining appropriate gain, as the vent allows bone-conducted sound and low frequencies to escape, reducing the "plugged up" sensation while still allowing necessary amplification of other frequencies.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-19',
    question: 'What is the primary purpose of a canal lock in an earmold design?',
    options: [
      'To reduce feedback',
      'To increase comfort',
      'To improve retention',
      'To enhance sound quality'
    ],
    correctOption: 'c',
    explanation: 'The primary purpose of a canal lock in an earmold design is to improve retention by creating a slight bulge that sits at the second bend of the ear canal, preventing the earmold from working loose, especially important for patients with challenging ear anatomy or who lead active lifestyles.',
    category: CATEGORIES.EARMOLD
  },
  {
    id: 'earmold-20',
    question: 'What is the recommended approach for taking an ear impression on a child?',
    options: [
      'Use exactly the same technique as for adults',
      'Skip the otoscopic examination to avoid frightening the child',
      'Have additional assistance to help keep the child still and use behavioral techniques to ensure cooperation',
      'Take a partial impression to avoid discomfort'
    ],
    correctOption: 'c',
    explanation: 'The recommended approach for taking an ear impression on a child is to have additional assistance to help keep the child still and use behavioral techniques (such as distraction, explanation appropriate to age, and positive reinforcement) to ensure cooperation during the procedure, ensuring both safety and an accurate impression.',
    category: CATEGORIES.EARMOLD
  }
]; 