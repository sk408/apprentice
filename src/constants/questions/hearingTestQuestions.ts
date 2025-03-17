import { ExamQuestion, CATEGORIES } from './categories';

export const hearingTestQuestions: ExamQuestion[] = [
  {
    id: 'hearingtest-1',
    question: 'What is the primary purpose of pure-tone audiometry?',
    options: [
      'To determine the type of hearing loss',
      'To determine the softest sounds a person can hear at different frequencies',
      'To evaluate speech understanding',
      'To assess middle ear function'
    ],
    correctOption: 'b',
    explanation: 'The primary purpose of pure-tone audiometry is to determine the softest sound levels (thresholds) at which a patient can hear tones at different frequencies, helping to establish the degree and configuration of hearing loss.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-2',
    question: 'Which of the following is NOT typically part of the basic audiological test battery?',
    options: [
      'Pure-tone audiometry',
      'Speech audiometry',
      'Immittance testing',
      'Electrocochleography (ECochG)'
    ],
    correctOption: 'd',
    explanation: 'Electrocochleography (ECochG) is not typically part of the basic audiological test battery; it\'s a specialized test used for specific diagnostic purposes, particularly in the assessment of Ménière\'s disease.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-3',
    question: 'What does Speech Recognition Threshold (SRT) measure?',
    options: [
      'The softest level at which a patient can repeat 50% of single-syllable words',
      'The percentage of words a patient can correctly repeat at a comfortable listening level',
      'The softest level at which a patient can repeat spondee words with 50% accuracy',
      'The ability to understand speech in background noise'
    ],
    correctOption: 'c',
    explanation: 'The Speech Recognition Threshold (SRT) measures the softest level at which a patient can repeat spondee words (two-syllable words with equal stress on both syllables) with 50% accuracy.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-4',
    question: 'What is the normal middle ear pressure range on tympanometry?',
    options: [
      '+200 to +400 daPa',
      '+50 to -100 daPa',
      '-100 to -300 daPa',
      '+300 to -300 daPa'
    ],
    correctOption: 'b',
    explanation: 'The normal middle ear pressure range on tympanometry is generally considered to be between +50 and -100 decaPascals (daPa), with the peak typically around 0 daPa.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-5',
    question: 'What type of tympanogram would you expect to see in a patient with otosclerosis?',
    options: [
      'Type A',
      'Type B',
      'Type C',
      'Type Ad'
    ],
    correctOption: 'a',
    explanation: 'In early or uncomplicated otosclerosis, a Type A tympanogram is typically observed because middle ear pressure and tympanic membrane mobility remain normal despite stapes fixation.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-6',
    question: 'At what frequency is the acoustic reflex typically tested?',
    options: [
      '256 Hz',
      '500 Hz',
      '1000 Hz',
      '4000 Hz'
    ],
    correctOption: 'c',
    explanation: 'The acoustic reflex is typically tested at 1000 Hz, as this frequency usually produces reliable responses and is within the range where the reflex is most sensitive.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-7',
    question: 'What is the purpose of masking in audiometry?',
    options: [
      'To improve patient comfort during testing',
      'To prevent the non-test ear from responding to the test signal',
      'To calibrate the audiometer',
      'To test for malingering'
    ],
    correctOption: 'b',
    explanation: 'The purpose of masking in audiometry is to prevent the non-test ear from responding to the test signal, which ensures that responses are coming from the ear being tested, particularly when there is a significant difference in hearing between ears.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-8',
    question: 'When is masking necessary during pure-tone air conduction testing?',
    options: [
      'Always, for every patient',
      'When the difference between air conduction thresholds in the two ears exceeds the interaural attenuation',
      'Only when testing children',
      'Only when testing frequencies above 2000 Hz'
    ],
    correctOption: 'b',
    explanation: 'Masking is necessary during pure-tone air conduction testing when the difference between air conduction thresholds in the two ears exceeds the interaural attenuation (the amount of signal reduction that occurs when sound travels from one ear to the other through the head).',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-9',
    question: 'What does a Type B tympanogram typically indicate?',
    options: [
      'Normal middle ear function',
      'Significant negative middle ear pressure',
      'Middle ear fluid or tympanic membrane perforation',
      'Hypermobile tympanic membrane'
    ],
    correctOption: 'c',
    explanation: 'A Type B tympanogram (flat, no peak) typically indicates middle ear fluid (effusion), or a tympanic membrane perforation. It reflects a significant pathology affecting middle ear mobility.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-10',
    question: 'What is the primary purpose of speech recognition testing in quiet?',
    options: [
      'To determine cochlear function',
      'To verify pure-tone results and assess word understanding ability',
      'To assess the need for hearing aids',
      'To diagnose specific types of hearing loss'
    ],
    correctOption: 'b',
    explanation: 'The primary purpose of speech recognition testing in quiet is to verify pure-tone results and assess a patient\'s ability to understand speech, providing information about their functional hearing ability beyond just detecting tones.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-11',
    question: 'What would most likely be the pattern of acoustic reflex results in a patient with a conductive hearing loss?',
    options: [
      'Normal reflexes for ipsilateral and contralateral stimulation',
      'Absent reflexes for both ipsilateral and contralateral stimulation when the affected ear is stimulated',
      'Elevated reflexes for ipsilateral stimulation only',
      'Absent reflexes for contralateral stimulation only'
    ],
    correctOption: 'b',
    explanation: 'In conductive hearing loss, acoustic reflexes are typically absent for both ipsilateral and contralateral stimulation when the affected ear is stimulated, as the conductive pathology prevents sufficient sound energy from reaching the cochlea to trigger the reflex.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-12',
    question: 'What is the typical air-bone gap seen in a sensorineural hearing loss?',
    options: [
      'Greater than 10 dB',
      'Less than or equal to 10 dB',
      'At least 20 dB',
      'Variable depending on the frequency'
    ],
    correctOption: 'b',
    explanation: 'In sensorineural hearing loss, the air-bone gap is typically less than or equal to 10 dB, as both air and bone conduction thresholds are similarly affected due to the cochlear or neural pathology.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-13',
    question: 'What is the purpose of otoacoustic emissions (OAE) testing?',
    options: [
      'To determine the degree of hearing loss',
      'To assess middle ear function',
      'To evaluate outer hair cell function in the cochlea',
      'To measure speech recognition ability'
    ],
    correctOption: 'c',
    explanation: 'Otoacoustic emissions (OAE) testing is used to evaluate outer hair cell function in the cochlea, providing information about cochlear integrity, particularly in the context of newborn hearing screening and differential diagnosis.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-14',
    question: 'Which of the following best describes a Type C tympanogram?',
    options: [
      'A tympanogram with no identifiable peak',
      'A tympanogram with a peak at normal pressure',
      'A tympanogram with a peak at significant negative pressure',
      'A tympanogram with a peak at significant positive pressure'
    ],
    correctOption: 'c',
    explanation: 'A Type C tympanogram shows a peak at significant negative pressure (typically below -100 daPa), indicating negative middle ear pressure often associated with Eustachian tube dysfunction.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-15',
    question: 'What does an absent acoustic reflex most likely indicate?',
    options: [
      'Normal hearing',
      'Mild hearing loss',
      'Conductive pathology or significant sensorineural hearing loss',
      'Hyperacusis'
    ],
    correctOption: 'c',
    explanation: 'An absent acoustic reflex most likely indicates either a conductive pathology (which prevents sufficient stimulation) or a significant sensorineural hearing loss (typically >70-80 dB HL) at the test frequency.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-16',
    question: 'Which test is most appropriate for assessing a patient\'s ability to understand speech in background noise?',
    options: [
      'Pure-tone audiometry',
      'Immittance testing',
      'Speech recognition in quiet',
      'Speech-in-noise testing (e.g., QuickSIN, HINT)'
    ],
    correctOption: 'd',
    explanation: 'Speech-in-noise tests such as QuickSIN (Quick Speech-in-Noise) or HINT (Hearing in Noise Test) are specifically designed to assess a patient\'s ability to understand speech in background noise, which is a common complaint among those with hearing loss.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-17',
    question: 'What does a PB-Max (maximum phoneme recognition score) represent?',
    options: [
      'The highest possible score on any speech test',
      'The highest percentage of phonemes a patient can correctly identify regardless of presentation level',
      'The percentage of phonemes correctly identified at the most comfortable loudness level',
      'The presentation level at which speech becomes uncomfortably loud'
    ],
    correctOption: 'b',
    explanation: 'PB-Max represents the highest percentage of phonemes a patient can correctly identify regardless of presentation level, reflecting their maximum speech recognition ability.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-18',
    question: 'Which type of audiogram configuration is most commonly associated with noise-induced hearing loss?',
    options: [
      'Flat configuration',
      'Rising configuration (better hearing at high frequencies)',
      'Notched configuration with worst thresholds around 4000 Hz',
      'Cookie-bite configuration (worse in mid-frequencies)'
    ],
    correctOption: 'c',
    explanation: 'Noise-induced hearing loss typically shows a notched configuration on the audiogram, with the worst thresholds around 4000 Hz (sometimes 3000-6000 Hz), reflecting the increased susceptibility of cochlear hair cells in this region to noise damage.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-19',
    question: 'What is the primary advantage of using speech recognition threshold (SRT) over pure-tone average (PTA)?',
    options: [
      'SRT is faster to administer',
      'SRT provides a measure of functional hearing ability',
      'SRT can detect malingering',
      'SRT is more accurate at detecting mild hearing losses'
    ],
    correctOption: 'b',
    explanation: 'The primary advantage of SRT over PTA is that SRT provides a measure of functional hearing ability for speech, representing how well a patient can actually hear and understand words rather than just detect tones.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-20',
    question: 'When would Auditory Brainstem Response (ABR) testing be particularly useful?',
    options: [
      'For fitting hearing aids',
      'For diagnosing middle ear pathologies',
      'For threshold estimation in difficult-to-test patients or retrocochlear assessment',
      'For determining candidacy for cochlear implants only'
    ],
    correctOption: 'c',
    explanation: 'ABR testing is particularly useful for threshold estimation in difficult-to-test patients (e.g., infants, cognitively impaired individuals) or for retrocochlear assessment (e.g., evaluating for acoustic neuromas or other VIIIth nerve/brainstem pathologies).',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-21',
    question: 'What does a Type Ad tympanogram indicate?',
    options: [
      'Normal middle ear function',
      'Middle ear effusion',
      'Negative middle ear pressure',
      'Hypermobile middle ear system (e.g., ossicular discontinuity)'
    ],
    correctOption: 'd',
    explanation: 'A Type Ad tympanogram shows abnormally high compliance (amplitude) of the tympanic membrane, indicating a hypermobile middle ear system, which is often associated with ossicular discontinuity or a flaccid tympanic membrane.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-22',
    question: 'What is the purpose of acoustic reflex decay testing?',
    options: [
      'To assess middle ear compliance',
      'To differentiate between cochlear and retrocochlear pathologies',
      'To determine the need for hearing aids',
      'To assess Eustachian tube function'
    ],
    correctOption: 'b',
    explanation: 'Acoustic reflex decay testing is used to differentiate between cochlear and retrocochlear pathologies. Abnormal decay (>50% reduction in reflex amplitude within 10 seconds) is associated with retrocochlear lesions.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-23',
    question: 'What is the most likely cause of inconsistent responses during pure-tone audiometry?',
    options: [
      'Equipment malfunction',
      'Conductive hearing loss',
      'Patient attention issues, cognitive factors, or pseudohypacusis',
      'Profound hearing loss'
    ],
    correctOption: 'c',
    explanation: 'Inconsistent responses during pure-tone audiometry are most likely caused by patient factors such as attention issues, cognitive factors, misunderstanding of instructions, or pseudohypacusis (exaggeration of hearing loss).',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-24',
    question: 'Which pattern of hearing loss is most consistent with presbycusis?',
    options: [
      'Flat hearing loss affecting all frequencies equally',
      'Greater loss in low frequencies than high frequencies',
      'Greater loss in high frequencies than low frequencies',
      'U-shaped audiogram (better hearing in mid-frequencies)'
    ],
    correctOption: 'c',
    explanation: 'Presbycusis (age-related hearing loss) typically presents as a bilateral, symmetrical, high-frequency sensorineural hearing loss, with greater loss in high frequencies than low frequencies, reflecting the pattern of hair cell degeneration with aging.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-25',
    question: 'What is the most appropriate masking noise to use during speech audiometry?',
    options: [
      'White noise',
      'Speech-shaped noise',
      'Narrow-band noise',
      'Pure tones'
    ],
    correctOption: 'b',
    explanation: 'Speech-shaped noise is the most appropriate masking noise during speech audiometry because its spectral content matches the average speech spectrum, providing effective masking across the frequency range of speech without requiring excessive overall levels.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-26',
    question: 'When conducting pure-tone audiometry, why is it recommended to test 1000 Hz twice?',
    options: [
      'Because it is the most important frequency for speech understanding',
      'To establish test-retest reliability',
      'It is always the first and last frequency tested',
      'To identify conductive components of hearing loss'
    ],
    correctOption: 'b',
    explanation: 'Testing 1000 Hz twice during pure-tone audiometry (typically at the beginning and after testing higher frequencies) is recommended to establish test-retest reliability and verify patient consistency throughout the test.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-27',
    question: 'What is the most likely explanation for air-bone gaps at 250 and 500 Hz only, with no gap at higher frequencies?',
    options: [
      'Noise in the test environment',
      'Ossicular discontinuity',
      'Otosclerosis',
      'Collapsing ear canal'
    ],
    correctOption: 'a',
    explanation: 'Air-bone gaps at only 250 and 500 Hz, with no gap at higher frequencies, are most likely explained by noise in the test environment, as ambient noise typically has more energy in the low frequencies and can artificially elevate air conduction thresholds.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-28',
    question: 'What is the significance of rollover on word recognition testing?',
    options: [
      'It indicates malingering',
      'It suggests a conductive hearing loss',
      'It is associated with retrocochlear pathology',
      'It is a normal finding in all types of hearing loss'
    ],
    correctOption: 'c',
    explanation: 'Rollover (a significant decrease in word recognition performance as presentation level increases) is associated with retrocochlear pathology, particularly VIIIth nerve lesions such as acoustic neuromas.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-29',
    question: 'Which of the following accurately describes the proper procedure for conducting the Rinne test?',
    options: [
      'Place the vibrating tuning fork on the mastoid until the patient no longer hears it, then move it next to the ear canal to compare air and bone conduction',
      'Place the tuning fork on the forehead and ask which ear hears it better',
      'Place the tuning fork on one mastoid and time how long the patient hears it',
      'Strike the tuning fork against the knee and place on the mastoid'
    ],
    correctOption: 'a',
    explanation: 'The proper procedure for the Rinne test involves placing a vibrating tuning fork on the mastoid process (bone conduction) until the sound is no longer heard or for a set time, then moving it next to the ear canal (air conduction), asking which is louder or if it can still be heard. In normal hearing or sensorineural hearing loss, air conduction is better than bone conduction (positive Rinne), while in conductive hearing loss, bone conduction may be better than air conduction (negative Rinne).',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-30',
    question: 'What is the primary purpose of Distortion Product Otoacoustic Emissions (DPOAEs)?',
    options: [
      'To measure middle ear function',
      'To assess inner ear (cochlear) function, particularly outer hair cells',
      'To evaluate central auditory processing',
      'To determine the appropriate gain for hearing aids'
    ],
    correctOption: 'b',
    explanation: 'The primary purpose of DPOAEs is to assess inner ear (cochlear) function, particularly the integrity of outer hair cells, which are responsible for generating these emissions in response to stimulation.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-31',
    question: 'What information does the Weber test provide?',
    options: [
      'It distinguishes between conductive and sensorineural hearing loss',
      'It determines the degree of hearing loss',
      'It identifies the need for hearing aids',
      'It measures speech discrimination'
    ],
    correctOption: 'a',
    explanation: 'The Weber test helps distinguish between conductive and sensorineural hearing loss. When a tuning fork is placed on the midline of the skull, it lateralizes to the ear with conductive loss or away from the ear with sensorineural loss.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-32',
    question: 'What does an elevated acoustic reflex threshold most likely indicate?',
    options: [
      'Normal hearing',
      'Mild to moderate hearing loss',
      'Hyperacusis',
      'Conductive hearing loss'
    ],
    correctOption: 'b',
    explanation: 'An elevated acoustic reflex threshold (requiring a higher intensity to elicit the reflex) most likely indicates a mild to moderate sensorineural hearing loss in the stimulated ear.',
    category: CATEGORIES.HEARING_TEST
  },
  {
    id: 'hearingtest-33',
    question: 'What is the most appropriate test for evaluating the benefit of hearing aids?',
    options: [
      'Pure-tone audiometry',
      'Speech recognition testing with and without hearing aids',
      'Immittance testing',
      'Otoacoustic emissions'
    ],
    correctOption: 'b',
    explanation: 'Speech recognition testing with and without hearing aids is the most appropriate test for evaluating hearing aid benefit, as it measures the functional improvement in understanding speech, which is the primary goal of amplification.',
    category: CATEGORIES.HEARING_TEST
  }
]; 