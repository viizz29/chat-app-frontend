import { useState } from "react";

import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";

import PersonalInfo from "./personal-info";
import Education from "./education";
import SummaryPanel from "./summary-panel";
import ResumePreview from "@/features/resume-generator/resume-preview";
import PrintButton from "@/features/resume-generator/print-button";

const steps = [
  { label: "Personal", component: <PersonalInfo /> },
  { label: "Education", component: <Education /> },
];

export default function ResumeBuilder() {
  const [step, setStep] = useState(0);

  return (
    <Box>
      {/* Top Section */}
      <Grid container spacing={2} sx={{ p: 2 }}>
        {/* LEFT: Form */}
        <Grid size={{xs: 12, md: 8}}>
          <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight="bold">
                {steps[step].label}
              </Typography>

              {steps[step].component}

              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  disabled={step === 0}
                  onClick={() => setStep((s) => s - 1)}
                >
                  Prev
                </Button>

                <Button
                  variant="contained"
                  disabled={step === steps.length - 1}
                  onClick={() => setStep((s) => s + 1)}
                >
                  Next
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* RIGHT: Summary */}
        <Grid size={{xs: 12, md: 4}} >
          <Paper sx={{ p: 2 }}>
            <SummaryPanel />
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <PrintButton />
        </Box>

        <Paper sx={{ p: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontFamily: "serif", lineHeight: 1.6 }}
          >
            <ResumePreview />
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}