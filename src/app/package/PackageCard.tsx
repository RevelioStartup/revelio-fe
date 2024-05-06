import { PackageDetailResponse } from '@/types/package'
import { Box } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { capitalizeWords } from '@/utils/capitalizeWords';

interface PackageDetailProps {
  package_detail: PackageDetailResponse
}

export const PackageCard = ({ package_detail }: PackageDetailProps) => {
  const features: (keyof PackageDetailResponse)[] = ['event_planner', 'event_tracker', 'event_timeline', 'event_rundown', 'ai_assistant'];

  return (
    <Box data-testid="package-card-box">
        <ul className="list-disc list-inside space-y-2">
        {features.map((feature) => (
            <li key={feature} className="flex items-center"> 
                {package_detail[feature] ? 
                    <CheckIcon className="text-teal-400" /> :
                    <CloseIcon className="text-red-400" />}
                <p className='text-sm' style={{ marginLeft: '0.5rem' }}>{capitalizeWords(feature)}</p>
            </li>
        ))}
        </ul>
    </Box>
  )
}

export default PackageCard
