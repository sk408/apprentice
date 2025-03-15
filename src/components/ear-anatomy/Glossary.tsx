import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Fab,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  MenuBook,
  Search,
  Close,
  ArrowBack,
} from '@mui/icons-material';

// Glossary terms data
export const glossaryTerms = [
  {
    term: 'Auricle (Pinna)',
    definition: 'The visible part of the outer ear that collects sound waves and directs them into the ear canal.'
  },
  {
    term: 'Cochlea',
    definition: 'Snail-shaped structure in the inner ear that contains the sensory organ for hearing. Converts fluid vibrations into electrical signals.'
  },
  {
    term: 'Conductive Hearing Loss',
    definition: 'Hearing loss that occurs when sound cannot efficiently travel through the outer and middle ear to the inner ear.'
  },
  {
    term: 'Endolymph',
    definition: 'Fluid found in the scala media of the cochlea and in the vestibular labyrinth. Has a unique high potassium, low sodium composition.'
  },
  {
    term: 'Eustachian Tube',
    definition: 'A tube that connects the middle ear to the back of the throat, allowing pressure equalization and drainage.'
  },
  {
    term: 'Hair Cells',
    definition: 'Sensory cells in the cochlea with hair-like projections (stereocilia) that convert mechanical vibrations into electrical signals.'
  },
  {
    term: 'Impedance Matching',
    definition: 'The process by which the middle ear transforms sound energy in air to fluid vibrations in the inner ear, preventing energy loss.'
  },
  {
    term: 'Incus',
    definition: 'The middle bone of the three ossicles in the middle ear, shaped like an anvil, connects the malleus to the stapes.'
  },
  {
    term: 'Malleus',
    definition: 'The first and largest of the three ossicles in the middle ear, shaped like a hammer, attached to the eardrum.'
  },
  {
    term: 'Organ of Corti',
    definition: 'The sensory epithelium in the cochlea containing hair cells that detect sound vibrations.'
  },
  {
    term: 'Ossicles',
    definition: 'The three tiny bones in the middle ear (malleus, incus, and stapes) that transmit sound vibrations from the eardrum to the inner ear.'
  },
  {
    term: 'Otitis Media',
    definition: 'Inflammation of the middle ear, often with fluid accumulation, causing conductive hearing loss.'
  },
  {
    term: 'Otosclerosis',
    definition: 'Abnormal bone growth in the middle ear, typically fixating the stapes footplate, causing conductive hearing loss.'
  },
  {
    term: 'Oval Window',
    definition: 'Membrane-covered opening between the middle and inner ear where the stapes footplate attaches.'
  },
  {
    term: 'Perilymph',
    definition: 'Fluid found in the scala vestibuli and scala tympani of the cochlea. Similar in composition to cerebrospinal fluid.'
  },
  {
    term: 'Round Window',
    definition: 'A membrane-covered opening between the middle ear and inner ear that allows fluid displacement in the cochlea.'
  },
  {
    term: 'Sensorineural Hearing Loss',
    definition: 'Hearing loss resulting from damage to the inner ear (cochlea) or to the nerve pathways from the inner ear to the brain.'
  },
  {
    term: 'Semicircular Canals',
    definition: 'Three loop-shaped structures in the inner ear responsible for detecting rotational movements of the head.'
  },
  {
    term: 'Stapes',
    definition: 'The third and smallest ossicle in the middle ear, shaped like a stirrup, connects the incus to the oval window.'
  },
  {
    term: 'Tonotopic Organization',
    definition: 'The spatial arrangement of the cochlea where different frequencies are processed at different locations.'
  },
  {
    term: 'Tympanic Membrane',
    definition: 'The eardrum; a thin membrane that separates the outer ear from the middle ear and vibrates in response to sound waves.'
  },
  {
    term: 'Vestibular System',
    definition: 'The sensory system in the inner ear that provides the brain with information about motion, equilibrium, and spatial orientation.'
  }
];

interface GlossaryProps {
  glossaryOpen: boolean;
  toggleGlossary: () => void;
}

const Glossary: React.FC<GlossaryProps> = ({ glossaryOpen, toggleGlossary }) => {
  const [glossarySearchTerm, setGlossarySearchTerm] = useState('');

  // Filter glossary terms based on search
  const handleGlossarySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGlossarySearchTerm(event.target.value.toLowerCase());
  };

  // Filter terms based on search
  const filteredTerms = glossarySearchTerm 
    ? glossaryTerms.filter(item => 
        item.term.toLowerCase().includes(glossarySearchTerm) || 
        item.definition.toLowerCase().includes(glossarySearchTerm)
      )
    : glossaryTerms;

  return (
    <>
      {/* Floating Glossary Button */}
      <Tooltip title="Ear Anatomy Glossary" arrow placement="left">
        <Fab 
          color="primary" 
          aria-label="glossary"
          onClick={toggleGlossary}
          sx={{ 
            position: 'fixed', 
            bottom: 20, 
            right: 20,
            zIndex: 1000
          }}
        >
          <MenuBook />
        </Fab>
      </Tooltip>

      {/* Glossary Drawer */}
      <Drawer
        anchor="right"
        open={glossaryOpen}
        onClose={toggleGlossary}
        sx={{
          '& .MuiDrawer-paper': { 
            width: {xs: '100%', sm: 350},
            maxWidth: '100%',
            p: 2,
            boxSizing: 'border-box'
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Ear Anatomy Glossary
          </Typography>
          <IconButton onClick={toggleGlossary} aria-label="close glossary">
            <Close />
          </IconButton>
        </Box>
        
        <Typography variant="body2" paragraph>
          Quick reference for ear anatomy terminology. Search or scroll to find terms.
        </Typography>
        
        {/* Search box */}
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 2 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search glossary terms..."
            value={glossarySearchTerm}
            onChange={handleGlossarySearch}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        
        {filteredTerms.length === 0 ? (
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            No matching terms found.
          </Typography>
        ) : (
          <Box sx={{ maxHeight: 'calc(100vh - 160px)', overflowY: 'auto' }}>
            {filteredTerms.map((item, index) => (
              <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                <Typography variant="subtitle2" fontWeight="bold" color="primary.dark">
                  {item.term}
                </Typography>
                <Typography variant="body2">
                  {item.definition}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'center' }}>
          <Button 
            startIcon={<ArrowBack />} 
            onClick={toggleGlossary}
            size="small"
          >
            Back to Learning
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Glossary; 