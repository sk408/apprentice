import { ExamQuestion, CATEGORIES } from './categories';

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
    category: CATEGORIES.PATHOLOGY
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
    category: CATEGORIES.PATHOLOGY
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
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-4',
    question: 'What is the most common cause of conductive hearing loss in children?',
    options: [
      'Otosclerosis',
      'Cholesteatoma',
      'Otitis media with effusion',
      'Ossicular chain discontinuity'
    ],
    correctOption: 'c',
    explanation: 'Otitis media with effusion (OME), or "glue ear," is the most common cause of conductive hearing loss in children, resulting from fluid accumulation in the middle ear.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-5',
    question: 'Which of the following is a characteristic of acoustic neuroma?',
    options: [
      'Bilateral hearing loss',
      'Conductive hearing loss',
      'Unilateral tinnitus and hearing loss',
      'Low-frequency hearing loss'
    ],
    correctOption: 'c',
    explanation: 'Acoustic neuroma (vestibular schwannoma) typically presents with unilateral symptoms, including tinnitus and progressive high-frequency sensorineural hearing loss.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-6',
    question: 'What is cholesteatoma?',
    options: [
      'A tumor of the cochlea',
      'A collection of skin cells and debris in the middle ear',
      'Fluid in the middle ear',
      'Calcification of the eardrum'
    ],
    correctOption: 'b',
    explanation: 'A cholesteatoma is an abnormal growth of keratinizing squamous epithelium (skin cells) and debris in the middle ear, which can erode surrounding structures.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-7',
    question: 'Which of the following conditions is associated with a widened air-bone gap at low frequencies?',
    options: [
      'Otosclerosis',
      'Presbycusis',
      'Noise-induced hearing loss',
      'Superior semicircular canal dehiscence'
    ],
    correctOption: 'd',
    explanation: 'Superior semicircular canal dehiscence (SSCD) can present with a pseudoconductive hearing loss with air-bone gaps at low frequencies, despite normal middle ear function, due to a "third window" effect that allows acoustic energy to be shunted away from the cochlea.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-8',
    question: 'Which pathology presents with episodic vertigo but typically does NOT affect hearing?',
    options: [
      'Ménière\'s disease',
      'Benign paroxysmal positional vertigo (BPPV)',
      'Acoustic neuroma',
      'Labyrinthitis'
    ],
    correctOption: 'b',
    explanation: 'Benign paroxysmal positional vertigo (BPPV) causes brief episodes of vertigo triggered by position changes but typically does not affect hearing, as it involves the semicircular canals rather than the cochlea.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-9',
    question: 'What is the most likely cause of sudden sensorineural hearing loss in one ear?',
    options: [
      'Gradual age-related changes',
      'Excessive cerumen',
      'Viral infection or vascular event',
      'Eustachian tube dysfunction'
    ],
    correctOption: 'c',
    explanation: 'Sudden sensorineural hearing loss is often attributed to viral infections or vascular events (like cochlear ischemia), though the exact cause often remains idiopathic in many cases.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-10',
    question: 'Which condition is characterized by a painless, blue-gray mass behind the eardrum?',
    options: [
      'Acute otitis media',
      'Glomus tympanicum',
      'Cholesteatoma',
      'Tympanosclerosis'
    ],
    correctOption: 'b',
    explanation: 'A glomus tympanicum (paraganglioma) typically appears as a painless, blue-gray or reddish mass behind the eardrum and may pulsate with heartbeat.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-11',
    question: 'What is the primary cause of otitis externa?',
    options: [
      'Viral infection',
      'Bacterial or fungal infection',
      'Eustachian tube dysfunction',
      'Autoimmune response'
    ],
    correctOption: 'b',
    explanation: 'Otitis externa (swimmer\'s ear) is primarily caused by bacterial (commonly Pseudomonas aeruginosa or Staphylococcus aureus) or fungal infections of the ear canal, often precipitated by moisture or trauma.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-12',
    question: 'Which audiometric configuration is most consistent with noise-induced hearing loss?',
    options: [
      'Flat sensorineural loss',
      'Rising configuration (better at high frequencies)',
      'Notch at 4000 Hz',
      'Cookie-bite (worse in mid-frequencies)'
    ],
    correctOption: 'c',
    explanation: 'Noise-induced hearing loss typically presents with a "notch" around 3000-6000 Hz (most commonly at 4000 Hz) due to the resonance characteristics of the ear canal and increased susceptibility of cochlear hair cells in this region.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-13',
    question: 'What is perilymphatic fistula?',
    options: [
      'Infection of the perilymphatic space',
      'Abnormal connection between the middle ear and inner ear',
      'Rupture of the round window membrane',
      'Excess accumulation of perilymph in the cochlea'
    ],
    correctOption: 'b',
    explanation: 'A perilymphatic fistula is an abnormal connection (leak) between the fluid-filled inner ear and the air-filled middle ear, most commonly at the oval or round window, allowing perilymph to escape.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-14',
    question: 'Which condition is characterized by recurrent episodes of spontaneous vertigo lasting hours, with fluctuating hearing loss and tinnitus?',
    options: [
      'Benign paroxysmal positional vertigo',
      'Vestibular neuritis',
      'Ménière\'s disease',
      'Acoustic neuroma'
    ],
    correctOption: 'c',
    explanation: 'Ménière\'s disease is characterized by recurrent episodes of spontaneous vertigo (typically lasting 20 minutes to several hours), fluctuating sensorineural hearing loss, tinnitus, and aural fullness, attributed to endolymphatic hydrops.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-15',
    question: 'What is the primary cause of congenital sensorineural hearing loss?',
    options: [
      'Genetic factors',
      'Maternal infections during pregnancy',
      'Birth trauma',
      'Ototoxic medications given to the mother'
    ],
    correctOption: 'a',
    explanation: 'Genetic factors are the primary cause of congenital sensorineural hearing loss, accounting for about 50-60% of cases, with the remainder attributed to environmental factors like infections, ototoxicity, or trauma.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-16',
    question: 'Which syndrome is associated with progressive sensorineural hearing loss and retinitis pigmentosa?',
    options: [
      'Waardenburg syndrome',
      'Pendred syndrome',
      'Usher syndrome',
      'Treacher Collins syndrome'
    ],
    correctOption: 'c',
    explanation: 'Usher syndrome is characterized by congenital hearing loss (or progressive hearing loss, depending on the type) and progressive vision loss due to retinitis pigmentosa.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-17',
    question: 'What is the hallmark symptom of vestibular neuritis?',
    options: [
      'Sudden hearing loss',
      'Facial paralysis',
      'Prolonged vertigo without hearing loss',
      'Fluctuating hearing loss with episodic vertigo'
    ],
    correctOption: 'c',
    explanation: 'Vestibular neuritis is characterized by the sudden onset of prolonged vertigo (days) without associated hearing loss, as it affects only the vestibular portion of the vestibulocochlear nerve.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-18',
    question: 'What is otospongiosis?',
    options: [
      'Another term for otitis media',
      'An alternative name for otosclerosis',
      'Sponge-like infection of the ear canal',
      'Surgical procedure for treating Ménière\'s disease'
    ],
    correctOption: 'b',
    explanation: 'Otospongiosis is an alternative term for otosclerosis, referring to the early, active phase of the disease characterized by resorption and formation of spongy bone in the otic capsule.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-19',
    question: 'Which of the following best describes labyrinthitis?',
    options: [
      'Inflammation of the middle ear',
      'Inflammation of the inner ear',
      'Inflammation of the ear canal',
      'Inflammation of the eardrum'
    ],
    correctOption: 'b',
    explanation: 'Labyrinthitis is inflammation of the inner ear labyrinth (cochlea and vestibular system), usually due to viral or bacterial infection, causing both vertigo and hearing loss.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-20',
    question: 'What is a common complication of untreated chronic otitis media?',
    options: [
      'Otosclerosis',
      'Ménière\'s disease',
      'Cholesteatoma',
      'Acoustic neuroma'
    ],
    correctOption: 'c',
    explanation: 'Cholesteatoma can develop as a complication of untreated chronic otitis media, particularly when there is a persistent tympanic membrane perforation or retraction pocket.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-21',
    question: 'Which of the following conditions results from an abnormal opening in the bone covering the superior semicircular canal?',
    options: [
      'Perilymphatic fistula',
      'Superior semicircular canal dehiscence',
      'Cholesteatoma',
      'Acoustic neuroma'
    ],
    correctOption: 'b',
    explanation: 'Superior semicircular canal dehiscence (SSCD) is a condition where there is an abnormal opening (dehiscence) in the bone covering the superior semicircular canal, creating a "third window" effect.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-22',
    question: 'What is the primary symptom that differentiates acute otitis media from otitis media with effusion?',
    options: [
      'Hearing loss',
      'Ear pain',
      'Tympanic membrane retraction',
      'Dizziness'
    ],
    correctOption: 'b',
    explanation: 'Ear pain (otalgia) is a primary symptom that differentiates acute otitis media (which is painful) from otitis media with effusion (which is usually painless). Both conditions can cause hearing loss.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-23',
    question: 'Which of these is a potential complication of untreated cholesteatoma?',
    options: [
      'Development of otosclerosis',
      'Progression to Ménière\'s disease',
      'Erosion of the ossicles or other surrounding structures',
      'Transformation into acoustic neuroma'
    ],
    correctOption: 'c',
    explanation: 'Untreated cholesteatoma can erode surrounding structures including the ossicles, facial nerve canal, labyrinth, and even the skull base, potentially leading to hearing loss, facial paralysis, labyrinthine fistula, or intracranial complications.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-24',
    question: 'What is the most common cause of bilateral progressive sensorineural hearing loss in adults?',
    options: [
      'Ménière\'s disease',
      'Presbycusis',
      'Acoustic neuroma',
      'Autoimmune inner ear disease'
    ],
    correctOption: 'b',
    explanation: 'Presbycusis (age-related hearing loss) is the most common cause of bilateral progressive sensorineural hearing loss in adults, affecting approximately one-third of adults over 65.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-25',
    question: 'Which of the following is characteristic of autoimmune inner ear disease?',
    options: [
      'Unilateral, sudden hearing loss',
      'Bilateral, progressive hearing loss over weeks to months, often with vestibular symptoms',
      'Fluctuating hearing loss with vertigo',
      'High-frequency hearing loss developing over decades'
    ],
    correctOption: 'b',
    explanation: 'Autoimmune inner ear disease (AIED) typically presents as bilateral, rapidly progressive sensorineural hearing loss that develops over weeks to months, often accompanied by vestibular symptoms. It may respond to immunosuppressive therapy.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-26',
    question: 'What is a tympanic membrane retraction pocket?',
    options: [
      'A surgical incision in the eardrum to relieve pressure',
      'An outward bulging of the eardrum due to middle ear pressure',
      'An inward collapse of part of the eardrum, often in the pars flaccida or posteriorsuperior quadrant',
      'A collection of fluid behind the eardrum'
    ],
    correctOption: 'c',
    explanation: 'A tympanic membrane retraction pocket is an inward collapse of part of the eardrum, often in the pars flaccida or posteriorsuperior quadrant, usually resulting from negative middle ear pressure due to Eustachian tube dysfunction.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-27',
    question: 'What is the primary cause of external auditory canal exostoses?',
    options: [
      'Chronic exposure to cold water',
      'Repeated infections',
      'Genetic factors',
      'Trauma to the ear canal'
    ],
    correctOption: 'a',
    explanation: 'External auditory canal exostoses (\"surfer\'s ear\") are primarily caused by chronic exposure to cold water, which stimulates bone growth in the ear canal.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-28',
    question: 'Which of the following best describes tympanosclerosis?',
    options: [
      'Infection of the middle ear',
      'Hardening and calcification of the tympanic membrane',
      'Retraction of the eardrum',
      'Fluid behind the eardrum'
    ],
    correctOption: 'b',
    explanation: 'Tympanosclerosis is the hardening and calcification of the tympanic membrane, appearing as white plaques, typically resulting from previous inflammation or infection.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-29',
    question: 'What is the hallmark of \"cookie-bite\" audiogram?',
    options: [
      'Flat hearing loss across all frequencies',
      'Greatest hearing loss in the mid-frequencies',
      'High-frequency hearing loss',
      'Low-frequency hearing loss'
    ],
    correctOption: 'b',
    explanation: 'A \"cookie-bite\" audiogram shows the greatest hearing loss in the mid-frequencies, with better hearing at low and high frequencies, creating a U-shaped configuration that resembles a bite taken out of a cookie.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-30',
    question: 'Which of the following conditions is associated with enlarged vestibular aqueduct syndrome?',
    options: [
      'Waardenburg syndrome',
      'Usher syndrome',
      'Pendred syndrome',
      'Alport syndrome'
    ],
    correctOption: 'c',
    explanation: 'Enlarged vestibular aqueduct syndrome is commonly associated with Pendred syndrome, a genetic disorder characterized by congenital hearing loss and thyroid goiter.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-31',
    question: 'What causes the hearing loss in otosclerosis?',
    options: [
      'Inflammation of the cochlea',
      'Stapes footplate fixation restricting sound transmission',
      'Accumulation of fluid in the middle ear',
      'Eardrum perforation'
    ],
    correctOption: 'b',
    explanation: 'In otosclerosis, abnormal bone growth leads to fixation of the stapes footplate in the oval window, restricting its movement and causing conductive hearing loss by impeding sound transmission to the inner ear.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-32',
    question: 'What is ototoxicity?',
    options: [
      'Infection of the ear',
      'Damage to the ear from loud noise',
      'Damage to the inner ear from medications or chemicals',
      'Buildup of earwax'
    ],
    correctOption: 'c',
    explanation: 'Ototoxicity refers to damage to the inner ear (cochlea, vestibular system, or both) resulting from exposure to certain medications or chemicals that are toxic to these structures.',
    category: CATEGORIES.PATHOLOGY
  },
  {
    id: 'pathology-33',
    question: 'Which of the following best describes congenital aural atresia?',
    options: [
      'Absence of the pinna',
      'Underdevelopment or absence of the external auditory canal',
      'Malformation of the cochlea',
      'Absence of the ossicles'
    ],
    correctOption: 'b',
    explanation: 'Congenital aural atresia refers to the underdevelopment or absence of the external auditory canal, often accompanied by microtia (malformed pinna) and middle ear anomalies.',
    category: CATEGORIES.PATHOLOGY
  }
]; 