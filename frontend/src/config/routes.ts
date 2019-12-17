export const auth = {
  login: '/login',
  signup: '/signup',
};

export const accounting = {
  journal: {
    list: '/accounting/journals',
    create: '/accounting/journals/create',
    update: '/accounting/journals/update/:transactionId',
  },
  account: {
    list: '/accounting/accounts',
    create: '/accounting/accounts/create',
    update: '/accounting/accounts/update/:id',
  },
  ledger: {
    list: '/accounting/ledgers',
    create: '/accounting/ledgers/create',
  },
};
