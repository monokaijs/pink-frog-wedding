export enum Relationship {
  BRIDE_GUESTS = 'brideGuests',
  GROOM_GUESTS = 'groomGuests'
}

export interface InvitationDto {
  _id?: string;
  code: string;
  guestName: string;
  relationship: Relationship;
  description: string;
  willJoin: boolean;
  formFilled: boolean;
  participants: string;
}
