import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {API_BASE_URL} from "@app/config/env.config";
import {InvitationDto} from "@app/types/invitation.type";

enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

async function request<Payload>(endpoint: string, method: ApiMethod, payload?: Payload, options?: AxiosRequestConfig) {
  try {
    const response = await axios({
      method,
      url: `${location.origin}/api${endpoint}`,
      data: payload,
      ...options
    });

    if (response.data) {
      return response.data;
    }
  } catch (error: any) {
    if (error.response) {
      throw error.response.data || error.response;
    }
    throw error;
  }
}

class ApiService {
  createInvitation(payload: Partial<InvitationDto>) {
    return request('/invitation', ApiMethod.POST, payload);
  }

  getAllInvitations() {
    return request('/invitation', ApiMethod.GET);
  }

  getInvitationByCode(code: string) {
    return request(`/invitation/${code}`, ApiMethod.GET);
  }

  updateInvitation(code: string, payload: Partial<InvitationDto>) {
    return request(`/invitation/${code}`, ApiMethod.PATCH, payload);
  }

  removeInvitation(code: string) {
    return request(`/invitation/${code}`, ApiMethod.DELETE);
  }
}

export const apiService = new ApiService();
