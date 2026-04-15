import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { setEducation } from "@/store/resume-slice";

import { TextField, Stack } from "@mui/material";

export default function Education() {
  const dispatch = useDispatch();
  const education = useSelector((state: RootState) => state.resume.education);

  return (
    <Stack spacing={2}>
      <TextField
        label="Degree"
        variant="outlined"
        fullWidth
        value={education.degree}
        onChange={(e) =>
          dispatch(setEducation({ ...education, degree: e.target.value }))
        }
      />

      <TextField
        label="College"
        variant="outlined"
        fullWidth
        value={education.college}
        onChange={(e) =>
          dispatch(setEducation({ ...education, college: e.target.value }))
        }
      />
    </Stack>
  );
}