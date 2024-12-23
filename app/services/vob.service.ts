import { ApiResponse, getAccessToken, logger, Result } from '@siloamhospitals/erp-template-expressjs-library';
import axios, { isAxiosError } from 'axios';
import express from 'express';
import { provide } from 'inversify-binding-decorators';
import { config } from '../config';
import type { MajorOfBusinessOptionsResponse } from '../types/vob.type.';

@provide('VobService')
export class VobService {
  public async getMajorOfBusinessOptions(req: express.Request): Promise<Result<MajorOfBusinessOptionsResponse[]>> {
    try {
      const url = `${config.vob.master_url}/major-business-field/options`; // sesuaikan url nya dari vob

      logger.info(`'Start Getting Major Of Business Options.'`);

      const response = await axios.get<ApiResponse<MajorOfBusinessOptionsResponse[]>>(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-CURRENT-USER': process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development' ? req.get('X-CURRENT-USER') : undefined,
          Authorization: getAccessToken(req),
        },
      });

      if (response.status === 200) {
        if (response.data) {
          logger.info(`Get Major Of Business Options Response Data: ${JSON.stringify(response.data)}`);
          if (response.data.code === 200) {
            logger.info('Success Get Major Of Business Options');
            return Result.success(response.data.data);
          } else {
            logger.error(`Failed Get Major Of Business Options. Error: ${response.data.message}`);
            return Result.fail(response.data.message);
          }
        } else {
          logger.error('Failed Get Major Of Business Options. Data is null');
          return Result.fail('Data is null');
        }
      }

      logger.error(`Failed Getting Data Major Of Business Options. ${response.status} - ${response.statusText}`);
      return Result.fail(`${response.status} - ${response.statusText}`);
    } catch (error) {
      let errorMessage = '';
      if (isAxiosError(error)) {
        errorMessage = `Failed Get Data Major Of Business Options. Error: ${error.message}`;
        if (error.response?.data) {
          errorMessage += ` Response Data: ${JSON.stringify(error.response.data)}`;
        }
      } else {
        errorMessage = `Unhandled Exception when Get Capex Category By Pks. ${error instanceof Error ? error.message : ''}`;
      }

      logger.error(errorMessage, error);
      return Result.fail(errorMessage);
    }
  }
}
