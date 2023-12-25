import mongoose, {Document, Model} from "mongoose";
import {InvitationDto, Relationship} from "@app/types/invitation.type";



export type InvitationModel = Model<InvitationDto>;
export type InvitationDoc = Document<InvitationDto>;

const schema = new mongoose.Schema<InvitationDto, InvitationModel>({
  code: {
    type: String,
    unique: true
  },
  guestName: {
    type: String,
  },
  relationship: {
    type: String,
    enum: Relationship,
  },
  description: String,
  willJoin: Boolean,
  formFilled: Boolean,
  participants: String,
});

export const invitationModel =  mongoose.models.Invitation || mongoose.model<InvitationDto>('Invitation', schema);
