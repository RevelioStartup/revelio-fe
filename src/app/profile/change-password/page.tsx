'use client'

import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Box, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button as MuiButton } from '@mui/material';
import {useGetProfileQuery } from '@/redux/api/profileApi';
import { useSendChangePasswordMutation, useSendRecoverPasswordEmailMutation } from '@/redux/api/authApi';
import { Button } from '@/components/elements/Button'

interface ChangePasswordProps {
    initialStep?: number
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ initialStep = 1 }) => {

  return (
    <Box>
    </Box>
  );
};

export default ChangePassword;
