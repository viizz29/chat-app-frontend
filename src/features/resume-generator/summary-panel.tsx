import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";

import { Paper, Typography, Stack, Divider } from "@mui/material";

export default function SummaryPanel() {
  const { personal, education } = useSelector(
    (state: RootState) => state.resume
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        <Typography variant="h6" fontWeight="bold">
          Summary
        </Typography>

        <Divider />

        <Typography variant="body2">
          <strong>Name:</strong> {personal.name}
        </Typography>

        <Typography variant="body2">
          <strong>Email:</strong> {personal.email}
        </Typography>

        <Typography variant="body2">
          <strong>Degree:</strong> {education.degree}
        </Typography>

        <Typography variant="body2">
          <strong>College:</strong> {education.college}
        </Typography>
      </Stack>
    </Paper>
  );
}