import { expect, test } from '@playwright/test';

test.describe('Registration Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reg');
  });

  test('should display both Email and Anonymous registration forms', async ({
    page,
  }) => {
    await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
    await expect(page.getByLabel('Email Registration')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Register with Email' }),
    ).toBeVisible();

    await expect(page.getByText('— OR —')).toBeVisible();

    await expect(page.getByText('Anonymous Registration')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Generate Anonymous Code' }),
    ).toBeVisible();

    await expect(page.getByRole('link', { name: 'Login here' })).toBeVisible();
  });

  test('should generate anonymous code and display copy/login options', async ({
    page,
  }) => {
    const generateCodeButton = page.getByRole('button', {
      name: 'Generate Anonymous Code',
    });

    await generateCodeButton.click();

    await expect(page.getByText('Code generated successfully!')).toBeVisible();

    await expect(page.getByText('Your Anonymous Login Code:')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Copy Code' })).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Go to Login' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Go to Login' }).click();
    await expect(page).toHaveURL(/\/auth$/);
  });

  test('should show loading states during email registration submission', async ({
    page,
  }) => {
    const emailInput = page.getByLabel('Email Registration');
    const registerButton = page.getByRole('button', {
      name: 'Register with Email',
    });

    await emailInput.fill('loading@example.com');
    await registerButton.click();

    await expect(registerButton).toBeDisabled();
  });

  test('should show loading states during anonymous code generation', async ({
    page,
  }) => {
    const generateCodeButton = page.getByRole('button', {
      name: 'Generate Anonymous Code',
    });

    await generateCodeButton.click();

    await expect(generateCodeButton).toBeDisabled();
  });
});
