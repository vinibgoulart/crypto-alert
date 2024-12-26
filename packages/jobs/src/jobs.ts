import { QUEUE_CONTENT_NAME_ENUM } from "./queues";
import { syncronize } from "./syncronize";

export const JOBS = {
  [QUEUE_CONTENT_NAME_ENUM.SYNCRONIZE]: syncronize,
  [QUEUE_CONTENT_NAME_ENUM.SANITY_CHECK_ALL]: syncronize,
  [QUEUE_CONTENT_NAME_ENUM.SANITY_CHECK]: syncronize,
  [QUEUE_CONTENT_NAME_ENUM.ALERT_REACHED]: syncronize,
};
