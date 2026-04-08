import { useMessageValue } from "../context/NotificationContext";
import "./../index.css";

const Notification = () => {
  const message = useMessageValue();

  let style = "success";

  if (message.startsWith("Login failed")) {
    style = "error";
  }

  return <>{message && <div className={style}>{message}</div>}</>;
};

export default Notification;
