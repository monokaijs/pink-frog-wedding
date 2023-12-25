import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import dbService from "@app/services/db.service";

export const withDb = (fn: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await dbService.connect();
    return await fn(req, res);
  };
};
