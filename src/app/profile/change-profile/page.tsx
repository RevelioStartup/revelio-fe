"use client"

import { Button as ButtonVariants } from '@/components/elements/Button';
import { Input } from '@/components/elements/Forms/input';
import { Avatar, Box, Button, styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../../../redux/features/profileSlice'; 
import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'next/navigation'
import { selectProfileBio } from '@/redux/selectors/profileSelector';

const ChangeProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const profileData = useSelector((state: RootState) => state.profile); // Assuming the state shape
    const bio = useSelector(selectProfileBio); // Use the selector here
    const [preview, setPreview] = useState<string | null>(null);

    type ChangeProfileFormType = {
      bio: string;
    };
    const { control, handleSubmit, reset } = useForm<ChangeProfileFormType>({
      defaultValues: {
        bio: bio || '',
      }
    });
  
    useEffect(() => {
      dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
      // Reset form with fetched data
      reset({ bio: bio || '' });
    }, [profileData, reset]);  

    useEffect(() => {
        // Revoke the data uris to avoid memory leaks
        return () => {
          if (preview) {
            URL.revokeObjectURL(preview);
          }
        };
      }, [preview]);

    useEffect(() => {
    if (!selectedFile) {
        setPreview(null);
        return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSubmit = async (data: ChangeProfileFormType) => {
        const formData = new FormData();
        formData.append('bio', data.bio);
      
        if (selectedFile) {
          formData.append('profile_picture', selectedFile);
        }
      
        try {
          await dispatch(updateProfile(formData)).unwrap();
          // Redirect to the profile page after successful update
          window.location.href = '/profile';
        } catch (error) {
          console.error('Failed to update profile:', error);
        }
    };
  
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        alignItems={'center'}
        justifyContent={'center'}
        padding={{ xs: '6em 2em', lg: '6em 12em' }}
      >
        <h1 className='text-3xl md:text-5xl font-bold mb-5 text-center'>Change Profile</h1>
        <form
          className="flex flex-col gap-3"
          style={{ flex: 1 }}
          data-testid="change-profile-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box className="mb-8 flex flex-col justify-center">
            <Button
              sx={{ borderRadius: "50%" }}
              component="label"
            >
            <Avatar alt="" src={preview || ''} sx={{ width: 180, height: 180 }} />
            <input
              type="file"
              hidden
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
            />
            </Button>
          </Box>
          <Input
                control={control}
                name="bio"
                placeholder="Enter bio"
                data-testid="bio-input"
                className='w-72 h-14 md:w-[400px] text-base md:text-xl mx-auto'
            />
            <ButtonVariants variant="primary" type="submit" width="auto" className='w-72 h-14 md:w-[400px] text-xl font-bold mx-auto mt-12'>
                Change Profile
            </ButtonVariants>
        </form>
      </Box>
    );
  };
  
  export default ChangeProfile