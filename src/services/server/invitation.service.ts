import {InvitationDto} from "@app/types/invitation.type";
import {
  CreateOptions,
  FilterQuery,
  HydratedDocument,
  QueryOptions,
  SaveOptions,
  UnpackedIntersection,
  UpdateQuery
} from "mongoose";
import {invitationModel} from "@app/models/invitation.model";

class InvitationService {
  async getAll(filter: FilterQuery<InvitationDto>, options?: QueryOptions) {
    const document = await invitationModel.find(filter, {}, options).select(options?.select);

    if (options?.nullable !== true && !document) {
      return Promise.reject("Invitations_NOT_FOUND!")
    }

    return document;
  }

  async getByCode(
    filter: FilterQuery<InvitationDto>,
    options?: QueryOptions
  ): Promise<UnpackedIntersection<HydratedDocument<InvitationDto>, {}> | null> {
    const document = await invitationModel
      .findOne(filter, null, options)
      .select(options?.select);
    if (options?.nullable !== true && !document) {
      return Promise.reject("Failed to get invitation!");
    }
    return document;
  }

  async create(payload: InvitationDto, options?: CreateOptions): Promise<HydratedDocument<InvitationDto, {}, {}>[]> {
    return await invitationModel.create(payload, options);
  }

  async update(
    filter: FilterQuery<InvitationDto>,
    payload: UpdateQuery<InvitationDto>,
    options?: QueryOptions) {
    const document = await invitationModel.findOneAndUpdate(
      filter,
      payload,
      options
    );
    if (options?.nullable !== true && !document) {
      return Promise.reject("Invitations_NOT_FOUND!")
    }
    if (options?.populate) await document?.populate(options?.populate);
    return document;
  }

  async remove(filter: FilterQuery<InvitationDto>, options?: QueryOptions): Promise<UnpackedIntersection<HydratedDocument<InvitationDto>, {}> | null> {
    const document = await invitationModel
      .findOneAndDelete(filter, options)
    if (options?.nullable !== true && !document) {
      return Promise.reject("Invitations_NOT_FOUND!")
    }
    return document;
  }
}

export const invitationService = new InvitationService();
