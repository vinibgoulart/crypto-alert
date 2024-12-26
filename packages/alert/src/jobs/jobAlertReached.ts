import { QUEUE_CONTENT_NAME_ENUM, QueueContent } from "@crypto-alert/queues";
import { AlertModel } from "../alertModel";
import { getObjectId } from "@crypto-alert/mongo";
import { ALERT_STATUS_ENUM } from "@crypto-alert/enum";
import { sendEmail } from "@crypto-alert/resend";
import { UserModel } from "@crypto-alert/user";

type JobAlertReachedData = {
  _id: string;
};

export const jobAlertReached = async (
  content: QueueContent<JobAlertReachedData>
) => {
  if (content.name !== QUEUE_CONTENT_NAME_ENUM.ALERT_REACHED) {
    throw new Error("Invalid job type");
  }

  const alertGetResponse = await AlertModel.findOne({
    _id: getObjectId(content.data?._id),
  });

  if (!alertGetResponse) {
    throw new Error("Alert not found");
  }

  if (alertGetResponse.status !== ALERT_STATUS_ENUM.REACHED) {
    return;
  }

  const user = await UserModel.findOne({
    _id: alertGetResponse.userId,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const sendEmailResponse = await sendEmail({
    to: [user.email],
    subject: "Crypto Alert",
    html: `Your alert for ${alertGetResponse.symbol} has been reached at ${alertGetResponse.price}`,
  });

  if (!sendEmailResponse.success) {
    throw new Error(sendEmailResponse.error);
  }
};
