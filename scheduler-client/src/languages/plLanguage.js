//REGISTER
export const registerPageMessages ={
  passwordLabel: "Hasło",
  repeatPasswordLabel: "Powtórz hasło",
  fieldIsRequiredLabel: "To pole jest wymagane",
  passwordConditionsLabel: "Hasło musi zawierać przynajmniej 8 znaków w tym: znak specjalny, duża litera, cyfra.",
  emailIsNotValidLabel: "Email jest nieprawidłowy",
  loginLabel: "Login",
  emailLabel: "Email",
  registerTitle: "Rejestracja",

  registerButtonLabel: "Utwórz konto",
  loginButtonLabel: "Zaloguj",

  passwordsIncorrectAlert: "Hasła nie są takie same.",
  accountWasCreatedAlert: "Konto zostało utworzone",
  accountWithThisLoginExistAlert: "Konto o podanym loginie już istnieje.",
  serverNotRespondingAlert: "Serwer nie odpowiada.",
}
//LOGIN
export const loginPageMessages = {
loginTitle: "Zaloguj się",
loginPlaceHolder: "Login",
passwordPlaceHolder: "Hasło",
loginButtonLabel: "Zaloguj",
registerButtonLabel: "Zarejestruj",

leftSideTextLabel: 'Witamy w aplikacji Scheduler Online, gdzie w łatwy i szybki sposób zaplanujesz swój plan zajęć. Korzystając z naszego produktu stwierdzisz, że układanie planu zajęć jest banalnie proste. Załóż konto już dziś i dołącz do grona ludzi, którzy nie lubią tracić czasu na papierowe planery, a swój plan mają zawsze pod ręką.',
}
//USERSETTINGS
export const userSettingsPageMessages = {
    changePasswordLabel: 'Zmiana hasła',
    fieldIsRequiredLabel: "To pole jest wymagane",
    actualPasswordLabel: "Aktualne hasło",
    newPasswordLabel: "Nowe hasło",
    passwordIsWrongMessage: "Hasło jest niepoprawne",
    changeButtonLabel: "Zmień",

    textToHeaderLabel: "Naciśnij odpowiedni przycisk na górze.",
    timeTextLabel: "Obecny czas archiwizacji: ",

    newEmailLabel: "Nowy adres email",
    emailIsNotValid: "Email nie spełnia kryteriów",
    changeEmailButtonLabel: "Zmień adres email",

    timeChangeDescribeLabel: "Zmiana czasu archiwizowania",
    numbersOfDaysErrorMessage: "Podaj liczbę od 0 do 999",
    numbersOfDayPlaceHolder: "Podaj ilość dni do archiwizacji (np. 9)",

    changeEmailHeaderLabel: "Zmień email",
    changePasswordHeaderLabel: "Zmień hasło",
    changeArchieveTimeHeaderLabel: "Zmień czas archiwizacji",
}

//NAVBAR
export const navbarComponentMessages = {
  instructionLabel: "Instrukcja",
  calendarLabel: "Harmonogram",
  calendarHistoryLabel: "Historia",
  blockEditLabel: "Zarządzaj blokami",
  settingsLabel: "Ustawienia",

  logoutButtonLabel: "Wyloguj",
}

//BLOCKS
export const blockPageMessages = {
    addNewBlockLabel: "Dodaj nowy blok",
    manageExistingBlocks: "Zarządzaj istniejącymi blokami",

    yourBlocksLabel: "Twoje bloki",
    tableHeaderFirst: "Lp",
    tableHeaderName: "Nazwa",
    tableHeaderNotes: "Notatka",
    tableHeaderStartDate: "Data od",
    tableHeaderEndDate: "Data do",

    addButtonLabel: "Dodaj",
    loadAllButtonLabel: "Załaduj pełny",

    changeButtonLabel: "Zmień",
    loadButtonLabel: "Załaduj",
    deleteButtonLabel: "Usuń",

    actuallyModifiedLabel: "Aktualnie modyfikujesz: ",
    dateStartLabel: "Data od",
    dateEndLabel: "Data do",
    helperDateLabel: "Podaj prawidłowy format",
    modifyButtonLabel: "Modyfikuj",
    cancelButtonLabel: "Anuluj",

    titleFromConfirmationDelete: "Czy na pewno chcesz usunąć: ",
    acceptButtonLabel: "Tak",
    declineButtonLabel: "Nie",

    fieldIsRequiredLabel: "To pole jest wymagane",
    addBlockNameLabel: "Nazwa bloku",
    addBlockNotesLabel: "Notatka",
    addBlockStartDateLabel: "Data od",
    addBlockEndDateLabel: "Data do",
    addBlockDateHelper: "Podaj prawidłowy format",
}

export const editRecurrenceMessages = {
  pl: {
    current: "Wybrana data",
    currentAndFollowing: "[BETA] Wybrane i podążające",
    all: "Całe wydarzenie",
    menuEditingTitle: "Edycja wydarzenia",
    menuDeletingTitle: "Usuń powtarzające wydarzenie",
    cancelButton: "Anuluj",
    commitButton: "Tak",
  },
};

export const appointmentFormMessages = {
  pl: {
    detailsLabel: "Szczegóły",
    allDayLabel: "Cały dzień",
    titleLabel: "Tytuł",
    commitCommand: "Zapisz",
    moreInformationLabel: "Więcej informacji",
    repeatLabel: "Powtarzaj",
    notesLabel: "Notatki",
    never: "Powtarzaj cały czas",
    daily: "Dni",
    weekly: "Tygodnie",
    monthly: "Miesiące",
    yearly: "Lata",
    repeatEveryLabel: "Powtarzaj co",
    daysLabel: "dni",
    endRepeatLabel: "Koniec powtarzania: ",
    onLabel: "Po",
    afterLabel: "W dniu",
    occurrencesLabel: "powtórzeniach",
    weeksOnLabel: "",
    monthsLabel: "",
    ofEveryMonthLabel: "dniu miesiąca",
    theLabel: "",
    firstLabel: "Pierwszy",
    secondLabel: "Drugi",
    thirdLabel: "Trzeci",
    fourthLabel: "Czwarty",
    lastLabel: "Ostatni",
    yearsLabel: "",
    ofLabel: "",
    everyLabel: "Każdy",
  },
};

export const confirmationDialogMessages = {
  pl: {
    discardButton: "Porzuć",
    deleteButton: "Usuń",
    cancelButton: "Anuluj",
    confirmDeleteMessage: "Jesteś pewien, że chcesz usunąć to wydarzenie?",
    confirmCancelMessage: "Porzucić niezapisane zmiany?",
  },
};

export const todayButtonMessages = {
  pl: {
    today: "Dzisiaj",
  },
};

export const allDayLocalizationMessages = {
  pl: {
    allDay: "Cały dzień",
  },
};
