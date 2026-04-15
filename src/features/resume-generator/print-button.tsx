import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

export default function PrintButton() {
  const handlePrint = () => {
    // window.print();
    // call the API, download
  };

  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<PrintIcon />}
      onClick={handlePrint}
      sx={{
        "@media print": {
          display: "none",
        },
      }}
    >
      Print / Download PDF
    </Button>
  );
}