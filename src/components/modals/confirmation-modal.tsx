import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
} from '@mui/material';

type ConfirmModalProps = {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({ open, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirm</DialogTitle>

      <DialogContent>{message}</DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}