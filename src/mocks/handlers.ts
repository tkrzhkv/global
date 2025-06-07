import { getDefaultMock } from '../api/generated/default/default.msw';

export const handlers = [...getDefaultMock()];
