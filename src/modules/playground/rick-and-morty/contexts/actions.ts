import { showNotification } from "@mantine/notifications";
import utils from "utils";
import type { ApiContext } from "../machines/api.machine.types";

export function notifyError(context: ApiContext, event) {
  showNotification({
    title: `Error while Splooshing data ${event.data.name}`,
    message: event.data.message,
    color: utils.theme.getColor(theme, 'error'),
  });
},
export function notifyTimeout() {
  showNotification({
    title: 'Splooshing timed out',
    message: 'Try again later',
    color: utils.theme.getColor(theme, 'warning'),
  });
},
