---
layout: post
title: "Сравнение Cypress и Playwright"
---

Cypress и Playwright -- одни из наиболее популярных инструментов для автоматизированного end-to-end тестирования. 

## Особенности Cypress

- Фреймворк для тестирования и отладки веб-приложений
- Создан в 2015 г. как стартап, используется большим сообществом разработчиков
- Хорошая документация, много примеров, есть интеграция с веб-фреймворками (`@cypress/schematic` для Angular)
- Устанавливается как Node.js библиотека и подгружает нативный модуль с GUI, из которого можно запускать тесты в установленных в системе браузерах
- Есть графический интерфейс, в котором можно просматривать каждый шаг теста, но возможен и запуск в headless-режиме
- Синхронный API для описания последовательности действий в одной вкладке браузера
- Можно добавлять свои команды при помощи `Cypress.Commands.add(...)`, а также типизацию для них в блоке `declare namespace Cypress {...}`
- В качестве test runner'а используется своя реализация, которая даёт возможность взаимодействовать с графическим интерфейсом.

## Особенности Playwright

- Фреймворк для автоматизации браузера
- Создан в Microsoft в 2020 г. с использованием API инструмента Puppeteer от Google
- Менее подробная и структурированная документация, меньше примеров, чем для Cypress
- Устанавливается как Node.js библиотека и требует дополнительной загрузки фиксированных версий браузеров (Chromium, Firefox, Webkit) при помощи `npx playwright install`, работает только с этими браузерами
- Возможен запуск в headless- и headed-режиме, но только для наблюдения за выполнением. Для анализа записанных исполнений есть отдельный инструмент Playwright Trace Viewer.
- Асинхронный API, позволяющий запускать несколько браузеров и использовать любые сторонние библиотеки в тестах
- Добавление своих команд реализовано через переопределение функции `test` при помощи `test.extend(...)` и использование полученной новой функции.
- В качестве test runner'а используется Playwright Test, основанный на Jest, возможно также настроить Jest, Jasmine, AVA, Mocha.

## Примеры

Cypress
```typescript
describe('Login page', () => {
  it('shows error message when user does not exist', () => {
    cy.visit('/auth/login');
    cy.get('form').within(() => {
      const username = 'doesnotexist';
      const password = 'doesnotexist';
      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(password);
      cy.get('button[type=submit]').click();
      cy.root().contains(`User "${username}" was not found`);
    });
  });
});
```

Playwright
```typescript
test.describe('Login page', () => {
  test('shows error message when user does not exist', async ({ page }) => {
    await page.goto('/auth/login');
    const form = page.locator('form');
    const username = 'doesnotexist';
    const password = 'doesnotexist';
    await form.locator('input[name=username]').type(username);
    await form.locator('input[name=password]').type(password);
    await form.locator('button[type=submit]').click();
    await expect(form).toContainText(`User "${username}" was not found`);
  });
});
```