export const TRANSLATION_UA = {
  labels: {
    Employee: 'Працівники',
    TestType: 'Типи тестів',
    Indicator: 'Індикатори',
    IndicatorRange: 'Діапазон значень',
    Test: 'Тести',
    User: 'Користувачі',
    role: {
      ADMIN: 'Адміністратор',
      SUPER_ADMIN: 'Супер Адміністратор',
      MED_WORKER: 'Медичний працівник',
    },
    gender: {
      male: 'Чоловік',
      female: 'Жінка',
    },
  },
  properties: {
    // Общие поля
    createdBy: 'Створено користувачем',
    createdAt: 'Створено в',
    updatedAt: 'Оновлено в',
    role: 'Роль',

    // Поля Employee
    firstName: 'Ім’я',
    lastName: 'Прізвище',
    email: 'Електронна пошта',
    password: 'Пароль',

    // Поля User
    patronymic: 'По батькові',
    birthDate: 'Дата народження',
    gender: 'Стать',
    tests: 'Тести користувача',

    // Поля TestType
    name: 'Назва',
    description: 'Опис',
    testType: 'Тип тесту',

    // Поля Indicator
    unit: 'Одиниця виміру',
    indicator: 'Індикатор',
    indicators: 'Індикатори',

    // Поля IndicatorRange
    minValue: 'Мінімальне значення допустимого діапазону',
    maxValue: 'Максимальне значення допустимого діапазону',
    minAge: 'Мінімальний вік',
    maxAge: 'Максимальний вік',
    indicatorRange: 'Діапазон значень',

    // Поля Test
    userId: 'ID користувача',
    indicatorRangeId: 'ID діапазону індикатора',
    resultValue: 'Результат',
    status: 'Статус',
    testDate: 'Дата тесту',
  },
};
