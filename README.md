VibeArt Web
===========

[![Version](https://img.shields.io/github/package-json/v/Bitsulov/vibeart-web-frontend)](https://github.com/Bitsulov/vibeart-web-frontend/blob/main/package.json)
[![License](https://img.shields.io/github/license/Bitsulov/vibeart-web-frontend)](https://github.com/Bitsulov/vibeart-web-frontend/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.19-5FA04E?logo=nodedotjs&logoColor=white)](https://nodejs.org/)

VibeArt — социальная сеть, где творческие люди публикуют работы, собирают их в альбомы и общаются в сообществах. Этот репозиторий содержит веб-фронтенд:

* Работы
	* Публикация работ с описанием и тегами.
	* Альбомы для объединения работ.
	* Общая галерея с поиском.
* Общение
	* Комментарии к публикациям.
	* Личные сообщения.
	* Уведомления.
* Сообщества и профили
	* Создание сообществ и подписка на них.
	* Профили авторов со статистикой и подписками.
* Удобство
	* Интерфейс на русском и английском языках.
	* Адаптивная вёрстка для телефонов и компьютеров.

> Репозиторий подключён подмодулем к основному репозиторию [VibeArt](https://github.com/Bitsulov/VibeArt), в котором всё приложение запускается через Docker Compose.

## СОДЕРЖАНИЕ

* [Системные требования](#системные-требования)
* [Установка](#установка)
	* [Из исходников](#из-исходников)
	* [Через Docker](#через-docker)
* [Запуск](#запуск)
	* [Режим разработки](#режим-разработки)
	* [Режим предпросмотра](#режим-предпросмотра)
* [Переменные окружения](#переменные-окружения)
* [Команды](#команды)
* [Тестирование](#тестирование)
	* [E2E-тесты в WebKit](#e2e-тесты-в-webkit)
* [Архитектура](#архитектура)
* [Стек технологий](#стек-технологий)
* [Связанные репозитории](#связанные-репозитории)
* [Лицензия](#лицензия)

## СИСТЕМНЫЕ ТРЕБОВАНИЯ

* [Node.js](https://nodejs.org/) 20.19 или новее
* npm
* Запущенный [VibeArt API](https://github.com/Bitsulov/vibeart-service-api) для работы с реальными данными

## УСТАНОВКА

### Из исходников

1. Склонируйте репозиторий:
	```bash
	git clone https://github.com/Bitsulov/vibeart-web-frontend.git
	cd vibeart-web-frontend
	```
2. Установите зависимости:
	```bash
	npm install
	```
3. Создайте `.env` из шаблона и заполните [переменные окружения](#переменные-окружения):
	```bash
	cp .env.example .env
	```

### Через Docker

Проект собирается многоэтапным `Dockerfile`:

* **base** — установка зависимостей Node.js.
* **build** — сборка проекта через Vite.
* **prod** — SSR-сервер на Node.js.

Всё приложение вместе с API и сервисом почты запускается из [основного репозитория](https://github.com/Bitsulov/VibeArt) через Docker Compose.

## ЗАПУСК

### Режим разработки

```bash
npm run dev
```

### Режим предпросмотра

Сборка и запуск продакшен-версии локально:

```bash
npm run build
npm run preview
```

## ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ

| Переменная               | Описание                                                                     |
|--------------------------|------------------------------------------------------------------------------|
| `VITE_URL`               | Публичный URL сайта                                                          |
| `VITE_API_BASE`          | Базовый URL API для запросов из браузера                                     |
| `VITE_INTERNAL_API_BASE` | Базовый URL API для серверных (SSR) запросов внутри Docker-сети              |
| `VITE_EMAIL`             | Контактный email, отображаемый на сайте                                      |
| `VITE_CRYPTO_KEY`        | Ключ AES-GCM в Base64 (16, 24 или 32 байта) для шифрования токенов в cookies |

## КОМАНДЫ

| Команда                          | Описание                                                        |
|----------------------------------|-----------------------------------------------------------------|
| `npm run dev`                    | Запуск dev-сервера                                              |
| `npm run build`                  | Сборка проекта                                                  |
| `npm run preview`                | Запуск собранного проекта                                       |
| `npm run lint`                   | Линтинг                                                         |
| `npm run typecheck`              | Проверка типов                                                  |
| `npm run test`                   | Юнит-тесты в watch-режиме                                       |
| `npm run test:run`               | Однократный запуск юнит-тестов                                  |
| `npm run test:coverage`          | Покрытие (порог 75%)                                            |
| `npm run test:ui`                | UI-дашборд Vitest                                               |
| `npm run test:e2e`               | E2E-тесты (Playwright)                                          |
| `npm run test:e2e:ui`            | UI-дашборд Playwright                                           |
| `npm run test:e2e:debug`         | Отладка E2E-тестов                                              |
| `npm run test:e2e:webkit`        | E2E-тесты в WebKit (на Windows — через WSL)                     |
| `npm run test:e2e:webkit:update` | Обновление эталонных скриншотов WebKit (на Windows — через WSL) |
| `npm run test:all`               | lint + typecheck + vitest + playwright                          |

## ТЕСТИРОВАНИЕ

* **Юнит и интеграционные тесты** — [Vitest](https://vitest.dev/) и [Testing Library](https://testing-library.com/), API мокируется через [MSW](https://mswjs.io/). Тесты лежат рядом с проверяемыми файлами.
* **E2E и визуальные тесты** — [Playwright](https://playwright.dev/), тесты и настройки в папке `e2e/`. Во время прогона SSR отключается.

Перед коммитом запускайте полную проверку:

```bash
npm run test:all
```

### E2E-тесты в WebKit

На Windows `npm run test:e2e` не запускает тесты в WebKit, потому что сборка WebKit в Playwright для Windows работает нестабильно. Чтобы прогнать тесты в WebKit:

1. Установите дистрибутив Linux в WSL.
2. Установите в нём `rsync` и Node.js.
3. Запустите `npm run test:e2e:webkit`, а для обновления скриншотов — `npm run test:e2e:webkit:update`.

## АРХИТЕКТУРА

Проект построен по архитектуре [Feature-Sliced Design](https://feature-sliced.design/). Верхние слои импортируют из нижних, но не наоборот.

| Слой        | Назначение                                             |
|-------------|--------------------------------------------------------|
| `shared/`   | Утилиты, хуки, типы, локали, тест-хелперы              |
| `entities/` | Доменные модели: Redux-слайсы, типы, моки              |
| `features/` | Пользовательские сценарии: логика и UI                 |
| `widgets/`  | Композиции фич и сущностей для переиспользуемых секций |
| `pages/`    | Полноэкранные представления из виджетов                |
| `app/`      | Точка входа, провайдеры, Redux store, роутер           |

## СТЕК ТЕХНОЛОГИЙ

* **Основное**
	* [React 19](https://react.dev/) и [TypeScript](https://www.typescriptlang.org/)
	* [React Router 7](https://reactrouter.com/) — роутинг и SSR
	* [Vite](https://vitejs.dev/) — сборщик
	* [SCSS Modules](https://sass-lang.com/) — стили
* **Состояние и данные**
	* [Redux Toolkit](https://redux-toolkit.js.org/) — клиентское состояние
	* [TanStack Query](https://tanstack.com/query) — серверные данные
	* [Axios](https://axios-http.com/) — HTTP-клиент
	* [React Hook Form](https://react-hook-form.com/) — формы и валидация
* **Интернационализация**
	* [i18next](https://www.i18next.com/) — русский и английский языки
* **Тестирование**
	* [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/), [MSW](https://mswjs.io/), [Playwright](https://playwright.dev/)

## СВЯЗАННЫЕ РЕПОЗИТОРИИ

* [VibeArt](https://github.com/Bitsulov/VibeArt) — основной репозиторий с Docker-инфраструктурой
* [VibeArt API](https://github.com/Bitsulov/vibeart-service-api) — основной сервис API
* [VibeArt email service](https://github.com/Bitsulov/vibeart-service-email) — сервис отправки писем

## ЛИЦЕНЗИЯ

Проект распространяется под лицензией [MIT](LICENSE).
