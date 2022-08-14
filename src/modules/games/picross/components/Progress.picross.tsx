import { Box, Progress, RingProgress, Text } from "@mantine/core";

interface PicrossProgress {
  progress: number;
  onClick?: () => void;
}

export const PicrossProgress: React.FC<PicrossProgress> = ({ progress, onClick }) => {
  const value = (progress ?? 0) * 100
  const label = value.toFixed(2).endsWith('00') ? value.toFixed(0) : value.toFixed(2);
  
  const canSolve = value === 100 && onClick;
  const handleClick = () => canSolve ? onClick() : null;
  
  return (
    <Box
      onClick={handleClick}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: 'flex-end',
        gridArea: 'progress',
        cursor: canSolve ? 'pointer' : 'default',
      }}>
      <RingProgress
        size={64}
        thickness={6}
        sections={[{ value, color: 'green'}]}
        label={<Text align="center" color="dimmed" size="xs">{label}%</Text>}
        />
    </Box>
  );
}
