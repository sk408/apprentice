import { ExamQuestion, CATEGORIES } from './categories';

export const troubleshootingQuestions: ExamQuestion[] = [
  {
    id: 'troubleshooting-1',
    question: 'A patient reports their hearing aid is not working. What is the first thing you should check?',
    options: [
      'The hearing aid programming',
      'If the hearing aid is turned on and the battery is working',
      'The patient\'s ear canal for cerumen',
      'If the patient is inserting it correctly'
    ],
    correctOption: 'b',
    explanation: 'The first troubleshooting step for a non-working hearing aid should be checking if it\'s turned on and if the battery is functioning, as these are the most common and easily resolved issues.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-2',
    question: 'What is the most common cause of a whistling sound from a hearing aid?',
    options: [
      'Battery running low',
      'Volume set too high',
      'Acoustic feedback',
      'Damaged microphone'
    ],
    correctOption: 'c',
    explanation: 'Acoustic feedback, which occurs when amplified sound leaks out of the ear canal and is re-amplified by the hearing aid, is the most common cause of whistling or squealing from a hearing aid.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-3',
    question: 'A patient complains that their hearing aid sounds "tinny" or distorted. What is the most likely cause?',
    options: [
      'Cerumen blocking the receiver',
      'Battery at end of life',
      'Gain set too high',
      'Broken microphone cover'
    ],
    correctOption: 'a',
    explanation: 'Cerumen (earwax) partially blocking the receiver tube or opening is a common cause of tinny or distorted sound in hearing aids, as it obstructs sound delivery.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-4',
    question: 'What is the most likely cause of intermittent sound in a hearing aid?',
    options: [
      'Incorrect programming',
      'Poor battery contact or corroded battery compartment',
      'Receiver blockage',
      'Microphone malfunction'
    ],
    correctOption: 'b',
    explanation: 'Intermittent sound is often caused by poor battery contact or corrosion in the battery compartment, creating an inconsistent power supply to the hearing aid.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-5',
    question: 'A patient reports that their hearing aid is uncomfortable. What is the first aspect you should evaluate?',
    options: [
      'The programming of the hearing aid',
      'The physical fit of the device or earmold',
      'The battery type being used',
      'The environmental settings'
    ],
    correctOption: 'b',
    explanation: 'When a patient reports discomfort, the first aspect to evaluate is the physical fit of the device or earmold, as improper fit is the most common cause of physical discomfort.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-6',
    question: 'What is the most common cause of reduced volume in a hearing aid that was previously working well?',
    options: [
      'Microphone blockage or cerumen in the receiver',
      'Damaged programming',
      'Memory button pressed accidentally',
      'Moisture in the hearing aid'
    ],
    correctOption: 'a',
    explanation: 'Microphone blockage (from debris or cerumen) or cerumen blocking the receiver are common causes of reduced volume in hearing aids that were previously functioning well.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-7',
    question: 'A patient reports their hearing aid battery is draining very quickly. What is the most likely cause?',
    options: [
      'The hearing aid is set to a high power level',
      'They are not turning off the hearing aid when not in use',
      'They are using an incorrect battery size',
      'The hearing aid has an internal fault'
    ],
    correctOption: 'b',
    explanation: 'The most common cause of rapid battery drainage is not turning off the hearing aid when not in use, such as overnight or during extended periods of non-use.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-8',
    question: 'What is the recommended first step when a Behind-the-Ear (BTE) hearing aid produces no sound?',
    options: [
      'Send the hearing aid for repair',
      'Reprogram the hearing aid',
      'Check if the tubing is blocked or kinked',
      'Replace the battery'
    ],
    correctOption: 'c',
    explanation: 'For BTE hearing aids producing no sound (assuming the device is on with a good battery), checking for blockages or kinks in the tubing is a recommended first step, as this is a common and easily resolved issue.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-9',
    question: 'A patient complains their hearing aid sounds muffled. What is the most common cause?',
    options: [
      'Low battery',
      'Moisture in the hearing aid',
      'Cerumen blocking the microphone or receiver',
      'Incorrect program selection'
    ],
    correctOption: 'c',
    explanation: 'Cerumen (earwax) blocking the microphone or receiver is the most common cause of muffled sound in hearing aids, as it obstructs sound pickup or delivery.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-10',
    question: 'What is the most likely cause of a static or crackling sound in a hearing aid?',
    options: [
      'Electromagnetic interference',
      'Poor battery contact',
      'Damaged circuit board',
      'Excessive gain settings'
    ],
    correctOption: 'b',
    explanation: 'Poor battery contact or corrosion in the battery compartment is a common cause of static or crackling sounds in hearing aids, as it creates inconsistent power delivery.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-11',
    question: 'How should hearing aids be stored when not in use?',
    options: [
      'In a sealed container with a desiccant',
      'In the refrigerator to extend battery life',
      'With the battery door open in a dry, safe place',
      'In their case with the batteries inserted but turned off'
    ],
    correctOption: 'c',
    explanation: 'Hearing aids should be stored with the battery door open in a dry, safe place when not in use. This allows moisture to escape, prevents battery drain, and reduces the risk of corrosion in the battery compartment.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-12',
    question: 'What is the correct way to clean a hearing aid microphone port?',
    options: [
      'Use a wet wipe to remove debris',
      'Tap the hearing aid gently to dislodge particles',
      'Use a soft, dry brush specifically designed for hearing aids',
      'Blow forcefully into the microphone opening'
    ],
    correctOption: 'c',
    explanation: 'The correct way to clean a hearing aid microphone port is to use a soft, dry brush specifically designed for hearing aids. This gently removes debris without damaging the delicate microphone components.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-13',
    question: 'A patient reports that the hearing aid works fine at home but not in restaurants. What is the most likely explanation?',
    options: [
      'The hearing aid has a mechanical fault that is triggered by certain environments',
      'The hearing aid needs more gain in all frequencies',
      'The patient needs a program with different settings for noisy environments',
      'The patient is not inserting the hearing aid correctly when in public'
    ],
    correctOption: 'c',
    explanation: 'The most likely explanation is that the patient needs a program with different settings (such as directional microphones, noise reduction, or different gain characteristics) for noisy environments like restaurants.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-14',
    question: 'What should be done if a hearing aid gets wet?',
    options: [
      'Turn it on immediately to check if it still works',
      'Place it in a bowl of rice overnight',
      'Remove the battery, dry the outside, and use a dehumidifier or drying kit',
      'Use a hair dryer on high heat to dry it quickly'
    ],
    correctOption: 'c',
    explanation: 'If a hearing aid gets wet, you should immediately remove the battery, dry the outside of the device with a soft cloth, and place it in a hearing aid dehumidifier or drying kit to remove internal moisture.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-15',
    question: 'A patient reports that their hearing aid is not as loud as it used to be. After checking for cerumen blockage, what is the next most important factor to check?',
    options: [
      'If the patient\'s hearing has changed',
      'If the volume control has been accidentally adjusted',
      'If the battery is fresh and properly inserted',
      'If the programming has been corrupted'
    ],
    correctOption: 'c',
    explanation: 'After checking for cerumen blockage, verifying that the battery is fresh and properly inserted is the next most important factor to check when a hearing aid is not as loud as it used to be.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-16',
    question: 'What can cause a custom hearing aid to become loose over time?',
    options: [
      'Exposure to humidity',
      'Weight fluctuation or changes in ear canal shape',
      'Using the wrong battery type',
      'Excessive volume settings'
    ],
    correctOption: 'b',
    explanation: 'Custom hearing aids can become loose over time due to weight fluctuation, changes in ear canal shape with age, or structural changes in the ear from chewing or talking.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-17',
    question: 'A new hearing aid user reports pain when wearing their device. What should you recommend first?',
    options: [
      'Apply lubricant to the hearing aid shell',
      'Increase wearing time gradually to build tolerance',
      'Remove the hearing aid immediately and check for areas needing adjustment',
      'Switch to a different hearing aid style'
    ],
    correctOption: 'c',
    explanation: 'When a new user reports pain, they should remove the hearing aid immediately to prevent further discomfort, and the device should be checked for areas needing adjustment, modification, or remade if necessary.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-18',
    question: 'What is the most common cause of acoustic feedback when the hearing aid is properly inserted?',
    options: [
      'Damaged internal components',
      'Volume set too high for the user\'s hearing loss',
      'Improper programming',
      'Cracked hearing aid shell or earmold'
    ],
    correctOption: 'd',
    explanation: 'When a hearing aid is properly inserted, acoustic feedback is commonly caused by physical issues like a cracked shell or earmold, which creates a pathway for sound to leak out and be re-amplified.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-19',
    question: 'What might cause a rechargeable hearing aid to have significantly reduced battery life?',
    options: [
      'Using the wrong charger',
      'Not cleaning the hearing aid regularly',
      'Charging for too long',
      'Battery aging or charger contact issues'
    ],
    correctOption: 'd',
    explanation: 'Significantly reduced battery life in rechargeable hearing aids is commonly due to battery aging over time or charger contact issues (e.g., debris on contacts preventing proper charging).',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-20',
    question: 'A patient reports their hearing aid stops working when they go outside on cold days. What is the most likely cause?',
    options: [
      'Wind interference with the microphones',
      'Condensation forming inside the hearing aid',
      'Battery performance decreasing in cold temperatures',
      'The hearing aid switching to the wrong program'
    ],
    correctOption: 'c',
    explanation: 'Battery performance often decreases in cold temperatures, which can cause hearing aids to stop working or function poorly when a patient goes outside on cold days.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-21',
    question: 'What should you check if a patient reports their hearing aid is "dead" immediately after inserting a new battery?',
    options: [
      'If the battery is inserted with correct polarity',
      'If the hearing aid is actually turned on',
      'If the patient\'s hearing has changed',
      'If the programming has been erased'
    ],
    correctOption: 'a',
    explanation: 'If a hearing aid is "dead" immediately after inserting a new battery, first check if the battery is inserted with the correct polarity (+ and - sides in the right direction).',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-22',
    question: 'What is the most likely cause of a hearing aid shell cracking?',
    options: [
      'Exposure to extreme heat',
      'Physical impact or improper handling',
      'Chemical exposure from hairspray or cosmetics',
      'Battery leakage'
    ],
    correctOption: 'b',
    explanation: 'Hearing aid shells most commonly crack due to physical impact (dropping) or improper handling (such as using excessive force when inserting or removing).',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-23',
    question: 'A patient complains of their own voice sounding hollow or boomy with their new hearing aids. What is the most likely cause?',
    options: [
      'Improper programming of the hearing aids',
      'The occlusion effect',
      'Impacted cerumen in the ear canal',
      'Hearing aid microphone placement'
    ],
    correctOption: 'b',
    explanation: 'The occlusion effect, which occurs when the ear canal is blocked by an earmold or hearing aid, causes the patient\'s own voice to sound hollow, boomy, or like they\'re "talking in a barrel" due to trapped bone-conducted sound vibrations.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-24',
    question: 'What is the proper way to clean hearing aid tubing?',
    options: [
      'Soak it in soapy water overnight',
      'Use a pipe cleaner or similar tool with alcohol',
      'Remove the tubing, flush with warm water and a bulb blower, and ensure it\'s completely dry before reattaching',
      'Have the audiologist replace it every month'
    ],
    correctOption: 'c',
    explanation: 'The proper way to clean hearing aid tubing is to remove it from the hearing aid (for BTEs), flush it with warm water using a bulb blower or cleaning tool, ensure it is completely dry using the same blower, and reattach only when fully dry, typically after several hours.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-25',
    question: 'What should be checked first if a patient complains that one hearing aid is louder than the other?',
    options: [
      'The programming of both hearing aids',
      'If cerumen is blocking the receiver of the quieter hearing aid',
      'If the batteries are the same age and type',
      'If the user is inserting both hearing aids correctly'
    ],
    correctOption: 'b',
    explanation: 'When one hearing aid seems louder than the other, first check if cerumen is blocking the receiver of the quieter hearing aid, as this is a common and easily resolved cause of uneven sound.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-26',
    question: 'A patient with new hearing aids reports increased awareness of background noises like paper rustling and footsteps. What does this indicate?',
    options: [
      'The hearing aids are malfunctioning',
      'The hearing aids are set with too much gain',
      'The patient is experiencing normal adjustment to amplification',
      'The patient needs directional microphones'
    ],
    correctOption: 'c',
    explanation: 'Increased awareness of environmental sounds is a normal part of adjusting to amplification, as the patient is now hearing sounds that were previously inaudible due to hearing loss.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-27',
    question: 'What can cause a hearing aid battery to drain quickly even when the hearing aid is turned off?',
    options: [
      'Exposure to humid environments',
      'The battery door not being fully opened',
      'Using a battery with insufficient voltage',
      'Storing hearing aids near electronic devices'
    ],
    correctOption: 'b',
    explanation: 'If the battery door is not fully opened when the hearing aid is not in use, the battery can continue to drain as the hearing aid may still be drawing power.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-28',
    question: 'What is the most likely cause of distorted sound when a hearing aid is exposed to loud noises?',
    options: [
      'The hearing aid\'s maximum output limit being reached (saturation distortion)',
      'The battery being unable to provide enough current',
      'The microphone covers being damaged',
      'The programming being corrupted'
    ],
    correctOption: 'a',
    explanation: 'Distorted sound during loud noises is most commonly caused by the hearing aid reaching its maximum output limit, resulting in peak clipping or saturation distortion.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-29',
    question: 'A patient reports that their hearing aid is making a buzzing noise when they use their cell phone. What is the most likely cause?',
    options: [
      'The hearing aid needs reprogramming',
      'Electromagnetic interference',
      'The hearing aid microphone is damaged',
      'The cell phone volume is set too high'
    ],
    correctOption: 'b',
    explanation: 'Buzzing while using a cell phone is typically caused by electromagnetic interference between the phone and hearing aid, especially with older hearing aids or certain phone models.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-30',
    question: 'What should you advise a patient who reports their hearing aid is getting dirty quickly?',
    options: [
      'Get a new hearing aid with a smoother surface',
      'Apply a protective coating to the hearing aid',
      'Establish a daily cleaning routine and avoid handling with dirty hands',
      'Wear the hearing aid for fewer hours each day'
    ],
    correctOption: 'c',
    explanation: 'A patient whose hearing aid gets dirty quickly should establish a daily cleaning routine and avoid handling the hearing aid with dirty hands, as regular maintenance is essential for keeping hearing aids clean.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-31',
    question: 'What is the appropriate first action if a patient reports mild skin irritation where their hearing aid contacts their ear?',
    options: [
      'Advise them to stop wearing the hearing aid entirely',
      'Recommend an over-the-counter steroid cream',
      'Check the hearing aid for rough edges and clean thoroughly',
      'Suggest they get a different type of hearing aid immediately'
    ],
    correctOption: 'c',
    explanation: 'For mild skin irritation, first check the hearing aid for rough edges or debris and clean it thoroughly, as irritation is often caused by mechanical irritation or buildup of debris/moisture.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-32',
    question: 'If a patient reports that their hearing aid volume fluctuates throughout the day, what should be checked first?',
    options: [
      'If the adaptive features are functioning properly',
      'If the patient is getting used to the hearing aid',
      'If the battery is functioning properly',
      'If the programming needs to be adjusted'
    ],
    correctOption: 'c',
    explanation: 'When volume fluctuates, first check if the battery is functioning properly, as low battery voltage can cause inconsistent amplification before the battery fails completely.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-33',
    question: 'What is the most likely cause of physical discomfort for a new Behind-the-Ear (BTE) hearing aid user?',
    options: [
      'The ear hook being too large or incorrectly shaped',
      'The volume being set too high',
      'The battery door being uncomfortable against the head',
      'The hearing aid being too heavy'
    ],
    correctOption: 'a',
    explanation: 'For new BTE users, physical discomfort is commonly caused by the ear hook being too large or incorrectly shaped for the patient\'s ear, causing pressure or irritation.',
    category: CATEGORIES.TROUBLESHOOTING
  }
]; 