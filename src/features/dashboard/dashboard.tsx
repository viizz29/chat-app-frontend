import { useQuery } from "@tanstack/react-query";
import { Typography, CircularProgress, Paper } from "@mui/material";

// fake API
const fetchData = async (): Promise<{users: number, sales: number}> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ users: 120, sales: 540 }), 1000)
  );
};

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchData,
  });

  if (isLoading) return <CircularProgress />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Paper className="p-4">
        <Typography variant="h6">Users</Typography>
        <Typography variant="h4">{data?.users}</Typography>
      </Paper>

      <Paper className="p-4">
        <Typography variant="h6">Sales</Typography>
        <Typography variant="h4">{data?.sales}</Typography>
      </Paper>
    </div>
  );
}