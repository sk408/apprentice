import { ExamQuestion, CATEGORIES } from './categories';

export const otoscopyQuestions: ExamQuestion[] = [
  {
    id: 'otoscopy-1',
    question: 'What is the proper way to position an adult patient for otoscopic examination?',
    options: [
      'Patient lying down with head tilted back',
      'Patient sitting upright with head tilted slightly away from examiner',
      'Patient standing with head level',
      'Patient lying on their side with examined ear facing up'
    ],
    correctOption: 'b',
    explanation: 'The proper position is sitting upright with the head tilted slightly away from the examiner, which straightens the ear canal for better visualization.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-2',
    question: 'What is the correct technique for holding the otoscope during examination?',
    options: [
      'Hold with dominant hand, brace against patient\'s head with same hand',
      'Hold with non-dominant hand, pull pinna with dominant hand',
      'Hold with dominant hand, pull pinna with non-dominant hand',
      'Hold with both hands for maximum stability'
    ],
    correctOption: 'c',
    explanation: 'The otoscope should be held in the dominant hand while the non-dominant hand pulls the pinna for better canal visualization.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-3',
    question: 'In adults, how should you manipulate the pinna to straighten the ear canal?',
    options: [
      'Pull downward and forward',
      'Pull upward and forward',
      'Pull upward and backward',
      'Pull downward and backward'
    ],
    correctOption: 'c',
    explanation: 'For adults, pull the pinna upward and backward to straighten the ear canal, which is naturally curved.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-4',
    question: 'What is the first structure you should identify when performing otoscopy?',
    options: [
      'Tympanic membrane',
      'Ear canal entrance',
      'Malleus',
      'Cerumen'
    ],
    correctOption: 'b',
    explanation: 'The ear canal entrance should be identified first to ensure proper speculum insertion and to check for obstructions.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-5',
    question: 'What condition is characterized by an opaque, bulging tympanic membrane on otoscopic examination?',
    options: [
      'Otosclerosis',
      'Acute otitis media',
      'Otitis externa',
      'Tympanosclerosis'
    ],
    correctOption: 'b',
    explanation: 'Acute otitis media typically presents with an opaque, bulging tympanic membrane, often with erythema (redness).',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-6',
    question: 'What is the most appropriate speculum size for examining an average adult ear?',
    options: [
      '2mm',
      '4-5mm',
      '7mm',
      '10mm'
    ],
    correctOption: 'b',
    explanation: 'A 4-5mm speculum is typically appropriate for average adult ear canals, providing adequate visualization without discomfort.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-7',
    question: 'What does a normal tympanic membrane look like?',
    options: [
      'Opaque and white',
      'Pearly gray and translucent',
      'Yellow and thick',
      'Red and inflamed'
    ],
    correctOption: 'b',
    explanation: 'A normal tympanic membrane appears pearly gray and translucent, with a cone-shaped light reflex.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-8',
    question: 'What is the cone of light?',
    options: [
      'The reflection of the otoscope light on the ear canal',
      'The light reflection typically seen in the anteriorinferior quadrant of the tympanic membrane',
      'The glow seen through a translucent membrane',
      'The illumination pattern created by the otoscope bulb'
    ],
    correctOption: 'b',
    explanation: 'The cone of light is a light reflection typically observed in the anteriorinferior quadrant of the tympanic membrane, indicating a normal, healthy position.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-9',
    question: 'What anatomical landmark on the tympanic membrane is most often visible during otoscopy?',
    options: [
      'Umbo',
      'Incus',
      'Malleus handle',
      'Round window'
    ],
    correctOption: 'c',
    explanation: 'The malleus handle (manubrium) is often visible through the translucent tympanic membrane as a whitish line.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-10',
    question: 'Which of the following findings indicates possible pressure in the middle ear?',
    options: [
      'Visible blood vessels on the tympanic membrane',
      'Retracted or bulging tympanic membrane',
      'Visible malleus handle',
      'Cerumen in the ear canal'
    ],
    correctOption: 'b',
    explanation: 'A retracted or bulging tympanic membrane indicates abnormal pressure in the middle ear space (negative or positive pressure, respectively).',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-11',
    question: 'What is the primary purpose of otoscopy in a hearing assessment?',
    options: [
      'To diagnose middle ear infections',
      'To rule out contraindications for audiometric testing',
      'To determine the patient\'s hearing threshold',
      'To clean the ear canal'
    ],
    correctOption: 'b',
    explanation: 'The primary purpose in a hearing assessment is to rule out contraindications for testing (e.g., impacted cerumen, perforations) and identify conditions that might affect test results.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-12',
    question: 'What is pneumatic otoscopy used for?',
    options: [
      'Visualizing the ear canal in patients with narrow canals',
      'Removing foreign objects from the ear',
      'Assessing tympanic membrane mobility',
      'Measuring middle ear pressure'
    ],
    correctOption: 'c',
    explanation: 'Pneumatic otoscopy involves applying positive and negative pressure to assess tympanic membrane mobility, which helps evaluate middle ear function.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-13',
    question: 'What should you do if you observe a foreign body in the ear canal during otoscopy?',
    options: [
      'Continue with the hearing assessment',
      'Attempt to remove it with the otoscope speculum',
      'Immediately try to flush it out with water',
      'Stop the examination and refer to a physician'
    ],
    correctOption: 'd',
    explanation: 'You should stop the examination and refer to a physician, as attempting removal without proper tools and training could push the object deeper or damage the ear canal.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-14',
    question: 'Which condition would NOT be visible during otoscopic examination?',
    options: [
      'Tympanic membrane perforation',
      'External ear canal exostoses',
      'Otosclerosis',
      'Otitis externa'
    ],
    correctOption: 'c',
    explanation: 'Otosclerosis affects the stapes footplate in the middle ear and is not directly visible during otoscopy, unlike the other conditions listed.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-15',
    question: 'When performing otoscopy on children under 3 years old, how should you manipulate the pinna?',
    options: [
      'Pull upward and backward',
      'Pull downward and backward',
      'Pull upward and forward',
      'Pull downward and forward'
    ],
    correctOption: 'd',
    explanation: 'For children under 3 years old, you should pull the pinna downward and forward due to the anatomical differences in the ear canal.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-16',
    question: 'What is the significance of observing air-fluid levels behind the tympanic membrane?',
    options: [
      'It indicates a normal finding',
      'It suggests acute otitis media or serous otitis media',
      'It confirms a tympanic membrane perforation',
      'It indicates normal middle ear pressure'
    ],
    correctOption: 'b',
    explanation: 'Air-fluid levels visible behind the tympanic membrane suggest the presence of fluid in the middle ear, which is common in acute otitis media or serous otitis media.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-17',
    question: 'What color change would you expect to see in the tympanic membrane with acute otitis media?',
    options: [
      'Pale white',
      'Pearly gray',
      'Red or yellow',
      'Blue or black'
    ],
    correctOption: 'c',
    explanation: 'In acute otitis media, the tympanic membrane often appears red (erythematous) due to inflammation, or yellow if pus is present in the middle ear.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-18',
    question: 'What does a tympanosclerotic plaque look like during otoscopy?',
    options: [
      'Reddish, inflamed patch',
      'White, chalky patch',
      'Yellow, purulent material',
      'Clear, bubble-like protrusion'
    ],
    correctOption: 'b',
    explanation: 'Tympanosclerotic plaques appear as white, chalky patches on the tympanic membrane, representing calcium deposits from previous inflammation.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-19',
    question: 'What is the significance of a retracted tympanic membrane?',
    options: [
      'Indicates a possible middle ear infection',
      'Suggests excess fluid in the middle ear',
      'Indicates potential Eustachian tube dysfunction with negative middle ear pressure',
      'Normal finding in most adults'
    ],
    correctOption: 'c',
    explanation: 'A retracted tympanic membrane suggests negative pressure in the middle ear, often due to Eustachian tube dysfunction.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-20',
    question: 'What should be documented after otoscopic examination?',
    options: [
      'Only abnormal findings',
      'Hearing threshold estimates',
      'Patient\'s subjective report of ear discomfort',
      'Appearance of the ear canal and tympanic membrane for both ears'
    ],
    correctOption: 'd',
    explanation: 'Comprehensive documentation should include the appearance of the ear canal and tympanic membrane for both ears, noting both normal and abnormal findings.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-21',
    question: 'What is the correct angle for inserting the otoscope speculum into the adult ear canal?',
    options: [
      'Directly perpendicular to the side of the head',
      'Angled slightly upward toward the eye',
      'Angled downward toward the nose',
      'Angled slightly toward the back of the head'
    ],
    correctOption: 'd',
    explanation: 'The speculum should be inserted at a slight angle toward the back of the head, following the natural angle of the ear canal.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-22',
    question: 'Which of the following would warrant immediate referral to a physician before proceeding with hearing testing?',
    options: [
      'Small amount of cerumen in the ear canal',
      'Slightly retracted tympanic membrane',
      'Active drainage from the ear',
      'Visible light reflex'
    ],
    correctOption: 'c',
    explanation: 'Active drainage from the ear could indicate infection, perforated tympanic membrane, or other medical conditions requiring immediate medical attention.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-23',
    question: 'What is the purpose of bracing your hand against the patient\'s head during otoscopic examination?',
    options: [
      'To ensure correct angle of the otoscope',
      'To prevent injury if the patient moves suddenly',
      'To provide better visualization of the tympanic membrane',
      'To stabilize the otoscope and prevent discomfort'
    ],
    correctOption: 'b',
    explanation: 'Bracing your hand against the patient\'s head creates a stabilizing unit, preventing potential injury if the patient moves suddenly during examination.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-24',
    question: 'What is a myringotomy tube, and how does it appear on otoscopic examination?',
    options: [
      'A natural opening in the ear canal visible as a dark spot',
      'A small, usually plastic tube inserted into the tympanic membrane, visible as a circular object',
      'The reflection of light on the eardrum, appearing as a bright spot',
      'A natural fold in the tympanic membrane'
    ],
    correctOption: 'b',
    explanation: 'A myringotomy tube (tympanostomy tube) is a small tube surgically inserted into the tympanic membrane to ventilate the middle ear and drain fluid. It typically appears as a circular object (various colors depending on material) in the tympanic membrane.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-25',
    question: 'What does a tympanic membrane perforation look like during otoscopy?',
    options: [
      'A bulging, red area',
      'A white, opaque patch',
      'A dark hole or opening in the membrane',
      'A yellow, fluid-filled blister'
    ],
    correctOption: 'c',
    explanation: 'A tympanic membrane perforation appears as a dark hole or opening in the membrane through which the middle ear space may be visible.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-26',
    question: 'What action should you take if the ear canal is completely occluded with cerumen?',
    options: [
      'Proceed with audiometric testing',
      'Remove it using the otoscope speculum',
      'Refer for cerumen management before testing',
      'Ignore it and test the other ear only'
    ],
    correctOption: 'c',
    explanation: 'When the ear canal is completely occluded with cerumen, you should refer for cerumen management before testing, as the cerumen can affect test results and prevent proper test conditions.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-27',
    question: 'What precaution should be taken when examining a patient who reports recent ear surgery?',
    options: [
      'Use a larger speculum than usual',
      'Perform pneumatic otoscopy to check healing',
      'Proceed with caution and consider consulting the surgeon before examination',
      'Insert the speculum deeper to better visualize surgical changes'
    ],
    correctOption: 'c',
    explanation: 'For patients with recent ear surgery, proceed with caution and consider consulting the surgeon before examination to avoid disrupting healing structures or causing complications.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-28',
    question: 'Which of the following is NOT a typical quadrant used to describe locations on the tympanic membrane?',
    options: [
      'Anteriorsuperior',
      'Anteriorinferior',
      'Posteriorsuperior',
      'Centrolateral'
    ],
    correctOption: 'd',
    explanation: 'The tympanic membrane is typically divided into four quadrants: anteriorsuperior, anteriorinferior, posteriorsuperior, and posteriorinferior. "Centrolateral" is not a standard quadrant term.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-29',
    question: 'What is the pars flaccida of the tympanic membrane?',
    options: [
      'The lower, taut portion of the eardrum',
      'The small, upper portion of the eardrum that appears less tense',
      'The part of the eardrum directly attached to the malleus',
      'The outermost layer of the eardrum composed of skin'
    ],
    correctOption: 'b',
    explanation: 'The pars flaccida is the small, upper portion of the tympanic membrane that appears less tense than the rest of the membrane. It constitutes about 10% of the tympanic membrane area.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-30',
    question: 'What is the proper technique for cleaning an otoscope speculum?',
    options: [
      'Simple wipe with an alcohol swab between patients',
      'Rinse with water after each use',
      'Disinfect according to manufacturer guidelines or use disposable specula',
      'Autoclave after each patient'
    ],
    correctOption: 'c',
    explanation: 'Otoscope specula should be properly disinfected according to manufacturer guidelines between patients, or disposable specula should be used to prevent cross-contamination.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-31',
    question: 'What does exostosis in the ear canal look like during otoscopy?',
    options: [
      'Red, inflamed tissue',
      'White, bony protrusions from the canal wall',
      'Black, fungal growth',
      'Yellow, waxy buildup'
    ],
    correctOption: 'b',
    explanation: 'Exostoses appear as multiple white, bony protrusions from the ear canal wall, often resulting from chronic cold water exposure (swimmer\'s ear).',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-32',
    question: 'What is the significance of visualizing the promontory through a tympanic membrane?',
    options: [
      'It indicates a normal finding',
      'It suggests a tympanic membrane perforation',
      'It indicates abnormal transparency of the tympanic membrane',
      'It suggests middle ear effusion'
    ],
    correctOption: 'b',
    explanation: 'The promontory (a bulge in the medial wall of the middle ear) should not be visible through an intact tympanic membrane. Visualizing it suggests a perforation.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-33',
    question: 'What might cause the tympanic membrane to appear dull and opaque rather than translucent?',
    options: [
      'Normal anatomical variation',
      'Excessive illumination from the otoscope',
      'Previous middle ear infections or scarring',
      'Recent airplane travel'
    ],
    correctOption: 'c',
    explanation: 'A dull, opaque appearance of the tympanic membrane often results from scarring due to previous middle ear infections (otitis media) or other inflammatory processes.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-34',
    question: 'At what point during otoscopic examination should you establish proper bracing?',
    options: [
      'Only if the patient seems restless or anxious',
      'After inserting the speculum into the ear canal',
      'Before any tool enters the ear canal',
      'Only when examining children'
    ],
    correctOption: 'c',
    explanation: 'Proper bracing should be established before any tool enters the ear canal. This safety-critical step creates a stable unit between the examiner and patient, preventing sudden movements from causing injury to the ear canal or tympanic membrane.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-35',
    question: 'What is the "brace brace roll" technique in otoscopy?',
    options: [
      'A method of rolling the otoscope between fingers during examination',
      'A sequence where you brace your hand on the patient\'s face, brace the otoscope against your hand, then roll the otoscope for proper angle',
      'A technique for removing cerumen by rolling it out',
      'A method of cleaning the speculum before examination'
    ],
    correctOption: 'b',
    explanation: 'The "brace brace roll" technique involves first bracing your hand securely on the patient\'s face (typically the cheek area), then bracing the otoscope against that braced hand to create a stable unit, and finally rolling or pivoting the otoscope to achieve the proper viewing angle while maintaining stability.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-36',
    question: 'What is the "bridge technique" for bracing during otoscopy?',
    options: [
      'Creating a bridge with fingers between the otoscope and the patient\'s face',
      'Resting your hand across the bridge of the patient\'s nose',
      'Using the 4th and 5th fingers to create a stable bridge on the patient\'s face while holding the otoscope',
      'Linking hands with an assistant to create a stable platform'
    ],
    correctOption: 'c',
    explanation: 'The "bridge technique" involves using the 4th and 5th fingers (or ulnar side) of your dominant hand to create a stable bridge or contact point on the patient\'s face while holding the otoscope. This creates stability while allowing the first three fingers to control the otoscope precisely.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-37',
    question: 'Why is proper bracing considered a safety-critical step in otoscopic examination?',
    options: [
      'It only helps with examiner comfort and is not safety-related',
      'It prevents patient discomfort but has no safety implications',
      'It prevents accidental injury to the ear canal and tympanic membrane if the patient moves unexpectedly',
      'It is only important for documentation purposes'
    ],
    correctOption: 'c',
    explanation: 'Proper bracing is a safety-critical step because it prevents accidental injury to the ear canal and tympanic membrane if the patient moves unexpectedly. Without proper bracing, sudden movements could cause the speculum to jab into sensitive ear structures, potentially causing significant trauma.',
    category: CATEGORIES.OTOSCOPY
  },
  {
    id: 'otoscopy-38',
    question: 'Which statement best describes the correct sequence for performing safe otoscopy?',
    options: [
      'Insert speculum, brace hand, pull pinna, visualize structures',
      'Pull pinna, insert speculum, brace hand, visualize structures',
      'Brace hand, pull pinna, insert speculum, visualize structures',
      'Visualize ear canal entrance, brace hand, pull pinna, insert speculum'
    ],
    correctOption: 'c',
    explanation: 'The correct sequence for safe otoscopy is: first establish proper bracing, then pull the pinna to straighten the ear canal, then carefully insert the speculum, and finally visualize the structures. This sequence ensures stability and safety before any instrument enters the ear canal.',
    category: CATEGORIES.OTOSCOPY
  }
]; 