import mongoose, {Document, Model} from "mongoose";

export interface InvitationDto {
  guestName: string;
  willJoin: boolean;
  formFilled: boolean;
  phoneNumber: string;
  participants: number;
}

export type InvitationModel = Model<InvitationDto>;
export type InvitationDoc = Document<InvitationDto>;

const schema = new mongoose.Schema<InvitationDto, InvitationModel>({
  guestName: {
    type: String,
  },
  willJoin: Boolean,
  formFilled: Boolean,
  phoneNumber: String,
  participants: Number,
});

export const Invitation = mongoose.model<InvitationDto>('Invitation', schema);
