import { QUEUE_CONTENT_NAME_ENUM } from "@crypto-alert/jobs";
import { syncronize } from "./syncronize";

export const WORKER_JOBS = {
  [QUEUE_CONTENT_NAME_ENUM.SYNCRONIZE]: syncronize,
};
