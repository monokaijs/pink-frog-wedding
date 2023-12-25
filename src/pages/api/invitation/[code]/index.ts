import {NextApiRequest, NextApiResponse} from "next";
import {invitationService} from "@app/services/server/invitation.service";
import {withDb} from "@app/middlewares/withDb";
import {z} from "zod";
import {relationshipSchema} from "@app/pages/api/invitation";

export const updateInvitationSchema = z.object({
  guestName: z.string().optional(),
  relationship: relationshipSchema.optional(),
  description: z.string().optional(),
})


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    try {
      const safeParseBody = updateInvitationSchema.safeParse(req.body);

      if (!safeParseBody.success) {
        const {errors} = safeParseBody.error;
        return res.status(400).json({
          error: {message: "Invalid request", errors},
        });
      }

      const response = await invitationService.update({
        code: req.query?.code,
      }, req.body, {
        new: true
      })

      return res.status(200).json({
        success: true,
        message: 'Update invitation successfully!',
        data: response
      })

    } catch (error) {
      console.log({error})
      return res.status(500).json({
        success: false,
        message: 'Failed to update invitation!',
      })
    }
  } else if (req.method === "GET") {
    try {
      const response = await invitationService.getByCode({
        code: req.query?.code,
      })

      return res.status(200).json({
        success: true,
        message: 'Get invitation successfully!',
        data: response
      })

    } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Get invitation successfully!',
        })
    }
  } else if (req.method === "DELETE") {
    try {
      const response = await invitationService.remove({
        code: req.query?.code,
      });
      return res.status(200).json({
        success: true,
        message: 'Remove invitation successfully!',
        data: response
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to remove invitation!'
      })
    }
  }
}

export default withDb(handler);
