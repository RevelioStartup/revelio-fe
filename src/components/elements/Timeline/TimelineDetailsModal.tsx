import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface TimelineDetailsModalProps {
  timelineId: string;
  onClose: () => void;
  showModal: boolean;
  clickedEvent: {
    title: string;
    start: Date;
    end: Date;
  };
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TimelineDetailsModal: React.FC<TimelineDetailsModalProps> = ({ timelineId, onClose, showModal, clickedEvent }) => {
 

  return (
   <div></div>
  );
};

export default TimelineDetailsModal;
