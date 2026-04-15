import { TextField, Button, Typography, Paper } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../auth/use-auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/auth-api";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string, password: string }) =>
      loginApi(email, password),

    onSuccess: (data) => {
      // ✅ Save token in auth context
      login(data.token);

      // redirect
      navigate("/");
    },

    onError: (error) => {
      console.error(error);
      alert("Invalid credentials" + JSON.stringify(error));
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Paper className="p-6 w-full max-w-md">

        <Typography variant="h5" className="mb-4">
          Login
        </Typography>

        <div>
          {mutation.isError && (
            <div className="text-red-500 text-sm">
              Login failed
            </div>
          )}
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string(), // Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // 🔐 fake login (replace with API)
            // const fakeToken = "sample.jwt.token";

            // login(fakeToken);
            // navigate("/");

            mutation.mutate(values);
            setSubmitting(false);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Login
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
}