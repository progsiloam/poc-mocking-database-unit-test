import { ApiResponse } from '@siloamhospitals/erp-template-expressjs-library';
import { provide } from 'inversify-binding-decorators';
import { Controller, Get, Route, Tags } from 'tsoa';
import { version } from '../../package.json';

@Tags('Version')
@Route('version')
@provide(VersionController)
export class VersionController extends Controller {
  constructor() {
    super();
  }

  @Get()
  public async getVersion(): Promise<ApiResponse<string>> {
    return ApiResponse.success<string>(version);
  }
}
