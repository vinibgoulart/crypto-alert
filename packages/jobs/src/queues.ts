export enum QUEUE_CONTENT_NAME_ENUM {
  SYNCRONIZE = "SYNCRONIZE",
  SANITY_CHECK_ALL = "SANITY_CHECK_ALL",
  SANITY_CHECK = "SANITY_CHECK",
  ALERT_REACHED = "ALERT_REACHED",
}

export type QueueContent = {
  name: QUEUE_CONTENT_NAME_ENUM;
  data?: any;
};

export const MAIN_QUEUE = "main_queue";
