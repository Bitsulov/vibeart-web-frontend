/**
 * @file Точка входа в приложение.
 *
 * Монтирует корневое дерево компонентов React в DOM-узел `#root`.
 * Всё приложение обёрнуто в `React.StrictMode`, который в режиме
 * разработки активирует дополнительные предупреждения и намеренно
 * вызывает эффекты и функции рендера дважды для обнаружения
 * непреднамеренных побочных эффектов.
 *
 * Глобальные стили (`index.scss`) импортируются здесь, чтобы они
 * применялись до рендера любого компонента.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from 'app/App';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
