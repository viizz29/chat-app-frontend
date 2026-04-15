import { useTranslation } from "react-i18next";
import {  Typography } from "@mui/material";
import ChatUIExample from "@/features/home/chatui-example";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <Typography variant="h4">{t("welcome")}</Typography>
      
      <ChatUIExample />

    </div>
  );
}