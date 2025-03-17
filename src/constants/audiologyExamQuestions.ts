// Define question interface
export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctOption: string;
  explanation: string;
  category: string;
}

// Categories
export const CATEGORIES = {
  OTOSCOPY: 'Otoscopy',
  PATHOLOGIES: 'Common Ear Pathologies',
  HEARING_TESTS: 'Hearing Tests',
  HEARING_AIDS: 'Hearing Aid Fitting & REM',
  TROUBLESHOOTING: 'Troubleshooting',
  FOLLOW_UP: 'Follow-up Appointments'
};

// Otoscopy questions
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
      '4mm',
      '7mm',
      '10mm'
    ],
    correctOption: 'b',
    explanation: 'A 4mm speculum is typically appropriate for average adult ear canals, providing adequate visualization without discomfort.',
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
      'Anteroiorsuperior',
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
  }
];

// Common Ear Pathologies questions
export const pathologyQuestions: ExamQuestion[] = [
  {
    id: 'pathology-1',
    question: 'Which condition is characterized by abnormal bone growth around the stapes footplate?',
    options: [
      'Otitis media',
      'Otosclerosis',
      'Ménière\'s disease',
      'Acoustic neuroma'
    ],
    correctOption: 'b',
    explanation: 'Otosclerosis is characterized by abnormal bone growth (remodeling) around the stapes footplate, leading to fixation of the stapes and conductive hearing loss.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-2',
    question: 'What type of hearing loss is most commonly associated with presbycusis?',
    options: [
      'Low-frequency conductive loss',
      'Flat conductive loss',
      'High-frequency sensorineural loss',
      'Fluctuating mixed hearing loss'
    ],
    correctOption: 'c',
    explanation: 'Presbycusis (age-related hearing loss) typically presents as a high-frequency sensorineural hearing loss due to hair cell degeneration in the basal region of the cochlea.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-3',
    question: 'Which symptom is NOT typically associated with Ménière\'s disease?',
    options: [
      'Fluctuating hearing loss',
      'Vertigo',
      'Facial paralysis',
      'Tinnitus'
    ],
    correctOption: 'c',
    explanation: 'Facial paralysis is not a symptom of Ménière\'s disease. The classic triad includes fluctuating hearing loss, episodic vertigo, and tinnitus, often with aural fullness.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-4',
    question: 'What is the most common cause of conductive hearing loss in children?',
    options: [
      'Otosclerosis',
      'Cholesteatoma',
      'Otitis media with effusion',
      'Ossicular discontinuity'
    ],
    correctOption: 'c',
    explanation: 'Otitis media with effusion (fluid in the middle ear) is the most common cause of conductive hearing loss in children, often following upper respiratory infections.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-5',
    question: 'Which of the following conditions is characterized by abnormal skin growth in the middle ear or mastoid?',
    options: [
      'Otitis externa',
      'Cholesteatoma',
      'Otosclerosis',
      'Presbycusis'
    ],
    correctOption: 'b',
    explanation: 'Cholesteatoma is an abnormal skin growth (keratinizing squamous epithelium) in the middle ear or mastoid that can erode surrounding structures.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-6',
    question: 'What pattern of hearing loss would you expect with noise-induced hearing loss?',
    options: [
      'Flat conductive loss',
      'Rising sensorineural loss',
      'Notched sensorineural loss around 4000 Hz',
      'Cookie-bite (mid-frequency) sensorineural loss'
    ],
    correctOption: 'c',
    explanation: 'Noise-induced hearing loss typically presents with a notched sensorineural loss around 4000 Hz (3000-6000 Hz region), reflecting the region of the cochlea most susceptible to noise damage.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-7',
    question: 'Which of the following is NOT a common cause of sudden sensorineural hearing loss?',
    options: [
      'Viral infection',
      'Vascular occlusion',
      'Cerumen impaction',
      'Acoustic neuroma'
    ],
    correctOption: 'c',
    explanation: 'Cerumen impaction causes conductive (not sensorineural) hearing loss. Common causes of sudden sensorineural hearing loss include viral infections, vascular occlusions, and less commonly, acoustic neuromas.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-8',
    question: 'What is the characteristic audiometric configuration for a patient with a vestibular schwannoma (acoustic neuroma)?',
    options: [
      'Bilateral symmetrical high-frequency loss',
      'Unilateral retrocochlear pattern with poor word recognition',
      'Bilateral cookie-bite configuration',
      'Unilateral rising (reverse slope) configuration'
    ],
    correctOption: 'b',
    explanation: 'Vestibular schwannomas typically present with unilateral sensorineural hearing loss with disproportionately poor word recognition scores compared to pure tone thresholds, and often abnormal acoustic reflex patterns.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-9',
    question: 'Which of the following is a classic symptom triad of Ménière\'s disease?',
    options: [
      'Tinnitus, otalgia, and hearing loss',
      'Vertigo, aural fullness, and facial paralysis',
      'Fluctuating hearing loss, episodic vertigo, and tinnitus',
      'Hearing loss, otorrhea, and headache'
    ],
    correctOption: 'c',
    explanation: 'The classic symptom triad for Ménière\'s disease is fluctuating sensorineural hearing loss, episodic vertigo, and tinnitus, often with aural fullness as a fourth symptom.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-10',
    question: 'What is ototoxicity?',
    options: [
      'Inflammation of the outer ear',
      'Damage to the inner ear or auditory nerve from certain medications',
      'Toxic buildup of cerumen in the ear canal',
      'Bacterial infection of the middle ear'
    ],
    correctOption: 'b',
    explanation: 'Ototoxicity refers to damage to the inner ear or auditory nerve from medications or chemicals, resulting in hearing loss, tinnitus, or balance disorders.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-11',
    question: 'Which medication class is known to be potentially ototoxic?',
    options: [
      'Antihistamines',
      'Beta-blockers',
      'Aminoglycoside antibiotics',
      'Corticosteroids'
    ],
    correctOption: 'c',
    explanation: 'Aminoglycoside antibiotics (e.g., gentamicin, streptomycin) are well-known ototoxic agents that can cause permanent hearing loss by damaging cochlear hair cells.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-12',
    question: 'What is the primary audiometric finding in otosclerosis?',
    options: [
      'High-frequency sensorineural hearing loss',
      'Conductive hearing loss with a Carhart notch',
      'Cookie-bite sensorineural hearing loss',
      'Flat profound mixed hearing loss'
    ],
    correctOption: 'b',
    explanation: 'Otosclerosis typically presents with a conductive hearing loss and often shows a characteristic Carhart notch (a depression in bone conduction thresholds around 2000 Hz).',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-13',
    question: 'What pathology is characterized by endolymphatic hydrops?',
    options: [
      'Otosclerosis',
      'Acoustic neuroma',
      'Ménière\'s disease',
      'Otitis media'
    ],
    correctOption: 'c',
    explanation: 'Ménière\'s disease is characterized by endolymphatic hydrops, which is an excess of endolymph fluid in the inner ear.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-14',
    question: 'What audiometric pattern would you expect in a patient with auditory neuropathy spectrum disorder?',
    options: [
      'Normal otoacoustic emissions with abnormal ABR',
      'Absent otoacoustic emissions with normal ABR',
      'Bilateral high-frequency sensorineural hearing loss',
      'Bilateral conductive hearing loss'
    ],
    correctOption: 'a',
    explanation: 'Auditory neuropathy spectrum disorder is characterized by normal outer hair cell function (normal OAEs) but abnormal neural transmission (abnormal ABR), resulting in dyssynchrony of the auditory signal.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-15',
    question: 'Which structure is primarily affected in otitis externa?',
    options: [
      'Middle ear cavity',
      'External ear canal',
      'Inner ear',
      'Eustachian tube'
    ],
    correctOption: 'b',
    explanation: 'Otitis externa, also known as swimmer\'s ear, is an inflammation or infection of the external ear canal, often causing pain, itching, and discharge.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-16',
    question: 'What type of hearing loss is most commonly associated with a cholesteatoma?',
    options: [
      'Sensorineural hearing loss',
      'Conductive hearing loss',
      'Mixed hearing loss',
      'Central hearing loss'
    ],
    correctOption: 'b',
    explanation: 'Cholesteatomas initially cause conductive hearing loss due to disruption of ossicular chain function, though they can progress to mixed or sensorineural loss if they erode into the inner ear.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-17',
    question: 'What is a common cause of congenital sensorineural hearing loss?',
    options: [
      'Maternal otosclerosis',
      'Congenital cholesteatoma',
      'Cytomegalovirus (CMV) infection',
      'Maternal antibiotic use'
    ],
    correctOption: 'c',
    explanation: 'Cytomegalovirus (CMV) infection is a leading cause of congenital sensorineural hearing loss, affecting approximately 1 in 5 children with congenital CMV.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-18',
    question: 'Which test is most useful in diagnosing acoustic reflexes in patients with suspected retrocochlear pathology?',
    options: [
      'Pure tone audiometry',
      'Speech discrimination testing',
      'Acoustic reflex decay test',
      'Tympanometry'
    ],
    correctOption: 'c',
    explanation: 'The acoustic reflex decay test is particularly useful for identifying retrocochlear pathologies, as abnormal decay (inability to maintain the reflex) suggests a retrocochlear lesion.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-19',
    question: 'What is the most common type of tinnitus?',
    options: [
      'Pulsatile tinnitus',
      'Low-frequency roaring',
      'High-pitched ringing',
      'Clicking or crackling'
    ],
    correctOption: 'c',
    explanation: 'High-pitched ringing or hissing is the most common form of tinnitus, often associated with high-frequency hearing loss and damage to the outer hair cells in the cochlea.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-20',
    question: 'Which syndrome is associated with progressive sensorineural hearing loss and retinitis pigmentosa?',
    options: [
      'Waardenburg syndrome',
      'Usher syndrome',
      'Pendred syndrome',
      'Alport syndrome'
    ],
    correctOption: 'b',
    explanation: 'Usher syndrome is characterized by congenital sensorineural hearing loss and progressive retinitis pigmentosa leading to visual field loss and night blindness.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-21',
    question: 'What is the most likely cause of a unilateral conductive hearing loss with a visible perforation of the tympanic membrane?',
    options: [
      'Ménière\'s disease',
      'Otosclerosis',
      'Chronic otitis media',
      'Noise-induced hearing loss'
    ],
    correctOption: 'c',
    explanation: 'Chronic otitis media often results in tympanic membrane perforation and conductive hearing loss due to recurring middle ear infections and inflammation.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-22',
    question: 'What condition causes episodic vertigo with no associated hearing loss or tinnitus?',
    options: [
      'Ménière\'s disease',
      'Benign paroxysmal positional vertigo (BPPV)',
      'Acoustic neuroma',
      'Labyrinthitis'
    ],
    correctOption: 'b',
    explanation: 'BPPV causes brief episodes of vertigo triggered by head position changes, without hearing loss or tinnitus, due to otoconia displaced into the semicircular canals.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-23',
    question: 'What is the most common cause of bilateral symmetrical high-frequency sensorineural hearing loss in adults?',
    options: [
      'Noise exposure',
      'Age-related hearing loss (presbycusis)',
      'Ototoxicity',
      'Genetics'
    ],
    correctOption: 'b',
    explanation: 'Age-related hearing loss (presbycusis) is the most common cause of bilateral symmetrical high-frequency sensorineural hearing loss in adults, affecting most individuals as they age.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-24',
    question: 'What is a possible consequence of untreated cholesteatoma?',
    options: [
      'Tinnitus only',
      'Temporary conductive hearing loss',
      'Facial nerve paralysis or intracranial complications',
      'External ear canal infection'
    ],
    correctOption: 'c',
    explanation: 'Untreated cholesteatomas can erode surrounding structures, potentially causing facial nerve paralysis, labyrinthine fistula, or intracranial complications like meningitis or brain abscess.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-25',
    question: 'What is superior semicircular canal dehiscence syndrome?',
    options: [
      'Abnormal opening in the bone covering the superior semicircular canal',
      'Displacement of otoconia in the semicircular canal',
      'Infection of the semicircular canals',
      'Rupture of the round window membrane'
    ],
    correctOption: 'a',
    explanation: 'Superior semicircular canal dehiscence syndrome is caused by an abnormal opening (dehiscence) in the bone covering the superior semicircular canal, creating a "third window" effect.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-26',
    question: 'Which symptoms are characteristic of superior semicircular canal dehiscence?',
    options: [
      'Unilateral hearing loss and tinnitus only',
      'Autophony, sound- or pressure-induced vertigo, and conductive hyperacusis',
      'Bilateral profound hearing loss and balance problems',
      'Recurring ear infections with discharge'
    ],
    correctOption: 'b',
    explanation: 'Superior semicircular canal dehiscence typically presents with autophony (abnormally loud perception of one\'s own voice), sound- or pressure-induced vertigo (Tullio phenomenon), and conductive hyperacusis.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-27',
    question: 'What is the audiometric pattern typically seen in noise-induced hearing loss?',
    options: [
      'Flat sensorineural hearing loss',
      'Notched sensorineural loss around 4000 Hz',
      'Rising (reverse slope) sensorineural loss',
      'Bilateral asymmetric sensorineural loss'
    ],
    correctOption: 'b',
    explanation: 'Noise-induced hearing loss typically shows a notched pattern around 4000 Hz (3000-6000 Hz), reflecting the area of the cochlea most susceptible to noise damage.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-28',
    question: 'What is a common early symptom of an acoustic neuroma?',
    options: [
      'Bilateral tinnitus',
      'Unilateral tinnitus',
      'Fluctuating hearing loss',
      'Conductive hearing loss'
    ],
    correctOption: 'b',
    explanation: 'Unilateral tinnitus is often an early symptom of acoustic neuroma, along with unilateral progressive sensorineural hearing loss.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-29',
    question: 'Which condition is associated with fluctuating low-frequency sensorineural hearing loss?',
    options: [
      'Noise-induced hearing loss',
      'Acoustic neuroma',
      'Ménière\'s disease',
      'Otosclerosis'
    ],
    correctOption: 'c',
    explanation: 'Ménière\'s disease typically presents with fluctuating low-frequency sensorineural hearing loss in the early stages, often progressing to involve all frequencies over time.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-30',
    question: 'What is the most common type of hearing loss associated with ototoxic medications?',
    options: [
      'Conductive hearing loss',
      'Mixed hearing loss',
      'Bilateral high-frequency sensorineural hearing loss',
      'Unilateral profound hearing loss'
    ],
    correctOption: 'c',
    explanation: 'Ototoxic medications typically cause bilateral high-frequency sensorineural hearing loss, as outer hair cells in the basal turn of the cochlea (responding to high frequencies) are most susceptible to damage.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-31',
    question: 'Which condition involves hydrops of the endolymphatic system?',
    options: [
      'Otosclerosis',
      'Ménière\'s disease',
      'Otitis media',
      'Presbycusis'
    ],
    correctOption: 'b',
    explanation: 'Ménière\'s disease involves hydrops (swelling) of the endolymphatic system, with excessive fluid buildup in the inner ear membranous labyrinth.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-32',
    question: 'What is central auditory processing disorder (CAPD)?',
    options: [
      'Inner ear disorder affecting hair cells',
      'Middle ear condition with conductive loss',
      'Difficulty processing auditory information despite normal peripheral hearing',
      'Hereditary condition affecting the ossicles'
    ],
    correctOption: 'c',
    explanation: 'Central auditory processing disorder involves difficulty processing auditory information in the central auditory nervous system despite normal peripheral hearing sensitivity.',
    category: CATEGORIES.PATHOLOGIES
  },
  {
    id: 'pathology-33',
    question: 'Which condition is most likely to cause a sudden onset of unilateral sensorineural hearing loss with vertigo?',
    options: [
      'Presbycusis',
      'Otosclerosis',
      'Labyrinthitis or vestibular neuritis',
      'Noise-induced hearing loss'
    ],
    correctOption: 'c',
    explanation: 'Labyrinthitis (inflammation of the inner ear) can cause sudden onset unilateral sensorineural hearing loss with vertigo due to inflammation affecting both cochlear and vestibular function.',
    category: CATEGORIES.PATHOLOGIES
  }
];

// Hearing Tests questions
export const hearingTestQuestions: ExamQuestion[] = [
  {
    id: 'hearing-test-1',
    question: 'What is the Hughson-Westlake technique used for?',
    options: [
      'Taking case history',
      'Determining pure tone thresholds',
      'Measuring middle ear function',
      'Testing speech recognition'
    ],
    correctOption: 'b',
    explanation: 'The Hughson-Westlake technique is a standardized method for determining pure tone thresholds using an "up 5 dB, down 10 dB" approach.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-2',
    question: 'What is the standard starting level for pure tone audiometry in adults with unknown hearing status?',
    options: [
      '0 dB HL',
      '30 dB HL',
      '50 dB HL',
      '70 dB HL'
    ],
    correctOption: 'b',
    explanation: '30 dB HL is generally used as the starting level for adults with unknown hearing status, as it is likely to be audible for most patients without being uncomfortably loud.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-3',
    question: 'Which statement about the order of frequency testing in audiometry is correct?',
    options: [
      'Always test from lowest to highest frequency',
      'Always test from highest to lowest frequency',
      'Start at 1000 Hz, then higher frequencies, then lower frequencies',
      'The order doesn\'t matter as long as all frequencies are tested'
    ],
    correctOption: 'c',
    explanation: 'The standard protocol is to start at 1000 Hz (which is generally easier for patients to hear), then test higher frequencies (2000, 4000, 8000 Hz), then return to 1000 Hz as a reliability check, and then test lower frequencies (500, 250, 125 Hz).',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-4',
    question: 'What is the typical interoctave frequency tested if there is a 20 dB or greater difference between two adjacent octave frequencies?',
    options: [
      '750 Hz',
      '1500 Hz',
      '3000 Hz',
      'All of the above'
    ],
    correctOption: 'd',
    explanation: 'All of these are interoctave frequencies that would be tested if there is a 20 dB or greater difference between adjacent octave frequencies: 750 Hz (between 500 and 1000 Hz), 1500 Hz (between 1000 and 2000 Hz), 3000 Hz (between 2000 and 4000 Hz), and sometimes 6000 Hz (between 4000 and 8000 Hz).',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-5',
    question: 'When is masking required for air conduction testing?',
    options: [
      'For all patients',
      'Only when testing bone conduction',
      'When the difference between air conduction thresholds in test and non-test ears exceeds the interaural attenuation value',
      'Only for patients with bilateral hearing loss'
    ],
    correctOption: 'c',
    explanation: 'Masking is required for air conduction when the air conduction threshold in the test ear exceeds the non-test ear threshold by more than the interaural attenuation value, creating a risk that the non-test ear is actually responding.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-6',
    question: 'What is the typical interaural attenuation for supra-aural headphones for air conduction?',
    options: [
      '0 dB',
      '40-50 dB',
      '70-80 dB',
      '100 dB'
    ],
    correctOption: 'b',
    explanation: 'The typical interaural attenuation for supra-aural headphones is about 40-50 dB, meaning sound presented to one ear could cross over to the other ear if the signal exceeds this level.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-7',
    question: 'When is masking always required for bone conduction testing?',
    options: [
      'Only when testing the right ear',
      'Only when testing the left ear',
      'When air-bone gaps are present',
      'Whenever the non-test ear has better bone conduction thresholds than the test ear'
    ],
    correctOption: 'c',
    explanation: 'Masking is always required for bone conduction testing when air-bone gaps are present, as the vibrations from the bone conductor easily travel to the cochlea with better sensitivity.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-8',
    question: 'What is the plateau method in masking?',
    options: [
      'Increasing masking noise until the patient can no longer hear the test signal',
      'Adding masking noise at a constant level throughout testing',
      'Increasing masking noise until the threshold in the test ear no longer shifts, indicating effective masking',
      'Using masking only at the plateau frequencies (2000-4000 Hz)'
    ],
    correctOption: 'c',
    explanation: 'The plateau method involves increasing the masking noise level in the non-test ear until the threshold in the test ear stabilizes (reaches a plateau), indicating effective masking without overmasking.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-9',
    question: 'What is the formula for determining the minimum masking level for air conduction?',
    options: [
      'Test ear air conduction threshold + 10 dB',
      'Non-test ear air conduction threshold + 10 dB',
      'Non-test ear bone conduction threshold + masking noise attenuation factor',
      'Test ear bone conduction threshold + interaural attenuation'
    ],
    correctOption: 'b',
    explanation: 'The minimum effective masking level for air conduction is the non-test ear\'s air conduction threshold plus 10 dB (to account for the occlusion effect and ensure the masking noise is above threshold).',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-10',
    question: 'What is the occlusion effect?',
    options: [
      'Improvement in air conduction thresholds when the ear canal is occluded',
      'Improvement in bone conduction thresholds at low frequencies when the ear canal is occluded',
      'Worsening of air conduction thresholds when masking is applied',
      'Improvement in speech reception thresholds when using insert earphones'
    ],
    correctOption: 'b',
    explanation: 'The occlusion effect is an improvement in bone conduction thresholds at low frequencies (typically below 1000 Hz) when the ear canal is occluded, due to trapped sound energy.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-11',
    question: 'What is the appropriate masking noise for pure tone audiometry?',
    options: [
      'White noise',
      'Speech-shaped noise',
      'Narrowband noise centered around the test frequency',
      'Pink noise'
    ],
    correctOption: 'c',
    explanation: 'Narrowband noise centered around the test frequency is most appropriate for pure tone audiometry, as it provides maximum masking effect for the frequency being tested.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-12',
    question: 'What is the purpose of speech reception threshold (SRT) testing?',
    options: [
      'To determine the patient\'s ability to recognize speech',
      'To determine the softest level at which a patient can recognize speech 50% of the time',
      'To assess central auditory processing ability',
      'To measure speech discrimination in noise'
    ],
    correctOption: 'b',
    explanation: 'The speech reception threshold (SRT) is the softest level at which a patient can recognize speech 50% of the time, typically tested using spondee words.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-13',
    question: 'What is the relationship between the pure tone average (PTA) and speech reception threshold (SRT) in most cases?',
    options: [
      'SRT should be approximately equal to the PTA (within ±5 dB)',
      'SRT should be at least 20 dB better than the PTA',
      'SRT should be at least 20 dB worse than the PTA',
      'There is no reliable relationship between SRT and PTA'
    ],
    correctOption: 'a',
    explanation: 'In most cases of sensorineural or conductive hearing loss, the SRT should be within ±5 dB of the pure tone average (typically of 500, 1000, and 2000 Hz), serving as a reliability check.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-14',
    question: 'What is most commonly used for word recognition testing in English?',
    options: [
      'CNC word lists',
      'Spondee word lists',
      'NU-6 or W-22 phonetically balanced word lists',
      'HINT sentences'
    ],
    correctOption: 'c',
    explanation: 'NU-6 (Northwestern University Auditory Test No. 6) or W-22 (CID W-22) phonetically balanced word lists are most commonly used for word recognition testing in clinical settings.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-15',
    question: 'At what level is word recognition testing typically performed?',
    options: [
      'At the patient\'s SRT',
      '20 dB above the patient\'s SRT',
      '40 dB above the patient\'s SRT or at MCL',
      'At 90 dB HL for all patients'
    ],
    correctOption: 'c',
    explanation: 'Word recognition testing is typically performed at 40 dB above the patient\'s SRT or at the patient\'s most comfortable listening level (MCL) to ensure audibility.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-16',
    question: 'What is tympanometry used to assess?',
    options: [
      'Cochlear function',
      'Auditory nerve function',
      'Middle ear function',
      'Central auditory processing'
    ],
    correctOption: 'c',
    explanation: 'Tympanometry measures middle ear function by assessing the mobility of the tympanic membrane and middle ear system in response to pressure changes.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-17',
    question: 'What does a Type A tympanogram indicate?',
    options: [
      'Middle ear effusion',
      'Tympanic membrane perforation',
      'Normal middle ear function',
      'Eustachian tube dysfunction'
    ],
    correctOption: 'c',
    explanation: 'A Type A tympanogram, with peak compliance near ambient pressure, indicates normal middle ear function with proper mobility of the tympanic membrane.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-18',
    question: 'What does a Type B flat tympanogram typically indicate?',
    options: [
      'Normal middle ear function',
      'Middle ear effusion or tympanic membrane perforation',
      'Negative middle ear pressure',
      'Ossicular discontinuity'
    ],
    correctOption: 'b',
    explanation: 'A Type B flat tympanogram typically indicates middle ear effusion (fluid) or tympanic membrane perforation, both of which prevent normal tympanic membrane mobility.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-19',
    question: 'What does a Type C tympanogram indicate?',
    options: [
      'Normal middle ear function',
      'Middle ear effusion',
      'Negative middle ear pressure (Eustachian tube dysfunction)',
      'Tympanic membrane perforation'
    ],
    correctOption: 'c',
    explanation: 'A Type C tympanogram, with peak compliance at a negative pressure, indicates negative middle ear pressure, often due to Eustachian tube dysfunction.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-20',
    question: 'What is the purpose of acoustic reflex testing?',
    options: [
      'To measure middle ear muscle contractions in response to loud sounds',
      'To assess cochlear outer hair cell function',
      'To measure otoacoustic emissions',
      'To determine pure tone thresholds'
    ],
    correctOption: 'a',
    explanation: 'Acoustic reflex testing measures the contraction of the stapedius muscle in response to loud sounds (typically 70-100 dB HL), which stiffens the ossicular chain and provides information about the auditory pathway.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-21',
    question: 'What is the purpose of otoacoustic emissions (OAE) testing?',
    options: [
      'To measure middle ear function',
      'To assess cochlear outer hair cell function',
      'To determine auditory nerve function',
      'To measure central auditory processing'
    ],
    correctOption: 'b',
    explanation: 'Otoacoustic emissions testing assesses cochlear outer hair cell function by measuring the sounds generated by these cells in response to stimulation.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-22',
    question: 'Which type of OAE is most commonly used for newborn hearing screening?',
    options: [
      'Spontaneous OAEs (SOAEs)',
      'Transient Evoked OAEs (TEOAEs)',
      'Distortion Product OAEs (DPOAEs)',
      'Sustained Frequency OAEs (SFOAEs)'
    ],
    correctOption: 'b',
    explanation: 'Transient Evoked OAEs (TEOAEs) are most commonly used for newborn hearing screening due to their quick administration time and effectiveness in identifying cochlear dysfunction.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-23',
    question: 'What is the primary purpose of Auditory Brainstem Response (ABR) testing?',
    options: [
      'To assess middle ear function',
      'To determine pure tone thresholds',
      'To assess the integrity of the auditory pathway from the auditory nerve to the brainstem',
      'To measure speech recognition ability'
    ],
    correctOption: 'c',
    explanation: 'ABR testing assesses the integrity of the auditory pathway from the auditory nerve (Wave I) through the brainstem (Waves III and V), detecting neurological abnormalities.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-24',
    question: 'What is the typical calibration check procedure for audiometers?',
    options: [
      'Biological calibration only',
      'Electronic calibration only',
      'Both biological and listening checks daily, electroacoustic calibration annually',
      'No regular calibration needed'
    ],
    correctOption: 'c',
    explanation: 'Audiometers require daily biological listening checks (by a person with known hearing thresholds) and annual comprehensive electroacoustic calibration to ensure accuracy.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-25',
    question: 'What is the purpose of a biological listening check?',
    options: [
      'To calibrate the audiometer electronically',
      'To verify that the equipment is functioning properly by listening to the signals',
      'To establish normal hearing thresholds',
      'To verify acoustic reflex measurements'
    ],
    correctOption: 'b',
    explanation: 'A biological listening check involves a person with known normal hearing thresholds listening to the signals produced by the audiometer to verify that the equipment is functioning properly.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-26',
    question: 'What is the Stenger test used for?',
    options: [
      'Detecting cochlear dead regions',
      'Assessing central auditory processing',
      'Identifying non-organic hearing loss',
      'Determining bone conduction thresholds'
    ],
    correctOption: 'c',
    explanation: 'The Stenger test is used to identify non-organic (functional or exaggerated) hearing loss by presenting tones simultaneously to both ears and utilizing the principle that a louder tone in one ear will mask awareness of the tone in the opposite ear.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-27',
    question: 'What is the Modified Hughson-Westlake procedure for determining threshold?',
    options: [
      'Decreasing by 10 dB after each response, increasing by 5 dB after no response',
      'Decreasing by 5 dB after each response, increasing by 10 dB after no response',
      'Decreasing by 15 dB after each response, increasing by 5 dB after no response',
      'Decreasing by 5 dB after each response, increasing by 15 dB after no response'
    ],
    correctOption: 'b',
    explanation: 'The Modified Hughson-Westlake procedure decreases intensity by 5 dB after each response and increases by 10 dB after no response, with threshold defined as the lowest level at which responses occur at least 50% of the time.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-28',
    question: 'What does a rollover in word recognition scores indicate?',
    options: [
      'Normal cochlear function',
      'Conductive hearing loss',
      'Retrocochlear pathology',
      'Central auditory processing disorder'
    ],
    correctOption: 'c',
    explanation: 'Rollover in word recognition scores (decreased scores at higher intensity levels after initial improvement) suggests retrocochlear pathology, such as an acoustic neuroma.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-29',
    question: 'What does an absent acoustic reflex suggest?',
    options: [
      'Always indicates hearing loss greater than 80 dB HL',
      'Could indicate conductive hearing loss, significant sensorineural loss, or neural pathology',
      'Always indicates normal middle ear function',
      'Always indicates central auditory processing disorder'
    ],
    correctOption: 'b',
    explanation: 'Absent acoustic reflexes could indicate conductive hearing loss (preventing the signal or the reflex), sensorineural hearing loss greater than approximately 80 dB HL, or neural pathology affecting the reflex arc.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-30',
    question: 'What is the primary advantage of insert earphones over supra-aural headphones?',
    options: [
      'They provide better bass response',
      'They are more comfortable for all patients',
      'They reduce the risk of collapsing ear canals',
      'They increase interaural attenuation, reducing the need for masking'
    ],
    correctOption: 'd',
    explanation: 'Insert earphones increase interaural attenuation (to approximately 70-80 dB) compared to supra-aural headphones (40-50 dB), reducing the need for masking in many cases.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-31',
    question: 'What is the purpose of the Quick SIN test?',
    options: [
      'To measure speech understanding in noise',
      'To quickly assess pure tone thresholds',
      'To determine most comfortable listening level',
      'To screen for middle ear disorders'
    ],
    correctOption: 'a',
    explanation: 'The Quick Speech-in-Noise (Quick SIN) test measures a patient\'s ability to understand speech in background noise, providing a Signal-to-Noise Ratio Loss value that quantifies this ability.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-32',
    question: 'What is an appropriate symbol for an unmasked bone conduction threshold for the right ear on an audiogram?',
    options: [
      'Red O',
      'Red <',
      'Red [',
      'Blue <'
    ],
    correctOption: 'b',
    explanation: 'An unmasked bone conduction threshold for the right ear is typically marked with a red "<" symbol on an audiogram, where red represents the right ear and "<" represents unmasked bone conduction.',
    category: CATEGORIES.HEARING_TESTS
  },
  {
    id: 'hearing-test-33',
    question: 'Which of the following is a characteristic of noise-induced hearing loss on an audiogram?',
    options: [
      'Bilateral flat loss',
      'Unilateral rising configuration',
      'Bilateral notched configuration around 4000 Hz',
      'Cookie-bite configuration'
    ],
    correctOption: 'c',
    explanation: 'Noise-induced hearing loss typically shows a bilateral notched configuration around 4000 Hz on an audiogram, reflecting the area of the cochlea most susceptible to noise damage.',
    category: CATEGORIES.HEARING_TESTS
  }
];

// Hearing Aid Fitting & REM questions
export const hearingAidQuestions: ExamQuestion[] = [
  {
    id: 'hearing-aid-1',
    question: 'What is the primary goal of a hearing aid fitting?',
    options: [
      'To make all sounds equally loud',
      'To restore normal hearing thresholds',
      'To make speech audible, comfortable, and clear without discomfort for loud sounds',
      'To eliminate background noise completely'
    ],
    correctOption: 'c',
    explanation: 'The primary goal of a hearing aid fitting is to make speech audible, comfortable, and clear while ensuring loud sounds are not uncomfortable, not to perfectly restore normal hearing.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-2',
    question: 'What are real-ear measurements used for in hearing aid fittings?',
    options: [
      'To verify the actual acoustic output of the hearing aid in the patient\'s ear',
      'To measure the patient\'s real reaction time to sounds',
      'To determine if the patient really needs a hearing aid',
      'To verify battery life in real-world conditions'
    ],
    correctOption: 'a',
    explanation: 'Real-ear measurements verify the actual acoustic output of the hearing aid in the patient\'s ear canal, accounting for individual ear canal acoustics that cannot be predicted by hearing aid software alone.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-3',
    question: 'What is the Real Ear Unaided Response (REUR)?',
    options: [
      'The sound pressure level in the ear canal with a functioning hearing aid',
      'The sound pressure level in the ear canal without a hearing aid',
      'The difference between aided and unaided measurements',
      'The target amplification for a hearing aid'
    ],
    correctOption: 'b',
    explanation: 'The Real Ear Unaided Response (REUR) is the sound pressure level measured in the ear canal without a hearing aid, showing the natural resonance characteristics of the individual\'s ear.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-4',
    question: 'What is the Real Ear Aided Response (REAR)?',
    options: [
      'The sound pressure level in the ear canal with a functioning hearing aid',
      'The sound pressure level in the ear canal without a hearing aid',
      'The difference between aided and unaided measurements',
      'The natural resonance of the ear canal'
    ],
    correctOption: 'a',
    explanation: 'The Real Ear Aided Response (REAR) is the sound pressure level measured in the ear canal with a functioning hearing aid in place, showing the actual amplification provided to the patient.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-5',
    question: 'What is the Real Ear Insertion Gain (REIG)?',
    options: [
      'The difference between REAR and REUR',
      'The gain programmed into the hearing aid',
      'The maximum possible gain of a hearing aid',
      'The sound level at the eardrum'
    ],
    correctOption: 'a',
    explanation: 'The Real Ear Insertion Gain (REIG) is the difference between the Real Ear Aided Response (REAR) and the Real Ear Unaided Response (REUR), representing the actual gain provided by the hearing aid.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-6',
    question: 'What is the purpose of measuring the Real Ear Occluded Response (REOR)?',
    options: [
      'To determine how much a hearing aid occludes the ear canal',
      'To measure the effect of the hearing aid or earmold in the ear canal with the hearing aid turned off',
      'To measure maximum output of the hearing aid',
      'To determine the need for venting in an earmold'
    ],
    correctOption: 'b',
    explanation: 'The Real Ear Occluded Response (REOR) measures the sound pressure level in the ear canal with the hearing aid or earmold in place but turned off, showing the occlusion effect that may require venting.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-7',
    question: 'Which prescription formula is most commonly used for fitting hearing aids to adults?',
    options: [
      'NAL-NL2',
      'DSL v5.0',
      'POGO II',
      'FIG6'
    ],
    correctOption: 'a',
    explanation: 'NAL-NL2 (National Acoustic Laboratories - Non-Linear, version 2) is the most commonly used prescription formula for fitting hearing aids to adults, designed to maximize speech intelligibility while maintaining comfort.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-8',
    question: 'Which prescription formula is commonly used for fitting hearing aids to pediatric patients?',
    options: [
      'NAL-NL2',
      'DSL v5.0',
      'POGO',
      'FIG6'
    ],
    correctOption: 'b',
    explanation: 'DSL v5.0 (Desired Sensation Level) is commonly used for pediatric fittings, as it aims to make a broad range of speech sounds audible to support language development.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-9',
    question: 'What is the purpose of verifying MPO (Maximum Power Output) during a hearing aid fitting?',
    options: [
      'To ensure the hearing aid can be loud enough for very soft sounds',
      'To verify that loud sounds will not be uncomfortably loud',
      'To maximize battery life',
      'To determine if the patient needs a more powerful hearing aid'
    ],
    correctOption: 'b',
    explanation: 'Verifying MPO ensures that the maximum output of the hearing aid will not exceed the patient\'s uncomfortable loudness level, preventing discomfort or potential damage from excessive amplification.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-10',
    question: 'What happens to the natural resonance of the ear canal when a hearing aid or earmold is inserted?',
    options: [
      'It increases at all frequencies',
      'It decreases at all frequencies',
      'It is typically reduced, especially around 2700 Hz',
      'It remains unchanged'
    ],
    correctOption: 'c',
    explanation: 'Inserting a hearing aid or earmold typically reduces the natural resonance of the ear canal, especially around 2700 Hz where the ear canal naturally provides amplification, often requiring compensation in the hearing aid fitting.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-11',
    question: 'What is the occlusion effect in hearing aid fittings?',
    options: [
      'Difficulty inserting the hearing aid properly',
      'The perception of the patient\'s own voice as hollow or boomy when the ear canal is occluded',
      'Reduced high-frequency amplification due to feedback',
      'Inability to hear environmental sounds'
    ],
    correctOption: 'b',
    explanation: 'The occlusion effect occurs when the ear canal is blocked by a hearing aid or earmold, causing the patient\'s own voice to sound hollow or boomy as bone-conducted sound energy is trapped in the occluded ear canal.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-12',
    question: 'How can the occlusion effect be reduced?',
    options: [
      'Using a smaller hearing aid',
      'Using a larger vent or open fitting, when appropriate',
      'Increasing the gain of the hearing aid',
      'Reducing the MPO of the hearing aid'
    ],
    correctOption: 'b',
    explanation: 'The occlusion effect can be reduced by using a larger vent or an open fitting (when appropriate for the hearing loss), allowing low-frequency bone-conducted sound to escape rather than being trapped in the ear canal.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-13',
    question: 'What is the main limitation of an open fitting hearing aid?',
    options: [
      'Battery life',
      'Limited low-frequency gain due to sound escaping through the open fit',
      'Device durability',
      'Compatibility with smartphones'
    ],
    correctOption: 'b',
    explanation: 'The main limitation of an open fitting is limited low-frequency gain, as amplified low-frequency sounds escape through the large vent or open fitting rather than reaching the eardrum.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-14',
    question: 'Which hearing loss configuration is most appropriate for an open fit hearing aid?',
    options: [
      'Flat moderate hearing loss',
      'Severe-to-profound hearing loss',
      'High-frequency hearing loss with normal or near-normal low-frequency hearing',
      'Reverse-slope hearing loss (better high frequencies, worse low frequencies)'
    ],
    correctOption: 'c',
    explanation: 'Open fit hearing aids are most appropriate for high-frequency hearing loss with normal or near-normal low-frequency hearing, as they preserve natural low-frequency sound while providing high-frequency amplification.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-15',
    question: 'What equipment is needed to perform real-ear measurements?',
    options: [
      'Otoscope and tympanometer',
      'Probe microphone, loudspeaker, and real-ear measurement system',
      'Hearing aid programmer and audiometer',
      'Video otoscope and hearing aid analyzer'
    ],
    correctOption: 'b',
    explanation: 'Real-ear measurements require a probe microphone system, including a probe tube microphone that can be placed in the ear canal, a calibrated loudspeaker, and a real-ear measurement system to analyze the results.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-16',
    question: 'Where should the probe tube be placed for accurate real-ear measurements in adults?',
    options: [
      'Just inside the ear canal entrance',
      'Approximately 5 mm from the eardrum',
      'Halfway into the ear canal',
      'Against the eardrum'
    ],
    correctOption: 'b',
    explanation: 'For accurate real-ear measurements in adults, the probe tube should be placed approximately 5 mm from the eardrum (within 5-6 mm from the tympanic membrane) to capture the true sound pressure level reaching the eardrum.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-17',
    question: 'What is the typical placement distance for a loudspeaker during real-ear measurements?',
    options: [
      '12 inches (30 cm)',
      '24 inches (60 cm)',
      '45 degrees at 12 inches',
      '0 degrees at 3 feet (90 cm) or 45 degrees at 1 foot (30 cm)'
    ],
    correctOption: 'd',
    explanation: 'The typical placement for real-ear measurement loudspeakers is either directly in front (0 degrees azimuth) at 3 feet (90 cm) or at 45 degrees at 1 foot (30 cm), based on ANSI standards for real-ear measurement.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-18',
    question: 'What is the difference between a "functional gain" measurement and a real-ear measurement?',
    options: [
      'They are two terms for the same measurement',
      'Functional gain uses warble tones while real-ear uses speech signals',
      'Functional gain is the difference between aided and unaided thresholds on an audiogram, while real-ear measures actual SPL in the ear canal',
      'Functional gain measures battery life, while real-ear measures acoustic output'
    ],
    correctOption: 'c',
    explanation: 'Functional gain is the difference between aided and unaided thresholds measured behaviorally using an audiometer, while real-ear measurements directly measure the actual sound pressure level in the ear canal using a probe microphone.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-19',
    question: 'Why are real-ear measurements preferred over simulated/predicted measurements from hearing aid software?',
    options: [
      'Real-ear measurements are faster to perform',
      'Real-ear measurements require less expensive equipment',
      'Real-ear measurements account for individual ear canal acoustics that cannot be predicted by software',
      'Simulated measurements are not available in most hearing aid software'
    ],
    correctOption: 'c',
    explanation: 'Real-ear measurements are preferred because they account for individual ear canal acoustics and the actual performance of the hearing aid in the patient\'s ear, which cannot be accurately predicted by software simulations.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-20',
    question: 'What is the purpose of the "First Fit" algorithm in hearing aid fitting software?',
    options: [
      'To provide the final settings that should not be adjusted',
      'To provide initial settings based on the audiogram and chosen prescription formula, which should be verified and adjusted',
      'To measure real-ear responses automatically without probe microphone equipment',
      'To determine if the patient is a good candidate for hearing aids'
    ],
    correctOption: 'b',
    explanation: 'The "First Fit" algorithm provides initial hearing aid settings based on the audiogram and chosen prescription formula, but these settings should be verified and adjusted based on real-ear measurements and patient feedback.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-21',
    question: 'What is the appropriate stimulus type for measuring the Real Ear Aided Response for verification?',
    options: [
      'Pure tones',
      'Broadband noise',
      'Speech-weighted composite signals or recorded speech',
      'Narrow band noise'
    ],
    correctOption: 'c',
    explanation: 'Speech-weighted composite signals (like the International Speech Test Signal) or recorded speech passages are the appropriate stimuli for measuring the Real Ear Aided Response, as they activate the hearing aid\'s signal processing in a way that represents real-world performance.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-22',
    question: 'What sound levels should be used to verify hearing aid performance with real-ear measurements?',
    options: [
      'Only normal conversational level (65 dB SPL)',
      'Only maximum output level (90 dB SPL)',
      'Multiple input levels, typically soft (50-55 dB SPL), average (65 dB SPL), and loud (75-80 dB SPL)',
      'Any level is acceptable as the hearing aid will adjust automatically'
    ],
    correctOption: 'c',
    explanation: 'Multiple input levels should be used to verify hearing aid performance: soft (50-55 dB SPL), average (65 dB SPL), and loud (75-80 dB SPL), to ensure appropriate gain and compression across the range of everyday listening situations.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-23',
    question: 'What is the recommended frequency of real-ear verification measurements for adult hearing aid users?',
    options: [
      'Only at the initial fitting',
      'At initial fitting and each time a program adjustment is made',
      'Annually',
      'Every three months'
    ],
    correctOption: 'b',
    explanation: 'Real-ear verification measurements should be performed at the initial fitting and each time significant programming adjustments are made to ensure the hearing aid is providing appropriate amplification.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-24',
    question: 'What should be checked before performing real-ear measurements?',
    options: [
      'Only the battery status of the hearing aid',
      'Only the hearing aid programming',
      'The ear canal should be examined for cerumen, the hearing aid functioning properly, and the probe tube placed correctly',
      'Only the loudspeaker placement'
    ],
    correctOption: 'c',
    explanation: 'Before performing real-ear measurements, the ear canal should be examined for cerumen (which can block the probe tube or hearing aid), the hearing aid should be functioning properly, and the probe tube should be placed correctly to ensure accurate measurements.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-25',
    question: 'What is the measurement for "headroom" in a hearing aid fitting?',
    options: [
      'The difference between the MPO and the patient\'s uncomfortable loudness level',
      'The physical space between the hearing aid and the ear canal wall',
      'The gain available for soft sounds',
      'The amount of venting in an earmold'
    ],
    correctOption: 'a',
    explanation: 'Headroom in a hearing aid fitting refers to the difference between the Maximum Power Output (MPO) and the patient\'s uncomfortable loudness level, ensuring that loud sounds will not exceed the patient\'s comfort level.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-26',
    question: 'What is the purpose of measuring Real Ear Saturation Response (RESR)?',
    options: [
      'To determine when the patient\'s ear canal is saturated with sound',
      'To verify that the maximum output of the hearing aid does not exceed uncomfortable levels',
      'To measure how quickly the hearing aid adapts to changes in input',
      'To determine if the hearing aid battery is fully charged'
    ],
    correctOption: 'b',
    explanation: 'The Real Ear Saturation Response (RESR) measures the maximum output of the hearing aid in the ear canal, which should be verified to ensure it does not exceed the patient\'s uncomfortable loudness levels.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-27',
    question: 'Which of the following best describes the appropriate gain for soft sounds in a well-fit hearing aid?',
    options: [
      'The same gain as for average sounds',
      'More gain than for average sounds',
      'Less gain than for average sounds',
      'No gain to avoid overamplification'
    ],
    correctOption: 'b',
    explanation: 'Appropriate gain for soft sounds should be greater than for average sounds, reflecting the non-linear compression needed to make soft sounds audible while keeping average and loud sounds comfortable.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-28',
    question: 'What is the Speech Intelligibility Index (SII) used for in hearing aid fittings?',
    options: [
      'To measure the patient\'s speech recognition ability',
      'To predict how intelligible speech will be based on the audibility provided by the hearing aid',
      'To determine the appropriate compression ratio',
      'To predict battery life during speech listening'
    ],
    correctOption: 'b',
    explanation: 'The Speech Intelligibility Index (SII) is used to predict how intelligible speech will be based on the audibility provided by the hearing aid across frequencies, helping to optimize the fitting for speech understanding.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-29',
    question: 'What is the main purpose of "test box" measurements for hearing aids?',
    options: [
      'To replace real-ear measurements',
      'To test the hearing aid in isolation to verify it is functioning according to specifications',
      'To determine the patient\'s preference for different hearing aid models',
      'To test the hearing aid\'s resistance to moisture'
    ],
    correctOption: 'b',
    explanation: 'Test box measurements are performed to verify that the hearing aid is functioning according to specifications in a controlled environment, but they do not replace real-ear measurements which account for individual ear acoustics.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-30',
    question: 'What is the ideal match between the measured Real Ear Aided Response (REAR) and the prescribed target?',
    options: [
      'The REAR should exceed the target by at least 10 dB at all frequencies',
      'The REAR should be within ±3-5 dB of the target across frequencies',
      'The REAR should be below the target to prevent discomfort',
      'There is no need to match to target if the patient reports satisfaction'
    ],
    correctOption: 'b',
    explanation: 'Ideally, the measured Real Ear Aided Response (REAR) should be within ±3-5 dB of the prescribed target across frequencies to ensure appropriate amplification based on the patient\'s hearing loss.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-31',
    question: 'What is the primary purpose of directional microphones in hearing aids?',
    options: [
      'To provide more gain for all sounds',
      'To improve battery life',
      'To improve the signal-to-noise ratio by reducing sounds from behind while emphasizing sounds from the front',
      'To eliminate the need for volume adjustments'
    ],
    correctOption: 'c',
    explanation: 'Directional microphones improve the signal-to-noise ratio by reducing sounds from behind and sides while emphasizing sounds from the front, helping users hear better in noisy environments.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-32',
    question: 'When measuring real-ear responses, what should be done about existing hearing aid features like noise reduction or directional microphones?',
    options: [
      'Always leave all features active to measure real-world benefit',
      'Disable adaptive features like noise reduction and directionality temporarily for consistent measurements',
      'Only disable noise reduction but leave directionality active',
      'Only measure with all features maximally active'
    ],
    correctOption: 'b',
    explanation: 'Adaptive features like noise reduction and directionality should be temporarily disabled during real-ear measurements to ensure consistent, repeatable measurements of the basic amplification provided by the hearing aid.',
    category: CATEGORIES.HEARING_AIDS
  },
  {
    id: 'hearing-aid-33',
    question: 'What is the Real Ear to Coupler Difference (RECD)?',
    options: [
      'The difference between how a hearing aid performs in a test box versus the real ear',
      'The difference between amplification needed for children versus adults',
      'The difference between real-ear measures with the patient\'s own hearing aid versus a loaner',
      'The directional microphone benefit measured in the real ear'
    ],
    correctOption: 'a',
    explanation: 'The Real Ear to Coupler Difference (RECD) is the difference between the sound pressure level measured in an individual\'s ear canal versus a standard 2cc coupler, used to predict real-ear performance from test box measurements.',
    category: CATEGORIES.HEARING_AIDS
  }
];

// Troubleshooting questions
export const troubleshootingQuestions: ExamQuestion[] = [
  {
    id: 'troubleshooting-1',
    question: 'A patient reports that their hearing aid is "dead." What should be your first troubleshooting step?',
    options: [
      'Send the hearing aid for repair',
      'Reprogram the hearing aid',
      'Check if the hearing aid is turned on and the battery is working',
      'Check for cerumen in the patient\'s ear'
    ],
    correctOption: 'c',
    explanation: 'The first troubleshooting step should be checking if the hearing aid is turned on and has a functioning battery, as these are the most common and easily resolved causes of a "dead" hearing aid.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-2',
    question: 'A patient reports hearing a whistling sound from their hearing aid. What is the most likely cause?',
    options: [
      'Dead battery',
      'Acoustic feedback',
      'Damaged microphone',
      'Excessive background noise'
    ],
    correctOption: 'b',
    explanation: 'Whistling from a hearing aid is typically caused by acoustic feedback, which occurs when amplified sound leaks out of the ear canal and is re-amplified by the hearing aid.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-3',
    question: 'What is often the cause of acoustic feedback in a hearing aid?',
    options: [
      'Volume set too low',
      'Poor fit of the earmold or shell, allowing sound to leak out',
      'Battery depletion',
      'Excessive cerumen in the microphone'
    ],
    correctOption: 'b',
    explanation: 'Acoustic feedback is often caused by a poor fit of the earmold or shell, creating a path for amplified sound to leak out of the ear canal and be re-amplified by the microphone.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-4',
    question: 'A patient reports intermittent sound from their hearing aid. What is a common cause?',
    options: [
      'Microphone always facing forward',
      'Battery door not fully closed or corroded battery contacts',
      'Volume set too high',
      'Normal adaptive features activating'
    ],
    correctOption: 'b',
    explanation: 'Intermittent sound from a hearing aid is often caused by a loose battery connection, which can result from a battery door not fully closed or corroded battery contacts that create an inconsistent electrical connection.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-5',
    question: 'A patient reports their hearing aid sounds muffled. What could be the cause?',
    options: [
      'Battery is too new',
      'Volume is set too high',
      'Blocked receiver or sound outlet by cerumen or moisture',
      'Feedback cancellation working too effectively'
    ],
    correctOption: 'c',
    explanation: 'A muffled sound quality is often caused by a blocked receiver or sound outlet, typically from cerumen (earwax) or moisture, which obstructs the sound path.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-6',
    question: 'What might cause a "static" or "crackling" sound in a hearing aid?',
    options: [
      'Loose battery connection',
      'Volume set too low',
      'Excessive gain at high frequencies',
      'Normal noise reduction function'
    ],
    correctOption: 'a',
    explanation: 'Static or crackling sounds in a hearing aid often indicate an intermittent electrical connection, commonly caused by a loose battery connection, corrosion on battery contacts, or internal wiring issues.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-7',
    question: 'A patient with a behind-the-ear (BTE) hearing aid reports no sound. The battery is good, but the hearing aid appears to be working (indicator light is on). What should you check next?',
    options: [
      'Reprogram the hearing aid immediately',
      'Check if the tubing/receiver is attached properly or if there is a blockage',
      'Replace the battery despite it testing as good',
      'Send the hearing aid for repair'
    ],
    correctOption: 'b',
    explanation: 'For a BTE hearing aid that appears to be working but produces no sound, check if the tubing or receiver wire is properly attached and free of blockages, as disconnected or obstructed sound delivery systems are common causes.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-8',
    question: 'A patient reports that their hearing aid battery lasts only a few days rather than the expected 1-2 weeks. What might be the cause?',
    options: [
      'Patient is not turning the hearing aid off when not in use',
      'Normal battery behavior',
      'Patient needs to use rechargeable batteries',
      'Hearing aid has too much gain'
    ],
    correctOption: 'a',
    explanation: 'Shortened battery life is often caused by the patient not turning off the hearing aid when not in use, leaving the battery door open at night, or possibly streaming audio for long periods if the hearing aid has wireless capabilities.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-9',
    question: 'A patient reports that their hearing aid is not loud enough. The battery and programming are fine. What should you check?',
    options: [
      'Increase the gain in all bands',
      'Recommend a more powerful hearing aid',
      'Check for cerumen blockage in the ear canal or hearing aid',
      'Increase the maximum power output'
    ],
    correctOption: 'c',
    explanation: 'When a hearing aid is not loud enough despite good battery and appropriate programming, check for cerumen blockage in the ear canal or hearing aid, as this can significantly reduce the sound reaching the eardrum.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-10',
    question: 'A patient reports discomfort when wearing their new custom hearing aid. What is the most appropriate first action?',
    options: [
      'Remake the hearing aid immediately',
      'Tell them they will adapt with time',
      'Examine the fit and have the patient identify the area of discomfort',
      'Reduce the overall gain'
    ],
    correctOption: 'c',
    explanation: 'When a patient reports physical discomfort with a new custom hearing aid, first examine the fit and have the patient identify the specific area of discomfort, which often can be addressed with minor shell modifications.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-11',
    question: 'A patient reports that sounds are distorted through their hearing aid. What could be the cause?',
    options: [
      'Low battery',
      'Normal hearing aid processing',
      'Cerumen in their ears',
      'All of the above could cause perceived distortion'
    ],
    correctOption: 'd',
    explanation: 'Sound distortion can be caused by multiple factors: low battery, cerumen in ears obstructing sound, damage to the hearing aid, or inappropriate programming settings. All should be systematically checked.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-12',
    question: 'A patient reports that their hearing aid "works sometimes." What is the most likely cause?',
    options: [
      'Intermittent electronic failure',
      'Poor battery contact or corroded battery terminals',
      'Patient not inserting the hearing aid correctly',
      'All of the above could cause intermittent function'
    ],
    correctOption: 'd',
    explanation: 'Intermittent hearing aid function can be caused by poor battery contacts, corroded terminals, improper insertion, moisture damage, or actual electronic failures. A systematic check of all possibilities is needed.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-13',
    question: 'A patient with a new hearing aid reports that their own voice sounds too loud or "boomy." What is this phenomenon called?',
    options: [
      'Feedback effect',
      'Occlusion effect',
      'Recruitment',
      'Autophony'
    ],
    correctOption: 'b',
    explanation: 'This is the occlusion effect, caused when the ear canal is occluded by a hearing aid or earmold, trapping bone-conducted sound energy from the patient\'s own voice in the ear canal, making it sound louder and more resonant.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-14',
    question: 'How can you address the occlusion effect in a hearing aid?',
    options: [
      'Increase the gain in the high frequencies',
      'Reduce the gain in all frequencies',
      'Add or enlarge venting in the earmold or shell, if appropriate for the hearing loss',
      'Disable the microphone when the patient is speaking'
    ],
    correctOption: 'c',
    explanation: 'The occlusion effect can be addressed by adding or enlarging venting in the earmold or shell, allowing bone-conducted sound energy to escape rather than being trapped (when appropriate for the hearing loss configuration).',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-15',
    question: 'A patient reports their hearing aid stops working when they use their cell phone. What could be causing this?',
    options: [
      'Electromagnetic interference',
      'The patient is accidentally pressing the volume button',
      'Normal adaptive features activating',
      'Automatic telephone program activating incorrectly'
    ],
    correctOption: 'a',
    explanation: 'Hearing aids, especially older models without sufficient shielding, may experience electromagnetic interference from cell phones, potentially causing the hearing aid to temporarily shut down or produce static or buzzing noises.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-16',
    question: 'A patient is experiencing feedback with their custom in-the-ear hearing aid, but the earmold appears to fit well. What else might cause this?',
    options: [
      'Cracked shell',
      'Patient inserted the hearing aid incorrectly',
      'Excessive cerumen in the ear canal',
      'All of the above could cause feedback despite a well-made earmold'
    ],
    correctOption: 'd',
    explanation: 'Feedback despite a well-made earmold can be caused by a cracked shell allowing sound to leak, incorrect insertion, or excessive cerumen causing sound to reflect back. All should be checked systematically.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-17',
    question: 'A patient reports that their hearing aid turns off by itself after a few minutes of use. What is a common cause?',
    options: [
      'Automatic power-saving feature',
      'Normal battery depletion',
      'Moisture in the battery compartment causing a short circuit',
      'Defective on/off switch'
    ],
    correctOption: 'c',
    explanation: 'A hearing aid turning off after brief use is often caused by moisture in the battery compartment creating a short circuit. This can happen from perspiration, humidity, or improper storage, and may resolve after thoroughly drying the device.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-18',
    question: 'What is the appropriate way to clean a behind-the-ear (BTE) hearing aid with standard tubing?',
    options: [
      'Submerge in mild soapy water overnight',
      'Use alcohol wipes on all parts of the hearing aid',
      'Remove the earmold from the hearing aid, clean the earmold separately, and wipe the hearing aid with a dry cloth',
      'Clean only when visibly dirty'
    ],
    correctOption: 'c',
    explanation: 'The proper way to clean a BTE hearing aid is to remove the earmold from the hook, clean the earmold separately (washing with mild soap and water, thoroughly drying), and wipe the hearing aid body with a dry cloth or specialized hearing aid wipes.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-19',
    question: 'A patient with a severe-to-profound hearing loss reports insufficient loudness despite maximum gain settings. What might be the appropriate solution?',
    options: [
      'Further increase the gain beyond recommended levels',
      'Suggest the patient try to adapt to the current settings',
      'Consider a more powerful hearing aid or different technology',
      'Increase the battery size'
    ],
    correctOption: 'c',
    explanation: 'When a patient with severe-to-profound hearing loss reports insufficient loudness at maximum settings, consider that the current hearing aid may not be powerful enough. A different, more powerful model or even different technology (like a cochlear implant for profound losses) might be needed.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-20',
    question: 'What should be done if a hearing aid gets wet?',
    options: [
      'Turn it on immediately to check if it still works',
      'Dry it with a hair dryer on high heat setting',
      'Remove the battery, leave battery door open, and use a hearing aid dehumidifier if available',
      'Submerge it in rice overnight'
    ],
    correctOption: 'c',
    explanation: 'If a hearing aid gets wet, immediately remove the battery, leave the battery door open to allow air circulation, and use a hearing aid dehumidifier or drying kit if available. Do not apply heat, which can damage components.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-21',
    question: 'A patient with a new RIC (receiver-in-canal) hearing aid reports no sound, but the battery is good. What should you check first?',
    options: [
      'The programming of the hearing aid',
      'If the correct dome size is being used',
      'If the wax guard is clogged or if the receiver is properly attached to the hearing aid',
      'The patient\'s ear canal for excessive cerumen'
    ],
    correctOption: 'c',
    explanation: 'For a RIC hearing aid with no sound, first check if the wax guard/filter is clogged with cerumen or if the receiver is properly attached to the hearing aid body, as these are common and easily resolved causes of sound obstruction.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-22',
    question: 'A patient with a new hearing aid reports difficulty hearing in noisy environments. What should you consider?',
    options: [
      'This is normal and unavoidable with hearing aids',
      'Check if directional microphones and noise reduction features are properly enabled',
      'Recommend they avoid noisy places',
      'Increase overall gain'
    ],
    correctOption: 'b',
    explanation: 'For difficulty in noise, check if directional microphones and noise reduction features are properly enabled and configured. Also ensure the patient has realistic expectations and proper strategies for communication in noise.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-23',
    question: 'A patient reports their rechargeable hearing aids are not lasting a full day. What could be the cause?',
    options: [
      'Rechargeable hearing aids never last a full day',
      'The charging contacts may be dirty or the batteries may be deteriorating',
      'The patient has the volume set too high',
      'The patient needs to purchase extra batteries'
    ],
    correctOption: 'b',
    explanation: 'Shortened battery life in rechargeable hearing aids may be due to dirty charging contacts preventing full charging, deteriorating rechargeable batteries (which have a limited lifespan), or extensive streaming which consumes more power.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-24',
    question: 'What should you do if a patient reports their hearing aid programming changed unexpectedly?',
    options: [
      'Assume they accidentally changed the program and reset it without investigation',
      'Tell them to adapt to the new settings',
      'Check if they have a multi-memory hearing aid and accidentally switched programs',
      'Immediately reprogram the hearing aid'
    ],
    correctOption: 'c',
    explanation: 'If programming appears to change unexpectedly, first check if the patient has a multi-memory hearing aid and accidentally switched programs using a button or remote control. This is a common and easily resolved issue.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-25',
    question: 'A patient reports their hearing aid volume keeps changing on its own. What might cause this?',
    options: [
      'Defective volume control',
      'Automatic adaptive features like noise reduction or directionality',
      'Battery depletion',
      'Improper programming'
    ],
    correctOption: 'b',
    explanation: 'Volume changes perceived as "automatic" are often the result of adaptive features like automatic noise reduction, directionality, or environment classification systems responding to changing acoustic environments.',
    category: CATEGORIES.TROUBLESHOOTING
  },
  {
    id: 'troubleshooting-26',
    question: 'What is the first step in troubleshooting a hearing aid that produces no sound?',
    options: [
      'Send it for repair',
      'Perform a listening check with a stethoscope or listening tube',
      'Replace the battery regardless of its status',
      'Reprogram the hearing aid'
    ],
    correctOption: 'b',
    explanation: 'The first step should be performing a listening check using a stethoscope or listening tube to determine if the hearing aid is producing any sound at all, which helps identify whether the issue is with sound generation or sound delivery.',
    category: CATEGORIES.TROUBLESHOOTING
  }
];

// Follow-up Appointments questions
export const followUpQuestions: ExamQuestion[] = [
  {
    id: 'follow-up-1',
    question: 'What is the purpose of follow-up appointments in hearing aid management?',
    options: [
      'To check the hearing aid performance',
      'To adjust the hearing aid settings',
      'To clean the hearing aid',
      'To check for any changes in the patient\'s hearing status'
    ],
    correctOption: 'd',
    explanation: 'Follow-up appointments are important to check for any changes in the patient\'s hearing status, as well as to adjust the hearing aid settings and clean the hearing aid.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-2',
    question: 'How often should a patient with hearing aids have a follow-up appointment?',
    options: [
      'Every 3 months',
      'Every 6 months',
      'Every 12 months',
      'As needed'
    ],
    correctOption: 'b',
    explanation: 'Patients with hearing aids should have follow-up appointments every 6 months to ensure proper fit and function, and to check for any changes in hearing status.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-3',
    question: 'What should be checked during a follow-up appointment?',
    options: [
      'Only the hearing aid battery',
      'The hearing aid, battery, and tubing',
      'The hearing aid, battery, tubing, and ear mold',
      'The hearing aid, battery, tubing, ear mold, and ear canal'
    ],
    correctOption: 'c',
    explanation: 'During a follow-up appointment, the hearing aid, battery, tubing, and ear mold should be checked to ensure proper fit and function.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-4',
    question: 'What is the importance of cleaning the hearing aid?',
    options: [
      'To prevent hearing aid malfunction',
      'To improve sound quality',
      'To prevent earwax buildup',
      'To maintain battery life'
    ],
    correctOption: 'c',
    explanation: 'Cleaning the hearing aid is important to prevent earwax buildup, which can affect sound quality and battery life.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-5',
    question: 'How should a hearing aid be cleaned?',
    options: [
      'Using a damp cloth',
      'Using a brush',
      'Using a hearing aid cleaning solution',
      'Rinsing with water'
    ],
    correctOption: 'c',
    explanation: 'Hearing aids should be cleaned using a hearing aid cleaning solution to remove earwax and maintain battery life.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-6',
    question: 'What is the role of the ear mold in hearing aid management?',
    options: [
      'To improve sound transmission',
      'To protect the hearing aid',
      'To prevent earwax buildup',
      'To maintain battery life'
    ],
    correctOption: 'a',
    explanation: 'The ear mold plays a crucial role in improving sound transmission and preventing earwax buildup, which can affect sound quality and battery life.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-7',
    question: 'What should be done if the hearing aid battery is low?',
    options: [
      'Replace the battery immediately',
      'Continue using the hearing aid until it stops working',
      'Check the battery level using a hearing aid battery tester',
      'Replace the battery when the hearing aid indicates low battery'
    ],
    correctOption: 'd',
    explanation: 'It is important to replace the hearing aid battery when it indicates low battery to ensure optimal performance and battery life.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-8',
    question: 'What is the importance of checking the tubing during follow-up appointments?',
    options: [
      'To ensure proper sound transmission',
      'To check for any damage to the hearing aid',
      'To check for any changes in the patient\'s hearing status',
      'To check for any changes in the battery life'
    ],
    correctOption: 'a',
    explanation: 'Checking the tubing during follow-up appointments is important to ensure proper sound transmission and to check for any damage to the hearing aid.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-9',
    question: 'What should be done if the hearing aid is not working properly?',
    options: [
      'Send the hearing aid for repair',
      'Reprogram the hearing aid',
      'Check if the battery is low',
      'Check for any damage to the hearing aid'
    ],
    correctOption: 'd',
    explanation: 'If the hearing aid is not working properly, the first step should be to check for any damage to the hearing aid, as this is often the easiest and most cost-effective solution.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-10',
    question: 'What is the role of the audiologist in follow-up appointments?',
    options: [
      'To adjust the hearing aid settings',
      'To clean the hearing aid',
      'To check the hearing aid performance',
      'To check for any changes in the patient\'s hearing status'
    ],
    correctOption: 'd',
    explanation: 'The audiologist plays a crucial role in follow-up appointments by checking the hearing aid performance, cleaning the hearing aid, and checking for any changes in the patient\'s hearing status.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-11',
    question: 'What is the recommended frequency for hearing aid follow-up appointments for new users?',
    options: [
      'Weekly for the first month',
      'Every 2-4 weeks for the first few months, then annually',
      'Every 6 months',
      'Only when problems arise'
    ],
    correctOption: 'b',
    explanation: 'New hearing aid users should have follow-up appointments every 2-4 weeks for the first few months to address adaptation issues, make needed adjustments, and provide counseling, then transition to annual visits.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-12',
    question: 'A patient reports that they "don\'t hear any difference" with their new hearing aids after one week. What is the most appropriate response?',
    options: [
      'Suggest they return the hearing aids immediately',
      'Dramatically increase the gain',
      'Explain that adaptation takes time and the brain needs to adjust to new sounds',
      'Tell them that their hearing loss might be too severe for hearing aids'
    ],
    correctOption: 'c',
    explanation: 'It\'s important to explain that adaptation takes time, typically 4-6 weeks for full acclimatization, as the brain needs to learn to process and interpret newly audible sounds that may not have been heard for years.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-13',
    question: 'What is an appropriate schedule for gradually increasing gain for a new hearing aid user with moderate hearing loss?',
    options: [
      'Start at full gain immediately',
      'Start at 50-70% of prescribed gain, increasing to full gain over 2-4 weeks',
      'Start at 25% of prescribed gain, increasing by 25% each week',
      'Start at minimal gain, only increasing if the patient requests more volume'
    ],
    correctOption: 'b',
    explanation: 'A typical approach is to start at about 50-70% of prescribed gain and gradually increase to full prescription over 2-4 weeks, allowing the patient to adapt to amplification without overwhelming them initially.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-14',
    question: 'What data should be collected during a follow-up appointment to evaluate hearing aid benefit?',
    options: [
      'Only audiometric thresholds',
      'Only subjective patient report',
      'Verification measures (real-ear or functional gain) and subjective questionnaires or scales',
      'Only speech recognition testing'
    ],
    correctOption: 'c',
    explanation: 'Both objective verification measures (like real-ear or functional gain measurements) and subjective benefit measures (like standardized questionnaires or scales) should be used to comprehensively evaluate hearing aid benefit.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-15',
    question: 'A patient at a follow-up appointment reports doing well overall but having difficulty in restaurants. What would be an appropriate intervention?',
    options: [
      'Tell them to avoid restaurants',
      'Verify directional microphone functionality and possibly create a specialized program for noisy environments',
      'Dramatically increase overall gain',
      'Switch to a completely different hearing aid model'
    ],
    correctOption: 'b',
    explanation: 'For restaurant difficulties, verify that directional microphones are functioning properly and consider creating a specialized program with appropriate noise reduction, directionality, and frequency response for noisy environments.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-16',
    question: 'What is the main purpose of conducting aided speech recognition testing at follow-up appointments?',
    options: [
      'To diagnose changes in hearing',
      'To quantify the improvement in speech understanding provided by the hearing aids',
      'To verify real-ear measurements',
      'To satisfy insurance requirements'
    ],
    correctOption: 'b',
    explanation: 'Aided speech recognition testing quantifies the improvement in speech understanding provided by hearing aids, demonstrating benefit to the patient and providing objective evidence of improved communication ability.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-17',
    question: 'What should be done regarding telecoil functionality at follow-up appointments?',
    options: [
      'Telecoils are no longer relevant and don\'t need checking',
      'Verify telecoil function and ensure the patient knows how to use it in appropriate environments',
      'Disable telecoils if the patient hasn\'t been using them',
      'Only check telecoils for elderly patients'
    ],
    correctOption: 'b',
    explanation: 'Telecoils should be verified for proper function, and patients should be educated about when and how to use them (with phones, loop systems, etc.) to maximize hearing accessibility in various environments.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-18',
    question: 'What indicates successful hearing aid fitting at a follow-up appointment?',
    options: [
      'Patient wears the hearing aids at least 8 hours daily',
      'Perfect real-ear match to target',
      'No complaints from the patient',
      'A combination of regular use, acceptable sound quality, improved communication function, and manageable listening effort'
    ],
    correctOption: 'd',
    explanation: 'Successful fitting is indicated by a combination of factors: regular use, acceptable sound quality, improved communication function, manageable listening effort, and proper physical fit and comfort.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-19',
    question: 'How should hearing aid datalogging information be used in follow-up appointments?',
    options: [
      'To verify the patient is always using their hearing aids',
      'To judge patient compliance without asking them',
      'To guide counseling and programming adjustments based on the patient\'s actual usage patterns',
      'Datalogging should not be used as it invades patient privacy'
    ],
    correctOption: 'c',
    explanation: 'Datalogging provides objective information about usage patterns, listening environments, and program/volume adjustments, which can guide counseling and programming adjustments to better meet the patient\'s real-world needs.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-20',
    question: 'A patient at a follow-up appointment reports hearing the hearing aid "squeal" occasionally when putting on a hat or hugging someone. What should be addressed?',
    options: [
      'Tell the patient to avoid these activities',
      'Reduce the overall gain to eliminate all possible feedback',
      'Check and possibly adjust the feedback cancellation settings',
      'Replace the hearing aids with a different style'
    ],
    correctOption: 'c',
    explanation: 'Occasional feedback during activities like putting on hats or hugging is a common issue that can often be addressed by checking and optimizing the feedback cancellation settings without unnecessarily reducing gain for everyday listening.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-21',
    question: 'When should a hearing re-evaluation be performed for a patient with hearing aids?',
    options: [
      'Only when they get new hearing aids',
      'Every 6 months',
      'At least annually',
      'Only if the patient notices changes in their hearing'
    ],
    correctOption: 'c',
    explanation: 'A comprehensive hearing re-evaluation should be performed at least annually to identify any changes in hearing status that may require adjustments to the hearing aid settings.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-22',
    question: 'What is an appropriate approach when a patient reports at a follow-up that sounds are too tinny or sharp?',
    options: [
      'Tell them to get used to it since this is normal for hearing aids',
      'Reduce high-frequency gain based on their feedback while considering the impact on speech understanding',
      'Increase low-frequency gain to mask the tinny sound',
      'Recommend they return the hearing aids'
    ],
    correctOption: 'b',
    explanation: 'When patients report tinny or sharp sound quality, a measured reduction in high-frequency gain based on their feedback is appropriate, while carefully considering the trade-off with speech understanding, especially consonant recognition.',
    category: CATEGORIES.FOLLOW_UP
  },
  {
    id: 'follow-up-23',
    question: 'What is the primary purpose of using patient questionnaires at follow-up appointments?',
    options: [
      'To satisfy regulatory requirements',
      'To document subjective benefit and remaining difficulties for outcome measurement',
      'To make the appointment seem more professional',
      'To avoid having to talk directly with the patient'
    ],
    correctOption: 'b',
    explanation: 'Standardized questionnaires (like the COSI, APHAB, or IOI-HA) provide structured documentation of subjective benefit, remaining difficulties, and quality of life changes, allowing for systematic outcome measurement and progress tracking.',
    category: CATEGORIES.FOLLOW_UP
  }
]; 