import {NextApiRequest, NextApiResponse} from "next";
import {invitationService} from "@app/services/server/invitation.service";
import {withDb} from "@app/middlewares/withDb";
import {z} from "zod";
import {Relationship} from "@app/types/invitation.type";

export const relationshipSchema = z.nativeEnum(Relationship)

export const createInvitationSchema = z.object({
  guestName: z.string(),
  relationship: relationshipSchema,
  description: z.string(),
  willJoin: z.boolean(),
  participants: z.string()
})


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const safeParseBody = createInvitationSchema.safeParse(req.body);

      if (!safeParseBody.success) {
        const {errors} = safeParseBody.error;
        return res.status(400).json({
          error: {message: "Invalid request", errors},
        });
      }

      const response = await invitationService.create(req.body);

      return res.status(201).json({
        success: true,
        message: 'Create invitation successfully!',
        data: response
      })

    } catch (error) {
      console.log({error})
      return res.status(500).json({
        success: false,
        message: 'Failed to create invitation!',
      })
    }
  } else if (req.method === "GET") {
    try {
      const response = await invitationService.getAll({}, {sort: {_id: -1}});
      return res.status(200).json({
        success: true,
        message: 'Get invitations successfully!',
        data: response
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to get all invitations!'
      })
    }
  }
}

export default withDb(handler);
