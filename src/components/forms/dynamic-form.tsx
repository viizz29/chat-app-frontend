import { TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {
  fields: string[];
  validationSchema: { [key: string]: Yup.AnySchema };
  onSubmit: (values: Record<string, string>) => void;
};

export default function DynamicForm({
  fields,
  validationSchema,
  onSubmit,
}: Props) {
  // Create initial values dynamically
  const initialValues = fields.reduce((acc, field) => {
    acc[field] = '';
    return acc;
  }, {} as Record<string, string>);

  // Create Yup schema dynamically
  const schema = Yup.object(validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit,
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      {fields.map((field) => (
        <TextField
          key={field}
          label={field}
          {...formik.getFieldProps(field)}
          error={formik.touched[field] && Boolean(formik.errors[field])}
          helperText={formik.touched[field] && formik.errors[field]}
          fullWidth
        />
      ))}

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}