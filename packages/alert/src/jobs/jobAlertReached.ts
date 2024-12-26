import { QUEUE_CONTENT_NAME_ENUM, QueueContent } from "@crypto-alert/queues";

type JobAlertReachedData = {
  _id: string;
};

export const jobAlertReached = async (
  content: QueueContent<JobAlertReachedData>
) => {
  if (content.name !== QUEUE_CONTENT_NAME_ENUM.ALERT_REACHED) {
    throw new Error("Invalid job type");
  }
  console.log("jobAlertReached", content.data);
};
