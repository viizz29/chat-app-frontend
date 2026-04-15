import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";

import {
  Box,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

export default function ResumePreview() {
  const { personal, education } = useSelector(
    (state: RootState) => state.resume
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        bgcolor: "grey.200",
        py: 4,
        "@media print": {
          bgcolor: "white",
          py: 0,
        },
      }}
    >
      {/* A4 Page */}
      <Paper
        elevation={3}
        sx={{
          width: "210mm",
          minHeight: "297mm",
          p: 4,
          "@media print": {
            boxShadow: "none",
          },
        }}
      >
        {/* Header */}
        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold">
            {personal.name || "Your Name"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {personal.email || "your.email@example.com"}
          </Typography>

          <Divider sx={{ mt: 1 }} />
        </Box>

        {/* Education */}
        <Box mb={3}>
          <Typography
            variant="h6"
            fontWeight="600"
            gutterBottom
          >
            Education
          </Typography>

          <Typography fontWeight="medium">
            {education.degree || "Degree"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {education.college || "College Name"}
          </Typography>

          <Divider sx={{ mt: 1 }} />
        </Box>
      </Paper>
    </Box>
  );
}