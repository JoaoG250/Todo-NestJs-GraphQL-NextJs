import { Alert } from "@mui/material";

interface EmptyProps {
  message?: string;
}

export default function Empty({ message = "No records found!" }: EmptyProps) {
  return <Alert severity="info">{message}</Alert>;
}
