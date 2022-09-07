import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const LaunchDetails = ({
  launch,
  onClose,
  open,
}: {
  launch?: Launch;
  onClose: () => void;
  open: boolean;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent data-testid="launch-details">
        <DialogContentText>{launch?.details}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LaunchDetails;
