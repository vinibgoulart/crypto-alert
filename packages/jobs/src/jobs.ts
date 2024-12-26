import {
  jobAlertReached,
  jobSanityCheck,
  jobSanityCheckAll,
} from "@crypto-alert/alert";
import { QUEUE_CONTENT_NAME_ENUM } from "@crypto-alert/queues";
import { syncronize } from "./syncronize";

export const JOBS = {
  [QUEUE_CONTENT_NAME_ENUM.SYNCRONIZE]: syncronize,
  [QUEUE_CONTENT_NAME_ENUM.SANITY_CHECK_ALL]: jobSanityCheckAll,
  [QUEUE_CONTENT_NAME_ENUM.SANITY_CHECK]: jobSanityCheck,
  [QUEUE_CONTENT_NAME_ENUM.ALERT_REACHED]: jobAlertReached,
};
