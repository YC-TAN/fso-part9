import type { NotificationState } from "../types";

interface NotificationProps {
    notification: NotificationState
}

const Notification = ({notification}: NotificationProps) => {
    const {message, type} = notification

    const error = {
        color: 'red',
    }

    const success = {
        color: 'green',
    }

    if (!message) return null;
  return (
    <div style={type === 'error' ? error : success}>{message}</div>
  )
}

export default Notification