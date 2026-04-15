import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store/store";
import { setPersonal } from "@/store/resume-slice";

import { TextField, Stack } from "@mui/material";

export default function PersonalInfo() {
  const dispatch = useDispatch();
  const personal = useSelector((state: RootState) => state.resume.personal);

  return (
    <Stack spacing={2}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={personal.name}
        onChange={(e) =>
          dispatch(setPersonal({ ...personal, name: e.target.value }))
        }
      />

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        value={personal.email}
        onChange={(e) =>
          dispatch(setPersonal({ ...personal, email: e.target.value }))
        }
      />
    </Stack>
  );
}