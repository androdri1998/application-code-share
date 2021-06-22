import { v4 as uuidV4 } from 'uuid';

import IGenerateUuidProvider from '../IGenerateUuidProvider';

export default class FakeGenerateUuidProvider implements IGenerateUuidProvider {
  generate(): string {
    return uuidV4();
  }
}
