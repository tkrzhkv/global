import {
  getDefaultMock,
  getPostV1AuthLoginEmailResponseMock,
} from '@/api/generated/default/default.msw';
import { faker } from '@faker-js/faker';
import { http, HttpResponse, delay } from 'msw';

const VALID_EMAIL_PIN = 123456;

export const handlers = [
  http.post('*/v1/auth/login/email', async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as { email: string; pincode: number };

    const { pincode } = body;

    if (pincode !== VALID_EMAIL_PIN) {
      return HttpResponse.json(
        {
          error: {
            code: 'WRONG_PIN_CODE',
            message: 'Invalid or expired PIN code.',
          },
        },
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return HttpResponse.json(
      getPostV1AuthLoginEmailResponseMock({
        data: { session: faker.string.uuid() },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }),

  ...getDefaultMock(),
];
